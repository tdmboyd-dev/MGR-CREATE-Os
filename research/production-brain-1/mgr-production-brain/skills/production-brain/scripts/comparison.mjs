import {createHash} from 'node:crypto';
import {canonical} from './brain.mjs';
const dimensions=['intent','identity','performance','camera','physics','composite','color','sound','editability'];
const digest=value=>createHash('sha256').update(canonical(value)).digest('hex');
const finite=value=>typeof value==='number'&&Number.isFinite(value)&&value>=0;
const nonempty=value=>typeof value==='string'&&value.trim().length>0;

/** Summarizes observed trial records. Inputs remain claims made by the recorded evaluators. */
export function compareProduction(manifest){
  if(manifest.schemaVersion!==1||!nonempty(manifest.briefId)||!nonempty(manifest.fixtureRights))throw Error('Comparison brief and fixture rights required');
  if(!Array.isArray(manifest.trials)||manifest.trials.length<1||manifest.trials.length>10000)throw Error('Bounded trials required');
  if(!manifest.brief||typeof manifest.brief!=='object')throw Error('Canonical brief required');
  const briefDigest=digest(manifest.brief),ids=new Set(),groups=new Map(),gaps=[];
  for(const trial of manifest.trials){
    if(!nonempty(trial.id)||ids.has(trial.id))throw Error('Unique trial identity required');ids.add(trial.id);
    if(!nonempty(trial.provider)||!nonempty(trial.modelVersion)||trial.briefDigest!==briefDigest)throw Error('Matched brief and model version required');
    if(!['SUCCEEDED','FAILED','AMBIGUOUS','UNAVAILABLE'].includes(trial.state))throw Error('Invalid trial state');
    if(!finite(trial.wallSeconds)||!finite(trial.repairSeconds)||!Number.isSafeInteger(trial.costMinor)||trial.costMinor<0||! /^[A-Z]{3}$/.test(trial.currency))throw Error('Measured time and integer cost required');
    const key=trial.provider+':'+trial.modelVersion;
    if(!groups.has(key))groups.set(key,{provider:trial.provider,modelVersion:trial.modelVersion,attempts:0,successfulJobs:0,passedTrials:0,totalCostMinor:0,totalWallSeconds:0,totalRepairSeconds:0,currency:trial.currency,dimensions:Object.fromEntries(dimensions.map(d=>[d,{passed:0,failed:0,unavailable:0}]))});
    const group=groups.get(key);if(group.currency!==trial.currency)throw Error('Mixed currency in comparison arm');
    group.attempts++;group.totalCostMinor+=trial.costMinor;if(!Number.isSafeInteger(group.totalCostMinor))throw Error('Cost overflow');
    group.totalWallSeconds+=trial.wallSeconds;group.totalRepairSeconds+=trial.repairSeconds;
    if(!Number.isFinite(group.totalWallSeconds)||!Number.isFinite(group.totalRepairSeconds))throw Error('Time overflow');
    if(trial.state==='SUCCEEDED'){
      group.successfulJobs++;
      if(! /^[a-f0-9]{64}$/.test(trial.outputSha256)||!nonempty(trial.outputArtifact))throw Error('Successful trial requires output artifact identity');
    }
    let passed=trial.state==='SUCCEEDED';
    for(const dimension of dimensions){
      const result=trial.evaluations?.[dimension];
      if(!result||result.status==='UNAVAILABLE'){
        group.dimensions[dimension].unavailable++;passed=false;gaps.push({trialId:trial.id,dimension,reason:result?.reason??'Evaluation not supplied'});continue;
      }
      if(!['PASS','FAIL'].includes(result.status)||!nonempty(result.evaluatorVersion)||! /^[a-f0-9]{64}$/.test(result.evidenceSha256)||!nonempty(result.evidenceArtifact))throw Error('Evaluation requires status, evaluator version and evidence identity');
      if(trial.state!=='SUCCEEDED'&&result.status==='PASS')throw Error('Failed or unavailable output cannot pass evaluation');
      group.dimensions[dimension][result.status==='PASS'?'passed':'failed']++;
      if(result.status!=='PASS')passed=false;
    }
    if(passed)group.passedTrials++;
  }
  const arms=[...groups.values()].map(g=>({...g,passRate:g.passedTrials/g.attempts,costPerPassedTrialMinor:g.passedTrials?g.totalCostMinor/g.passedTrials:null}));
  const reasons=[];
  if(arms.length<2)reasons.push('At least two measured comparison arms required');
  if(arms.some(a=>a.attempts<3))reasons.push('At least three attempts per arm required by this harness');
  if(new Set(arms.map(a=>a.attempts)).size>1)reasons.push('Unequal attempt counts');
  if(new Set(arms.map(a=>a.currency)).size>1)reasons.push('Currency normalization missing');
  if(gaps.length)reasons.push('Required evaluations unavailable');
  if(!manifest.blindedReview||!nonempty(manifest.reviewProtocolArtifact))reasons.push('Blinded craft-review protocol absent');
  if(!manifest.preRegisteredBudget||!nonempty(manifest.samplingProtocolArtifact))reasons.push('Budget and sampling protocol absent');
  return {schemaVersion:1,briefId:manifest.briefId,briefDigest,arms,gaps,status:reasons.length?'INCOMPLETE':'RECORDED_COMPARISON',reasons,
    superiorityClaimAllowed:false,hollywoodQualityVerified:false,
    scope:'Bookkeeping and completeness checks over submitted observations; no automatic creative-quality certification or statistical superiority inference'};
}
export {dimensions as productionDimensions};
