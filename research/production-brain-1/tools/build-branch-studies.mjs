import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {decisions} from '../research/branch-decisions.mjs';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const path=resolve(root,'mgr-production-brain/skills/production-brain/assets/production-knowledge.json');
const catalog=JSON.parse(readFileSync(path,'utf8'));
const newSources=['primary-depth-ledger','primary-depth-extra','primary-doc-observations','provider-depth'].flatMap(name=>JSON.parse(readFileSync(resolve(root,'research/'+name+'.json'),'utf8')).sources);
for(const source of newSources){if(!catalog.sources.some(s=>s.id===source.id))catalog.sources.push(source);}
for(const s of newSources){const fid='F-DEPTH-'+s.id;if(!catalog.findings.some(f=>f.id===fid))catalog.findings.push({id:fid,kind:'OBSERVATION',scope:s.readScope,sourceIds:[s.id],text:s.observation});}
const domainSources={INTENT:['plugin-research','cos-research','avatar-asc'],PROVIDER:['plugin-research','mcp-oauth'],ASSET:['ffprobe-options','exr','prior-dossier'],CAMERA:['camera-plucker','usd-camera','usd-metrics','camera-paper','camera-runtime'],IDENTITY:['faceid-card','ip-adapter-license','blender-armature','avatar-asc'],DESTRUCTION:['rigidbody-step','avatar-weta'],ASSEMBLY:['blender-key','rigidbody-step'],SCENE:['usd-stage','usd-metrics'],TOON:['blender-toon','blender-key'],EDITORIAL:['otio-track','otio-adapters','ffprobe-options'],COMPOSITE:['blender-alpha-over','blender-keying','ocio-overview'],CLEANUP:['sam2-corrections','sam2-paper-method','propainter-inference','propainter-license'],VECTOR:['vector-pipeline','vector-simplify','vector-svg','vector-spline-test','vtracer-license'],IMAGE:['photoshop','adobe-modal','exr'],REALTIME:['td-feedback','td-performance','td-export'],COLOR:['ocio','ocio-overview','exr'],WEB:['web-animation-cancel','web-motion','wcag'],EVAL:['vbench-subject','vbench-license','avatar-asc']};
const overrides={
 PROVIDER:{standards:'Selected MCP2025-06-18 HTTP authorization, resource audience, tool schemas, durable request identity, absolute deadlines and integer currency amounts.',licensing:'Provider service terms and submitted-asset rights must be admitted per account. Public helpers do not confer provider access or ownership. No third-party code copied.',models:'Live model identifiers, limits and schema are unresolved until authenticated discovery; never substitute guessed IDs.'},
 CAMERA:{standards:'Right-handed coordinate conventions, explicit c2w/w2c and stage units; USD camera optical values in tenths of stage unit. Declare scene/path/estimator digests.',licensing:'Native mathematical preflight is own code. CameraCtrl README says academic use, so learned weights are not admitted as a commercial default. USD/Blender source is studied and not vendored.',models:'CameraCtrl/AnimateDiff or SVD are studied candidates, with old CUDA-dependent environment and separately admitted weights. Prompt presets are not exact pose control.'},
 IDENTITY:{licensing:'IP-Adapter root code Apache2 does not admit FaceID weights. FaceID model card says research/non-commercial due to InsightFace pretrained restrictions. Character, voice and dataset rights are separate.',models:'FaceID and adapter routes studied, not commercially admitted or run. Actual DCC rig geometry supplies a deterministic alternative without claiming learned identity performance.'},
 DESTRUCTION:{runtime:'Blender5.2.2LTS background CPU is available and an isolated procedural bake/reopen/render fixture executed. Main-branch source reads are contextual; actual runtime build hash is recorded separately.',licensing:'Blender selected source uses GPL2-or-later. No Blender binary/source is redistributed. Procedural fixture is newly authored; production asset licenses must be retained.'},
 ASSEMBLY:{runtime:'Actual Blender5.2.2LTS CPU keyframe/project fixture executed; more complex constraints/pivots are specified and unverified.',licensing:'Blender source is studied, not copied. Newly authored fixture uses procedural assets; external model/texture rights require admission.'},
 VECTOR:{runtime:'Selected current Rust pipeline, simplifier, SVG writer and regression tests read. Cargo dependencies identified; runtime binary/tests have not run.',papers:'Selected implementation documents a Schneider-style sampled cubic refit. No original-paper read or continuous geometric-error guarantee claimed.',models:'Selected vectorization path is deterministic; no trained model required. Text/font recognition would be a separate capability.',licensing:'VTracer root MIT license read. Crate/dependency admission remains required before distribution or execution.'},
 REALTIME:{implementations:'Official Derivative operator/API behavior and performance/export controls inspected. TouchDesigner is a separate external DCC integration; a page/graph recipe is not execution.',models:'No learned model needed for declared operator graph. External AI TOPs would require their own runtime and license admission.',papers:'No learned-method paper is needed for the selected documented graph/measurement contract. Runtime measurements remain required.',licensing:'TouchDesigner is proprietary and edition/account permissions must be verified. No proprietary source, binaries or example project are copied.',runtime:'Official docs successfully retrieved through derivative.ca/UserGuide after docs.derivative.ca403. No admitted TouchDesigner runtime has executed.'},
 IMAGE:{licensing:'Photoshop UXP documentation describes integration; Adobe application/account entitlement is separate. No private application source copied.',runtime:'Selected Photoshop async/modal APIs read. Actual Photoshop document mutation/reopen is unavailable until its admitted host runtime is used.'},
 EVAL:{licensing:'VBench root Apache2 license read. Metric checkpoint/data licenses and fixture rights require separate admission; film references are study context, not reusable test footage.',models:'DINO subject-consistency source inspected; no checkpoint or video score executed. Craft/physical dimensions need separate evaluators.',papers:'Selected VBench source behavior, CameraCtrl trajectory metrics and primary production accounts guide protocol design; published scores are not local trials.'}
};
const studies=[];
domainSources.PROVIDER.push('hf-discovery','hf-idempotency','hf-lifecycle','hf-errors','hf-polling','hf-webhooks','hf-billing','minimax-h3-query','minimax-h3-delete','youart-mcp');
domainSources.INTENT.push('minimax-context-ir');
domainSources.ASSET.push('minimax-h3-create');
const dependencies={
 'INTENT-02':'INTENT-01 PROVIDER-01','INTENT-03':'INTENT-01 INTENT-02','INTENT-04':'INTENT-01 PROVIDER-01','INTENT-05':'INTENT-01 ASSET-02',
 'PROVIDER-01':'INTENT-01','PROVIDER-02':'PROVIDER-01','PROVIDER-03':'PROVIDER-02 PROVIDER-05','PROVIDER-04':'PROVIDER-03','PROVIDER-05':'PROVIDER-01 ASSET-06',
 'ASSET-02':'ASSET-01','ASSET-03':'ASSET-01','ASSET-04':'ASSET-03','ASSET-05':'ASSET-01 ASSET-03','ASSET-06':'ASSET-03 PROVIDER-01',
 'CAMERA-01':'ASSET-02 SCENE-01','CAMERA-02':'CAMERA-01','CAMERA-03':'CAMERA-02 INTENT-03','CAMERA-04':'CAMERA-02 SCENE-03','CAMERA-05':'CAMERA-01 SCENE-03','CAMERA-06':'CAMERA-01 ASSET-06 PROVIDER-01','CAMERA-07':'CAMERA-03 CAMERA-05',
 'IDENTITY-01':'ASSET-02 ASSET-03','IDENTITY-02':'IDENTITY-01 ASSET-06','IDENTITY-03':'ASSET-02 SCENE-01','IDENTITY-04':'IDENTITY-03 INTENT-03','IDENTITY-05':'IDENTITY-03 ASSET-04 EDITORIAL-02',
 'DESTRUCTION-01':'ASSET-02 SCENE-01','DESTRUCTION-02':'DESTRUCTION-01','DESTRUCTION-03':'DESTRUCTION-02 ASSET-04','DESTRUCTION-04':'DESTRUCTION-03 COLOR-01','DESTRUCTION-05':'DESTRUCTION-03 ASSET-02',
 'ASSEMBLY-01':'SCENE-01 ASSET-02','ASSEMBLY-02':'ASSEMBLY-01 SCENE-03','ASSEMBLY-03':'ASSEMBLY-01 ASSET-02',
 'SCENE-01':'ASSET-02','SCENE-02':'SCENE-01','SCENE-03':'SCENE-01',
 'TOON-01':'SCENE-03 COLOR-01','TOON-02':'TOON-01 CAMERA-02','TOON-03':'TOON-01 ASSET-02',
 'EDITORIAL-01':'ASSET-02 ASSET-04','EDITORIAL-02':'ASSET-04','EDITORIAL-03':'EDITORIAL-01 ASSET-04','EDITORIAL-04':'EDITORIAL-01 EDITORIAL-03',
 'COMPOSITE-01':'ASSET-03 COLOR-01','COMPOSITE-02':'CAMERA-01 ASSET-04','COMPOSITE-03':'COMPOSITE-01 COMPOSITE-02 COLOR-03','COMPOSITE-04':'COMPOSITE-03 ASSET-02',
 'CLEANUP-01':'ASSET-03 ASSET-04','CLEANUP-02':'CLEANUP-01 COLOR-01','CLEANUP-03':'CLEANUP-02 ASSET-02',
 'VECTOR-01':'ASSET-03','VECTOR-02':'VECTOR-01','VECTOR-03':'VECTOR-02 COLOR-01',
 'IMAGE-01':'ASSET-02 COLOR-01','IMAGE-02':'IMAGE-01','IMAGE-03':'IMAGE-01 COLOR-03',
 'REALTIME-01':'ASSET-02','REALTIME-02':'REALTIME-01 ASSET-04','REALTIME-03':'REALTIME-02 COLOR-03',
 'COLOR-01':'ASSET-03','COLOR-02':'COLOR-01','COLOR-03':'COLOR-01','COLOR-04':'COLOR-03 ASSET-04',
 'WEB-01':'INTENT-01','WEB-02':'WEB-01','WEB-03':'WEB-01 ASSET-03','WEB-04':'WEB-01 INTENT-05','WEB-05':'WEB-01',
 'EVAL-01':'INTENT-01 ASSET-02','EVAL-02':'EVAL-01 CAMERA-07','EVAL-03':'EVAL-01 PROVIDER-04 PROVIDER-05','EVAL-04':'EVAL-01 EVAL-03'
};
if(decisions.length!==75||new Set(decisions.map(d=>d[0])).size!==75)throw Error('Expected75 distinct authored decisions');
for(const [short,method,alternative,fixtures,remaining,cost] of decisions){
 const track=catalog.tracks.find(t=>t.id==='PR-'+short);if(!track)throw Error('Missing branch '+short);
 const domain=short.split('-')[0],base=catalog.packets.find(p=>p.id==='P-'+domain),sourceIds=domainSources[domain];
 for(const id of sourceIds)if(!catalog.sources.some(s=>s.id===id))throw Error('Missing source '+id);
 const findingIds=sourceIds.flatMap(id=>catalog.findings.filter(f=>f.sourceIds.includes(id)).map(f=>f.id));
 const fields={...base.fields,...overrides[domain],definition:track.capability+'. Required knowledge: '+track.requiredKnowledge,
 productionUse:method,implementations:method+' Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.',
 datasets:'Own/admitted positive and hard-negative fixtures: '+fixtures+' Independent labels and rights are required for evaluation assets.',
 nativeAlternative:alternative,cost,failureModes:fixtures,evaluation:'Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: '+remaining,
 placement:'Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.',
 acceptance:track.acceptanceCriteria.join('; ')};
 // No autogenerated promotion: the original research scope remains open where selected
 // reads do not close implementation/dependency knowledge. Runtime evidence is separate.
 const packet={id:'P-'+short,title:track.capability,scopeComplete:false,findingIds:[...new Set(findingIds)],sourceIds,
   gaps:[remaining],fields,decision:method,alternative,fixtures,remainingEvidence:remaining,
   researchState:'SOURCED',implementationState:'SPECIFIED',evidenceScope:'Authored individual engineering study informed by selected primary reads. Full child scope is not automatically closed by16 populated fields.'};
 const existing=catalog.packets.findIndex(p=>p.id===packet.id);if(existing>=0)catalog.packets[existing]=packet;else catalog.packets.push(packet);
 track.packetIds=[packet.id];track.nextAction=remaining;track.result='Individual method, alternative, hard negatives, cost model and16-field build study authored; unresolved original scope retained';
 track.dependencies=(dependencies[short]?.split(' ')??[]).map(id=>'PR-'+id);
 track.statusScope=packet.evidenceScope;studies.push({...packet,trackId:track.id});
}
catalog.scope='75 individual production branch studies and primary-source observations; research closure, implementation and verification remain independently gated.';
writeFileSync(path,JSON.stringify(catalog,null,2)+'\n');
writeFileSync(resolve(root,'research/branch-studies.json'),JSON.stringify({schemaVersion:1,count:studies.length,scope:catalog.scope,studies},null,2)+'\n');
const doc=['# MGR Production Brain1:75 individual branch studies','',catalog.scope,'','This is an engineering study and implementation specification. Populated fields and source links do not close uninspected children or establish output quality. Remaining evidence is explicit for each branch.',''];
for(const s of studies){doc.push('## '+s.trackId+' — '+s.title,'','Selected method: '+s.decision,'','Alternative/tradeoff: '+s.alternative,'','Sources: '+s.sourceIds.join(', '),'');for(const [field,value] of Object.entries(s.fields))doc.push('**'+field+'**: '+value,'');doc.push('**Remaining evidence**: '+s.remainingEvidence,'');}
writeFileSync(resolve(root,'research/ALL-75-BRANCH-STUDIES.md'),doc.join('\n'));
writeFileSync(resolve(root,'mgr-production-brain/skills/production-brain/references/all-75-branch-studies.md'),doc.join('\n'));
console.log(JSON.stringify({individualStudies:studies.length,primarySources:catalog.sources.length,packets:catalog.packets.length,researchComplete:catalog.tracks.filter(t=>t.researchComplete).length}));
