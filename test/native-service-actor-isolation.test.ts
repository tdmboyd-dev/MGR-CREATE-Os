import test from "node:test";
import assert from "node:assert/strict";
import {mkdtempSync,rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {createNativeCreationService} from "../src/api/local-service.js";
import {DatabaseSync} from "node:sqlite";

test("same-tenant actors cannot read, download, replay, run or cancel another actor's Creation job",async()=>{
 const dir=mkdtempSync(join(tmpdir(),"mgr-creation-actor-review-"));
 const principals=[{token:"independent-owner-service-token-long",tenantId:"same-tenant",actorId:"actor-owner"},{token:"independent-peer-service-token-long",tenantId:"same-tenant",actorId:"actor-peer"}];
 const service=createNativeCreationService({dbPath:join(dir,"fixture.db"),principals});
 await new Promise<void>(resolve=>service.server.listen(0,"127.0.0.1",resolve));
 const base=`http://127.0.0.1:${(service.server.address() as {port:number}).port}`;
 const call=(path:string,actor=0,payload?:unknown)=>fetch(base+path,{method:payload===undefined?"GET":"POST",headers:{authorization:`Bearer ${principals[actor].token}`,"content-type":"application/json"},...(payload===undefined?{}:{body:JSON.stringify(payload)})});
 const spec={requestId:"actor-owned",tenantId:"same-tenant",workspaceId:"workspace",capability:"document.markdown",input:{payload:{title:"Private owner source",sections:[{heading:"Private",body:"Owner-only source bytes"}],rightsRefs:["owner-authored"]}},acceptanceCriteria:["saved output"],maxCost:0};
 try{
  const created=await call("/v1/creation/jobs",0,spec);assert.equal(created.status,201);const result=await created.json();
  assert.equal((await call("/v1/creation/jobs/actor-owned",1)).status,404);
  assert.equal((await call(result.artifacts[0].downloadPath,1)).status,404);
  assert.equal((await call("/v1/creation/jobs",1,spec)).status,404);
  assert.equal((await call("/v1/creation/jobs/actor-owned/run",1,{})).status,404);
  const queued={...spec,requestId:"owner-queued",defer:true};
  assert.equal((await call("/v1/creation/jobs",0,queued)).status,201);
  assert.equal((await call("/v1/creation/jobs/owner-queued/cancel",1,{})).status,404);
  assert.equal((await call("/v1/creation/jobs/owner-queued/run",1,{})).status,404);
  assert.equal((await (await call("/v1/creation/jobs/owner-queued",0)).json()).status,"QUEUED");
  assert.equal((await call(result.artifacts[0].downloadPath,0)).status,200);
  // Simulate a preserved legacy row without authoritative actor ownership.
  const db=new DatabaseSync(join(dir,"fixture.db"));
  db.prepare("UPDATE native_creation_jobs SET spec=? WHERE requestId=?").run(JSON.stringify(spec),"actor-owned");
  db.close();
  assert.equal((await call("/v1/creation/jobs/actor-owned",0)).status,404);
  assert.equal((await call(result.artifacts[0].downloadPath,0)).status,404);
  assert.equal((await call("/v1/creation/jobs",0,spec)).status,404);
 }finally{await service.close();rmSync(dir,{recursive:true,force:true});}
});
