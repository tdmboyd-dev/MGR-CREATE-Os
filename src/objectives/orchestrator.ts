import type { FactoryKind, FactoryRequest, FactoryResult } from '../factories/contracts.js';
import { FactoryRegistry } from '../factories/registry.js';
import { sha256Canonical } from '../core/digest.js';
export interface Workstream {
    id: string;
    factory: FactoryKind;
    dependsOn: string[];
    inputs: unknown;
    acceptanceCriteria: string[];
    budget?: number;
}
export interface ObjectivePlan {
    id: string;
    tenantId: string;
    workspaceId: string;
    outcomes: string[];
    workstreams: Workstream[];
    maxBudget?: number;
}
const record = (x: unknown): x is Record<string, unknown> => x !== null && typeof x === 'object' && !Array.isArray(x) && [Object.prototype, null].includes(Object.getPrototypeOf(x));
const identifier = (x: unknown): x is string => typeof x === 'string' && /^[a-zA-Z0-9_.:-]{1,128}$/.test(x);
const strings = (x: unknown): x is string[] => { if (!Array.isArray(x) || x.length > 50000)
    return false; for (let i = 0; i < x.length; i++)
    if (!Object.hasOwn(x, i) || typeof x[i] !== 'string' || !x[i].trim())
        return false; return true; };
const money = (x: unknown) => typeof x === 'number' && Number.isFinite(x) && x >= 0;
// Plans are bounded JSON messages, not executable objects. This also prevents
// canonical digest collisions for NaN/null, Maps/objects and sparse arrays.
function jsonPlan(value: unknown) {
    let count = 0;
    const active = new Set<object>();
    const visit = (x: unknown, depth: number) => {
        if (++count > 50000 || depth > 64)
            throw Error('objective plan data limit');
        if (x === null || typeof x === 'string' || typeof x === 'boolean' || typeof x === 'number' && Number.isFinite(x))
            return;
        if (typeof x !== 'object' || x === null || active.has(x))
            throw Error('objective plan must be finite JSON data');
        active.add(x);
        if (Array.isArray(x)) {
            for (let i = 0; i < x.length; i++) {
                if (!Object.hasOwn(x, i))
                    throw Error('objective plan sparse array');
                visit(x[i], depth + 1);
            }
        }
        else {
            if (!record(x))
                throw Error('objective plan must be plain JSON data');
            for (const v of Object.values(x))
                if (v !== undefined)
                    visit(v, depth + 1);
        }
        active.delete(x);
    };
    visit(value, 0);
}
function decimal(n: number) { const [m, e = '0'] = n.toString().split('e'), [whole, fraction = ''] = m.split('.'), scale = fraction.length - Number(e); return { units: BigInt(whole + fraction) * (scale < 0 ? 10n ** BigInt(-scale) : 1n), scale: Math.max(0, scale) }; }
function exceedsBudget(values: number[], ceiling: number) { const amounts = [...values, ceiling].map(decimal), scale = Math.max(...amounts.map(x => x.scale)), units = amounts.map(x => x.units * 10n ** BigInt(scale - x.scale)), cap = units.pop()!; return units.reduce((a, b) => a + b, 0n) > cap; }
export function validatePlan(p: ObjectivePlan) {
    jsonPlan(p);
    if (!record(p) || ![p.id, p.tenantId, p.workspaceId].every(identifier) || !strings(p.outcomes) || !Array.isArray(p.workstreams) || !p.workstreams.length || p.workstreams.length > 256)
        throw Error('invalid objective plan');
    if (p.maxBudget !== undefined && !money(p.maxBudget))
        throw Error('invalid objective budget');
    const by = new Map<string, Workstream>();
    let total = 0;
    for (const w of p.workstreams) {
        if (!record(w) || !identifier(w.id) || typeof w.factory !== 'string' || !w.factory.trim() || !Array.isArray(w.dependsOn) || !w.dependsOn.every(identifier) || new Set(w.dependsOn).size !== w.dependsOn.length || !strings(w.acceptanceCriteria) || !Object.hasOwn(w, 'inputs'))
            throw Error('invalid objective workstream');
        if (by.has(w.id))
            throw Error('duplicate workstream identity');
        by.set(w.id, w);
        if (w.budget !== undefined && !money(w.budget))
            throw Error('invalid workstream budget');
        if (p.maxBudget !== undefined && w.budget === undefined)
            throw Error('objective ceiling requires explicit workstream budgets');
        total += w.budget ?? 0;
        if (!Number.isFinite(total))
            throw Error('objective budget overflow');
    }
    for (const w of p.workstreams)
        for (const d of w.dependsOn)
            if (!by.has(d))
                throw Error('missing dependency');
    const visiting = new Set<string>(), done = new Set<string>();
    const visit = (id: string) => { if (visiting.has(id))
        throw Error('dependency cycle'); if (done.has(id))
        return; visiting.add(id); for (const d of by.get(id)!.dependsOn)
        visit(d); visiting.delete(id); done.add(id); };
    for (const id of by.keys())
        visit(id);
    if (p.maxBudget !== undefined && exceedsBudget(p.workstreams.map(w => w.budget!), p.maxBudget))
        throw Error('objective budget exceeded');
    return true;
}
export function snapshotPlan(p: ObjectivePlan): ObjectivePlan { validatePlan(p); const copy = JSON.parse(JSON.stringify(structuredClone(p))) as ObjectivePlan; validatePlan(copy); return copy; }
export function checkedFactoryResult(req: FactoryRequest, raw: FactoryResult): FactoryResult {
    const invalid = () => ({ requestId: req.id, kind: req.kind, status: 'BLOCKED' as const, artifactRefs: [], evidenceRefs: [], blockers: ['factory result identity or status is invalid'] });
    if (!record(raw) || raw.requestId !== req.id || raw.kind !== req.kind || !['SUCCEEDED', 'FAILED', 'BLOCKED'].includes(raw.status) || !strings(raw.artifactRefs) || !strings(raw.evidenceRefs) || (raw.blockers !== undefined && !strings(raw.blockers)) || (raw.status === 'SUCCEEDED' && Boolean(raw.blockers?.length)))
        return invalid();
    if (raw.checkpoint !== undefined && (!record(raw.checkpoint) || raw.status !== 'BLOCKED' || !['WAITING_APPROVAL', 'WAITING_RESOURCE', 'UNKNOWN'].includes(raw.checkpoint.state) || raw.checkpoint.operationRef !== req.id))
        return invalid();
    return structuredClone(raw);
}
export class ObjectiveOrchestrator {
    constructor(private registry: FactoryRegistry, private executionScope?: string) { if (executionScope !== undefined && !identifier(executionScope))
        throw Error('invalid objective execution scope'); }
    async execute(input: ObjectivePlan) {
        const p = snapshotPlan(input);
        // Resolve every required provider before the first potentially effectful call.
        const factories = new Map(p.workstreams.map(w => [w.factory, this.registry.get(w.factory)]));
        const results: Record<string, FactoryResult> = Object.create(null), pending = new Set(p.workstreams.map(w => w.id)), blockers: string[] = [];
        while (pending.size) {
            const ready = p.workstreams.filter(w => pending.has(w.id) && w.dependsOn.every(d => results[d]?.status === 'SUCCEEDED'));
            if (!ready.length) {
                for (const id of pending)
                    blockers.push(id + ': dependency blocked');
                break;
            }
            for (const w of ready) {
                const req: FactoryRequest = { id: 'creation-workstream-' + sha256Canonical({ tenantId: p.tenantId, workspaceId: p.workspaceId, objectiveId: p.id, workstreamId: w.id, ...(this.executionScope ? { executionScope: this.executionScope } : {}) }), kind: w.factory, tenantId: p.tenantId, workspaceId: p.workspaceId, inputs: structuredClone(w.inputs), acceptanceCriteria: [...w.acceptanceCriteria], budget: w.budget };
                // Keep the expected request binding separate from a provider's mutable copy.
                const r = checkedFactoryResult(req, await factories.get(w.factory)!.execute(structuredClone(req)));
                results[w.id] = r;
                pending.delete(w.id);
                if (r.status !== 'SUCCEEDED')
                    blockers.push(...(r.blockers?.length ? r.blockers : [w.id + ': ' + r.status.toLowerCase()]));
            }
        }
        return { objectiveId: p.id, status: blockers.length ? 'BLOCKED' as const : 'SUCCEEDED' as const, results, blockers };
    }
}
