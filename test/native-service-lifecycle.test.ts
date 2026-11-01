import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync,existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {DatabaseSync} from 'node:sqlite';
import {createNativeCreationService} from '../src/api/local-service.js';
const listen=async(s:ReturnType<typeof createNativeCreationService>)=>{await new Promise<void>(r=>s.server.listen(0,'127.0.0.1',r));return 'http://127.0.0.1:'+(s.server.address() as {port:number}).port;};
const principals=()=>[{token:'fixture-owner-credential-long-enough',tenantId:'tenant',actorId:'owner'},{token:'fixture-peer-credential-long-enough',tenantId:'tenant',actorId:'peer'}];
const request=()=>({requestId:'native-audit-request',tenantId:'tenant',workspaceId:'workspace',capability:'document.markdown',input:{payload:{title:'Original exact document',sections:[{heading:'Source',body:'Original text'}],rightsRefs:['owner-authored-fixture']}},acceptanceCriteria:['exact saved bytes'],maxCost:0});

test('native credentials retain their enrolled actor and tenant when caller configuration changes',async()=>{
 const dir=mkdtempSync(join(tmpdir(),'creation-principal-snapshot-')),options={dbPath:join(dir,'fixture.sqlite'),principals:principals()},s=createNativeCreationService(options),base=await listen(s);const owner=options.principals[0].token,peer=options.principals[1].token;
 const call=(path:string,token:string,body?:unknown)=>fetch(base+path,{method:body?'POST':'GET',headers:{authorization:'Bearer '+token,'content-type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});
 try{const created=await (await call('/v1/creation/jobs',owner,request())).json();assert.equal(created.status,'SUCCEEDED');options.principals[1].actorId='owner';assert.equal((await call(created.artifacts[0].downloadPath,peer)).status,404);assert.equal((await (await call('/health',peer)).json()).actorId,'peer');options.principals=[{token:'new-unenrolled-credential-long-enough',tenantId:'tenant',actorId:'owner'}];assert.equal((await call('/health',owner)).status,200);assert.equal((await call('/health',options.principals[0].token)).status,401);}finally{await s.close();rmSync(dir,{recursive:true,force:true});}
});

test('ambiguous duplicate credentials are rejected before opening a domain database',async()=>{
 const dir=mkdtempSync(join(tmpdir(),'creation-duplicate-credential-')),dbPath=join(dir,'fixture.sqlite'),p=principals();p[1].token=p[0].token;let service:ReturnType<typeof createNativeCreationService>|undefined;
 try{assert.throws(()=>{service=createNativeCreationService({dbPath,principals:p});},/principal|credential/i);assert.equal(existsSync(dbPath),false);}finally{if(service){await listen(service);await service.close();}rmSync(dir,{recursive:true,force:true});}
});

test('unstarted native service closes its database and repeated close keeps the same result',async()=>{
 const dir=mkdtempSync(join(tmpdir(),'creation-unstarted-close-')),dbPath=join(dir,'fixture.sqlite'),s=createNativeCreationService({dbPath,principals:principals()});let clean=false;
 try{await Promise.all([s.close(),s.close()]);await s.close();clean=true;rmSync(dbPath);assert.equal(existsSync(dbPath),false);}finally{if(!clean){await listen(s);await s.close();}rmSync(dir,{recursive:true,force:true});}
});

test('failed native schema migration rolls back newly created tables and preserves the original database',()=>{
 const dir=mkdtempSync(join(tmpdir(),'creation-atomic-start-')),dbPath=join(dir,'fixture.sqlite');let db=new DatabaseSync(dbPath);db.exec('CREATE TABLE native_creation_jobs(original_marker TEXT); INSERT INTO native_creation_jobs VALUES(\'preserve-original\')');db.close();
 try{assert.throws(()=>createNativeCreationService({dbPath,principals:principals()}));db=new DatabaseSync(dbPath);try{assert.deepEqual(db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all().map(x=>x.name),['native_creation_jobs']);assert.equal(db.prepare('SELECT original_marker FROM native_creation_jobs').get()!.original_marker,'preserve-original');assert.deepEqual(db.prepare('PRAGMA table_info(native_creation_jobs)').all().map(x=>x.name),['original_marker']);}finally{db.close();}}finally{rmSync(dir,{recursive:true,force:true});}
});

for(const mode of ['invalid-utf8','unpaired-surrogate'])test('native input refuses '+mode+' before allocating a request or artifact',async()=>{
 const dir=mkdtempSync(join(tmpdir(),'creation-exact-text-')),dbPath=join(dir,'fixture.sqlite'),p=principals(),s=createNativeCreationService({dbPath,principals:p}),base=await listen(s);
 try{const spec=request();let raw:Buffer;if(mode==='unpaired-surrogate'){spec.input.payload.title='invalid\ud800text';raw=Buffer.from(JSON.stringify(spec));}else{spec.input.payload.title='unique-invalid-marker';raw=Buffer.from(JSON.stringify(spec).replace('unique-invalid-marker','bad-X-input'));const offset=raw.indexOf('bad-X-input')+4;raw[offset]=255;}const response=await fetch(base+'/v1/creation/jobs',{method:'POST',headers:{authorization:'Bearer '+p[0].token,'content-type':'application/json'},body:new Uint8Array(raw)});assert.equal(response.status,400);const db=new DatabaseSync(dbPath);try{assert.equal(db.prepare('SELECT count(*) n FROM native_creation_jobs').get()!.n,0);assert.equal(db.prepare('SELECT count(*) n FROM native_creation_artifacts').get()!.n,0);}finally{db.close();}}finally{await s.close();rmSync(dir,{recursive:true,force:true});}
});

test('native exact text preserves valid emoji and multibyte output',async()=>{
 const dir=mkdtempSync(join(tmpdir(),'creation-valid-unicode-')),p=principals(),s=createNativeCreationService({dbPath:join(dir,'fixture.sqlite'),principals:p}),base=await listen(s);
 try{const spec=request();spec.input.payload.title='Original 🌍 café';spec.input.payload.sections[0].body='Exact 🦋 résumé';const response=await fetch(base+'/v1/creation/jobs',{method:'POST',headers:{authorization:'Bearer '+p[0].token,'content-type':'application/json'},body:JSON.stringify(spec)});assert.equal(response.status,201);const result=await response.json();const artifact=await fetch(base+result.artifacts[0].downloadPath,{headers:{authorization:'Bearer '+p[0].token}});assert.equal(await artifact.text(),'# Original 🌍 café\n\n## Source\n\nExact 🦋 résumé');}finally{await s.close();rmSync(dir,{recursive:true,force:true});}
});
