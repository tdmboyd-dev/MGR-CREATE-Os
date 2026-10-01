import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {DatabaseSync} from 'node:sqlite';
import {ProductionStore} from '../mgr-production-brain/skills/production-brain/scripts/store.mjs';
import {inspectCamera,segmentBox} from '../mgr-production-brain/skills/production-brain/scripts/camera.mjs';
const base=JSON.parse(readFileSync(new URL('../mgr-production-brain/skills/production-brain/assets/example-plan.json',import.meta.url)));
const fresh=()=>structuredClone(base);
const dbPath=()=>join(mkdtempSync(join(tmpdir(),'mgr-native-')),'project.sqlite');
const metadata={id:'reference',version:1,provenance:'generated fixture',rights:'test fixture',parents:[]};
test('opening an unrelated database does not install production tables',()=>{
  const file=dbPath(),other=new DatabaseSync(file);other.exec('CREATE TABLE unrelated(value TEXT)');other.close();assert.throws(()=>new ProductionStore(file),/Not an MGR/);const read=new DatabaseSync(file);try{assert.deepEqual(read.prepare("SELECT name FROM sqlite_master WHERE type='table'").all().map(r=>r.name),['unrelated']);}finally{read.close();}
});
test('plans survive reopen; stale second writer cannot replace history',()=>{
  const file=dbPath(),a=new ProductionStore(file),b=new ProductionStore(file),p=fresh();
  try{a.savePlan(p,0);const next={...p,revision:2};a.savePlan(next,1);assert.throws(()=>b.savePlan(next,1),/Stale/);assert.equal(b.getPlan(p.id,1).revision,1);}finally{a.close();b.close();}
  const reopened=new ProductionStore(file);try{assert.equal(reopened.getPlan(p.id).revision,2);}finally{reopened.close();}
});
test('stored locks cannot be removed; failed revision leaves current plan intact',()=>{
  const s=new ProductionStore(':memory:'),p=fresh();try{s.savePlan(p,0);assert.throws(()=>s.savePlan({...p,revision:2,locks:[]},1),/rejected/);assert.equal(s.getPlan(p.id).revision,1);assert.throws(()=>s.savePlan({...p,revision:2,context:{x:NaN}},1),/Nonfinite/);}finally{s.close();}
});
test('byte identity, restart, detached lineage and consecutive versions',()=>{
  const file=dbPath(),s=new ProductionStore(file),p=fresh();let first;
  try{s.savePlan(p,0);const bytes=Buffer.from('original');first=s.admitAsset(p.id,metadata,bytes);bytes.fill(0);assert.equal(s.assetBytes(p.id,'reference',1).toString(),'original');const second=s.admitAsset(p.id,{...metadata,version:2,parents:[{id:'reference',version:1}]},Buffer.from('changed'));assert.notEqual(first.digest,second.digest);second.parents.push({id:'fake',version:1});assert.equal(s.getAsset(p.id,'reference',2).parents.length,1);assert.throws(()=>s.admitAsset(p.id,metadata,Buffer.from('bad')),/consecutive/);}finally{s.close();}
  const reopened=new ProductionStore(file);try{assert.equal(reopened.assetBytes(p.id,'reference',1).toString(),'original');}finally{reopened.close();}
});
test('missing and cross-project parents fail atomically',()=>{
  const s=new ProductionStore(':memory:'),p=fresh();try{s.savePlan(p,0);s.admitAsset(p.id,metadata,Buffer.from('one'));const other={...p,id:'other'};s.savePlan(other,0);assert.throws(()=>s.admitAsset(other.id,{...metadata,id:'derived',parents:[{id:'reference',version:1}]},Buffer.from('two')),/Unknown parent/);assert.equal(s.getAsset(other.id,'derived',1),null);}finally{s.close();}
});
test('oversized admission and corrupted recovery are rejected',()=>{
  const file=dbPath(),s=new ProductionStore(file,{maxAssetBytes:3}),p=fresh();s.savePlan(p,0);assert.throws(()=>s.admitAsset(p.id,metadata,Buffer.alloc(4)),/limit/);const receipt=s.admitAsset(p.id,metadata,Buffer.from('one'));s.close();const db=new DatabaseSync(file);db.prepare('UPDATE objects SET bytes=? WHERE digest=?').run(Buffer.from('bad'),receipt.digest);db.close();const r=new ProductionStore(file);try{assert.throws(()=>r.assetBytes(p.id,'reference',1),/integrity/);}finally{r.close();}
});
const box={id:'wall',min:[-1,-1,-1],max:[1,1,1]};
const scene=()=>({units:'metres',duration:2,coverage:'complete-static-proxies',camera:{focalLengthMm:35,sensorWidthMm:36,sensorHeightMm:24,near:.01,far:100,clearance:0},samples:[{time:0,position:[-3,0,0],target:[-3,0,-5],up:[0,1,0]},{time:2,position:[3,0,0],target:[3,0,-5],up:[0,1,0]}],colliders:[box],subjects:[{id:'subject',min:[-.5,-.5,-6],max:[.5,.5,-5]}]});
test('segment slab cases: between frames, parallel, tangent, inside, zero motion',()=>{
  assert.deepEqual(segmentBox([-3,0,0],[3,0,0],box),{entry:1/3,exit:2/3});
  assert.equal(segmentBox([-3,2,0],[3,2,0],box),null);
  assert.ok(segmentBox([-3,1,0],[3,1,0],box));
  assert.equal(segmentBox([0,0,0],[3,0,0],box).entry,0);
  assert.deepEqual(segmentBox([0,0,0],[0,0,0],box),{entry:0,exit:1});
});
test('camera reports continuous linear path collisions with bound digest',()=>{
  const s=scene(),r=inspectCamera(s);assert.equal(r.pathStatus,'COLLISION');assert.equal(r.collisions[0].time,2/3);s.colliders=[];assert.notEqual(inspectCamera(s).inputDigest,r.inputDigest);assert.equal(inspectCamera(s).pathStatus,'CLEAR_DECLARED_PROXIES');s.coverage='partial';assert.equal(inspectCamera(s).pathStatus,'UNVERIFIED_COVERAGE');
});
test('camera rejects NaN, bad lens, empty samples, incomplete timing and collinear basis',()=>{
  for(const change of [s=>s.duration=NaN,s=>s.camera.focalLengthMm=-1,s=>s.samples=[],s=>s.samples[1].time=3,s=>s.samples[0].target=s.samples[0].position,s=>s.samples[0].up=[0,0,-1]]){const s=scene();change(s);assert.throws(()=>inspectCamera(s));}
});
test('near-plane bounds are unavailable, clearance conservative, translation invariant',()=>{
  const s=scene();s.subjects=[{id:'near',min:[-4,-1,-.005],max:[4,1,.005]}];assert.equal(inspectCamera(s).framing[0].status,'UNAVAILABLE_DEPTH_RANGE');assert.ok(segmentBox([-3,1.1,0],[3,1.1,0],box,.2));const moved={id:'wall',min:box.min.map(v=>v+100),max:box.max.map(v=>v+100)};assert.deepEqual(segmentBox([97,100,100],[103,100,100],moved),segmentBox([-3,0,0],[3,0,0],box));
});
