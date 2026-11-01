// Explicit two-revision owner SDK/HTTP/SQLite migration qualification. No model calls.
import test from 'node:test';import assert from 'node:assert/strict';
import {mkdtempSync,rmSync,existsSync} from 'node:fs';import {tmpdir} from 'node:os';import {join,resolve} from 'node:path';import {pathToFileURL} from 'node:url';import {DatabaseSync} from 'node:sqlite';import {createServer} from 'node:net';
const required=name=>{assert.ok(process.env[name],name+' required');return resolve(process.env[name]);};
const one=required('MGR_DEPT_ONE_ROOT'),edgeRoot=required('MGR_DEPT_EDGE_ROOT'),old=required('MGR_CREATION_OLD_ROOT'),next=required('MGR_DEPT_CREATION_ROOT');
assert.notEqual(old,next,'two distinct source roots required');
const load=p=>import(pathToFileURL(join(one,p)));const {startOwnerDepartments}=await load('web/owner-departments.mjs'),{ReignStore}=await load('web/durable-store.mjs'),{ExecutionCoordinator}=await load('web/execution-coordinator.mjs');
const port=async()=>{const s=createServer();await new Promise((r,j)=>{s.once('error',j);s.listen(0,'127.0.0.1',r);});const p=s.address().port;await new Promise(r=>s.close(r));return p;};
test('original Creation -> joined source -> cold reopen preserves owner approvals, jobs and exact artifacts',async t=>{
 const home=mkdtempSync(join(tmpdir(),'creation-history-migration-'));let store,services;
 const snapshot=()=>{const db=new DatabaseSync(join(home,'creation.sqlite'),{readOnly:true});try{return {jobs:db.prepare('SELECT * FROM native_creation_jobs ORDER BY rowid').all(),artifacts:db.prepare('SELECT * FROM native_creation_artifacts ORDER BY rowid').all(),audit:db.prepare('SELECT * FROM native_creation_audit ORDER BY rowid').all()};}finally{db.close();}};
 const stop=async()=>{await services?.close();services=null;if(store?.db.isOpen)store.close();};
 const open=async(root,first=false)=>{store=new ReignStore(join(home,'runtime.sqlite'));const coordinator=new ExecutionCoordinator(store);if(first)coordinator.enrollFreshHost(coordinator.hostContext());services=await startOwnerDepartments({home,store,coordinator,actorId:'owned-migration-test',edgeRoot,creationRoot:root,edgePort:await port(),creationPort:await port()});return services.workflows;};
 const command=(id,title)=>({requestId:id,operation:'creation.document.render',input:{workspaceId:'owned-workspace',title,sections:[{heading:'Original',body:'Exact original owner text 🦋 café.'}],rightsRefs:['owned-authorship']}});
 const create=async(w,c)=>{const p=w.preview(c);await assert.rejects(w.execute(c.requestId,p.digest));w.approve(c.requestId,p.digest);assert.equal((await w.execute(c.requestId,p.digest)).state,'succeeded');return {saved:w.load(c.requestId),artifact:await w.artifact(c.requestId)};};
 try{
  let w=await open(old,true);const c=command('creation-history-original','Original saved document'),original=await create(w,c),before=snapshot();assert.equal(before.jobs.length,1);assert.equal(before.artifacts.length,1);await stop();
  // Represent the genuine pre-producer-fence schema while preserving an original-source result.
  const db=new DatabaseSync(join(home,'creation.sqlite'));try{db.exec('ALTER TABLE native_creation_jobs DROP COLUMN producerToken');}finally{db.close();}
  w=await open(next);const migrated=snapshot();assert.equal(migrated.jobs[0].producerToken,null);assert.deepEqual(migrated.artifacts,before.artifacts);assert.deepEqual(migrated.audit,before.audit);
  for(const [key,value] of Object.entries(before.jobs[0]))if(key!=='producerToken')assert.deepEqual(migrated.jobs[0][key],value,key);
  assert.deepEqual(w.load(c.requestId),original.saved);assert.equal((await w.execute(c.requestId,original.saved.digest)).state,'succeeded');assert.deepEqual(await w.artifact(c.requestId),original.artifact);assert.deepEqual(snapshot(),migrated,'replay must not create a native job, artifact or audit event');
  const fresh=await create(w,command('creation-history-new','New exact 🌍 document'));assert.match(Buffer.from(fresh.artifact.contentBase64,'base64').toString(),/New exact 🌍 document/);assert.equal(snapshot().jobs.length,2);const durable=snapshot();await stop();
  w=await open(next);for(const saved of [original,fresh]){const id=saved.saved.command.requestId;assert.equal((await w.execute(id,saved.saved.digest)).state,'succeeded');assert.deepEqual(await w.artifact(id),saved.artifact);}assert.deepEqual(snapshot(),durable);assert.equal(store.db.prepare('SELECT count(*) n FROM execution_effects WHERE state=?').get('settled').n,2);
  console.log(JSON.stringify({scope:'two-source owner factory / anchored approval / official SDK / HTTP / SQLite / exact native bytes / legacy column migration / cold replay',nativeJobs:2,originalArtifactsPreserved:true,replayCreates:0,modelCalls:0,productionAccepted:false}));
 }finally{await stop();rmSync(home,{recursive:true,force:true});assert.equal(existsSync(home),false);}
});
