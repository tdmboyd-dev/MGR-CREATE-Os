import test from "node:test";
import assert from "node:assert/strict";
import {mkdtempSync,rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {createHash} from "node:crypto";
import {DatabaseSync} from "node:sqlite";
import {createNativeCreationService,type NativeDocumentRequest} from "../src/api/local-service.js";

test("native Creation service produces real bytes with tenant isolation, idempotency, restart and cancellation",async()=>{
 const dir=mkdtempSync(join(tmpdir(),"mgr-native-creation-"));const dbPath=join(dir,"creation.db");
 const principals=[{token:"fixture-creation-owner-token-long",tenantId:"tenant-a",actorId:"owner-a"},{token:"fixture-other-owner-token-long",tenantId:"tenant-b",actorId:"owner-b"}];
 let service=createNativeCreationService({dbPath,principals});
 const listen=async()=>{await new Promise<void>(resolve=>service.server.listen(0,"127.0.0.1",resolve));return `http://127.0.0.1:${(service.server.address() as {port:number}).port}`;};
 let origin=await listen();
 const call=(path:string,body?:unknown,token=principals[0].token,headers:Record<string,string>={})=>fetch(origin+path,{method:body===undefined?"GET":"POST",headers:{authorization:`Bearer ${token}`,"content-type":"application/json",...headers},...(body===undefined?{}:{body:JSON.stringify(body)})});
 const spec:NativeDocumentRequest={requestId:"doc-1",tenantId:"tenant-a",workspaceId:"workspace-a",capability:"document.markdown",input:{actorId:"owner-a",payload:{title:"Actual native document",sections:[{heading:"Proof",body:"These bytes were rendered and stored."}],rightsRefs:["owner-authored-fixture"]}},acceptanceCriteria:["actual nonempty Markdown bytes"],maxCost:0};
 try{
  assert.equal((await call("/health",undefined,"")).status,401);
  assert.equal((await call("/v1/creation/jobs",{...spec,tenantId:"tenant-b"})).status,403);
  assert.equal((await call("/health",undefined,principals[0].token,{"x-actor-id":"owner-b"})).status,403);
  assert.equal((await call("/v1/creation/jobs",{...spec,input:{...spec.input,payload:{...spec.input.payload,rightsRefs:[]}}})).status,400);
  const response=await call("/v1/creation/jobs",spec);assert.equal(response.status,201);const first=await response.json();assert.equal(first.status,"SUCCEEDED");assert.equal(first.artifacts.length,1);
  const artifact=first.artifacts[0];const output=await call(artifact.downloadPath);const bytes=Buffer.from(await output.arrayBuffer());assert.match(bytes.toString(),/# Actual native document/);assert.equal(bytes.length,artifact.bytes);assert.equal(createHash("sha256").update(bytes).digest("hex"),artifact.sha256);
  assert.equal((await call(artifact.downloadPath,undefined,principals[1].token)).status,404);
  assert.equal((await call("/v1/creation/jobs/doc-1",undefined,principals[1].token)).status,404);
  assert.deepEqual((await (await call("/v1/creation/jobs",spec)).json()).artifactRefs,first.artifactRefs);
  assert.equal((await call("/v1/creation/jobs",{...spec,input:{...spec.input,payload:{...spec.input.payload,title:"changed"}}})).status,409);
  await service.close();service=createNativeCreationService({dbPath,principals});origin=await listen();
  assert.equal((await (await call("/v1/creation/jobs/doc-1")).json()).status,"SUCCEEDED");
  assert.equal((await (await call(artifact.downloadPath)).text()),bytes.toString());
  const queued=await (await call("/v1/creation/jobs",{...spec,requestId:"cancel-1",defer:true})).json();assert.equal(queued.status,"QUEUED");
  assert.equal((await (await call("/v1/creation/jobs/cancel-1/cancel",{})).json()).status,"CANCELLED");
  assert.equal((await call("/v1/creation/jobs/cancel-1/run",{})).status,409);
  assert.equal((await call("/v1/creation/jobs/doc-1/cancel",{})).status,409);
  const db=new DatabaseSync(dbPath);assert.equal((db.prepare("SELECT count(*) n FROM native_creation_artifacts").get() as {n:number}).n,1);assert.equal((db.prepare("SELECT count(*) n FROM native_creation_audit WHERE event='artifact-produced'").get() as {n:number}).n,1);db.close();
 }finally{await service.close();rmSync(dir,{recursive:true,force:true});}
});
