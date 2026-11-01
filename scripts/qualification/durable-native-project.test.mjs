// Actual public Creation bootstrap + durable project/adapter, original ONE authority,
// shared SDK/native Forge + Markdown. Explicit fixture owner approvals; no model.
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, readdirSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { createServer } from 'node:net';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
const root = name => { assert.ok(process.env[name], name + ' required'); return resolve(process.env[name]); }, one = root('MGR_DEPT_ONE_ROOT'), edgeRoot = root('MGR_DEPT_EDGE_ROOT'), creationRoot = root('MGR_DEPT_CREATION_ROOT'), load = p => import(pathToFileURL(join(one, p)));
const { ReignStore } = await load('web/durable-store.mjs'), { ExecutionCoordinator } = await load('web/execution-coordinator.mjs'), { startOwnerDepartments } = await load('web/owner-departments.mjs'), { tsImport } = await import(pathToFileURL(join(edgeRoot, 'node_modules/tsx/dist/esm/api/index.mjs'))), { createCreationOS } = await tsImport(pathToFileURL(join(creationRoot, 'src/bootstrap.ts')).href, import.meta.url);
const port = async () => { const s = createServer(); await new Promise((r, j) => { s.once('error', j); s.listen(0, '127.0.0.1', r); }); const p = s.address().port; await new Promise(r => s.close(r)); return p; }, sha = b => createHash('sha256').update(b).digest('hex');
test('public durable Creation bootstrap -> exact owner approval -> lost native reply -> all-host recovery -> two real artifacts', { timeout: 180000 }, async () => {
    const home = mkdtempSync(join(tmpdir(), 'creation-durable-native-')), actorId = 'owned-durable-project', principal = { tenantId: 'personal-owner', workspaceId: 'personal-project', actorId };
    let store, departments, product;
    let executes = 0, loseReply = true;
    const open = async (first = false) => {
        store = new ReignStore(join(home, 'runtime.sqlite'));
        const coordinator = new ExecutionCoordinator(store), ctx = coordinator.hostContext();
        if (first)
            coordinator.enrollFreshHost(ctx);
        departments = await startOwnerDepartments({ home, store, coordinator, actorId, edgeRoot, creationRoot, edgePort: await port(), creationPort: await port(), forge: true });
        assert.equal(departments.forgeStatus().running, true);
        const w = departments.workflows, bridge = { tenantId: principal.tenantId, actorId, assertCurrent: () => { coordinator.assertAuthority(ctx); }, preview: w.preview.bind(w), status: w.status.bind(w), artifact: w.artifact.bind(w), cancel: w.cancel.bind(w), execute: async (...args) => {
                executes++;
                const value = await w.execute(...args);
                if (loseReply) {
                    loseReply = false;
                    throw Error('controlled reply loss after original owner execute');
                }
                return value;
            } };
        product = createCreationOS({ projectRuntime: { dbPath: join(home, 'creation.sqlite'), principal, bridge, forgeWorkspaceId: 'personal-forge' } });
    };
    const close = async () => {
        await product?.close();
        product = null;
        await departments?.close();
        departments = null;
        if (store?.db.isOpen)
            store.close();
    };
    const count = () => store.db.prepare('SELECT count(*) n FROM execution_effects').get().n;
    const plan = { id: 'original-native-project', tenantId: principal.tenantId, workspaceId: principal.workspaceId, outcomes: ['Original creature and companion notes'], maxBudget: 0, workstreams: [{ id: 'creature', factory: 'MEDIA', dependsOn: [], inputs: { operation: 'forge.creature.create', input: { workspaceId: 'personal-forge', prompt: 'Original winged crystal guardian', seed: 83, variants: 1 } }, acceptanceCriteria: ['native verified GLB bytes and original receipt'], budget: 0 }, { id: 'notes', factory: 'DOCUMENT', dependsOn: ['creature'], inputs: { operation: 'creation.document.render', input: { workspaceId: principal.workspaceId, title: 'Durable original companion', sections: [{ heading: 'Context', body: 'Original project text with exact 🌍 bytes.' }], rightsRefs: ['owned-authorship'] } }, acceptanceCriteria: ['exact native Markdown bytes'], budget: 0 }] };
    const requests = runId => {
        const db = new DatabaseSync(join(home, 'creation.sqlite'), { readOnly: true });
        try {
            return db.prepare('SELECT s.stage_key,c.request_id FROM stage_runs s JOIN creation_stage_checkpoints c ON c.stage_id=s.id WHERE s.creation_run_id=? ORDER BY s.rowid').all(runId);
        }
        finally {
            db.close();
        }
    };
    const approve = id => { const w = departments.workflows, p = w.load(id); return w.approve(id, p.digest); };
    try {
        await open(true);
        const initial = await product.service.executeObjective('owned-project', plan);
        const runId = initial.run.id, refs = requests(runId);
        assert.equal(initial.run.status, 'WAITING_APPROVAL');
        assert.equal(executes, 0);
        assert.equal(count(), 0);
        assert.equal(initial.stages[1].status, 'PENDING');
        await close();
        await open();
        assert.equal((await product.service.resume(runId)).run.status, 'WAITING_APPROVAL');
        assert.equal(executes, 0);
        approve(refs[0].request_id);
        const lost = await product.service.resume(runId);
        assert.equal(lost.run.status, 'WAITING_RESOURCE');
        assert.equal(executes, 1);
        assert.equal(count(), 1);
        await close();
        await open();
        let resumed;
        for (let i = 0; i < 90; i++) {
            resumed = await product.service.resume(runId);
            if (resumed.run.status === 'WAITING_APPROVAL')
                break;
            await new Promise(r => setTimeout(r, 500));
        }
        assert.equal(resumed.run.status, 'WAITING_APPROVAL');
        assert.equal(resumed.stages[0].status, 'SUCCEEDED');
        assert.equal(executes, 1, 'unknown native reply must not execute again');
        const creature = await departments.workflows.artifact(refs[0].request_id), glb = Buffer.from(creature.contentBase64, 'base64');
        assert.equal(sha(glb), creature.sha256);
        assert.equal(glb.toString('ascii', 0, 4), 'glTF');
        assert.equal(glb.readUInt32LE(4), 2);
        assert.equal(glb.readUInt32LE(8), glb.length);
        await close();
        await open();
        approve(refs[1].request_id);
        const completed = await product.service.resume(runId);
        assert.equal(completed.run.status, 'COMPLETED');
        assert.equal(executes, 2);
        assert.equal(count(), 2);
        const text = await departments.workflows.artifact(refs[1].request_id), md = Buffer.from(text.contentBase64, 'base64');
        assert.equal(md.toString(), '# Durable original companion\n\n## Context\n\nOriginal project text with exact 🌍 bytes.');
        assert.equal(sha(md), text.sha256);
        await close();
        await open();
        assert.deepEqual(await product.service.resume(runId), completed);
        assert.equal(executes, 2);
        assert.equal(count(), 2);
        assert.equal((await departments.workflows.artifact(refs[0].request_id)).sha256, creature.sha256);
        assert.equal((await departments.workflows.artifact(refs[1].request_id)).sha256, text.sha256);
        const cancelled = await product.service.executeObjective('cancel-before-approval', { ...plan, id: 'cancelled-project' });
        assert.equal(cancelled.run.status, 'WAITING_APPROVAL');
        const stopped = await product.service.cancel(cancelled.run.id);
        assert.equal(stopped.run.status, 'CANCELLED');
        assert.equal(executes, 2);
        assert.equal(count(), 2);
        const db = new DatabaseSync(join(home, 'creation.sqlite'), { readOnly: true });
        try {
            assert.equal(db.prepare('SELECT count(*) n FROM native_creation_jobs').get().n, 1);
            assert.equal(db.prepare('SELECT count(*) n FROM native_creation_artifacts').get().n, 1);
        }
        finally {
            db.close();
        }
        console.log(JSON.stringify({ scope: 'public opt-in Creation bootstrap and reusable durable project/owner workflow factories; actual isolated owner SDK/native service acceptance', runId, requests: refs, originalOwnerExecuteCalls: executes, originalEffects: 2, explicitOwnerApprovals: 2, allHostReopens: 4, unknownNativeReplyRecoveredWithoutResend: true, cancellationBeforeApprovalCreatesNoNativeJob: true, artifacts: [{ kind: 'MEDIA', sha256: creature.sha256, bytes: creature.bytes }, { kind: 'DOCUMENT', sha256: text.sha256, bytes: text.bytes }], modelCalls: 0, permanentTevinProjectInterface: false, productionAccepted: false }));
    }
    finally {
        await close();
        rmSync(home, { recursive: true, force: true });
    }
});
