import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';

const txt = v => typeof v === 'string' && v.trim().length > 0;
const arr = v => Array.isArray(v);
const obj = v => v !== null && typeof v === 'object' && !arr(v);
const integer = v => Number.isSafeInteger(v);
const same = (a,b) => canonical(a) === canonical(b);
export function canonical(v) {
  if (arr(v)) return '[' + v.map(canonical).join(',') + ']';
  if (obj(v)) return '{' + Object.keys(v).sort().map(k => JSON.stringify(k)+':'+canonical(v[k])).join(',') + '}';
  return JSON.stringify(v);
}
export const digest = v => createHash('sha256').update(canonical(v)).digest('hex');
function pointer(o,p) {
  if (typeof p !== 'string' || !p.startsWith('/') || /~(?![01])/u.test(p)) throw Error('Invalid lock pointer');
  for (const key of p.slice(1).split('/').map(k=>k.replace(/~1/g,'/').replace(/~0/g,'~'))) {
    if (!obj(o) && !arr(o)) return undefined;
    if (!Object.hasOwn(o,key)) return undefined;
    o=o[key];
  }
  return o;
}
export function validate(p, previous) {
  const errors=[];
  const add=(code,path,message)=>errors.push({code,path,message});
  if (!obj(p)) return {ok:false,errors:[{code:'PLAN',path:'/',message:'Plan must be an object'}]};
  if (p.schemaVersion!==1) add('VERSION','/schemaVersion','Expected 1');
  for (const k of ['id','rawRequest']) if (!txt(p[k])) add('REQUIRED','/'+k,'Nonempty string required');
  if (!integer(p.revision)||p.revision<1) add('REVISION','/revision','Positive integer required');
  if (!obj(p.context)) add('CONTEXT','/context','Context object required');
  for (const k of ['assumptions','requirements']) if (!arr(p[k])||p[k].some(x=>!txt(x))||(k==='requirements'&&!p[k].length)) add('LIST','/'+k,'Array of nonempty strings required');
  for (const k of ['assets','nodes','locks']) if (!arr(p[k])) add('LIST','/'+k,'Array required');
  const nodes=arr(p.nodes)?p.nodes:[], assets=arr(p.assets)?p.assets:[];
  const entities=[...assets,...nodes], ids=new Set();
  for (const [i,e] of entities.entries()) {
    if (!obj(e)||!txt(e.id)) {add('ID','/entities/'+i,'Object with ID required');continue;}
    if(ids.has(e.id)) add('DUPLICATE_ID',e.id,'IDs must be unique across nodes and assets');
    ids.add(e.id);
  }
  for (const a of assets) if (obj(a)) {
    if (!['image','video','audio','model','document'].includes(a.type)) add('ASSET_TYPE',a.id,'Known asset type required');
    for(const k of ['version','provenance','rights']) if(!txt(a[k])) add('ASSET_METADATA',a.id,'Missing '+k);
  }
  const graph=new Map();
  for (const n of nodes) {
    if (!obj(n)) continue;
    for (const k of ['purpose','subject','action','camera','lighting','sound','startState','endState']) if(!txt(n[k])) add('SHOT_FIELD',n.id,'Missing '+k);
    if (!Number.isFinite(n.duration)||n.duration<=0) add('DURATION',n.id,'Positive finite duration required');
    if (!arr(n.acceptance)||!n.acceptance.length||n.acceptance.some(x=>!txt(x))) add('ACCEPTANCE',n.id,'Explicit criteria required');
    if (!arr(n.dependsOn)||n.dependsOn.some(x=>!txt(x))) add('DEPENDENCY',n.id,'dependsOn string array required');
    if (!arr(n.references)) add('REFERENCES',n.id,'references array required');
    if (!arr(n.requiredControls)||n.requiredControls.some(x=>!txt(x))) add('CONTROLS',n.id,'requiredControls string array required');
    const deps=arr(n.dependsOn)?[...n.dependsOn]:[];
    for(const ref of (arr(n.references)?n.references:[])) {
      if(!obj(ref)||!txt(ref.assetId)||!txt(ref.role)) {add('REFERENCE',n.id,'Reference assetId and role required');continue;}
      const a=assets.find(x=>obj(x)&&x.id===ref.assetId);
      if(!a) add('REFERENCE',n.id,'Missing asset '+ref.assetId);
      deps.push(ref.assetId);
    }
    graph.set(n.id,deps);
    for(const dep of deps) if(!ids.has(dep)) add('DANGLING',n.id,'Unknown dependency '+dep);
    if(!arr(n.beats)||!n.beats.length) add('BEATS',n.id,'Timed beats required');
    let end=0;
    for(const beat of (arr(n.beats)?n.beats:[])) {
      if(!obj(beat)||!Number.isFinite(beat.from)||!Number.isFinite(beat.to)||beat.from<end||beat.to<=beat.from||beat.to>n.duration||!txt(beat.action)) add('BEAT_TIMING',n.id,'Beats must be ordered, nonoverlapping and inside shot duration');
      if(obj(beat)) end=beat.to;
    }
  }
  const visiting=new Set(), visited=new Set();
  function walk(id) {
    if(visiting.has(id)){add('CYCLE',id,'Dependency cycle');return;}
    if(visited.has(id))return;
    visiting.add(id);
    for(const d of graph.get(id)||[]) if(graph.has(d))walk(d);
    visiting.delete(id);visited.add(id);
  }
  for(const id of graph.keys())walk(id);
  const lockPaths=new Set();
  for(const l of (arr(p.locks)?p.locks:[])) {
    if(!obj(l)||!txt(l.path)||!Object.hasOwn(l,'value')) {add('LOCK','/locks','Lock path/value required');continue;}
    if(lockPaths.has(l.path))add('LOCK','/locks','Duplicate lock path');
    lockPaths.add(l.path);
    try {if(pointer(p,l.path)===undefined||!same(pointer(p,l.path),l.value))add('LOCK',l.path,'Locked value does not match plan');}catch{add('LOCK','/locks','Invalid pointer');}
  }
  if(p.site!==undefined) {
    const s=p.site;
    if(!obj(s))add('SITE','/site','Object required');
    else {
      for(const k of ['goal','audience','visualDirection','mobile','performanceBudget'])if(!txt(s[k]))add('SITE','/site/'+k,'Nonempty requirement required');
      for(const k of ['routes','controls','motion','acceptance'])if(!arr(s[k])||!s[k].length)add('SITE','/site/'+k,'Nonempty array required');
      const routes=new Set();
      for(const r of arr(s.routes)?s.routes:[]) {
        if(!obj(r)||!txt(r.path)||!r.path.startsWith('/')||!txt(r.purpose)||routes.has(r.path))add('ROUTE','/site/routes','Unique route path and purpose required');
        if(obj(r))routes.add(r.path);
      }
      for(const c of arr(s.controls)?s.controls:[])if(!obj(c)||!txt(c.label)||!txt(c.action)||!routes.has(c.route))add('CONTROL','/site/controls','Each control needs a known route, label and actual action');
      for(const m of arr(s.motion)?s.motion:[])if(!obj(m)||!txt(m.trigger)||!txt(m.effect)||!txt(m.reducedMotion))add('MOTION','/site/motion','Trigger/effect/reduced-motion fallback required');
      if(arr(s.acceptance)&&s.acceptance.some(x=>!txt(x)))add('SITE','/site/acceptance','Text criteria required');
      if(!arr(s.assetIds)||s.assetIds.some(id=>!assets.some(a=>obj(a)&&a.id===id)))add('SITE_ASSET','/site/assetIds','Known assets array required');
    }
  }
  if(!nodes.length&&p.site===undefined)add('EMPTY','/','At least one shot or a website required');
  if(previous!==undefined) {
    const prior=validate(previous);
    if(!prior.ok)add('PRIOR','/','Previous plan is invalid');
    else {
      if(p.id!==previous.id||p.revision!==previous.revision+1)add('REVISION','/','Same project and next consecutive revision required');
      for(const l of previous.locks) {
        const retained=(arr(p.locks)?p.locks:[]).some(x=>obj(x)&&x.path===l.path&&same(x.value,l.value));
        if(!retained||!same(pointer(p,l.path),l.value))add('LOCK_CHANGED',l.path,'Prior lock must be retained and obeyed');
      }
    }
  }
  return {ok:!errors.length,errors};
}
function assertPlan(p,prev) {const r=validate(p,prev);if(!r.ok){const e=Error('Plan validation failed');e.details=r.errors;throw e;}}
export function impact(previous,next) {
  assertPlan(next,previous);
  const before=new Map([...previous.assets,...previous.nodes].map(n=>[n.id,n]));
  const after=new Map([...next.assets,...next.nodes].map(n=>[n.id,n]));
  const changed=new Set([...new Set([...before.keys(),...after.keys()])].filter(id=>!same(before.get(id),after.get(id))));
  const globals=['rawRequest','assumptions','requirements','context','locks'];
  if(globals.some(k=>!same(previous[k],next[k])))for(const n of next.nodes)changed.add(n.id);
  let progress=true;
  while(progress){progress=false;for(const n of [...previous.nodes,...next.nodes])if(!changed.has(n.id)&&[...n.dependsOn,...n.references.map(r=>r.assetId)].some(x=>changed.has(x))){changed.add(n.id);progress=true;}}
  return {projectId:next.id,fromRevision:previous.revision,toRevision:next.revision,changedOrAffected:[...changed].sort(),siteAffected:!same(previous.site,next.site)||(next.site!==undefined&&(globals.some(k=>!same(previous[k],next[k]))||next.site.assetIds.some(id=>changed.has(id))))};
}
export function prompt(p,n) {
  return [`Purpose: ${n.purpose}`,`Subject: ${n.subject}`,`Action: ${n.action}`,`Camera intention: ${n.camera}`,`Lighting: ${n.lighting}`,`Sound intention: ${n.sound}`,`Start: ${n.startState}`,`End: ${n.endState}`,`Duration: ${n.duration}s`,...n.beats.map(b=>`${b.from}-${b.to}s: ${b.action}`),`Shared context: ${canonical(p.context)}`,`Requirements: ${p.requirements.join('; ')}`,`Locked facts: ${canonical(p.locks)}`,`Reference assets: ${canonical(n.references)}`].join('\n');
}
export function checkMiniMax(n,model) {
  const errors=[];
  if(!['MiniMax-H3','MiniMax-H3-Max'].includes(model))errors.push('Unknown model');
  const min=model==='MiniMax-H3-Max'?5:4;
  if(!integer(n.duration)||n.duration<min||n.duration>15)errors.push(`Duration must be an integer ${min}-15`);
  if(!(model==='MiniMax-H3-Max'?['480P','768P']:['768P','2K']).includes(n.resolution))errors.push('Unsupported model resolution');
  const roles=n.references.map(r=>r.role), firstLast=roles.some(r=>['first_frame','last_frame'].includes(r)), refs=roles.some(r=>r.startsWith('reference_'));
  if(roles.some(r=>!['first_frame','last_frame','reference_image','reference_video','reference_audio'].includes(r)))errors.push('Unknown reference role');
  if(firstLast&&refs)errors.push('First/last frames cannot mix with reference mode');
  for(const [role,max] of Object.entries({first_frame:1,last_frame:1,reference_image:9,reference_video:3,reference_audio:3}))if(roles.filter(r=>r===role).length>max)errors.push('Too many '+role);
  if(!['adaptive','21:9','16:9','4:3','1:1','3:4','9:16'].includes(n.ratio))errors.push('Unsupported ratio');
  if(!roles.length&&n.ratio==='adaptive')errors.push('Text-only requires a concrete ratio');
  if(firstLast&&n.ratio!=='adaptive')errors.push('Image input determines ratio; concrete request would be ignored');
  if(n.references.length)errors.push('Media handoff requires independent metadata, URL and role/type inspection; text-only compiler cannot certify it');
  for(const c of n.requiredControls)if(!['duration','ratio','resolution'].includes(c))errors.push('No verified structural model control: '+c);
  return errors;
}
export function compile(p,provider='neutral') {
  assertPlan(p);
  if(!['neutral','minimax-h3','minimax-h3-max'].includes(provider))throw Error('Unknown compiler; discover live schema and use neutral handoff');
  const model=provider==='minimax-h3-max'?'MiniMax-H3-Max':'MiniMax-H3';
  const shots=p.nodes.map(n=>{
    if(provider!=='neutral'){const issues=checkMiniMax(n,model);if(issues.length){const e=Error('Provider constraints failed for '+n.id);e.details=issues;throw e;}}
    const text=prompt(p,n);
    return {id:n.id,prompt:text,duration:n.duration,ratio:n.ratio??null,resolution:n.resolution??null,requiredControls:n.requiredControls,acceptance:n.acceptance,references:n.references,dependsOn:n.dependsOn,...(provider==='neutral'?{}:{endpoint:'https://api.minimax.io/v2/video_generation',body:{model,content:[{type:'text',text}],duration:n.duration,resolution:n.resolution,ratio:n.ratio}})};
  });
  const h={schemaVersion:1,projectId:p.id,revision:p.revision,planDigest:digest(p),rawRequest:p.rawRequest,context:p.context,locks:p.locks,assets:p.assets,requirements:p.requirements,state:'PLANNING_CHECKED',executionStatus:provider==='neutral'?'NONEXECUTABLE':'NEEDS_LIVE_SCHEMA_AND_ACCOUNT_CHECK',provider,profileInspectedAt:'2026-10-01',shots,site:p.site??null,assumptions:p.assumptions,limitations:['Prompt prose is not structural control or rendered-output proof','Media contents and rights have not been verified','No provider call, price quote or spending authorization is included']};
  return {...h,handoffDigest:digest(h)};
}
export function checkBudget(h,q,b,now=Date.now()) {
  const errors=[];
  if(!obj(h)||!obj(q)||!obj(b))return {ok:false,errors:['Handoff, quote and budget objects required']};
  const {handoffDigest,...body}=h;
  if(handoffDigest!==digest(body)||q.handoffDigest!==handoffDigest)errors.push('Quote must match untampered handoff');
  if(!txt(q.quoteId)||!txt(q.source))errors.push('Quote provenance required');
  if(!/^[A-Z]{3}$/.test(q.currency||'')||q.currency!==b.currency)errors.push('Currency mismatch or invalid');
  if(!integer(q.amountMinor)||q.amountMinor<0||!integer(b.limitMinor)||b.limitMinor<0)errors.push('Nonnegative safe integer minor units required');
  if(q.amountMinor>b.limitMinor)errors.push('Quote exceeds budget');
  if(!Number.isFinite(Date.parse(q.expiresAt))||Date.parse(q.expiresAt)<=now)errors.push('Quote expired or invalid');
  return {ok:!errors.length,errors,spendingAuthorized:false,quoteAuthenticityVerified:false};
}
export function main(args) {
  const read=p=>JSON.parse(readFileSync(p,'utf8').replace(/^\uFEFF/,''));
  const [cmd,a,b,c]=args;
  if(cmd==='validate')return validate(read(a),b?read(b):undefined);
  if(cmd==='compile')return compile(read(a),b);
  if(cmd==='impact')return impact(read(a),read(b));
  if(cmd==='budget')return checkBudget(read(a),read(b),read(c));
  throw Error('Usage: brain.mjs validate plan [previous] | compile plan [neutral|minimax-h3|minimax-h3-max] | impact previous next | budget handoff quote budget');
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
  try{const result=main(process.argv.slice(2));process.stdout.write(JSON.stringify(result,null,2)+'\n');if(result.ok===false)process.exitCode=1;}
  catch(e){process.stderr.write(JSON.stringify({ok:false,error:e.message,details:e.details??[]},null,2)+'\n');process.exitCode=1;}
}
