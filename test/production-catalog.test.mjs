import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {ProductionCatalog,validateCatalog,FIELDS} from '../src/knowledge/production-catalog.mjs';
const data=JSON.parse(readFileSync(new URL('../research/production-knowledge/catalog.json',import.meta.url),'utf8'));
const clone=()=>structuredClone(data);
test('real research retains every child and all sixteen packet fields',()=>{
 assert.deepEqual(validateCatalog(data),{ok:true,errors:[]});
 assert.equal(data.tracks.length,75); assert.equal(data.packets.length,93);
 for(const track of data.tracks){const p=data.packets.find(p=>p.id===track.packetIds[0]);assert.equal(p.id,'P-'+track.id.slice(3));assert.ok(p.decision&&p.alternative&&p.fixtures&&p.remainingEvidence);}
 assert.equal(FIELDS.length,16);assert.equal(new ProductionCatalog(data).summary().researchReady,0);
});
test('exact ID and useful keyword retrieval; unrelated intent has no fabricated answer',()=>{
 const c=new ProductionCatalog(data);
 assert.equal(c.search('PR-CAMERA-04')[0].id,'PR-CAMERA-04');
 assert.ok(c.search('raster vector').some(x=>x.id.startsWith('PR-VECTOR')));
 assert.deepEqual(c.search('xyzzymagicunknown'),[]);
 assert.throws(()=>c.search(''));assert.throws(()=>c.search('camera',51));
});
test('source list and category packet do not certify child completion',()=>{
 const c=new ProductionCatalog(data),r=c.readiness('PR-CAMERA-04');
 assert.equal(r.researchReady,false);assert.equal(r.executionAuthorized,false);
 assert.ok(r.blockers.some(x=>x.includes('completion evidence')));
 const altered=clone(); altered.tracks[0].researchComplete=true;
 assert.equal(new ProductionCatalog(altered).readiness(altered.tracks[0].id).researchReady,false);
});
test('handoff expands and orders dependencies before requested work',()=>{
 const c=new ProductionCatalog(data),p=c.plan(['PR-CAMERA-04']);
 assert.equal(p.executionAuthorized,false);assert.equal(p.researchReady,false);
 const indices=new Map(p.steps.map((x,i)=>[x.id,i]));
 for(const s of p.steps)for(const d of s.dependencies)assert.ok(indices.get(d)<indices.get(s.id));
 assert.equal(new Set(p.steps.map(x=>x.id)).size,p.steps.length);
 assert.throws(()=>c.plan([]));assert.throws(()=>c.plan(['imaginary']));
});
test('malformed graph and evidence references fail before catalog construction',()=>{
 for(const mutate of [
  c=>c.tracks[0].dependencies.push(c.tracks[0].id),
  c=>c.tracks[0].dependencies.push('unknown'),
  c=>c.tracks[0].dependencies=4,
  c=>c.findings[0].sourceIds=['unknown'],
  c=>c.packets[0].findingIds=[],
  c=>delete c.packets[0].fields.acceptance,
  c=>c.packets[0].scopeComplete=true,
  c=>c.sources.push(c.sources[0]),
  c=>c.sources[0].retrieved='never',
  c=>c.tracks[0].packetIds=[],
 ]){const d=clone();mutate(d);assert.equal(validateCatalog(d).ok,false);assert.throws(()=>new ProductionCatalog(d));}
 assert.equal(validateCatalog(null).ok,false);
});
test('expired and future evidence is explicitly blocked',()=>{
 const d=clone();d.sources.find(x=>x.id==='usd-camera').refreshAfter='2026-10-02';
 const c=new ProductionCatalog(d);
 assert.ok(c.readiness('PR-CAMERA-04','2026-10-03').blockers.some(x=>x.startsWith('Refresh source')));
 assert.ok(c.readiness('PR-CAMERA-04','2026-09-01').blockers.some(x=>x.startsWith('Future source')));
 assert.throws(()=>c.readiness('PR-CAMERA-04','not a date'));
});
test('caller edits cannot mutate canonical catalog or retrieved records',()=>{
 const d=clone(),c=new ProductionCatalog(d),before=c.get('PR-CAMERA-04');
 d.tracks.length=0;
 const returned=c.get('PR-CAMERA-04');returned.track.dependencies.length=0;returned.packets[0].gaps.length=0;
 const records=c.ledgerRecords();records.sources.length=0;
 assert.deepEqual(c.get('PR-CAMERA-04'),before);assert.ok(c.ledgerRecords().sources.length>0);
});
test('ledger export preserves explicit support and context without promoting categories',()=>{
 const r=new ProductionCatalog(data).ledgerRecords(),s=new Set(r.sources.map(x=>x.id)),c=new Set(r.claims.map(x=>x.id));
 assert.equal(r.claims.length,data.findings.length);
 for(const e of r.evidence){assert.ok(s.has(e.sourceId));assert.ok(c.has(e.claimId));}
 assert.ok(r.evidence.some(x=>x.support==='CONTEXT'));
 assert.ok(r.capabilities.every(x=>!x.researchComplete&&!x.verified));
 assert.equal(new Set(r.evidence.map(x=>x.id)).size,r.evidence.length);
});
