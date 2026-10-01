import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {ProductionJobs} from '../mgr-production-brain/skills/production-brain/scripts/jobs.mjs';
const spec=()=>({id:'job-1',provider:'fixture',model:'fixture-1',payload:{prompt:'Contact shot'},capabilitySnapshot:'schema-1',deadline:200,quote:{id:'quote-1',currency:'USD',maximumMinor:100,expiresAt:150}});
const submit=(s,j)=>s.beginSubmission(j.id,j.revision,{requestDigest:j.requestDigest,quoteId:j.quote.id,approvalId:'approval-1'},20);
test('lost response survives restart and never allows resubmission',()=>{
  const path=join(mkdtempSync(join(tmpdir(),'mgr-jobs-')),'jobs.sqlite');let s=new ProductionJobs(path),j=submit(s,s.prepare(spec(),10));
  s.close();s=new ProductionJobs(path);try{assert.equal(s.recovery(j.id,500).action,'RECONCILE_SUBMISSION_NO_RETRY');assert.equal(s.recovery(j.id,500).maySubmitAgain,false);assert.throws(()=>submit(s,s.get(j.id)),/already started/);j=s.observe(j.id,j.revision,{id:'timeout',state:'AMBIGUOUS'},25);assert.throws(()=>s.observe(j.id,j.revision,{id:'retry',state:'SUBMITTING'},30),/transition/);j=s.observe(j.id,j.revision,{id:'found',state:'ACCEPTED',providerJobId:'remote-1'},501);assert.equal(j.pastDeadline,true);assert.equal(s.recovery(j.id,502).action,'RECONCILE_EXISTING_PROVIDER_JOB');}finally{s.close();}
});
test('changed payload, stale quote and expired approval cannot start a request',()=>{
  const s=new ProductionJobs(':memory:');try{const j=s.prepare(spec(),10);assert.throws(()=>s.beginSubmission(j.id,j.revision,{requestDigest:'changed',quoteId:j.quote.id,approvalId:'a'},20),/does not match/);assert.throws(()=>s.beginSubmission(j.id,j.revision,{requestDigest:j.requestDigest,quoteId:'old',approvalId:'a'},20),/does not match/);assert.throws(()=>s.beginSubmission(j.id,j.revision,{requestDigest:j.requestDigest,quoteId:j.quote.id,approvalId:'a'},151),/Expired/);assert.equal(s.get(j.id).state,'PREPARED');}finally{s.close();}
});
test('duplicate callbacks are idempotent but altered events and stale writers fail',()=>{
  const s=new ProductionJobs(':memory:');try{let j=submit(s,s.prepare(spec(),10));const event={id:'accepted',state:'ACCEPTED',providerJobId:'remote-1'};j=s.observe(j.id,j.revision,event,30);assert.deepEqual(s.observe(j.id,1,event,31),j);assert.throws(()=>s.observe(j.id,j.revision,{...event,providerJobId:'remote-2'},32),/Conflicting/);assert.throws(()=>s.observe(j.id,1,{id:'running',state:'RUNNING',providerJobId:'remote-1'},32),/Stale/);}finally{s.close();}
});
test('cancel race keeps actual successful output and reports over-quote settlement',()=>{
  const bytes=Buffer.from('actual output fixture'),sha256=createHash('sha256').update(bytes).digest('hex');
  const s=new ProductionJobs(':memory:',{resolveOutput:()=>bytes});try{let j=submit(s,s.prepare(spec(),10));j=s.observe(j.id,j.revision,{id:'a',state:'ACCEPTED',providerJobId:'remote-1'},30);j=s.observe(j.id,j.revision,{id:'c',state:'CANCEL_REQUESTED',providerJobId:'remote-1'},40);assert.throws(()=>s.observe(j.id,j.revision,{id:'missing',state:'SUCCEEDED',providerJobId:'remote-1'},41),/outputs/);assert.throws(()=>s.observe(j.id,j.revision,{id:'forged',state:'SUCCEEDED',providerJobId:'remote-1',outputs:[{assetId:'out',version:1,sha256:'a'.repeat(64)}]},42),/bytes do not match/);j=s.observe(j.id,j.revision,{id:'s',state:'SUCCEEDED',providerJobId:'remote-1',outputs:[{assetId:'out',version:1,sha256}],settlement:{currency:'USD',actualMinor:120}},45);assert.equal(j.settlement.overQuote,true);assert.equal(s.recovery(j.id,46).action,'NONE');assert.throws(()=>s.observe(j.id,j.revision,{id:'latecancel',state:'CANCELLED',providerJobId:'remote-1'},47),/transition/);}finally{s.close();}
});
