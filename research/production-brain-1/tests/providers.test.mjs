import test from 'node:test';
import assert from 'node:assert/strict';
import {statusAddress,normalizeStatus,exactUSDUpperBound,pollExisting} from '../mgr-production-brain/skills/production-brain/scripts/providers.mjs';
test('provider URLs cannot redirect credentials or change identity',()=>{
 assert.equal(statusAddress('minimax','123'),'https://api.minimax.io/v2/query/video_generation/123');
 for(const url of ['https://attacker.test/requests/x/status','https://api.higgsfield.ai/requests/y/status','https://api.higgsfield.ai/requests/x/status?token=secret','https://user:pass@api.higgsfield.ai/requests/x/status'])assert.throws(()=>statusAddress('higgsfield','x',url));
});
test('prompt enrichment and remote output are distinct from admitted media',()=>{
 assert.equal(normalizeStatus('minimax','123',{task:{id:'123',status:'succeeded',task_type:'h3_context_ir',content:{prompt:'own enriched prompt'}}}).state,'PROMPT_PENDING_SEMANTIC_REVIEW');
 assert.equal(normalizeStatus('higgsfield','x',{request_id:'x',status:'completed'}).state,'OUTPUT_PENDING_ADMISSION');
 assert.throws(()=>normalizeStatus('higgsfield','x',{request_id:'wrong',status:'completed'}));
});
test('fractional-cent quote is an exact conservative cap, never settlement',()=>{
 assert.deepEqual(exactUSDUpperBound('0.094'),{currency:'USD',maximumMinor:10,quotedDecimal:'0.094',settlementKnown:false});
 assert.equal(exactUSDUpperBound('1.230000').maximumMinor,123);
 for(const x of [0.094,'NaN','1e2','-1','Infinity'])assert.throws(()=>exactUSDUpperBound(x));
});
test('polling deadline includes read latency and never submits again',async()=>{
 let now=1000,calls=[];
 const result=await pollExisting({provider:'higgsfield',jobId:'x',deadline:3500,clock:()=>now,random:()=>0,sleep:async ms=>{now+=ms;},read:async request=>{calls.push(request.method);now+=1000;return {status:200,body:{request_id:'x',status:'in_progress'}};}});
 assert.equal(result.reason,'DEADLINE');assert.deepEqual(calls,['GET']);assert.equal(result.maySubmitAgain,false);assert.equal(now,3500);
});
test('retryable reads recover the original job; identity failure stops',async()=>{
 let now=0,count=0;
 const result=await pollExisting({provider:'minimax',jobId:'123',deadline:20000,clock:()=>now,random:()=>0,sleep:async ms=>{now+=ms;},read:async()=>++count===1?{status:503}:{status:200,body:{task:{id:'123',status:'succeeded',task_type:'generation'}}}});
 assert.equal(result.state,'OUTPUT_PENDING_ADMISSION');assert.equal(count,2);
 await assert.rejects(pollExisting({provider:'minimax',jobId:'123',deadline:20000,clock:()=>0,read:async()=>({status:200,body:{task:{id:'other',status:'succeeded'}}})}),/mismatched/);
});
