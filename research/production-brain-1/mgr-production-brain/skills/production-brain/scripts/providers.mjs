// Read-only recovery integration. Host supplies an authenticated, bounded GET transport.
// Submission, credential storage, callback authentication and asset admission stay with host.
const states={higgsfield:{queued:'ACCEPTED',in_progress:'RUNNING',completed:'OUTPUT_PENDING_ADMISSION',failed:'FAILED',nsfw:'FAILED',canceled:'CANCELLED'},minimax:{queued:'ACCEPTED',running:'RUNNING',succeeded:'OUTPUT_PENDING_ADMISSION',failed:'FAILED',cancelled:'CANCELLED'}};
const origins={higgsfield:'https://api.higgsfield.ai',minimax:'https://api.minimax.io'};
export function statusAddress(provider,jobId,returnedURL){
  if(!origins[provider]||typeof jobId!=='string'||! /^[a-zA-Z0-9_-]{1,160}$/.test(jobId))throw Error('Invalid provider or job ID');
  const path=provider==='higgsfield'?'/requests/'+jobId+'/status':'/v2/query/video_generation/'+jobId;
  const u=new URL(returnedURL??origins[provider]+path);
  if(u.origin!==origins[provider]||u.pathname!==path||u.username||u.password||u.search||u.hash)throw Error('Unapproved status address');
  return u.href;
}
export function normalizeStatus(provider,expectedId,body){
  const result=provider==='minimax'?body?.task:body;
  const actualId=provider==='minimax'?result?.id:result?.request_id;
  const state=states[provider]?.[result?.status];
  if(!state||actualId!==expectedId)throw Error('Unknown status or mismatched provider job');
  const promptOnly=provider==='minimax'&&result.task_type==='h3_context_ir';
  if(promptOnly&&state==='OUTPUT_PENDING_ADMISSION'){
    if(typeof result.content?.prompt!=='string'||!result.content.prompt.trim())throw Error('Prompt result missing');
    return {providerJobId:actualId,state:'PROMPT_PENDING_SEMANTIC_REVIEW',prompt:result.content.prompt,terminal:true};
  }
  return {providerJobId:actualId,state,terminal:!['ACCEPTED','RUNNING'].includes(state)};
}
export function exactUSDUpperBound(usd){
  // Provider estimates can contain fractions of a cent. Ceil exact decimal digits;
  // this is a conservative authorization cap, not a fabricated settled charge.
  if(typeof usd!=='string'||! /^\d{1,12}(\.\d{1,9})?$/.test(usd))throw Error('Exact nonnegative decimal USD required');
  const [whole,fraction='']=usd.split('.'),digits=fraction.padEnd(2,'0');
  const cents=BigInt(whole)*100n+BigInt(digits.slice(0,2))+( /[1-9]/.test(digits.slice(2))?1n:0n);
  if(cents>BigInt(Number.MAX_SAFE_INTEGER))throw Error('Estimate overflow');
  return {currency:'USD',maximumMinor:Number(cents),quotedDecimal:usd,settlementKnown:false};
}
export async function pollExisting({provider,jobId,statusURL,deadline,read,clock=Date.now,sleep=ms=>new Promise(r=>setTimeout(r,ms)),random=Math.random,maxAttempts=100}){
  const url=statusAddress(provider,jobId,statusURL);
  if(!Number.isSafeInteger(deadline)||deadline<0||!Number.isSafeInteger(maxAttempts)||maxAttempts<1||maxAttempts>10000||typeof read!=='function')throw Error('Invalid polling contract');
  let attempts=0,delay=2000,last=null,prior=clock();
  while(attempts<maxAttempts){
    const now=clock();if(!Number.isSafeInteger(now)||now<prior)throw Error('Invalid/regressed clock');prior=now;
    if(now>=deadline)return {state:'RECONCILIATION_REQUIRED',reason:'DEADLINE',attempts,last,maySubmitAgain:false};
    const controller=new AbortController();let timer;
    const timeout=new Promise((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(Error('READ_TIMEOUT'));},Math.min(30000,deadline-now));});
    attempts++;
    try{
      const reply=await Promise.race([read({method:'GET',url,signal:controller.signal}),timeout]);
      if(!Number.isInteger(reply?.status))throw Error('Malformed transport response');
      if(reply.status===200){last=normalizeStatus(provider,jobId,reply.body);if(last.terminal)return {...last,attempts,maySubmitAgain:false};}
      else if(reply.status===401||reply.status===403||reply.status===404)return {state:'RECONCILIATION_REQUIRED',reason:'HTTP_'+reply.status,attempts,last,maySubmitAgain:false};
      else if(reply.status!==429&&reply.status<500)throw Error('Nonretryable status '+reply.status);
    }catch(error){
      // Only explicitly classified transport errors are retryable. Parser/identity failures stop.
      if(error.message!=='READ_TIMEOUT'&&error.code!=='NETWORK_ERROR')throw error;
    }finally{clearTimeout(timer);}
    const after=clock();if(!Number.isSafeInteger(after)||after<prior)throw Error('Invalid/regressed clock');prior=after;
    const jitter=random();if(!Number.isFinite(jitter)||jitter<0||jitter>=1)throw Error('Invalid jitter');
    const wait=Math.min(Math.floor(delay+jitter*500),Math.max(0,deadline-after));
    if(wait>0)await sleep(wait);delay=Math.min(delay*1.5,10000);
  }
  return {state:'RECONCILIATION_REQUIRED',reason:'ATTEMPT_LIMIT',attempts,last,maySubmitAgain:false};
}
