import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
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
