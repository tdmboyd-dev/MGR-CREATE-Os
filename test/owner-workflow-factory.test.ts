import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { OwnerWorkflowFactory, type OwnerWorkflowBridge } from '../src/factories/owner-workflow-factory.js';
import type { FactoryRequest } from '../src/factories/contracts.js';
const principal = { tenantId: 'tenant', actorId: 'owner', workspaceId: 'workspace' }, request = (): FactoryRequest => ({ id: 'owned-request', kind: 'DOCUMENT', tenantId: 'tenant', workspaceId: 'workspace', budget: 0, acceptanceCriteria: ['exact bytes'], inputs: { operation: 'creation.document.render', input: { workspaceId: 'workspace', title: 'Original', sections: [{ heading: 'Context', body: 'Exact owner text' }], rightsRefs: ['owned-authorship'] } } });
function fixture() {
    const bytes = Buffer.from('# Original\n\n## Context\n\nExact owner text'), sha = createHash('sha256').update(bytes).digest('hex');
    let state = 'preview', live = true, executeCalls = 0, artifactCalls = 0, previewCalls = 0;
    let alter = (x: any) => x;
    const reply = (command: any) => ({ tenantId: 'tenant', actorId: 'owner', command, digest: 'a'.repeat(64), state, jobId: 'owned-job', result: { artifacts: [{ sha256: sha, bytes: bytes.length }] } });
    let saved: any;
    const bridge: OwnerWorkflowBridge = { tenantId: 'tenant', actorId: 'owner', assertCurrent() {
            if (!live)
                throw Error('withdrawn');
        }, preview(command) { previewCalls++; saved = command; return alter(reply(command)); }, async execute() { executeCalls++; state = 'succeeded'; return reply(saved); }, status() { return reply(saved); }, artifact() { artifactCalls++; return alter({ contentBase64: bytes.toString('base64'), bytes: bytes.length, sha256: sha, mediaType: 'text/markdown; charset=utf-8' }); }, cancel() { state = 'cancelled'; return reply(saved); } };
    return { bridge, factory: new OwnerWorkflowFactory('DOCUMENT', principal, bridge), setState(x: string) { state = x; }, revoke() { live = false; }, alter(f: (x: any) => any) { alter = f; }, counts() { return { executeCalls, artifactCalls, previewCalls }; } };
}
test('factory creates only a preview and cannot approve its own request', async () => { const f = fixture(), r = await f.factory.execute(request()); assert.equal(r.status, 'BLOCKED'); assert.equal(r.checkpoint?.state, 'WAITING_APPROVAL'); assert.equal(f.counts().executeCalls, 0); assert.equal('approve' in f.bridge, false); });
test('only original approved state dispatches and accepts independently read exact bytes', async () => { const f = fixture(); f.setState('approved'); const r = await f.factory.reconcile(request()); assert.equal(r.status, 'SUCCEEDED'); assert.equal(f.counts().executeCalls, 1); assert.equal(f.counts().artifactCalls, 1); assert.ok(r.artifactRefs[0].startsWith('mgr-workflow:owned-request:sha256:')); });
for (const state of ['pending', 'unknown'])
    test('original ' + state + ' state is reconciled without re-execute', async () => { const f = fixture(); f.setState(state); const r = await f.factory.reconcile(request()); assert.equal(f.counts().executeCalls, 0); assert.equal(r.status, 'BLOCKED'); assert.equal(r.checkpoint?.state, state === 'unknown' ? 'UNKNOWN' : 'WAITING_RESOURCE'); });
for (const changed of [{ tenantId: 'foreign' }, { workspaceId: 'foreign' }, { budget: 1 }, { acceptanceCriteria: [] }])
    test('factory refuses mismatched scope/allocation/criteria before preview: ' + JSON.stringify(changed), async () => { const f = fixture(), r = await f.factory.execute({ ...request(), ...changed }); assert.equal(r.status, 'BLOCKED'); assert.equal(f.counts().previewCalls, 0); });
test('source text cannot choose an unrelated operation', async () => { const f = fixture(), q = request(); (q.inputs as any).operation = 'legacy.contact.create'; assert.equal((await f.factory.execute(q)).status, 'BLOCKED'); assert.equal(f.counts().previewCalls, 0); });
test('a result bound to another actor is refused before execute or artifact read', async () => { const f = fixture(); f.setState('approved'); f.alter(x => ({ ...x, actorId: 'foreign' })); await assert.rejects(f.factory.reconcile(request()), /binding/); assert.equal(f.counts().executeCalls, 0); });
test('changed artifact bytes do not become successful project output', async () => { const f = fixture(); f.setState('succeeded'); f.alter(x => 'contentBase64' in x ? { ...x, contentBase64: Buffer.from('changed').toString('base64') } : x); await assert.rejects(f.factory.reconcile(request()), /mismatch/); });
test('revoked current authority prevents any further bridge call', async () => { const f = fixture(); f.revoke(); await assert.rejects(f.factory.reconcile(request()), /withdrawn/); assert.equal(f.counts().previewCalls, 0); });
test('cancelling uses the original workflow and never substitutes execute', async () => { const f = fixture(); const r = await f.factory.cancel(request()); assert.equal(r.status, 'FAILED'); assert.match(r.blockers![0], /cancelled/); assert.equal(f.counts().executeCalls, 0); });
test('cancelling accepted native work observes original status rather than retrying remote cancellation', async () => { const f = fixture(); f.setState('pending'); let cancels = 0; f.bridge.cancel = () => { cancels++; throw Error('remote stop must not be inferred'); }; const original = f.bridge.status.bind(f.bridge); f.bridge.status = (...args) => { f.setState('succeeded'); return original(...args); }; assert.equal((await f.factory.cancel(request())).status, 'SUCCEEDED'); assert.equal(cancels, 0); assert.equal(f.counts().executeCalls, 0); });
test('observation-only recovery cannot dispatch an approved stage after a sibling failure', async () => { const f = fixture(); f.setState('approved'); assert.equal((await f.factory.reconcile(request(), { dispatchAllowed: false })).checkpoint?.state, 'WAITING_APPROVAL'); assert.equal(f.counts().executeCalls, 0); });
