import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,realpathSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {basename,dirname,join} from 'node:path';
import {DatabaseSync} from 'node:sqlite';
import {createNativeCreationService} from '../src/api/local-service.js';
import {MarkdownRenderer} from '../src/documents/markdown-renderer.js';

for(const staleFailure of [false,true])test(`restarted producer fences stale ${staleFailure?'failure':'success'} without replacing accepted artifact`,async()=>{
 const dir=mkdtempSync(join(tmpdir(),'creation-takeover-')),dbPath=join(dir,'fixture.sqlite'),principals=[{token:'fixture-takeover-principal-credential-long',tenantId:'tenant',actorId:'owner'}];
 const original=MarkdownRenderer.prototype.render;let release!:()=>void,entered!:()=>void,count=0;
 const gate=new Promise<void>(r=>release=r),started=new Promise<void>(r=>entered=r);
 MarkdownRenderer.prototype.render=async function(input){if(count++===0){entered();await gate;if(staleFailure)throw Error('injected stale render failure');}return original.call(this,input);};
 const instances:ReturnType<typeof createNativeCreationService>[]=[];
 async function open(){const s=createNativeCreationService({dbPath,principals});instances.push(s);await new Promise<void>(r=>s.server.listen(0,'127.0.0.1',r));return 'http://127.0.0.1:'+(s.server.address() as {port:number}).port;}
 const call=(base:string,path:string,body?:unknown)=>fetch(base+path,{method:body===undefined?'GET':'POST',headers:{authorization:'Bearer '+principals[0].token,'content-type':'application/json'},...(body===undefined?{}:{body:JSON.stringify(body)})});
 try{
  const first=await open(),request={requestId:'takeover',tenantId:'tenant',workspaceId:'workspace',capability:'document.markdown',input:{payload:{title:'Actual takeover fixture',sections:[{heading:'Output',body:'Stable durable bytes'}],rightsRefs:['owner-authored-fixture']}},acceptanceCriteria:['one durable accepted artifact'],maxCost:0};
  const pending=call(first,'/v1/creation/jobs',request);await started;
  const second=await open();const completed=await call(second,'/v1/creation/jobs/takeover/run',{});assert.equal(completed.status,200);const accepted=await completed.json();assert.equal(accepted.status,'SUCCEEDED');
  release();await pending;
  const final=await (await call(second,'/v1/creation/jobs/takeover')).json();assert.equal(final.status,'SUCCEEDED');assert.deepEqual(final.artifactRefs,accepted.artifactRefs);
  assert.equal((await call(second,accepted.artifacts[0].downloadPath)).status,200);
  const db=new DatabaseSync(dbPath);try{assert.equal((db.prepare('SELECT count(*) n FROM native_creation_artifacts').get() as {n:number}).n,1);assert.equal((db.prepare("SELECT count(*) n FROM native_creation_audit WHERE event='artifact-produced'").get() as {n:number}).n,1);}finally{db.close();}
 }finally{release?.();MarkdownRenderer.prototype.render=original;for(const s of instances)await s.close();rmSync(dir,{recursive:true,force:true});}
});

test('running cancellation fences the renderer and survives reopen',async()=>{
 const dir=mkdtempSync(join(tmpdir(),'creation-running-cancel-')),dbPath=join(dir,'fixture.sqlite');
 const principal={token:'fixture-running-cancel-token-long',tenantId:'tenant',actorId:'owner'};
 const original=MarkdownRenderer.prototype.render;
 let release!:()=>void,entered!:()=>void;
 const gate=new Promise<void>(resolve=>release=resolve),started=new Promise<void>(resolve=>entered=resolve);
 MarkdownRenderer.prototype.render=async function(input){entered();await gate;return original.call(this,input);};
 let service=createNativeCreationService({dbPath,principals:[principal]});
 async function open(){
  await new Promise<void>(resolve=>service.server.listen(0,'127.0.0.1',resolve));
  return 'http://127.0.0.1:'+(service.server.address() as {port:number}).port;
 }
 let origin=await open();
 const call=(path:string,body?:unknown)=>fetch(origin+path,{method:body===undefined?'GET':'POST',headers:{authorization:'Bearer '+principal.token,'content-type':'application/json'},...(body===undefined?{}:{body:JSON.stringify(body)})});
 const job='/v1/creation/jobs/running-cancel';
 try{
  const pending=call('/v1/creation/jobs',{requestId:'running-cancel',tenantId:'tenant',workspaceId:'workspace',capability:'document.markdown',input:{payload:{title:'Held render',sections:[{heading:'Proof',body:'Output must be discarded'}],rightsRefs:['owned']}},acceptanceCriteria:['durable Markdown'],maxCost:0});
  await started;
  assert.equal((await (await call(job)).json()).status,'RUNNING');
  const replies=await Promise.all([call(job+'/cancel',{}),call(job+'/cancel',{})]);
  for(const reply of replies)assert.equal((await reply.json()).status,'CANCELLED');
  release();
  assert.deepEqual((await (await pending).json()).artifactRefs,[]);
  await service.close();
  service=createNativeCreationService({dbPath,principals:[principal]});
  origin=await open();
  assert.equal((await (await call(job)).json()).status,'CANCELLED');
  assert.equal((await call(job+'/run',{})).status,409);
  const db=new DatabaseSync(dbPath,{readOnly:true});
  try{
   assert.equal(db.prepare('SELECT count(*) n FROM native_creation_artifacts').get()?.n,0);
   assert.equal(db.prepare("SELECT count(*) n FROM native_creation_audit WHERE event='cancelled'").get()?.n,1);
  }finally{db.close();}
 }finally{
  release();
  MarkdownRenderer.prototype.render=original;
  await service.close();
  const actual=realpathSync(dir);
  assert.equal(dirname(actual),realpathSync(tmpdir()));
  assert.ok(basename(actual).startsWith('creation-running-cancel-'));
  rmSync(actual,{recursive:true,force:true});
 }
});
