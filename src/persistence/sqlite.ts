import { DatabaseSync } from 'node:sqlite';
import { readFileSync, mkdirSync } from 'node:fs';
import { dirname, isAbsolute } from 'node:path';
import { randomUUID } from 'node:crypto';
import type { CreationRepository } from './interfaces.js';
import type { CreationRun, StageRun, RunStatus, StageStatus } from '../core/types.js';
import type { FactoryRequest, FactoryResult } from '../factories/contracts.js';
import { sha256Canonical } from '../core/digest.js';
import { canTransitionRun, canTransitionStage } from '../core/state-machines.js';
import { snapshotPlan, checkedFactoryResult, type ObjectivePlan } from '../objectives/orchestrator.js';
export interface ProjectPrincipal {
    tenantId: string;
    workspaceId: string;
    actorId: string;
}
export interface ProjectSnapshot {
    run: CreationRun;
    plan: ObjectivePlan;
    planDigest: string;
    stages: StageRun[];
}
export interface StageCheckpoint {
    revision: number;
    started: boolean;
    producerToken: string | null;
    result: FactoryResult | null;
    requestId: string;
}
const id = (x: unknown): x is string => typeof x === 'string' && /^[a-zA-Z0-9_.:-]{1,128}$/.test(x), runStates = new Set<RunStatus>(['QUEUED', 'PLANNING', 'RUNNING', 'WAITING_APPROVAL', 'WAITING_EVENT', 'WAITING_RESOURCE', 'VERIFYING', 'COMPLETED', 'RETRYING', 'CANCELLING', 'CANCELLED', 'FAILED', 'COMPENSATING', 'COMPENSATED', 'COMPENSATION_FAILED']);
const stageStates = new Set<StageStatus>(['PENDING', 'READY', 'RUNNING', 'WAITING_APPROVAL', 'WAITING_EVENT', 'WAITING_RESOURCE', 'SUCCEEDED', 'FAILED', 'RETRY_SCHEDULED', 'CANCELLED']);
/** Domain project persistence, not a native-job, approval or spending ledger.
 * Principal is host-bound at construction; incoming plans never establish it.
 */
export class SqliteCreationRepository implements CreationRepository {
    private db: DatabaseSync;
    readonly principal: Readonly<ProjectPrincipal>;
    constructor(dbPath: string, principal: ProjectPrincipal) {
        if (!isAbsolute(dbPath) || !principal || ![principal.tenantId, principal.workspaceId, principal.actorId].every(id))
            throw Error('absolute project database and scoped principal required');
        this.principal = Object.freeze({ tenantId: principal.tenantId, workspaceId: principal.workspaceId, actorId: principal.actorId });
        Object.defineProperty(this, 'principal', { writable: false, configurable: false });
        mkdirSync(dirname(dbPath), { recursive: true });
        this.db = new DatabaseSync(dbPath);
        try {
            this.db.exec('PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000; BEGIN IMMEDIATE;');
            this.db.exec("CREATE TABLE IF NOT EXISTS creation_os_migrations(id TEXT PRIMARY KEY,applied_at TEXT NOT NULL)");
            const versions = this.db.prepare("SELECT id FROM creation_os_migrations WHERE id LIKE 'creation-project-runtime-v%'").all();
            if (versions.some(row => row.id !== 'creation-project-runtime-v1'))
                throw Error('newer project schema requires a compatible runtime');
            this.db.exec(readFileSync(new URL('./schema.sql', import.meta.url), 'utf8'));
            this.db.exec(`
   CREATE TABLE IF NOT EXISTS creation_run_owners(run_id TEXT PRIMARY KEY REFERENCES creation_runs(id),actor_id TEXT NOT NULL);
   CREATE TABLE IF NOT EXISTS creation_objectives(run_id TEXT PRIMARY KEY REFERENCES creation_runs(id),request_key TEXT NOT NULL,plan_digest TEXT NOT NULL,plan_json TEXT NOT NULL);
   CREATE TABLE IF NOT EXISTS creation_stage_checkpoints(stage_id TEXT PRIMARY KEY REFERENCES stage_runs(id),request_id TEXT NOT NULL,revision INTEGER NOT NULL DEFAULT 0,started INTEGER NOT NULL DEFAULT 0,producer_token TEXT,result_json TEXT,result_digest TEXT);
   `);
            for (const sql of ['SELECT stage_id,request_id,revision,started,producer_token,result_json,result_digest FROM creation_stage_checkpoints LIMIT 0', 'SELECT run_id,actor_id FROM creation_run_owners LIMIT 0', 'SELECT run_id,request_key,plan_digest,plan_json FROM creation_objectives LIMIT 0', 'SELECT id,schema_version,tenant_id,workspace_id,pipeline_id,pipeline_version,status,trace_id,current_stage_id,created_at FROM creation_runs LIMIT 0', 'SELECT id,creation_run_id,stage_key,attempt,status,input_refs,output_refs FROM stage_runs LIMIT 0'])
                this.db.prepare(sql);
            this.db.prepare('INSERT OR IGNORE INTO creation_os_migrations(id,applied_at) VALUES(?,?)').run('creation-project-runtime-v1', new Date().toISOString());
            this.db.exec('COMMIT');
        }
        catch (error) {
            try {
                this.db.exec('ROLLBACK');
            }
            catch { }
            this.db.close();
            throw error;
        }
    }
    close() {
        if (this.db.isOpen)
            this.db.close();
    }
    private tx<T>(f: () => T): T {
        this.db.exec('BEGIN IMMEDIATE');
        try {
            const value = f();
            this.db.exec('COMMIT');
            return value;
        }
        catch (error) {
            this.db.exec('ROLLBACK');
            throw error;
        }
    }
    private assertScope(x: {
        tenantId: string;
        workspaceId: string;
    }) {
        if (x.tenantId !== this.principal.tenantId || x.workspaceId !== this.principal.workspaceId)
            throw Error('project scope mismatch');
    }
    private runRow(runId: string) { return this.db.prepare('SELECT r.* FROM creation_runs r JOIN creation_run_owners o ON o.run_id=r.id WHERE r.id=? AND r.tenant_id=? AND r.workspace_id=? AND o.actor_id=?').get(runId, this.principal.tenantId, this.principal.workspaceId, this.principal.actorId); }
    private toRun(r: Record<string, unknown>): CreationRun {
        if (!runStates.has(r.status as RunStatus))
            throw Error('invalid saved run status');
        return { id: String(r.id), schemaVersion: Number(r.schema_version), tenantId: String(r.tenant_id), workspaceId: String(r.workspace_id), pipelineId: String(r.pipeline_id), pipelineVersion: String(r.pipeline_version), status: r.status as RunStatus, traceId: String(r.trace_id), createdAt: String(r.created_at), ...(r.current_stage_id ? { currentStageId: String(r.current_stage_id) } : {}) };
    }
    private stageRows(runId: string): StageRun[] {
        if (!this.runRow(runId))
            throw Error('project not found');
        return this.db.prepare('SELECT * FROM stage_runs WHERE creation_run_id=? ORDER BY rowid').all(runId).map(r => {
            if (!stageStates.has(r.status as StageStatus))
                throw Error('invalid saved stage status');
            return { id: String(r.id), creationRunId: String(r.creation_run_id), stageKey: String(r.stage_key), attempt: Number(r.attempt), status: r.status as StageStatus, inputRefs: JSON.parse(String(r.input_refs)), outputRefs: JSON.parse(String(r.output_refs)) };
        });
    }
    private insertRun(x: CreationRun) {
        this.assertScope(x);
        if (!id(x.id) || !id(x.pipelineId) || !id(x.traceId) || x.schemaVersion !== 1 || !runStates.has(x.status) || !Number.isFinite(Date.parse(x.createdAt)))
            throw Error('invalid creation run');
        this.db.prepare('INSERT INTO creation_runs VALUES(?,?,?,?,?,?,?,?,?,?)').run(x.id, x.schemaVersion, x.tenantId, x.workspaceId, x.pipelineId, x.pipelineVersion, x.status, x.traceId, x.currentStageId ?? null, x.createdAt);
        this.db.prepare('INSERT INTO creation_run_owners VALUES(?,?)').run(x.id, this.principal.actorId);
    }
    async saveRun(x: CreationRun) {
        this.assertScope(x);
        this.tx(() => {
            const old = this.runRow(x.id);
            if (!old) {
                if (this.db.prepare('SELECT 1 FROM creation_runs WHERE id=?').get(x.id))
                    throw Error('project not available');
                this.insertRun(x);
                return;
            }
            if (this.db.prepare('SELECT 1 FROM creation_objectives WHERE run_id=?').get(x.id))
                throw Error('managed project requires project commands');
            const before = this.toRun(old);
            const { status: _oldStatus, currentStageId: _oldStage, ...original } = before, { status: _newStatus, currentStageId: _newStage, ...next } = x;
            if (sha256Canonical(original) !== sha256Canonical(next))
                throw Error('immutable run identity changed');
            if (before.status !== x.status && !canTransitionRun(before.status, x.status))
                throw Error('invalid run transition');
            this.db.prepare('UPDATE creation_runs SET status=?,current_stage_id=? WHERE id=?').run(x.status, x.currentStageId ?? null, x.id);
        });
    }
    async getRun(runId: string) { const r = this.runRow(runId); return r ? this.toRun(r) : undefined; }
    async stages(runId: string) { return this.stageRows(runId); }
    async saveStage(x: StageRun) {
        this.tx(() => {
            if (!this.runRow(x.creationRunId))
                throw Error('project not found');
            if (this.db.prepare('SELECT 1 FROM creation_objectives WHERE run_id=?').get(x.creationRunId))
                throw Error('managed stage requires project commands');
            if (!id(x.id) || !id(x.stageKey) || !stageStates.has(x.status) || !Number.isSafeInteger(x.attempt) || x.attempt < 0 || ![x.inputRefs, x.outputRefs].every(a => Array.isArray(a) && Array.from(a).every(y => typeof y === 'string')))
                throw Error('invalid stage');
            const old = this.db.prepare('SELECT * FROM stage_runs WHERE id=?').get(x.id);
            if (old) {
                if (old.creation_run_id !== x.creationRunId || old.stage_key !== x.stageKey || old.input_refs !== JSON.stringify(x.inputRefs) || x.attempt < Number(old.attempt))
                    throw Error('immutable stage binding changed');
                if (old.status !== x.status && !canTransitionStage(old.status as StageStatus, x.status))
                    throw Error('invalid stage transition');
                this.db.prepare('UPDATE stage_runs SET attempt=?,status=?,output_refs=? WHERE id=?').run(x.attempt, x.status, JSON.stringify(x.outputRefs), x.id);
            }
            else
                this.db.prepare('INSERT INTO stage_runs VALUES(?,?,?,?,?,?,?)').run(x.id, x.creationRunId, x.stageKey, x.attempt, x.status, JSON.stringify(x.inputRefs), JSON.stringify(x.outputRefs));
        });
    }
    requestId(runId: string, plan: ObjectivePlan, stageKey: string) { return 'creation-workstream-' + sha256Canonical({ tenantId: plan.tenantId, workspaceId: plan.workspaceId, objectiveId: plan.id, workstreamId: stageKey, executionScope: runId }); }
    openObjective(key: string, input: ObjectivePlan): ProjectSnapshot {
        if (typeof key !== 'string' || !key.trim() || key.length > 512)
            throw Error('invalid objective request key');
        const plan = snapshotPlan(input);
        this.assertScope(plan);
        const runId = 'creation-project-' + sha256Canonical({ ...this.principal, key }), digest = sha256Canonical(plan);
        return this.tx(() => {
            const old = this.db.prepare('SELECT * FROM creation_objectives WHERE run_id=?').get(runId);
            if (old) {
                if (old.request_key !== key || old.plan_digest !== digest)
                    throw Error('objective idempotency conflict');
                return this.readObjective(runId);
            }
            const run: CreationRun = { id: runId, schemaVersion: 1, tenantId: plan.tenantId, workspaceId: plan.workspaceId, pipelineId: 'objective', pipelineVersion: '1', status: 'QUEUED', traceId: runId, createdAt: new Date().toISOString() };
            this.insertRun(run);
            this.db.prepare('INSERT INTO creation_objectives VALUES(?,?,?,?)').run(runId, key, digest, JSON.stringify(plan));
            for (const w of plan.workstreams) {
                const stageId = 'creation-stage-' + sha256Canonical([runId, w.id]);
                this.db.prepare('INSERT INTO stage_runs VALUES(?,?,?,?,?,?,?)').run(stageId, runId, w.id, 0, w.dependsOn.length ? 'PENDING' : 'READY', JSON.stringify([digest]), '[]');
                this.db.prepare('INSERT INTO creation_stage_checkpoints(stage_id,request_id) VALUES(?,?)').run(stageId, this.requestId(runId, plan, w.id));
            }
            this.event(runId, 'created');
            return this.readObjective(runId);
        });
    }
    readObjective(runId: string): ProjectSnapshot {
        const row = this.runRow(runId), o = this.db.prepare('SELECT * FROM creation_objectives WHERE run_id=?').get(runId);
        if (!row || !o)
            throw Error('project not found');
        if (row.schema_version !== 1 || row.pipeline_id !== 'objective' || row.pipeline_version !== '1' || row.trace_id !== runId || !Number.isFinite(Date.parse(String(row.created_at))))
            throw Error('saved project version mismatch');
        const plan = snapshotPlan(JSON.parse(String(o.plan_json)));
        this.assertScope(plan);
        if (sha256Canonical(plan) !== o.plan_digest)
            throw Error('saved objective digest mismatch');
        const stages = this.stageRows(runId);
        if (stages.length !== plan.workstreams.length || plan.workstreams.some(w => !stages.some(s => s.stageKey === w.id && s.id === 'creation-stage-' + sha256Canonical([runId, w.id]) && JSON.stringify(s.inputRefs) === JSON.stringify([o.plan_digest]))))
            throw Error('saved objective stage binding mismatch');
        const run = this.toRun(row);
        for (const s of stages) {
            this.decodeCheckpoint(runId, plan, s, this.db.prepare('SELECT * FROM creation_stage_checkpoints WHERE stage_id=?').get(s.id));
            const w = plan.workstreams.find(w => w.id === s.stageKey)!;
            if (s.status === 'SUCCEEDED' && !w.dependsOn.every(d => stages.some(x => x.stageKey === d && x.status === 'SUCCEEDED')))
                throw Error('saved dependency acceptance mismatch');
        }
        if (run.status === 'COMPLETED' && !stages.every(s => s.status === 'SUCCEEDED'))
            throw Error('saved completed project is inconsistent');
        return { run, plan, planDigest: String(o.plan_digest), stages };
    }
    private decodeCheckpoint(runId: string, plan: ObjectivePlan, s: StageRun, c: Record<string, unknown> | undefined): StageCheckpoint {
        if (!c || c.request_id !== this.requestId(runId, plan, s.stageKey) || !Number.isSafeInteger(c.revision) || Number(c.revision) < 0 || ![0, 1].includes(Number(c.started)))
            throw Error('saved stage checkpoint mismatch');
        const result = c.result_json === null ? null : JSON.parse(String(c.result_json));
        if (!c.started && (result !== null || c.producer_token !== null || Number(c.revision) !== 0 || !['READY', 'PENDING', 'CANCELLED'].includes(s.status)))
            throw Error('saved unstarted checkpoint mismatch');
        if (c.producer_token !== null && (!c.started || s.status !== 'RUNNING'))
            throw Error('saved producer binding mismatch');
        if (s.status === 'SUCCEEDED' && result?.status !== 'SUCCEEDED' || s.status === 'FAILED' && !result || s.status === 'RUNNING' && !c.started)
            throw Error('saved terminal checkpoint mismatch');
        if (result) {
            const w = plan.workstreams.find(w => w.id === s.stageKey)!;
            const req = { id: String(c.request_id), kind: w.factory, tenantId: plan.tenantId, workspaceId: plan.workspaceId, inputs: w.inputs, acceptanceCriteria: w.acceptanceCriteria, budget: w.budget };
            if (sha256Canonical(result) !== c.result_digest || sha256Canonical(checkedFactoryResult(req, result)) !== sha256Canonical(result))
                throw Error('saved stage result binding mismatch');
            if (s.status === 'WAITING_APPROVAL' && result.checkpoint?.state !== 'WAITING_APPROVAL' || s.status === 'WAITING_RESOURCE' && !['WAITING_RESOURCE', 'UNKNOWN'].includes(result.checkpoint?.state) || s.status === 'FAILED' && result.checkpoint)
                throw Error('saved stage progress mismatch');
            if (s.status === 'SUCCEEDED' && JSON.stringify(s.outputRefs) !== JSON.stringify(result.artifactRefs))
                throw Error('saved output reference mismatch');
        }
        else if (c.result_digest !== null)
            throw Error('saved stage result digest mismatch');
        return { revision: Number(c.revision), started: Boolean(c.started), producerToken: c.producer_token === null ? null : String(c.producer_token), result, requestId: String(c.request_id) };
    }
    checkpoint(runId: string, stageKey: string): StageCheckpoint {
        const p = this.readObjective(runId), s = p.stages.find(s => s.stageKey === stageKey);
        if (!s)
            throw Error('project stage not found');
        return this.decodeCheckpoint(runId, p.plan, s, this.db.prepare('SELECT * FROM creation_stage_checkpoints WHERE stage_id=?').get(s.id));
    }
    start(runId: string) {
        this.tx(() => {
            const p = this.readObjective(runId);
            if (['COMPLETED', 'FAILED', 'CANCELLED', 'CANCELLING'].includes(p.run.status))
                return;
            if (p.run.status === 'QUEUED')
                this.status(runId, 'PLANNING');
            this.status(runId, 'RUNNING');
        });
    }
    claim(runId: string, stageKey: string) {
        return this.tx(() => {
            const p = this.readObjective(runId), s = p.stages.find(s => s.stageKey === stageKey), c = this.checkpoint(runId, stageKey);
            if (!s || p.run.status !== 'RUNNING')
                throw Error('project not running');
            if (c.started)
                return { ...c, claimed: false };
            if (!['READY', 'PENDING'].includes(s.status))
                throw Error('stage cannot be dispatched');
            const w = p.plan.workstreams.find(w => w.id === stageKey)!;
            if (!w.dependsOn.every(d => p.stages.some(s => s.stageKey === d && s.status === 'SUCCEEDED')))
                throw Error('dependency not accepted');
            const token = randomUUID();
            this.db.prepare("UPDATE stage_runs SET status='RUNNING',attempt=attempt+1 WHERE id=?").run(s.id);
            this.db.prepare('UPDATE creation_stage_checkpoints SET started=1,producer_token=?,revision=revision+1 WHERE stage_id=? AND revision=?').run(token, s.id, c.revision);
            this.event(runId, 'stage-started', stageKey);
            return { ...this.checkpoint(runId, stageKey), claimed: true };
        });
    }
    settle(runId: string, stageKey: string, expected: StageCheckpoint, result: FactoryResult) {
        return this.tx(() => {
            const p = this.readObjective(runId), s = p.stages.find(s => s.stageKey === stageKey), c = this.checkpoint(runId, stageKey);
            if (!s || c.revision !== expected.revision || c.producerToken !== expected.producerToken)
                throw Error('stale project stage producer');
            if (!c.started)
                throw Error('project stage was never claimed');
            const w = p.plan.workstreams.find(w => w.id === stageKey)!;
            const req = { id: c.requestId, kind: w.factory, tenantId: p.plan.tenantId, workspaceId: p.plan.workspaceId, inputs: w.inputs, acceptanceCriteria: w.acceptanceCriteria, budget: w.budget };
            if (sha256Canonical(checkedFactoryResult(req, result)) !== sha256Canonical(result))
                throw Error('project result binding mismatch');
            if (['SUCCEEDED', 'FAILED', 'CANCELLED'].includes(s.status)) {
                if (JSON.stringify(c.result) !== JSON.stringify(result))
                    throw Error('terminal project stage is immutable');
                return;
            }
            const status: StageStatus = result.status === 'SUCCEEDED' ? 'SUCCEEDED' : result.checkpoint?.state === 'WAITING_APPROVAL' ? 'WAITING_APPROVAL' : result.checkpoint ? 'WAITING_RESOURCE' : 'FAILED';
            if (s.status !== 'RUNNING') {
                if (!canTransitionStage(s.status, 'RUNNING'))
                    throw Error('invalid stage recovery transition');
                this.db.prepare("UPDATE stage_runs SET status='RUNNING' WHERE id=?").run(s.id);
            }
            this.db.prepare('UPDATE stage_runs SET status=?,output_refs=? WHERE id=?').run(status, JSON.stringify(result.artifactRefs), s.id);
            this.db.prepare('UPDATE creation_stage_checkpoints SET result_json=?,result_digest=?,producer_token=NULL,revision=revision+1 WHERE stage_id=?').run(JSON.stringify(result), sha256Canonical(result), s.id);
            this.event(runId, 'stage-' + status.toLowerCase(), stageKey);
        });
    }
    haltUnstarted(runId: string) {
        this.tx(() => {
            const p = this.readObjective(runId);
            for (const s of p.stages) {
                const c = this.checkpoint(runId, s.stageKey);
                if (!c.started && s.status !== 'CANCELLED') {
                    this.db.prepare("UPDATE stage_runs SET status='CANCELLED' WHERE id=?").run(s.id);
                    this.event(runId, 'stage-not-dispatched', s.stageKey);
                }
            }
        });
    }
    finish(runId: string) {
        this.tx(() => {
            const p = this.readObjective(runId);
            if (['COMPLETED', 'FAILED', 'CANCELLED'].includes(p.run.status))
                return;
            const terminal = p.stages.every(s => ['SUCCEEDED', 'FAILED', 'CANCELLED'].includes(s.status));
            if (p.run.status === 'CANCELLING') {
                if (terminal)
                    this.status(runId, 'CANCELLED');
                return;
            }
            if (p.stages.some(s => s.status === 'FAILED')) {
                for (const s of p.stages) {
                    const c = this.checkpoint(runId, s.stageKey);
                    if (!c.started)
                        this.db.prepare("UPDATE stage_runs SET status='CANCELLED' WHERE id=?").run(s.id);
                }
                const active = p.stages.some(s => this.checkpoint(runId, s.stageKey).started && !['SUCCEEDED', 'FAILED', 'CANCELLED'].includes(s.status));
                this.status(runId, active ? 'WAITING_RESOURCE' : 'FAILED');
            }
            else if (p.stages.every(s => s.status === 'SUCCEEDED')) {
                this.status(runId, 'VERIFYING');
                this.status(runId, 'COMPLETED');
            }
            else
                this.status(runId, p.stages.some(s => s.status === 'WAITING_APPROVAL') ? 'WAITING_APPROVAL' : 'WAITING_RESOURCE');
        });
        return this.readObjective(runId);
    }
    requestCancel(runId: string) {
        this.tx(() => {
            const p = this.readObjective(runId);
            if (['COMPLETED', 'FAILED', 'CANCELLED'].includes(p.run.status))
                return;
            if (p.run.status === 'QUEUED') {
                this.status(runId, 'CANCELLED');
            }
            else if (p.run.status !== 'CANCELLING')
                this.status(runId, 'CANCELLING');
            for (const s of p.stages) {
                const c = this.checkpoint(runId, s.stageKey);
                if (!c.started)
                    this.db.prepare("UPDATE stage_runs SET status='CANCELLED' WHERE id=?").run(s.id);
            }
            this.event(runId, 'cancellation-requested');
        });
        return this.finish(runId);
    }
    private status(runId: string, next: RunStatus) {
        const r = this.runRow(runId);
        if (!r)
            throw Error('project not found');
        if (r.status === next)
            return;
        if (!canTransitionRun(r.status as RunStatus, next))
            throw Error('invalid project status transition');
        this.db.prepare('UPDATE creation_runs SET status=? WHERE id=?').run(next, runId);
        this.event(runId, 'status-' + next.toLowerCase());
    }
    private event(runId: string, type: string, stageKey?: string) { const at = new Date().toISOString(), eventId = randomUUID(), body = { specversion: '1.0', id: eventId, source: 'mgr.creation.objectives', type: 'creation.project.' + type, time: at, schemaVersion: 1, tenantId: this.principal.tenantId, workspaceId: this.principal.workspaceId, traceId: runId, correlationId: runId, data: { runId, actorId: this.principal.actorId, ...(stageKey ? { stageKey } : {}) } }; this.db.prepare('INSERT INTO events(id,source,type,tenant_id,workspace_id,trace_id,idempotency_key,payload,created_at) VALUES(?,?,?,?,?,?,?,?,?)').run(eventId, body.source, body.type, body.tenantId, body.workspaceId, runId, eventId, JSON.stringify(body), at); }
}
