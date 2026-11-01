import { sha256Canonical } from '../core/digest.js';
import type { FactoryRequest, FactoryResult, RecoverableFactory } from '../factories/contracts.js';
import { FactoryRegistry } from '../factories/registry.js';
import { ObjectiveOrchestrator, checkedFactoryResult, type ObjectivePlan } from '../objectives/orchestrator.js';
import { SqliteCreationRepository, type ProjectSnapshot } from '../persistence/sqlite.js';
import { resolveStageOutputReferencesAsync, StageOutputUnavailable } from '../objectives/stage-outputs.js';
/** Reuses the existing graph scheduler and scoped domain project/stage storage.
 * Factories own native execution/reconciliation; project state grants no action.
 */
export interface DurableProjectView extends ProjectSnapshot {
    operations: {
        stageKey: string;
        requestId: string;
        progress: string;
    }[];
}
export class DurableObjectiveService {
    readonly stageOutputReferenceVersion = 1;
    readonly artifactTextReferenceVersion = 1;
    private active = new Map<string, Promise<DurableProjectView>>();
    private closed = false;
    constructor(private repo: SqliteCreationRepository, private factories: FactoryRegistry) { }
    prepareObjective(key:string,plan:ObjectivePlan){if(this.closed)throw Error('project service closed');return this.view(this.repo.openObjective(key,plan));}
    list(){if(this.closed)throw Error('project service closed');return this.repo.listObjectives();}
    async executeObjective(key: string, plan: ObjectivePlan) {
        if (this.closed)
            throw Error("project service closed");
        const p = this.repo.openObjective(key, plan);
        return this.resume(p.run.id);
    }
    async resume(runId: string) {
        if (this.closed)
            throw Error("project service closed");
        const running = this.active.get(runId);
        if (running)
            return structuredClone(await running);
        const task = Promise.resolve().then(() => this.advance(runId)).finally(() => this.active.delete(runId));
        this.active.set(runId, task);
        return structuredClone(await task);
    }
    read(runId: string) {
        if (this.closed)
            throw Error("project service closed");
        return this.view(this.repo.readObjective(runId));
    }
    async cancel(runId: string) {
        if (this.closed)
            throw Error("project service closed");
        this.repo.requestCancel(runId);
        return this.resume(runId);
    }
    async close() { this.closed = true; await Promise.allSettled([...this.active.values()]); }
    private view(project: ProjectSnapshot): DurableProjectView { return { ...project, operations: project.stages.map(stage => { const c = this.repo.checkpoint(project.run.id, stage.stageKey); return { stageKey: stage.stageKey, requestId: c.requestId, progress: c.result?.checkpoint?.state ?? stage.status }; }) }; }
    private async advance(runId: string) {
        let project = this.repo.readObjective(runId);
        if (['COMPLETED', 'FAILED', 'CANCELLED'].includes(project.run.status))
            return this.view(project);
        const originals = new Map(project.plan.workstreams.map(w => {
            const factory = this.factories.get(w.factory) as RecoverableFactory;
            if (typeof factory.reconcile !== 'function')
                throw Error('durable factory reconciliation required');
            return [w.factory, factory] as const;
        }));
        this.repo.start(runId);
        project = this.repo.readObjective(runId);
        const wrapped = new FactoryRegistry();
        for (const [kind, factory] of originals)
            wrapped.register({ kind, execute: async (req: FactoryRequest) => {
                    const current = this.repo.readObjective(runId), stage = current.stages.find(s => this.repo.checkpoint(runId, s.stageKey).requestId === req.id);
                    if (!stage)
                        throw Error('project stage request mismatch');
                    let c = this.repo.checkpoint(runId, stage.stageKey);
                    if (['SUCCEEDED', 'FAILED', 'CANCELLED'].includes(stage.status))
                        return c.result ?? { requestId: req.id, kind: req.kind, status: 'FAILED', artifactRefs: [], evidenceRefs: [], blockers: ['project stage cancelled before dispatch'] };
                    if (this.closed)
                        return c.result ?? { requestId: req.id, kind: req.kind, status: 'BLOCKED', artifactRefs: [], evidenceRefs: [], blockers: ['Project host is quiescing; this stage was not dispatched.'], checkpoint: { state: c.started ? 'UNKNOWN' : 'WAITING_RESOURCE', operationRef: req.id } };
                    let cancelling = current.run.status === 'CANCELLING';
                    let failureDrain = current.stages.some(s => s.status === 'FAILED');
                    if (failureDrain && !c.started) {
                        this.repo.haltUnstarted(runId);
                        return { requestId: req.id, kind: req.kind, status: 'FAILED', artifactRefs: [], evidenceRefs: [], blockers: ['A sibling failed; no new project stage was dispatched.'] };
                    }
                    if (cancelling && !c.started)
                        return { requestId: req.id, kind: req.kind, status: 'FAILED', artifactRefs: [], evidenceRefs: [], blockers: ['project cancellation prevents dispatch'] };
                    // Resolve from scoped immutable accepted checkpoints before claiming
                    // this stage. Reopening reproduces the same exact owner command.
                    let resolved: FactoryRequest;
                    try {
                        resolved = { ...req, inputs: await resolveStageOutputReferencesAsync(current.plan, stage.stageKey, key => {
                            const source = current.stages.find(s => s.stageKey === key);
                            if (!source) throw Error('stage output dependency not found');
                            return { ...this.repo.checkpoint(runId, key), status: source.status };
                        },async(key,requestId,artifactRef)=>{
                            const source=current.plan.workstreams.find(w=>w.id===key),producer=source&&originals.get(source.factory);
                            if(typeof producer?.readArtifactText!=='function')throw new StageOutputUnavailable('source factory does not expose verified artifact text');
                            const text=await producer.readArtifactText(requestId,artifactRef);
                            const latest=this.repo.readObjective(runId),saved=this.repo.checkpoint(runId,key);
                            if(latest.stages.find(s=>s.stageKey===key)?.status!=='SUCCEEDED'||saved.requestId!==requestId||saved.result?.status!=='SUCCEEDED'||!saved.result.artifactRefs.includes(artifactRef))throw Error('accepted source changed during artifact read');
                            return text;
                        }) };
                    } catch (error) {
                        // A legitimately absent selected output is a known input
                        // failure, not an uncertain native action or a stuck run.
                        if (!(error instanceof StageOutputUnavailable) || c.started) throw error;
                        const claim = this.repo.claim(runId, stage.stageKey);
                        if (!claim.claimed) throw Error('Dependency input failure requires the original unstarted stage claim');
                        const failed: FactoryResult = { requestId: req.id, kind: req.kind, status: 'FAILED', artifactRefs: [], evidenceRefs: [], blockers: ['Declared dependency output is unavailable; no consumer factory action was attempted.'] };
                        this.repo.settle(runId, stage.stageKey, claim, failed);
                        return failed;
                    }
                    // Text reads can suspend. Recheck close/cancellation/failure
                    // before any original producer claim or native preview.
                    if(this.closed)throw Error('Project host quiesced before resolved stage claim');
                    const latest=this.repo.readObjective(runId);
                    cancelling=latest.run.status==='CANCELLING';failureDrain=latest.stages.some(s=>s.status==='FAILED');c=this.repo.checkpoint(runId,stage.stageKey);
                    if(['COMPLETED','FAILED','CANCELLED'].includes(latest.run.status)||['SUCCEEDED','FAILED','CANCELLED'].includes(latest.stages.find(s=>s.stageKey===stage.stageKey)?.status??''))return c.result??{requestId:req.id,kind:req.kind,status:'FAILED',artifactRefs:[],evidenceRefs:[],blockers:['Project or consumer stage became terminal during dependency read.']};
                    if((cancelling||failureDrain)&&!c.started){this.repo.haltUnstarted(runId);return{requestId:req.id,kind:req.kind,status:'FAILED',artifactRefs:[],evidenceRefs:[],blockers:['Project cancellation or sibling failure prevented the resolved consumer action.']};}
                    const claim = cancelling ? { ...c, claimed: false } : this.repo.claim(runId, stage.stageKey);
                    c = claim;
                    let result: FactoryResult;
                    try {
                        const raw = await ((cancelling || failureDrain) && factory.cancel ? factory.cancel(structuredClone(resolved)) : claim.claimed ? factory.execute(structuredClone(resolved)) : factory.reconcile(structuredClone(resolved), { dispatchAllowed: !failureDrain && !cancelling }));
                        result = checkedFactoryResult(req, raw);
                        if (sha256Canonical(result) !== sha256Canonical(raw))
                            throw Error('original provider binding unconfirmed');
                    }
                    catch {
                        result = { requestId: req.id, kind: req.kind, status: 'BLOCKED', artifactRefs: [], evidenceRefs: [], blockers: ['Original factory outcome is unconfirmed; reconcile the original operation.'], checkpoint: { state: 'UNKNOWN', operationRef: req.id } };
                    }
                    this.repo.settle(runId, stage.stageKey, c, result);
                    return result;
                } });
        // The original scheduler selects dependencies and validates each result. The
        // wrapped provider restores completed checkpoints rather than repeating work.
        await new ObjectiveOrchestrator(wrapped, runId).execute(project.plan);
        return this.view(this.repo.finish(runId));
    }
}
