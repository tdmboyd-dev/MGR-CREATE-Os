import { createHash } from 'node:crypto';
import { types } from 'node:util';
import type { FactoryKind, FactoryRequest, FactoryResult, RecoverableFactory } from './contracts.js';
import type { ProjectPrincipal } from '../persistence/sqlite.js';
import { sha256Canonical } from '../core/digest.js';
import { MarkdownRenderer } from '../documents/markdown-renderer.js';
import { StageOutputUnavailable } from '../objectives/stage-outputs.js';
export interface OwnerWorkflowBridge {
    readonly tenantId: string;
    readonly actorId: string;
    readonly availableOperations?: readonly string[];
    assertCurrent(): void;
    preview(command: unknown): unknown | Promise<unknown>;
    execute(requestId: string, digest: string): unknown | Promise<unknown>;
    status(requestId: string): unknown | Promise<unknown>;
    artifact(requestId: string): unknown | Promise<unknown>;
    cancel(requestId: string): unknown | Promise<unknown>;
}
const record = (x: any) => x && typeof x === 'object' && !Array.isArray(x), id = (x: unknown) => typeof x === 'string' && /^[a-zA-Z0-9_.:-]{1,128}$/.test(x), forge = new Set(['forge.world.create', 'forge.creature.create', 'forge.biome.create', 'forge.human.lipsync', 'forge.world.compose']);
/** Trusted host composition over original ONE workflows. It cannot approve,
 * enroll, renew, copy grant state, directly invoke native tools or store blobs.
 */
export class OwnerWorkflowFactory implements RecoverableFactory {
    readonly kind: 'MEDIA' | 'DOCUMENT';
    private principal: Readonly<ProjectPrincipal>;
    constructor(kind: 'MEDIA' | 'DOCUMENT', principal: ProjectPrincipal, private bridge: OwnerWorkflowBridge, private forgeWorkspaceId?: string) {
        if (!['MEDIA', 'DOCUMENT'].includes(kind) || !principal || ![principal.tenantId, principal.actorId, principal.workspaceId].every(id) || bridge?.tenantId !== principal.tenantId || bridge?.actorId !== principal.actorId || ['preview', 'execute', 'status', 'artifact', 'cancel', 'assertCurrent'].some(name => typeof (bridge as any)[name] !== 'function') || (kind === 'MEDIA' || forgeWorkspaceId !== undefined) && !id(forgeWorkspaceId))
            throw Error('trusted scoped workflow bridge required');
        this.kind = kind;
        this.principal = Object.freeze({ ...principal });
        this.current();
    }
    private current() {
        if (types.isAsyncFunction(this.bridge.assertCurrent))
            throw Error('synchronous workflow authority required');
        const value = this.bridge.assertCurrent();
        if (types.isPromise(value))
            Reflect.apply(Promise.prototype.then, value, [() => { }, () => { }]);
        if (value !== undefined)
            throw Error('synchronous workflow authority required');
        if (this.bridge.tenantId !== this.principal.tenantId || this.bridge.actorId !== this.principal.actorId)
            throw Error('workflow bridge principal changed');
    }
    private async call(name: 'preview' | 'execute' | 'status' | 'artifact' | 'cancel', ...args: any[]) { this.current(); const result = await (this.bridge[name] as (...args: any[]) => any).apply(this.bridge, args); this.current(); return result; }
    private command(req: FactoryRequest) {
        if (req.kind !== this.kind || req.tenantId !== this.principal.tenantId || req.workspaceId !== this.principal.workspaceId || !id(req.id) || req.budget !== 0 || !req.acceptanceCriteria.length)
            throw Error('workflow factory scope, zero allocation and criteria required');
        const x = req.inputs as any;
        if (!record(x) || Object.keys(x).sort().join(',') !== 'input,operation' || !record(x.input) || this.kind === 'DOCUMENT' && (!['creation.document.render','signme.draft.create'].includes(x.operation) || x.input.workspaceId !== req.workspaceId) || this.kind === 'MEDIA' && (!forge.has(x.operation) || x.input.workspaceId !== this.forgeWorkspaceId))
            throw Error('unsupported scoped factory operation');
        if (this.bridge.availableOperations !== undefined && (!Array.isArray(this.bridge.availableOperations) || !this.bridge.availableOperations.includes(x.operation)))
            throw Error('native project operation is not connected');
        if (x.operation === 'signme.draft.create' && (Object.keys(x.input).some(k=>!['workspaceId','title','content','documentId','expectedVersion'].includes(k)) || typeof x.input.content !== 'string' || !x.input.content.isWellFormed() || !x.input.content.trim() || x.input.content.length>10000 || typeof x.input.title !== 'string' || !x.input.title.isWellFormed() || !x.input.title.trim() || x.input.title.length>500 || (x.input.documentId!==undefined && !id(x.input.documentId)) || (x.input.expectedVersion!==undefined && (!Number.isSafeInteger(x.input.expectedVersion)||x.input.expectedVersion<1)) || (x.input.documentId!==undefined)!==(x.input.expectedVersion!==undefined)))
            throw Error('unsupported SignMe draft input');
        return structuredClone({ requestId: req.id, operation: x.operation, input: x.input });
    }
    private bound(req: FactoryRequest, command: any, p: any) {
        if (!record(p) || p.tenantId !== this.principal.tenantId || p.actorId !== this.principal.actorId || !record(p.command) || sha256Canonical(p.command) !== sha256Canonical(command) || typeof p.digest !== 'string' || !/^[a-f0-9]{64}$/.test(p.digest) || !['preview', 'approved', 'pending', 'unknown', 'succeeded', 'failed', 'cancelled'].includes(p.state))
            throw Error('original owner workflow binding unconfirmed');
        return p;
    }
    private waiting(req: FactoryRequest, state: 'WAITING_APPROVAL' | 'WAITING_RESOURCE' | 'UNKNOWN', reason: string): FactoryResult { return { requestId: req.id, kind: this.kind, status: 'BLOCKED', artifactRefs: [], evidenceRefs: ['ecosystem:' + req.id], blockers: [reason], checkpoint: { state, operationRef: req.id } }; }
    private async finish(req: FactoryRequest, command: any, p: any): Promise<FactoryResult> {
        this.bound(req, command, p);
        if (p.state === 'preview')
            return this.waiting(req, 'WAITING_APPROVAL', 'Exact owner approval is required in the original workflow.');
        if (p.state === 'approved')
            return this.waiting(req, 'WAITING_APPROVAL', 'Original approval remains; no completed output has been accepted.');
        if (['pending', 'unknown'].includes(p.state))
            return this.waiting(req, p.state === 'unknown' ? 'UNKNOWN' : 'WAITING_RESOURCE', 'Original native operation is ' + p.state + '; reconcile it without creating another request.');
        if (['failed', 'cancelled'].includes(p.state))
            return { requestId: req.id, kind: this.kind, status: 'FAILED', artifactRefs: [], evidenceRefs: ['ecosystem:' + req.id], blockers: ['Original owner workflow ' + p.state] };
        const {a}=await this.verifiedArtifact(req,command,p);
        return { requestId: req.id, kind: this.kind, status: 'SUCCEEDED', artifactRefs: ['mgr-workflow:' + req.id + ':sha256:' + a.sha256], evidenceRefs: ['ecosystem:' + req.id, ...(id(p.jobId) ? ['job:' + p.jobId] : [])] };
    }
    private async verifiedArtifact(req:FactoryRequest,command:any,p:any){
        const a = await this.call('artifact', req.id);
        if (!record(a) || typeof a.contentBase64 !== 'string' || a.contentBase64.length > 12000000 || !Number.isSafeInteger(a.bytes) || a.bytes < 1 || typeof a.sha256 !== 'string' || !/^[a-f0-9]{64}$/.test(a.sha256))
            throw Error('original artifact unavailable');
        const bytes = Buffer.from(a.contentBase64, 'base64');
        const signme = command.operation === 'signme.draft.create';
        const accepted = signme ? p.result : p.result?.artifacts?.length===1 ? p.result.artifacts[0] : null;
        if (bytes.toString('base64') !== a.contentBase64 || bytes.length !== a.bytes || createHash('sha256').update(bytes).digest('hex') !== a.sha256 || accepted?.sha256 !== a.sha256 || accepted?.bytes !== a.bytes)
            throw Error('original artifact readback mismatch');
        if (this.kind === 'MEDIA') {
            if (a.mediaType !== 'model/gltf-binary' || bytes.length < 20 || bytes.toString('ascii', 0, 4) !== 'glTF' || bytes.readUInt32LE(4) !== 2 || bytes.readUInt32LE(8) !== bytes.length)
                throw Error('native GLB receiving proof missing');
        }
        else if (signme) {
            if (!bytes.equals(Buffer.from(command.input.content,'utf8')) || a.mediaType!=='text/plain; charset=utf-8' || !id(p.result?.documentId) || p.result?.version!==(command.input.expectedVersion===undefined?1:command.input.expectedVersion+1) || command.input.documentId!==undefined&&p.result.documentId!==command.input.documentId || a.documentId!==p.result.documentId || a.version!==p.result.version || a.readbackVerified!==true)
                throw Error('native SignMe exact-content/version proof missing');
        }
        else {
            const expected = await new MarkdownRenderer().render(command.input);
            this.current();
            if (!bytes.equals(Buffer.from(expected.bytes)) || !String(a.mediaType).startsWith('text/markdown'))
                throw Error('native document exact-text proof missing');
        }
        return{a,bytes};
    }
    /** Read-only original-owner text receiving. No preview/execute/approval and
     * no file path, URL or arbitrary receipt field can select content here.
     */
    async readArtifactText(requestId:string,artifactRef:string):Promise<string>{
        this.current();if(this.kind!=='DOCUMENT')throw new StageOutputUnavailable('source factory does not produce accepted native text');
        const prefix='mgr-workflow:'+requestId+':sha256:';
        if(!id(requestId)||typeof artifactRef!=='string'||!artifactRef.startsWith(prefix)||!/^[a-f0-9]{64}$/.test(artifactRef.slice(prefix.length)))throw Error('accepted artifact reference mismatch');
        const p=await this.call('status',requestId);
        if(!record(p)||!record(p.command))throw Error('original accepted text workflow unavailable');
        const req:FactoryRequest={id:requestId,kind:this.kind,tenantId:this.principal.tenantId,workspaceId:this.principal.workspaceId,inputs:{operation:p.command.operation,input:p.command.input},budget:0,acceptanceCriteria:['Original accepted artifact text']};
        const command=this.command(req);this.bound(req,command,p);
        if(p.state!=='succeeded')throw Error('original accepted text workflow is not successful');
        const {a,bytes}=await this.verifiedArtifact(req,command,p);
        if(a.requestId!==requestId||artifactRef!==prefix+a.sha256)throw Error('accepted artifact reference mismatch');
        if(bytes.length>40000)throw new StageOutputUnavailable('accepted artifact exceeds current native text input contract');
        const text=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(bytes);this.current();
        if(!text.trim()||text.length>10000)throw new StageOutputUnavailable('accepted artifact exceeds current native text input contract');
        return text;
    }
    private async progress(req: FactoryRequest, cancel = false, dispatchAllowed = true): Promise<FactoryResult> {
        let command: any;
        this.current();
        try {
            command = this.command(req);
        }
        catch {
            return { requestId: req.id, kind: this.kind, status: 'BLOCKED', artifactRefs: [], evidenceRefs: [], blockers: ['Unsupported input, scope, budget or current workflow authority.'] };
        }
        let p = this.bound(req, command, await this.call('preview', command));
        if (cancel) {
            // Local project cancellation does not claim remote stop. Only an
            // explicitly unadmitted workflow can be cancelled here; accepted
            // native work is observed through its original status until settled.
            if (['preview', 'approved'].includes(p.state))
                p = this.bound(req, command, await this.call('cancel', req.id));
            else if (['pending', 'unknown'].includes(p.state))
                p = this.bound(req, command, await this.call('status', req.id));
        }
        else if (p.state === 'approved' && dispatchAllowed)
            p = this.bound(req, command, await this.call('execute', req.id, p.digest));
        else if (['pending', 'unknown'].includes(p.state))
            p = this.bound(req, command, await this.call('status', req.id));
        return this.finish(req, command, p);
    }
    execute(req: FactoryRequest) { return this.progress(req); }
    // Original ONE state determines whether dispatch has never occurred (approved)
    // or reconciliation is required (pending/unknown). There is no blind re-send.
    reconcile(req: FactoryRequest, options?: {
        dispatchAllowed: boolean;
    }) { return this.progress(req, false, options?.dispatchAllowed ?? true); }
    cancel(req: FactoryRequest) { return this.progress(req, true); }
}
