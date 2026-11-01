import type { ObjectivePlan, Workstream } from './orchestrator.js';
import type { FactoryResult } from '../factories/contracts.js';

type OutputReference = { stage: string; value: 'requestId' } | { stage: string; value: 'artifactRef' | 'artifactText'; index: number };
export class StageOutputUnavailable extends Error {}
const record = (x: unknown): x is Record<string, unknown> => x !== null && typeof x === 'object' && !Array.isArray(x);

function reference(node: Record<string, unknown>, workstream: Workstream): OutputReference | undefined {
    if (!Object.hasOwn(node, '$stageOutput')) return;
    const r = node.$stageOutput;
    if (Object.keys(node).length !== 1 || !record(r) || typeof r.stage !== 'string' || !workstream.dependsOn.includes(r.stage) ||
        !(r.value === 'requestId' && Object.keys(r).sort().join(',') === 'stage,value' ||
          ['artifactRef','artifactText'].includes(String(r.value)) && Object.keys(r).sort().join(',') === 'index,stage,value' && Number.isSafeInteger(r.index) && Number(r.index) >= 0 && Number(r.index) < 256))
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
 * evaluated expressions, secrets or arbitrary receipt fields. Text requires the
 * separate asynchronous trusted-factory reader below; references never open paths.
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
        if(ref.value==='artifactText')throw new StageOutputUnavailable('stage artifact text requires a trusted asynchronous reader');
        const source = accepted(ref.stage);
        if (source.status !== 'SUCCEEDED' || source.result?.status !== 'SUCCEEDED' || source.result.requestId !== source.requestId || !/^[a-zA-Z0-9_.:-]{1,128}$/.test(source.requestId))
            throw Error('stage output dependency has no accepted bound result');
        const value = ref.value === 'requestId' ? source.requestId : source.result.artifactRefs[ref.index];
        if (typeof value !== 'string' || !value.trim()) throw new StageOutputUnavailable('stage output reference is unavailable');
        return value;
    });
}

type AcceptedStage = { requestId: string; result: FactoryResult | null; status: string };
/** Resolve only accepted direct dependencies. Cache source reads within this one
 * resolution, not across approval/reopen; every later attempt rechecks custody.
 */
export async function resolveStageOutputReferencesAsync(plan:ObjectivePlan,stageKey:string,accepted:(stageKey:string)=>AcceptedStage,
    readText:(stageKey:string,requestId:string,artifactRef:string)=>Promise<string>){
    const workstream=plan.workstreams.find(w=>w.id===stageKey);if(!workstream)throw Error('stage output consumer not found');
    const texts=new Map<string,Promise<string>>();let characters=0;
    const bounded=(value:string)=>{characters+=Buffer.byteLength(value);if(characters>524288)throw new StageOutputUnavailable('resolved dependency text exceeds the existing command input limit');return value;};
    const resolve=async(node:unknown):Promise<unknown>=>{
        if(typeof node==='string')return bounded(node);
        if(Array.isArray(node)){const out=[];for(const x of node)out.push(await resolve(x));return out;}
        if(!record(node))return node;
        const ref=reference(node,workstream);
        if(!ref){const out:Record<string,unknown>={};for(const [k,v]of Object.entries(node))Object.defineProperty(out,k,{value:await resolve(v),enumerable:true,writable:true,configurable:true});return out;}
        const source=accepted(ref.stage);
        if(source.status!=='SUCCEEDED'||source.result?.status!=='SUCCEEDED'||source.result.requestId!==source.requestId||!/^[a-zA-Z0-9_.:-]{1,128}$/.test(source.requestId))throw Error('stage output dependency has no accepted bound result');
        const value=ref.value==='requestId'?source.requestId:source.result.artifactRefs[ref.index];
        if(typeof value!=='string'||!value.trim())throw new StageOutputUnavailable('stage output reference is unavailable');
        if(ref.value!=='artifactText')return bounded(value);
        const key=JSON.stringify([ref.stage,source.requestId,value]);let pending=texts.get(key);
        if(!pending){pending=readText(ref.stage,source.requestId,value);texts.set(key,pending);}
        const text=await pending;
        if(typeof text!=='string'||text.length>10000||Buffer.from(text,'utf8').toString('utf8')!==text||!text.trim()||Buffer.byteLength(text)>40000)throw new StageOutputUnavailable('accepted artifact is outside the current native text input contract');
        return bounded(text);
    };
    return resolve(workstream.inputs);
}
