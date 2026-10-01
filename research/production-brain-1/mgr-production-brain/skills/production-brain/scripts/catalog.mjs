// Shared with Creation OS. No network, provider calls, state promotion, or authorization.
export const FIELDS = ['definition','productionUse','standards','papers','implementations','models','datasets','licensing','providers','nativeAlternative','runtime','cost','failureModes','evaluation','placement','acceptance'];
const nonempty = x => typeof x === 'string' && x.trim().length > 0;
const strings = x => Array.isArray(x) && x.every(nonempty);
const date = x => nonempty(x) && Number.isFinite(Date.parse(x));
const copy = x => structuredClone(x);
const words = x => [...new Set(String(x).toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [])].filter(x => x.length > 2 && !['the','and','with','for','that','this','into','from','make','want','need','using','build'].includes(x));

export function validateCatalog(c) {
  const errors = [];
  if (!c || c.schemaVersion !== 1 || !date(c.updated)) return {ok:false, errors:['catalog schemaVersion/date invalid']};
  const maps = {};
  for (const key of ['sources','findings','packets','tracks']) {
    if (!Array.isArray(c[key]) || !c[key].length) { errors.push(`${key} must be nonempty`); maps[key] = new Map(); continue; }
    maps[key] = new Map();
    for (const item of c[key]) {
      if (!item || !nonempty(item.id)) { errors.push(`${key}: missing id`); continue; }
      if (maps[key].has(item.id)) errors.push(`${key}: duplicate ${item.id}`);
      maps[key].set(item.id,item);
    }
  }
  const refs = (value,map,label,requireOne=false) => {
    if (!strings(value) || (requireOne && !value.length)) { errors.push(`${label}: invalid references`); return; }
    if(new Set(value).size!==value.length) errors.push(`${label}: duplicate reference`);
    for (const id of value) if (!map.has(id)) errors.push(`${label}: missing ${id}`);
  };
  for (const s of maps.sources.values()) {
    if (!nonempty(s.uri) || !/^(https:\/\/|repo:)/.test(s.uri) || !nonempty(s.readScope) || !date(s.retrieved)) errors.push(`source ${s.id}: missing provenance`);
    if (s.refreshAfter !== undefined && (!date(s.refreshAfter) || Date.parse(s.refreshAfter) < Date.parse(s.retrieved))) errors.push(`source ${s.id}: invalid freshness`);
  }
  for (const f of maps.findings.values()) {
    if (!nonempty(f.text) || !nonempty(f.scope) || !['OBSERVATION','DESIGN_DECISION'].includes(f.kind)) errors.push(`finding ${f.id}: missing scope/kind/text`);
    refs(f.sourceIds,maps.sources,`finding ${f.id}`,true);
  }
  for (const p of maps.packets.values()) {
    if (!nonempty(p.title) || typeof p.scopeComplete !== 'boolean' || !strings(p.gaps)) errors.push(`packet ${p.id}: invalid scope`);
    for (const k of FIELDS) if (!nonempty(p.fields?.[k])) errors.push(`packet ${p.id}: missing ${k}`);
    refs(p.findingIds,maps.findings,`packet ${p.id}`,true);
    if(p.sourceIds!==undefined){
      refs(p.sourceIds,maps.sources,`packet sources ${p.id}`,true);
      const observedSources=new Set((Array.isArray(p.findingIds)?p.findingIds:[]).flatMap(id=>maps.findings.get(id)?.sourceIds??[]));
      for(const id of Array.isArray(p.sourceIds)?p.sourceIds:[])if(!observedSources.has(id))errors.push(`packet ${p.id}: source ${id} has no linked observation`);
    }
    if (p.scopeComplete && p.gaps?.length) errors.push(`packet ${p.id}: complete with open gaps`);
  }
  for (const t of maps.tracks.values()) {
    if (!nonempty(t.capability) || !nonempty(t.parent) || !strings(t.acceptanceCriteria) || !t.acceptanceCriteria.length || !nonempty(t.nextAction) || typeof t.researchComplete !== 'boolean') errors.push(`track ${t.id}: incomplete contract`);
    refs(t.dependencies,maps.tracks,`dependencies ${t.id}`);
    refs(t.packetIds,maps.packets,`packets ${t.id}`,true);
  }
  const active = new Set(), done = new Set();
  function visit(id) {
    if(active.has(id)) { errors.push(`dependency cycle at ${id}`); return; }
    if(done.has(id)) return;
    active.add(id);
    const dependencies=maps.tracks.get(id)?.dependencies;
    for(const d of Array.isArray(dependencies)?dependencies:[]) if(maps.tracks.has(d)) visit(d);
    active.delete(id); done.add(id);
  }
  for(const id of maps.tracks.keys()) visit(id);
  return {ok:errors.length===0,errors};
}

export class ProductionCatalog {
  #data; #tracks; #packets; #findings; #sources;
  constructor(data) {
    const result = validateCatalog(data);
    if(!result.ok) throw new Error(result.errors.join('\n'));
    this.#data = copy(data);
    this.#tracks = new Map(this.#data.tracks.map(x=>[x.id,x]));
    this.#packets = new Map(this.#data.packets.map(x=>[x.id,x]));
    this.#findings = new Map(this.#data.findings.map(x=>[x.id,x]));
    this.#sources = new Map(this.#data.sources.map(x=>[x.id,x]));
  }
  #track(id) { const t=this.#tracks.get(id); if(!t) throw new Error(`Unknown track: ${id}`); return t; }
  get(id) {
    const t = this.#track(id), packets=t.packetIds.map(x=>this.#packets.get(x));
    const findings=[...new Set(packets.flatMap(p=>p.findingIds))].map(x=>this.#findings.get(x));
    const sources=[...new Set(findings.flatMap(f=>f.sourceIds))].map(x=>this.#sources.get(x));
    return copy({track:t,packets,findings,sources});
  }
  search(query,limit=8) {
    if(!nonempty(query) || !Number.isInteger(limit) || limit<1 || limit>50) throw new Error('Nonempty query and limit 1..50 required');
    const q=query.trim().toLowerCase(), terms=words(q);
    return [...this.#tracks.values()].map(t=>{
      const title=words(t.capability+' '+t.parent+' '+t.id);
      const body=words(t.requiredKnowledge+' '+t.candidateImplementations+' '+t.packetIds.map(id=>JSON.stringify(this.#packets.get(id).fields)).join(' '));
      const score=t.id.toLowerCase()===q?10000:terms.reduce((n,w)=>n+(title.includes(w)?8:body.includes(w)?1:0),0);
      return {id:t.id,capability:t.capability,parent:t.parent,score,researchComplete:t.researchComplete};
    }).filter(t=>t.score>0).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id)).slice(0,limit);
  }
  readiness(id,now=new Date().toISOString()) {
    if(!date(now)) throw new Error('Invalid assessment time');
    const {track,packets,sources}=this.get(id), blockers=[];
    if(!track.researchComplete) blockers.push('Child-track research is incomplete');
    if(!strings(track.researchEvidenceRefs)||!track.researchEvidenceRefs.length) blockers.push('Child-track completion evidence is missing');
    for(const p of packets) {
      if(!p.scopeComplete) blockers.push(`Packet scope incomplete: ${p.id}`);
      blockers.push(...p.gaps.map(x=>`${p.id}: ${x}`));
    }
    for(const s of sources) {
      if(Date.parse(s.retrieved)>Date.parse(now)) blockers.push(`Future source date: ${s.id}`);
      if(s.refreshAfter && Date.parse(s.refreshAfter)<=Date.parse(now)) blockers.push(`Refresh source: ${s.id}`);
    }
    return {id,researchReady:blockers.length===0,blockers,implementationClaim:track.implemented===true,verificationClaim:track.verified===true,executionAuthorized:false};
  }
  plan(ids,now=new Date().toISOString()) {
    if(!strings(ids)||!ids.length) throw new Error('Select at least one track ID');
    const order=[],seen=new Set();
    const visit=id=>{const t=this.#track(id);if(seen.has(id))return;seen.add(id);for(const d of t.dependencies)visit(d);order.push(id);};
    ids.forEach(visit);
    const steps=order.map(id=>{const t=this.#track(id);return {id,capability:t.capability,dependencies:copy(t.dependencies),candidateImplementations:t.candidateImplementations,requiredKnowledge:t.requiredKnowledge,acceptanceCriteria:copy(t.acceptanceCriteria),nextAction:t.nextAction,readiness:this.readiness(id,now),packetIds:copy(t.packetIds)};});
    return {kind:'RESEARCH_TO_BUILD_HANDOFF',requested:[...new Set(ids)],assessedAt:now,executionAuthorized:false,researchReady:steps.every(s=>s.readiness.researchReady),steps};
  }
  ledgerRecords() {
    const sources=this.#data.sources.map(s=>({id:'production:'+s.id,uri:s.uri,publisher:s.publisher,snapshotRef:s.blobSha?'git-blob:'+s.blobSha:s.snapshotRef}));
    const claims=this.#data.findings.map(f=>({id:'production:'+f.id,text:`[${f.kind}; ${f.scope}] ${f.text}`,confidence:f.kind==='OBSERVATION'?0.9:0.5}));
    const evidence=this.#data.findings.flatMap(f=>f.sourceIds.map(s=>({id:`production:${f.id}:${s}`,claimId:'production:'+f.id,sourceId:'production:'+s,support:f.kind==='OBSERVATION'?'SUPPORTS':'CONTEXT'})));
    return copy({sources,claims,evidence,capabilities:this.#data.tracks.map(t=>({id:t.id,researchComplete:t.researchComplete,implemented:t.implemented===true,verified:t.verified===true})),warning:'Source relations describe narrow authored findings only. Do not use ResearchFactory success as capability readiness or execution authorization.'});
  }
  summary(now=new Date().toISOString()) {
    return {updated:this.#data.updated,sources:this.#sources.size,findings:this.#findings.size,packets:this.#packets.size,tracks:this.#tracks.size,researchReady:[...this.#tracks.keys()].filter(id=>this.readiness(id,now).researchReady).length,executionAuthorized:false};
  }
}
