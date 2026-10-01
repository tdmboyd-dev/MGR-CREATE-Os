import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validate,compile,impact,checkBudget,checkMiniMax,digest,main} from '../mgr-production-brain/skills/production-brain/scripts/brain.mjs';
import {fileURLToPath} from 'node:url';
const fixture=new URL('../mgr-production-brain/skills/production-brain/assets/example-plan.json',import.meta.url);
const fresh=()=>JSON.parse(readFileSync(fixture,'utf8'));
const invalid=(mutate,code)=>{const p=fresh();mutate(p);const r=validate(p);assert.equal(r.ok,false);assert.ok(r.errors.some(e=>e.code===code),JSON.stringify(r));};
test('complete film/site intent compiles without mutation and preserves all shots',()=>{
 const p=fresh(),before=JSON.stringify(p),h=compile(p);
 assert.equal(validate(p).ok,true);assert.equal(h.shots.length,3);assert.equal(h.site.controls.length,3);
 assert.ok(h.shots[1].prompt.includes('amber cuff'));assert.equal(h.executionStatus,'NONEXECUTABLE');assert.equal(JSON.stringify(p),before);
});
test('invalid plan types produce structured failures',()=>{for(const p of [null,[],1,'x',{}])assert.equal(validate(p).ok,false);});
test('empty deliverable rejected',()=>invalid(p=>{p.nodes=[];delete p.site;},'EMPTY'));
test('duplicate IDs rejected across assets and shots',()=>invalid(p=>p.assets.push({id:'shot-01',type:'image',version:'1',rights:'unknown',provenance:'draft'}),'DUPLICATE_ID'));
test('dangling dependency rejected',()=>invalid(p=>p.nodes[0].dependsOn=['missing'],'DANGLING'));
test('two-node cycle rejected',()=>invalid(p=>p.nodes[0].dependsOn=['shot-02'],'CYCLE'));
test('self-cycle rejected',()=>invalid(p=>p.nodes[0].dependsOn=['shot-01'],'CYCLE'));
test('unknown reference rejected',()=>invalid(p=>p.nodes[0].references=[{assetId:'missing',role:'first_frame'}],'REFERENCE'));
test('out of duration and overlapping beats rejected',()=>{invalid(p=>p.nodes[0].beats[2].to=7,'BEAT_TIMING');invalid(p=>p.nodes[0].beats[1].from=1,'BEAT_TIMING');});
test('NaN, infinity, zero and negative duration rejected',()=>{for(const value of [NaN,Infinity,0,-1])invalid(p=>p.nodes[0].duration=value,'DURATION');});
test('missing actual website action rejected',()=>invalid(p=>p.site.controls[0].action='','CONTROL'));
test('missing reduced-motion behavior rejected',()=>invalid(p=>delete p.site.motion[0].reducedMotion,'MOTION'));
test('unmapped site assets rejected',()=>invalid(p=>p.site.assetIds=['missing'],'SITE_ASSET'));
test('valid branch keeps prior immutable and identifies downstream changes',()=>{
 const p=fresh(),before=JSON.stringify(p),n=structuredClone(p);n.revision++;n.nodes[1].action+=' Hold the final pose.';
 assert.equal(validate(n,p).ok,true);assert.deepEqual(impact(p,n).changedOrAffected,['shot-02','shot-03']);assert.equal(JSON.stringify(p),before);
});
test('lock deletion cannot bypass prior authority',()=>{const p=fresh(),n=structuredClone(p);n.revision++;n.locks=[];n.context.hero='replacement';assert.ok(validate(n,p).errors.some(e=>e.code==='LOCK_CHANGED'));});
test('changing both lock and its value cannot bypass prior authority',()=>{const p=fresh(),n=structuredClone(p);n.revision++;n.context.hero='replacement';n.locks[0].value='replacement';assert.equal(validate(n).ok,true);assert.equal(validate(n,p).ok,false);});
test('missing and malformed lock pointers fail',()=>{invalid(p=>p.locks=[{path:'/missing',value:'x'}],'LOCK');invalid(p=>p.locks=[{path:'context/hero',value:'x'}],'LOCK');});
test('wrong project or skipped revision rejected',()=>{const p=fresh(),n=structuredClone(p);n.revision=3;assert.equal(validate(n,p).ok,false);n.revision=2;n.id='other';assert.equal(validate(n,p).ok,false);});
test('context changes invalidate all shots and site',()=>{const p=fresh(),n=structuredClone(p);n.revision++;n.context.palette='green';const r=impact(p,n);assert.equal(r.changedOrAffected.length,3);assert.equal(r.siteAffected,true);});
test('asset changes propagate through reference edges and site',()=>{
 const p=fresh();p.assets=[{id:'hero',type:'image',version:'1',provenance:'test',rights:'test only'}];p.nodes[0].references=[{assetId:'hero',role:'reference_image'}];p.site.assetIds=['hero'];
 const n=structuredClone(p);n.revision++;n.assets[0].version='2';const r=impact(p,n);assert.deepEqual(r.changedOrAffected,['hero','shot-01','shot-02','shot-03']);assert.equal(r.siteAffected,true);
});
test('unknown compiler fails instead of substituting model',()=>assert.throws(()=>compile(fresh(),'imaginary'),/Unknown compiler/));
test('H3 text-only draft has explicit model and request body',()=>{const h=compile(fresh(),'minimax-h3');assert.equal(h.shots[0].body.model,'MiniMax-H3');assert.equal(h.shots[0].body.content[0].type,'text');assert.equal(h.executionStatus,'NEEDS_LIVE_SCHEMA_AND_ACCOUNT_CHECK');});
test('H3 Max duration and resolution boundaries differ',()=>{const n=fresh().nodes[0];n.duration=4;assert.ok(checkMiniMax(n,'MiniMax-H3-Max').some(e=>e.includes('5-15')));n.duration=6;n.resolution='2K';assert.ok(checkMiniMax(n,'MiniMax-H3-Max').some(e=>e.includes('resolution')));assert.deepEqual(checkMiniMax(n,'MiniMax-H3'),[]);});
test('text-only adaptive ratio rejected',()=>{const n=fresh().nodes[0];n.ratio='adaptive';assert.ok(checkMiniMax(n,'MiniMax-H3').some(e=>e.includes('concrete')));});
test('mixed first-frame and reference mode rejected',()=>{const n=fresh().nodes[0];n.references=[{assetId:'a',role:'first_frame'},{assetId:'b',role:'reference_image'}];assert.ok(checkMiniMax(n,'MiniMax-H3').some(e=>e.includes('cannot mix')));assert.ok(checkMiniMax(n,'MiniMax-H3').some(e=>e.includes('ignored')));});
test('apparently valid media still requires independent inspection',()=>{const p=fresh();p.assets=[{id:'a',type:'image',version:'1',provenance:'declared',rights:'declared'}];p.nodes[0].references=[{assetId:'a',role:'first_frame'}];p.nodes[0].ratio='adaptive';assert.throws(()=>compile(p,'minimax-h3'),/Provider constraints/);});
test('unknown structural control is never silently omitted',()=>{const p=fresh();p.nodes[0].requiredControls.push('exactCameraPath');assert.throws(()=>compile(p,'minimax-h3'),/Provider constraints/);assert.ok(compile(p).shots[0].requiredControls.includes('exactCameraPath'));});
test('handoff retains original request, canonical context and asset metadata',()=>{const p=fresh();p.assets=[{id:'art',type:'image',version:'v1',provenance:'fixture',rights:'unverified'}];const h=compile(p);assert.deepEqual(h.assets,p.assets);assert.deepEqual(h.context,p.context);assert.equal(h.rawRequest,p.rawRequest);assert.equal(h.shots[0].ratio,'16:9');});
test('budget checks digest expiry currency and amount without granting authority',()=>{
 const h=compile(fresh()),now=Date.parse('2026-10-01T00:00:00Z');const q={quoteId:'test-only',source:'synthetic fixture, not vendor quote',handoffDigest:h.handoffDigest,currency:'USD',amountMinor:20,expiresAt:'2026-10-01T01:00:00Z'},b={currency:'USD',limitMinor:30};
 const r=checkBudget(h,q,b,now);assert.equal(r.ok,true);assert.equal(r.spendingAuthorized,false);
 for(const change of [{amountMinor:31},{amountMinor:-1},{amountMinor:0.2},{amountMinor:Number.MAX_SAFE_INTEGER+1},{currency:'EUR'},{expiresAt:'invalid'},{expiresAt:'2026-09-01'},{handoffDigest:'other'}])assert.equal(checkBudget(h,{...q,...change},b,now).ok,false);
 h.shots[0].prompt+=' mutated';assert.equal(checkBudget(h,q,b,now).ok,false);
});
test('any changed handoff invalidates old quote',()=>{const p=fresh(),h=compile(p);p.nodes[0].lighting+=' New source';const n=compile(p);assert.notEqual(h.handoffDigest,n.handoffDigest);assert.notEqual(digest(p),h.planDigest);});
test('CLI dispatcher reads actual fixture and rejects unknown commands',()=>{
 assert.equal(main(['validate',fileURLToPath(fixture)]).ok,true);
 assert.throws(()=>main(['bad']),/Usage/);
});
