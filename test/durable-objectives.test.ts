import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { SqliteCreationRepository, type ProjectPrincipal } from '../src/persistence/sqlite.js';
import { DurableObjectiveService } from '../src/api/durable-objectives.js';
import { FactoryRegistry } from '../src/factories/registry.js';
import type { RecoverableFactory, FactoryRequest, FactoryResult } from '../src/factories/contracts.js';
import type { ObjectivePlan } from '../src/objectives/orchestrator.js';
const principal = (): ProjectPrincipal => ({ tenantId: 'tenant', workspaceId: 'workspace', actorId: 'owner' }), plan = (): ObjectivePlan => ({ id: 'objective', tenantId: 'tenant', workspaceId: 'workspace', outcomes: ['exact project'], maxBudget: 0, workstreams: [{ id: 'first', factory: 'RESEARCH', dependsOn: [], inputs: { text: 'first' }, acceptanceCriteria: ['accepted result'], budget: 0 }, { id: 'second', factory: 'DOCUMENT', dependsOn: ['first'], inputs: { text: 'second' }, acceptanceCriteria: ['accepted result'], budget: 0 }] }), ok = (q: FactoryRequest): FactoryResult => ({ requestId: q.id, kind: q.kind, status: 'SUCCEEDED', artifactRefs: ['native-' + q.id], evidenceRefs: ['receipt-' + q.id] }), wait = (q: FactoryRequest, state: 'WAITING_APPROVAL' | 'UNKNOWN' = 'WAITING_APPROVAL'): FactoryResult => ({ requestId: q.id, kind: q.kind, status: 'BLOCKED', artifactRefs: [], evidenceRefs: [], blockers: ['original operation waiting'], checkpoint: { state, operationRef: q.id } });
function fixture(t: any) {
    const root = mkdtempSync(join(tmpdir(), 'creation-durable-')), path = join(root, 'creation.sqlite'), repos: SqliteCreationRepository[] = [];
    t.after(() => {
        for (const r of repos)
            r.close();
        rmSync(root, { recursive: true, force: true });
    });
    return { path, open(p = principal()) { const r = new SqliteCreationRepository(path, p); repos.push(r); return r; } };
}
function service(repo: SqliteCreationRepository, first: RecoverableFactory, second?: RecoverableFactory) { const registry = new FactoryRegistry(); registry.register(first); registry.register(second ?? { kind: 'DOCUMENT', execute: async (q) => ok(q), reconcile: async (q) => ok(q) } as RecoverableFactory); return new DurableObjectiveService(repo, registry); }
test('actual SQLite plan, stages, output references and events survive close/reopen', async (t) => {
    const f = fixture(t), r = f.open(), s = service(r, { kind: 'RESEARCH', execute: async (q) => ok(q), reconcile: async () => { throw Error('must use accepted checkpoint'); } });
    const result = await s.executeObjective('same', plan()) as any;
    assert.equal(result.run.status, 'COMPLETED');
    r.close();
    const repo = f.open(), reopened = service(repo, { kind: 'RESEARCH', execute: async () => { throw Error('duplicate'); }, reconcile: async () => { throw Error('duplicate'); } });
    assert.deepEqual(await reopened.resume(result.run.id), result);
    const db = new DatabaseSync(f.path, { readOnly: true });
    try {
        assert.ok(Number(db.prepare('SELECT count(*) n FROM events').get()!.n) > 4);
    }
    finally {
        db.close();
    }
});
test('changed same-key plan is denied before a factory call', async (t) => { const f = fixture(t), r = f.open(); r.openObjective('same', plan()); const p = plan(); p.workstreams[0].inputs = { text: 'changed' }; assert.throws(() => r.openObjective('same', p), /conflict/); });
for (const field of ['tenantId', 'workspaceId', 'actorId'] as const)
    test('project data and same keys remain isolated by ' + field, async (t) => {
        const f = fixture(t), r = f.open(), old = r.openObjective('same', plan()), other = f.open({ ...principal(), [field]: 'other' });
        await assert.rejects(async () => other.readObjective(old.run.id), /not found/);
        const p = plan();
        if (field !== 'actorId')
            p[field] = 'other';
        assert.notEqual(other.openObjective('same', p).run.id, old.run.id);
    });
test('an incoming plan cannot select another tenant or workspace', t => { const f = fixture(t), r = f.open(); assert.throws(() => r.openObjective('key', { ...plan(), tenantId: 'foreign' }), /scope/); });
test('WAITING_APPROVAL resumes by reconciling the original stage after database reopen', async (t) => { const f = fixture(t); let executes = 0, reconciles = 0, approved = false; const factory: RecoverableFactory = { kind: 'RESEARCH', execute: async (q) => { executes++; return wait(q); }, reconcile: async (q) => { reconciles++; return approved ? ok(q) : wait(q); } }; const r = f.open(), a = await service(r, factory).executeObjective('same', plan()) as any; assert.equal(a.run.status, 'WAITING_APPROVAL'); r.close(); approved = true; const b = await service(f.open(), factory).resume(a.run.id) as any; assert.equal(b.run.status, 'COMPLETED'); assert.equal(executes, 1); assert.equal(reconciles, 1); });
test('a rejection after an effect remains unknown; restart cannot repeat execute', async (t) => { const f = fixture(t); let effects = 0, reconciles = 0; const factory: RecoverableFactory = { kind: 'RESEARCH', execute: async () => { effects++; throw Error('lost reply'); }, reconcile: async (q) => { reconciles++; return ok(q); } }; const r = f.open(), a = await service(r, factory).executeObjective('same', plan()) as any; assert.equal(a.run.status, 'WAITING_RESOURCE'); r.close(); const b = await service(f.open(), factory).resume(a.run.id) as any; assert.equal(b.run.status, 'COMPLETED'); assert.equal(effects, 1); assert.equal(reconciles, 1); });
test('unsettled RUNNING claim is reconciled after host loss, never reset to READY', async (t) => { const f = fixture(t), r = f.open(), p = r.openObjective('same', plan()); r.start(p.run.id); r.claim(p.run.id, 'first'); r.close(); let executes = 0, reconciles = 0; const x = await service(f.open(), { kind: 'RESEARCH', execute: async (q) => { executes++; return ok(q); }, reconcile: async (q) => { reconciles++; return ok(q); } }).resume(p.run.id) as any; assert.equal(x.run.status, 'COMPLETED'); assert.equal(executes, 0); assert.equal(reconciles, 1); });
test('competing database handles cannot claim a second original execution', t => { const f = fixture(t), a = f.open(), b = f.open(), p = a.openObjective('same', plan()); a.start(p.run.id); assert.equal(a.claim(p.run.id, 'first').claimed, true); assert.equal(b.claim(p.run.id, 'first').claimed, false); });
test('stale original producer cannot overwrite a newer reconciled result', t => { const f = fixture(t), a = f.open(), b = f.open(), p = a.openObjective('same', plan()); a.start(p.run.id); const original = a.claim(p.run.id, 'first'), fresh = b.checkpoint(p.run.id, 'first'), q = { id: fresh.requestId, kind: 'RESEARCH' as const, tenantId: 'tenant', workspaceId: 'workspace', inputs: {}, acceptanceCriteria: [] }; b.settle(p.run.id, 'first', fresh, ok(q)); assert.throws(() => a.settle(p.run.id, 'first', original, wait(q)), /stale/); assert.equal(a.checkpoint(p.run.id, 'first').result!.status, 'SUCCEEDED'); });
test('saved plans and accepted results reject changed database contents', async (t) => {
    const f = fixture(t), r = f.open(), s = service(r, { kind: 'RESEARCH', execute: async (q) => ok(q), reconcile: async (q) => ok(q) }), p = await s.executeObjective('same', plan()) as any;
    const db = new DatabaseSync(f.path);
    try {
        db.prepare("UPDATE creation_stage_checkpoints SET result_json=replace(result_json,'native-','changed-')").run();
        assert.throws(() => r.checkpoint(p.run.id, 'first'), /binding/);
        db.prepare("UPDATE creation_objectives SET plan_json=replace(plan_json,'exact project','changed project')").run();
        assert.throws(() => r.readObjective(p.run.id), /digest/);
    }
    finally {
        db.close();
    }
});
test('cancellation before dispatch persists without calling any factory', async (t) => { const f = fixture(t), r = f.open(), p = r.openObjective('same', plan()); let calls = 0; const s = service(r, { kind: 'RESEARCH', execute: async (q) => { calls++; return ok(q); }, reconcile: async (q) => { calls++; return ok(q); } }); const c = await s.cancel(p.run.id) as any; assert.equal(c.run.status, 'CANCELLED'); assert.ok(c.stages.every((x: any) => x.status === 'CANCELLED')); assert.equal(calls, 0); });
test('cancellation of uncertain native work stays CANCELLING until original outcome is known', async (t) => { const f = fixture(t), r = f.open(); let known = false, executes = 0; const factory: RecoverableFactory = { kind: 'RESEARCH', execute: async (q) => { executes++; return wait(q, 'UNKNOWN'); }, reconcile: async (q) => known ? ok(q) : wait(q, 'UNKNOWN') }; const s = service(r, factory), p = await s.executeObjective('same', plan()) as any, c = await s.cancel(p.run.id) as any; assert.equal(c.run.status, 'CANCELLING'); assert.equal(c.stages[1].status, 'CANCELLED'); known = true; const done = await s.resume(p.run.id) as any; assert.equal(done.run.status, 'CANCELLED'); assert.equal(done.stages[0].status, 'SUCCEEDED'); assert.equal(executes, 1); });
test('a provider without original reconciliation is refused before starting a stage', async (t) => { const f = fixture(t), r = f.open(); let calls = 0; const registry = new FactoryRegistry(); registry.register({ kind: 'RESEARCH', execute: async (q) => { calls++; return ok(q); } }); registry.register({ kind: 'DOCUMENT', execute: async (q) => ok(q) }); await assert.rejects(new DurableObjectiveService(r, registry).executeObjective('same', plan()), /reconciliation/); assert.equal(calls, 0); });
test('failed factory blocks dependencies and remains terminal after reopen', async (t) => { const f = fixture(t), r = f.open(); let downstream = 0; const failed: RecoverableFactory = { kind: 'RESEARCH', execute: async (q) => ({ ...ok(q), status: 'FAILED', blockers: [] }), reconcile: async (q) => ok(q) }, doc: RecoverableFactory = { kind: 'DOCUMENT', execute: async (q) => { downstream++; return ok(q); }, reconcile: async (q) => ok(q) }; const p = await service(r, failed, doc).executeObjective('same', plan()) as any; assert.equal(p.run.status, 'FAILED'); r.close(); assert.equal((await service(f.open(), failed, doc).resume(p.run.id) as any).run.status, 'FAILED'); assert.equal(downstream, 0); });
test('legacy creation records are not silently assigned to the current actor', async (t) => {
    const f = fixture(t), r = f.open(), db = new DatabaseSync(f.path);
    try {
        db.prepare('INSERT INTO creation_runs VALUES(?,?,?,?,?,?,?,?,?,?)').run('legacy', 1, 'tenant', 'workspace', 'objective', '1', 'QUEUED', 'trace', null, new Date().toISOString());
        assert.equal(await r.getRun('legacy'), undefined);
    }
    finally {
        db.close();
    }
});
test('existing CreationRepository contract and Cineforge-style transitions persist', async (t) => { const f = fixture(t), r = f.open(), run = { id: 'ordinary-run', schemaVersion: 1, tenantId: 'tenant', workspaceId: 'workspace', pipelineId: 'cine', pipelineVersion: '1', status: 'QUEUED' as const, traceId: 'trace', createdAt: new Date().toISOString() }; await r.saveRun(run); await r.saveRun({ ...run, status: 'PLANNING' }); await r.saveStage({ id: 'stage', creationRunId: run.id, stageKey: 'TRIGGER', attempt: 0, status: 'READY', inputRefs: [], outputRefs: [] }); await r.saveStage({ id: 'stage', creationRunId: run.id, stageKey: 'TRIGGER', attempt: 0, status: 'RUNNING', inputRefs: [], outputRefs: [] }); assert.equal((await r.getRun(run.id))!.status, 'PLANNING'); assert.equal((await r.stages(run.id))[0].status, 'RUNNING'); await assert.rejects(r.saveRun({ ...run, tenantId: 'foreign' }), /scope/); });
test('optional undefined metadata normalizes to the same durable JSON plan', t => { const f = fixture(t), r = f.open(), p = { ...plan(), maxBudget: undefined }; const a = r.openObjective('same', p), b = r.openObjective('same', JSON.parse(JSON.stringify(p))); assert.deepEqual(a, b); });
test('managed stage/run records cannot bypass checkpoint commands', async (t) => { const f = fixture(t), r = f.open(), p = r.openObjective('same', plan()); await assert.rejects(r.saveRun({ ...p.run, status: 'PLANNING' }), /project commands/); await assert.rejects(r.saveStage({ ...p.stages[0], status: 'RUNNING' }), /project commands/); });
test('a result cannot settle before the original claim', t => { const f = fixture(t), r = f.open(), p = r.openObjective('same', plan()), c = r.checkpoint(p.run.id, 'first'); assert.throws(() => r.settle(p.run.id, 'first', c, ok({ id: c.requestId, kind: 'RESEARCH', tenantId: 'tenant', workspaceId: 'workspace', inputs: {}, acceptanceCriteria: [] })), /never claimed/); });
test('malformed existing project schema rolls back partial new tables', t => {
    const f = fixture(t), db = new DatabaseSync(f.path);
    db.exec('CREATE TABLE creation_run_owners(legacy_marker TEXT); INSERT INTO creation_run_owners VALUES(\'preserved\')');
    db.close();
    assert.throws(() => f.open());
    const check = new DatabaseSync(f.path);
    try {
        assert.deepEqual(check.prepare("SELECT name FROM sqlite_master WHERE type='table'").all().map(x => x.name), ['creation_run_owners']);
        assert.equal(check.prepare('SELECT legacy_marker FROM creation_run_owners').get()!.legacy_marker, 'preserved');
    }
    finally {
        check.close();
    }
});
test('unconfirmed provider result identity remains recoverable instead of becoming a false terminal failure', async (t) => { const f = fixture(t), r = f.open(); let executes = 0; const factory: RecoverableFactory = { kind: 'RESEARCH', execute: async (q) => { executes++; return { ...ok(q), requestId: 'unconfirmed-other-job' }; }, reconcile: async (q) => ok(q) }, s = service(r, factory), a = await s.executeObjective('same', plan()) as any; assert.equal(a.run.status, 'WAITING_RESOURCE'); assert.equal((await s.resume(a.run.id) as any).run.status, 'COMPLETED'); assert.equal(executes, 1); });
test('altered completed project status cannot skip unfinished stage evidence', t => {
    const f = fixture(t), r = f.open(), p = r.openObjective('same', plan()), db = new DatabaseSync(f.path);
    try {
        db.prepare("UPDATE creation_runs SET status='COMPLETED'").run();
        assert.throws(() => r.readObjective(p.run.id), /inconsistent/);
    }
    finally {
        db.close();
    }
});
test('project service close drains original work, then denies new operations', async (t) => { const f = fixture(t), r = f.open(); let downstream = 0, enter!: () => void, release!: () => void; const entered = new Promise<void>(x => enter = x), gate = new Promise<void>(x => release = x), s = service(r, { kind: 'RESEARCH', execute: async (q) => { enter(); await gate; return ok(q); }, reconcile: async (q) => ok(q) }, { kind: 'DOCUMENT', execute: async (q) => { downstream++; return ok(q); }, reconcile: async (q) => ok(q) }), pending = s.executeObjective('same', plan()); await entered; let closed = false; const close = s.close().then(() => { closed = true; }); await new Promise(x => setImmediate(x)); assert.equal(closed, false); release(); const saved = await pending as any; await close; assert.equal(saved.run.status, 'WAITING_RESOURCE'); assert.equal(downstream, 0); assert.equal(closed, true); await assert.rejects(s.executeObjective('other', plan()), /closed/); });
import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';
test('unclean child-process death preserves WAL claim for original-stage reconciliation', { timeout: 30000 }, async (t) => {
    const f = fixture(t), entry = pathToFileURL(join(import.meta.dirname, '../src/persistence/sqlite.ts')).href, code = `import {SqliteCreationRepository} from ${JSON.stringify(entry)};const r=new SqliteCreationRepository(${JSON.stringify(f.path)},${JSON.stringify(principal())});const p=r.openObjective('same',${JSON.stringify(plan())});r.start(p.run.id);r.claim(p.run.id,'first');process.stdout.write(JSON.stringify({runId:p.run.id}));setInterval(()=>{},1000);`;
    const child = spawn(process.execPath, ['--import', 'tsx', '--input-type=module', '-e', code], { cwd: join(import.meta.dirname, '..'), stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
    let output = '', errors = '';
    child.stderr.on('data', x => { errors += x.toString(); });
    const ended = new Promise<void>(r => child.once('close', () => r()));
    let live = true;
    child.once('close', () => { live = false; });
    t.after(async () => {
        if (live)
            child.kill();
        await ended;
    });
    const runId = await new Promise<string>((yes, no) => {
        child.stdout.on('data', x => {
            output += x.toString();
            if (output.length > 2048)
                return no(Error('fixture ready frame exceeds bound'));
            try {
                yes(JSON.parse(output).runId);
            }
            catch { /* Wait for the rest of the single JSON frame. */ }
        });
        child.once('error', no);
        child.once('close', () => no(Error('fixture exited before ready: ' + errors)));
    });
    child.kill();
    await ended;
    let executeCalls = 0, reconciles = 0;
    const recovered = await service(f.open(), { kind: 'RESEARCH', execute: async (q) => { executeCalls++; return ok(q); }, reconcile: async (q) => { reconciles++; return ok(q); } }).resume(runId) as any;
    assert.equal(recovered.run.status, 'COMPLETED');
    assert.equal(executeCalls, 0);
    assert.equal(reconciles, 1);
});
test('a failed sibling cannot abandon an accepted unknown operation or dispatch more work', async (t) => { const f = fixture(t), r = f.open(); let executeCalls = 0, known = false, readOnly = false; const first: RecoverableFactory = { kind: 'RESEARCH', execute: async (q) => { executeCalls++; return wait(q, 'UNKNOWN'); }, reconcile: async (q, options) => { readOnly = options?.dispatchAllowed === false; return known ? ok(q) : wait(q, 'UNKNOWN'); } }, failed: RecoverableFactory = { kind: 'DOCUMENT', execute: async (q) => ({ ...ok(q), status: 'FAILED' }), reconcile: async (q) => ({ ...ok(q), status: 'FAILED' }) }, p = plan(); p.workstreams[1].dependsOn = []; p.workstreams.push({ ...p.workstreams[0], id: 'never-start' }); const s = service(r, first, failed), waiting = await s.executeObjective('same', p) as any; assert.equal(waiting.run.status, 'WAITING_RESOURCE'); assert.equal(waiting.stages[2].status, 'CANCELLED'); assert.equal(executeCalls, 1); known = true; const settled = await s.resume(waiting.run.id) as any; assert.equal(settled.run.status, 'FAILED'); assert.equal(settled.stages[0].status, 'SUCCEEDED'); assert.equal(readOnly, true); assert.equal(executeCalls, 1); });
test('the existing migration ledger records one atomic project schema version and preserves its timestamp', t => { const f = fixture(t), r = f.open(), db = new DatabaseSync(f.path); const before = db.prepare("SELECT * FROM creation_os_migrations WHERE id='creation-project-runtime-v1'").get(); r.close(); const reopened = f.open(); assert.deepEqual(db.prepare("SELECT * FROM creation_os_migrations WHERE id='creation-project-runtime-v1'").get(), before); reopened.close(); db.close(); });
test('an older runtime refuses a newer reserved project schema without changing existing records', t => { const f = fixture(t), r = f.open(), p = r.openObjective('same', plan()); r.close(); const db = new DatabaseSync(f.path); try {
    db.prepare('INSERT INTO creation_os_migrations VALUES(?,?)').run('creation-project-runtime-v2', new Date().toISOString());
    const before = db.prepare('SELECT * FROM creation_objectives').all();
    assert.throws(() => f.open(), /newer project schema/);
    assert.deepEqual(db.prepare('SELECT * FROM creation_objectives').all(), before);
}
finally {
    db.close();
} });
