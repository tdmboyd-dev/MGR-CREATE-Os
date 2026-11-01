import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync, rmSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {DatabaseSync} from 'node:sqlite';
import {SqliteCreationRepository} from '../src/persistence/sqlite.js';
import {DurableObjectiveService} from '../src/api/durable-objectives.js';
import {FactoryRegistry} from '../src/factories/registry.js';
import {resolveStageOutputReferences} from '../src/objectives/stage-outputs.js';
import type {ObjectivePlan} from '../src/objectives/orchestrator.js';
import type {FactoryRequest, FactoryResult, RecoverableFactory} from '../src/factories/contracts.js';

const ref = (value = 'requestId', extra = {}) => ({$stageOutput:{stage:'source',value,...extra}});
const plan = (): ObjectivePlan => ({id:'references',tenantId:'tenant',workspaceId:'workspace',outcomes:['accepted referenced output'],maxBudget:0,workstreams:[
    {id:'source',factory:'MEDIA',dependsOn:[],inputs:{original:true},acceptanceCriteria:['source accepted'],budget:0},
    {id:'consumer',factory:'DOCUMENT',dependsOn:['source'],inputs:{request:ref(),nested:[ref('artifactRef',{index:0}),{text:'literal $stageOutput'}]},acceptanceCriteria:['exact bound input'],budget:0}
]});
const ok = (q:FactoryRequest):FactoryResult => ({requestId:q.id,kind:q.kind,status:'SUCCEEDED',artifactRefs:['artifact:'+q.id],evidenceRefs:['receipt:'+q.id]});
function fixture(t:any) {
    const home=mkdtempSync(join(tmpdir(),'creation-output-')),path=join(home,'creation.sqlite'),repos:SqliteCreationRepository[]=[];
    t.after(()=>{for(const repo of repos)repo.close();rmSync(home,{recursive:true,force:true});});
    return {path,open(){const repo=new SqliteCreationRepository(path,{tenantId:'tenant',workspaceId:'workspace',actorId:'owner'});repos.push(repo);return repo;}};
}
function service(repo:SqliteCreationRepository, consumer:RecoverableFactory, source?:RecoverableFactory){const factories=new FactoryRegistry();factories.register(source??{kind:'MEDIA',execute:async q=>ok(q),reconcile:async()=>{throw Error('accepted source must not execute again');}} as RecoverableFactory);factories.register(consumer);return new DurableObjectiveService(repo,factories);}

test('accepted dependency request/artifact references resolve exactly across SQLite reopen without changing the plan',async t=>{
    const f=fixture(t),repo=f.open(),original=plan(),received:FactoryRequest[]=[];
    const consumer:RecoverableFactory={kind:'DOCUMENT',execute:async q=>{received.push(structuredClone(q));return{requestId:q.id,kind:q.kind,status:'BLOCKED',artifactRefs:[],evidenceRefs:[],checkpoint:{state:'WAITING_APPROVAL',operationRef:q.id}};},reconcile:async q=>{received.push(structuredClone(q));return ok(q);}};
    const first=await service(repo,consumer).executeObjective('same',original);assert.equal(first.run.status,'WAITING_APPROVAL');const source=repo.checkpoint(first.run.id,'source').requestId;
    assert.deepEqual(received[0].inputs,{request:source,nested:['artifact:'+source,{text:'literal $stageOutput'}]});assert.deepEqual(first.plan,original);repo.close();
    const reopened=service(f.open(),consumer),done=await reopened.resume(first.run.id);assert.equal(done.run.status,'COMPLETED');assert.deepEqual(received[1],received[0]);assert.deepEqual(done.plan,original);await reopened.resume(first.run.id);assert.equal(received.length,2);
});

for(const invalid of [
    {$stageOutput:{stage:'foreign',value:'requestId'}},
    {$stageOutput:{stage:'consumer',value:'requestId'}},
    {$stageOutput:{stage:'source',value:'producerToken'}},
    {$stageOutput:{stage:'source',value:'artifactRef'}},
    {$stageOutput:{stage:'source',value:'artifactRef',index:-1}},
    {$stageOutput:{stage:'source',value:'requestId',index:0}},
    {$stageOutput:{stage:'source',value:'requestId'},extra:'unbound'},
    {$stageOutput:null}
])test('invalid output selector rejects metadata before any factory call: '+JSON.stringify(invalid),async t=>{
    const f=fixture(t),repo=f.open(),p=plan();p.workstreams[1].inputs={request:invalid};let calls=0;
    const consumer:RecoverableFactory={kind:'DOCUMENT',execute:async q=>{calls++;return ok(q);},reconcile:async q=>ok(q)};
    await assert.rejects(service(repo,consumer).executeObjective('invalid',p),/reference/);assert.equal(calls,0);assert.equal(repo.listObjectives().length,0);
});

test('a known stage without a declared dependency cannot supply a reference',t=>{const f=fixture(t),repo=f.open(),p=plan();p.workstreams[1].dependsOn=[];assert.throws(()=>repo.openObjective('undeclared',p),/declared dependency/);});

for(const source of [
    {requestId:'source-request',status:'WAITING_APPROVAL',result:{requestId:'source-request',status:'SUCCEEDED'}},
    {requestId:'source-request',status:'SUCCEEDED',result:{requestId:'foreign-request',status:'SUCCEEDED'}},
    {requestId:'source-request',status:'SUCCEEDED',result:{requestId:'source-request',status:'FAILED'}}
])test('unaccepted or mismatched source cannot resolve output: '+JSON.stringify(source),()=>{assert.throws(()=>resolveStageOutputReferences(plan(),'consumer',()=>source as any),/accepted bound/);});

test('missing output records a known terminal input failure without dispatching the consumer',async t=>{
    const f=fixture(t),repo=f.open(),p=plan();p.workstreams[1].inputs={artifact:ref('artifactRef',{index:1})};let calls=0;
    const s=service(repo,{kind:'DOCUMENT',execute:async q=>{calls++;return ok(q);},reconcile:async q=>ok(q)}),result=await s.executeObjective('missing',p);assert.equal(result.run.status,'FAILED');assert.equal(repo.checkpoint(result.run.id,'consumer').result?.status,'FAILED');assert.equal(calls,0);assert.equal((await s.resume(result.run.id)).run.status,'FAILED');assert.equal(calls,0);
});

test('altered source checkpoint is refused before recovered consumer dispatch',async t=>{
    const f=fixture(t),repo=f.open();let calls=0;const consumer:RecoverableFactory={kind:'DOCUMENT',execute:async q=>{calls++;return{requestId:q.id,kind:q.kind,status:'BLOCKED',artifactRefs:[],evidenceRefs:[],checkpoint:{state:'WAITING_APPROVAL',operationRef:q.id}};},reconcile:async q=>{calls++;return ok(q);}};
    const s=service(repo,consumer),first=await s.executeObjective('tamper',plan()),db=new DatabaseSync(f.path);try{db.prepare("UPDATE creation_stage_checkpoints SET result_json=replace(result_json,'artifact:','foreign:') WHERE request_id=?").run(repo.checkpoint(first.run.id,'source').requestId);}finally{db.close();}await assert.rejects(s.resume(first.run.id),/binding/);assert.equal(calls,1);
});

test('a competing original claim cannot be overwritten by local missing-output settlement',async t=>{
    const f=fixture(t),repo=f.open(),other=f.open(),p=plan();p.workstreams[1].inputs={artifact:ref('artifactRef',{index:1})};const original=repo.claim.bind(repo);let competing:any,calls=0;
    repo.claim=(runId,stageKey)=>{if(stageKey==='consumer'){competing=other.claim(runId,stageKey);assert.equal(competing.claimed,true);}return original(runId,stageKey);};
    const s=service(repo,{kind:'DOCUMENT',execute:async q=>{calls++;return ok(q);},reconcile:async q=>ok(q)});await assert.rejects(s.executeObjective('competing',p),/original unstarted stage claim/);const id=other.listObjectives()[0].runId,c=other.checkpoint(id,'consumer');assert.equal(c.producerToken,competing.producerToken);assert.equal(c.result,null);assert.equal(c.revision,competing.revision);assert.equal(calls,0);
});
