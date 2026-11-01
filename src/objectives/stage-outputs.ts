import type { ObjectivePlan, Workstream } from './orchestrator.js';
import type { FactoryResult } from '../factories/contracts.js';

type OutputReference = { stage: string; value: 'requestId' } | { stage: string; value: 'artifactRef'; index: number };
export class StageOutputUnavailable extends Error {}
const record = (x: unknown): x is Record<string, unknown> => x !== null && typeof x === 'object' && !Array.isArray(x);

function reference(node: Record<string, unknown>, workstream: Workstream): OutputReference | undefined {
    if (!Object.hasOwn(node, '$stageOutput')) return;
    const r = node.$stageOutput;
    if (Object.keys(node).length !== 1 || !record(r) || typeof r.stage !== 'string' || !workstream.dependsOn.includes(r.stage) ||
        !(r.value === 'requestId' && Object.keys(r).sort().join(',') === 'stage,value' ||
          r.value === 'artifactRef' && Object.keys(r).sort().join(',') === 'index,stage,value' && Number.isSafeInteger(r.index) && Number(r.index) >= 0 && Number(r.index) < 256))
        throw Error('stage output reference requires an exact declared dependency and supported value');
    return r as OutputReference;
}

function visit(node: unknown, workstream: Workstream, resolve?: (ref: OutputReference) => string): unknown {
    if (Array.isArray(node)) return node.map(x => visit(x, workstream, resolve));
    if (!record(node)) return node;
    const ref = reference(node, workstream);
    if (ref) return resolve ? resolve(ref) : node;
    return Object.fromEntries(Object.entries(node).map(([key, value]) => [key, visit(value, workstream, resolve)]));
}

/** Only immutable references to directly declared, accepted stages; never paths,
 * evaluated expressions, secrets, arbitrary receipt fields or copied file bytes.
 * Call after the existing bounded JSON/graph validation.
 */
export function validateStageOutputReferences(plan: ObjectivePlan) {
    for (const workstream of plan.workstreams) visit(workstream.inputs, workstream);
}

export function resolveStageOutputReferences(plan: ObjectivePlan, stageKey: string,
    accepted: (stageKey: string) => { requestId: string; result: FactoryResult | null; status: string }) {
    const workstream = plan.workstreams.find(w => w.id === stageKey);
    if (!workstream) throw Error('stage output consumer not found');
    return visit(workstream.inputs, workstream, ref => {
        const source = accepted(ref.stage);
        if (source.status !== 'SUCCEEDED' || source.result?.status !== 'SUCCEEDED' || source.result.requestId !== source.requestId || !/^[a-zA-Z0-9_.:-]{1,128}$/.test(source.requestId))
            throw Error('stage output dependency has no accepted bound result');
        const value = ref.value === 'requestId' ? source.requestId : source.result.artifactRefs[ref.index];
        if (typeof value !== 'string' || !value.trim()) throw new StageOutputUnavailable('stage output reference is unavailable');
        return value;
    });
}
