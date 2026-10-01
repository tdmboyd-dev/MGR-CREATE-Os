import {digest} from './brain.mjs';
const finite=v=>Number.isFinite(v)&&Math.abs(v)<=1e6;
const vec=v=>Array.isArray(v)&&v.length===3&&v.every(finite);
const sub=(a,b)=>a.map((v,i)=>v-b[i]);
const dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
function unit(v){const n=Math.hypot(...v);if(n<1e-10)throw Error('Degenerate camera basis');return v.map(x=>x/n);}
function bounds(b){return b&&typeof b.id==='string'&&b.id.length>0&&vec(b.min)&&vec(b.max)&&b.min.every((v,i)=>v<=b.max[i]);}

export function segmentBox(a,b,box,clearance=0){
  if(!vec(a)||!vec(b)||!bounds(box)||!finite(clearance)||clearance<0)throw Error('Invalid segment or bounds');
  let entry=0,exit=1;
  for(let axis=0;axis<3;axis++){
    const lo=box.min[axis]-clearance,hi=box.max[axis]+clearance,d=b[axis]-a[axis];
    if(d===0){if(a[axis]<lo||a[axis]>hi)return null;continue;}
    let t1=(lo-a[axis])/d,t2=(hi-a[axis])/d;
    if(t1>t2)[t1,t2]=[t2,t1];
    entry=Math.max(entry,t1);exit=Math.min(exit,t2);
    if(entry>exit)return null;
  }
  return {entry,exit};
}

export function inspectCamera(scene){
  if(!scene||scene.units!=='metres'||!finite(scene.duration)||scene.duration<=0)throw Error('Metres and positive finite duration required');
  if(!['complete-static-proxies','partial'].includes(scene.coverage))throw Error('Explicit geometry coverage required');
  const c=scene.camera;
  if(!c||['focalLengthMm','sensorWidthMm','sensorHeightMm','near','far'].some(k=>!finite(c[k])||c[k]<=0)||c.far<=c.near||!finite(c.clearance)||c.clearance<0)throw Error('Invalid physical camera');
  const samples=scene.samples,colliders=scene.colliders,subjects=scene.subjects;
  if(!Array.isArray(samples)||samples.length<2||samples.length>1000||!Array.isArray(colliders)||!Array.isArray(subjects)||colliders.length+subjects.length>1000)throw Error('Scene resource limits or arrays invalid');
  if(samples.length*(colliders.length+subjects.length)>100000)throw Error('Scene pair-count limit exceeded');
  if([...colliders,...subjects].some(b=>!bounds(b)))throw Error('Invalid scene bounds');
  if(new Set([...colliders,...subjects].map(b=>b.id)).size!==colliders.length+subjects.length)throw Error('Duplicate scene IDs');
  let last=-1;
  const bases=samples.map(s=>{
    if(!s||!finite(s.time)||s.time<0||s.time<=last||s.time>scene.duration||!vec(s.position)||!vec(s.target)||!vec(s.up))throw Error('Invalid camera sample');
    last=s.time;
    const forward=unit(sub(s.target,s.position)),right=unit(cross(forward,unit(s.up))),up=cross(right,forward);
    return {forward,right,up};
  });
  if(samples[0].time!==0||last!==scene.duration)throw Error('Samples must span the entire duration');
  const collisions=[];
  for(let i=1;i<samples.length;i++)for(const box of colliders){
    const hit=segmentBox(samples[i-1].position,samples[i].position,box,c.clearance);
    if(hit)collisions.push({collider:box.id,segment:i-1,...hit,time:samples[i-1].time+hit.entry*(samples[i].time-samples[i-1].time)});
  }
  const framing=[];
  for(let i=0;i<samples.length;i++)for(const box of subjects){
    const projected=[];let unavailable=false;
    for(let mask=0;mask<8;mask++){
      const point=box.min.map((v,axis)=>mask&(1<<axis)?box.max[axis]:v),relative=sub(point,samples[i].position),basis=bases[i],z=dot(relative,basis.forward);
      if(z<=c.near||z>=c.far){unavailable=true;break;}
      projected.push([.5+dot(relative,basis.right)*c.focalLengthMm/(z*c.sensorWidthMm),.5-dot(relative,basis.up)*c.focalLengthMm/(z*c.sensorHeightMm)]);
    }
    framing.push(unavailable?{subject:box.id,time:samples[i].time,status:'UNAVAILABLE_DEPTH_RANGE'}:{subject:box.id,time:samples[i].time,status:projected.every(p=>p.every(v=>v>=0&&v<=1))?'INSIDE_FRAME_AT_SAMPLE':'CLIPPED_AT_SAMPLE',min:[0,1].map(a=>Math.min(...projected.map(p=>p[a]))),max:[0,1].map(a=>Math.max(...projected.map(p=>p[a])))});
  }
  return {schemaVersion:1,inputDigest:digest(scene),pathStatus:collisions.length?'COLLISION':scene.coverage==='partial'?'UNVERIFIED_COVERAGE':'CLEAR_DECLARED_PROXIES',scope:'DECLARED_STATIC_AABB_LINEAR_PATH',clearanceMethod:'conservative-axis-expansion',collisions,framing,limitations:['Only declared static proxies are checked.','Framing is sampled, without occlusion or continuous visibility checks.','No generated video or rendered mesh has been inspected.']};
}
