import {DatabaseSync} from 'node:sqlite';
import {createHash} from 'node:crypto';
import {canonical} from './brain.mjs';

function canonicalJSON(value){
  const seen=new Set();
  function inspect(v){
    if(v===null||typeof v==='string'||typeof v==='boolean')return;
    if(typeof v==='number'){if(!Number.isFinite(v))throw Error('Nonfinite JSON');return;}
    if(typeof v!=='object'||seen.has(v)||(!Array.isArray(v)&&Object.getPrototypeOf(v)!==Object.prototype))throw Error('Plain acyclic JSON required');
    seen.add(v);for(const child of Object.values(v))inspect(child);seen.delete(v);
  }
  inspect(value);return canonical(value);
}

const hash=value=>createHash('sha256').update(canonicalJSON(value)).digest('hex');
const id=value=>{if(typeof value!=='string'||! /^[a-zA-Z0-9_.:-]{1,160}$/.test(value))throw Error('Invalid identifier');return value;};
const integer=(value,name)=>{if(!Number.isSafeInteger(value)||value<0)throw Error('Invalid '+name);return value;};
const terminal=new Set(['SUCCEEDED','FAILED','CANCELLED']);
const transitions={PREPARED:['SUBMITTING','CANCELLED'],SUBMITTING:['ACCEPTED','AMBIGUOUS','FAILED'],AMBIGUOUS:['ACCEPTED','FAILED'],ACCEPTED:['RUNNING','SUCCEEDED','FAILED','CANCEL_REQUESTED'],RUNNING:['SUCCEEDED','FAILED','CANCEL_REQUESTED'],CANCEL_REQUESTED:['CANCELLED','SUCCEEDED','FAILED']};

/** Durable accounting controller. It never submits network requests or grants spending authority. */
export class ProductionJobs {
  constructor(path,{resolveOutput}={}){
    if(resolveOutput!==undefined&&typeof resolveOutput!=='function')throw Error('Output resolver must be a function');
    this.resolveOutput=resolveOutput;
    this.db=new DatabaseSync(path);
    try{
      const application=this.db.prepare('PRAGMA application_id').get().application_id;
      const tables=this.db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all();
      if(application!==1296511538&&(application!==0||tables.length))throw Error('Not an MGR job database');
      const version=this.db.prepare('PRAGMA user_version').get().user_version;
      if(version>1)throw Error('Unsupported job database version');
      this.db.exec(`PRAGMA busy_timeout=5000; PRAGMA foreign_keys=ON;
        CREATE TABLE IF NOT EXISTS jobs(id TEXT PRIMARY KEY, body TEXT NOT NULL, revision INTEGER NOT NULL);
        CREATE TABLE IF NOT EXISTS events(job TEXT NOT NULL, event TEXT NOT NULL, digest TEXT NOT NULL, body TEXT NOT NULL, PRIMARY KEY(job,event), FOREIGN KEY(job) REFERENCES jobs(id));
        PRAGMA application_id=1296511538; PRAGMA user_version=1;`);
    }catch(error){this.db.close();throw error;}
  }
  close(){this.db.close();}
  transaction(fn){this.db.exec('BEGIN IMMEDIATE');try{const result=fn();this.db.exec('COMMIT');return result;}catch(e){this.db.exec('ROLLBACK');throw e;}}
  get(job){const row=this.db.prepare('SELECT body,revision FROM jobs WHERE id=?').get(id(job));return row?{...JSON.parse(row.body),revision:row.revision}:null;}
  prepare(spec,now){
    integer(now,'clock');id(spec.id);id(spec.provider);id(spec.model);
    if(!spec.payload||typeof spec.payload!=='object'||Array.isArray(spec.payload))throw Error('Payload object required');
    if(Buffer.byteLength(canonicalJSON(spec.payload))>1024*1024)throw Error('Payload size limit');
    const quote=spec.quote;
    if(!quote||typeof quote.currency!=='string'||! /^[A-Z]{3}$/.test(quote.currency))throw Error('Currency code required');
    integer(quote.maximumMinor,'quote');integer(quote.expiresAt,'quote expiry');integer(spec.deadline,'deadline');
    if(quote.expiresAt<=now||spec.deadline<=now)throw Error('Expired quote or deadline');
    id(quote.id);id(spec.capabilitySnapshot);
    const request={provider:spec.provider,model:spec.model,payload:spec.payload,capabilitySnapshot:spec.capabilitySnapshot,quote};
    const job={id:spec.id,...JSON.parse(canonicalJSON(request)),requestDigest:hash(request),state:'PREPARED',deadline:spec.deadline,createdAt:now,updatedAt:now,providerJobId:null,settlement:null};
    return this.transaction(()=>{this.db.prepare('INSERT INTO jobs VALUES(?,?,1)').run(job.id,canonicalJSON(job));return this.get(job.id);});
  }
  // Host calls this only after its authenticated approval service consumes a matching approval.
  // The receipt is bookkeeping, not a substitute for that authority boundary.
  beginSubmission(jobId,expectedRevision,hostReceipt,now){
    return this.transaction(()=>{
      const job=this.get(jobId);if(!job||job.revision!==expectedRevision)throw Error('Stale job revision');
      if(job.state!=='PREPARED')throw Error('Submission already started or closed');
      integer(now,'clock');
      if(now<job.updatedAt||now>=job.quote.expiresAt||now>=job.deadline)throw Error('Expired or regressed clock');
      if(!hostReceipt||hostReceipt.requestDigest!==job.requestDigest||hostReceipt.quoteId!==job.quote.id)throw Error('Approval receipt does not match request and quote');
      id(hostReceipt.approvalId);
      job.state='SUBMITTING';job.updatedAt=now;job.approvalReceipt={approvalId:hostReceipt.approvalId,requestDigest:hostReceipt.requestDigest,quoteId:hostReceipt.quoteId};
      this.write(job);return this.get(jobId);
    });
  }
  write(job){const {revision,...body}=job;this.db.prepare('UPDATE jobs SET body=?,revision=revision+1 WHERE id=?').run(canonicalJSON(body),job.id);}
  observe(jobId,expectedRevision,event,now){
    integer(now,'clock');id(event.id);const eventDigest=hash(event);
    return this.transaction(()=>{
      const job=this.get(jobId);if(!job)throw Error('Unknown job');
      const prior=this.db.prepare('SELECT digest FROM events WHERE job=? AND event=?').get(jobId,event.id);
      if(prior){if(prior.digest!==eventDigest)throw Error('Conflicting duplicate event');return job;}
      if(job.revision!==expectedRevision)throw Error('Stale job revision');
      if(now<job.updatedAt)throw Error('Regressed clock');
      if(terminal.has(job.state)||!transitions[job.state]?.includes(event.state))throw Error('Invalid job transition');
      if(['ACCEPTED','RUNNING','SUCCEEDED','CANCEL_REQUESTED','CANCELLED'].includes(event.state)){
        id(event.providerJobId);
        if(job.providerJobId&&job.providerJobId!==event.providerJobId)throw Error('Provider job identity changed');
        job.providerJobId=event.providerJobId;
      }
      if(event.state==='SUCCEEDED'){
        if(!Array.isArray(event.outputs)||!event.outputs.length||event.outputs.length>100)throw Error('Admitted outputs required');
        for(const o of event.outputs){
          id(o.assetId);integer(o.version,'asset version');if(o.version<1||! /^[a-f0-9]{64}$/.test(o.sha256))throw Error('Output byte digest required');
          if(!this.resolveOutput)throw Error('Stored output byte resolver required');
          const bytes=this.resolveOutput(o,job);
          if(!(bytes instanceof Uint8Array)||createHash('sha256').update(bytes).digest('hex')!==o.sha256)throw Error('Output bytes do not match admitted digest');
        }
        job.outputs=JSON.parse(canonicalJSON(event.outputs));
      }
      if(event.settlement){
        integer(event.settlement.actualMinor,'settlement');
        if(event.settlement.currency!==job.quote.currency)throw Error('Settlement currency mismatch');
        job.settlement={...event.settlement,overQuote:event.settlement.actualMinor>job.quote.maximumMinor};
      }
      job.state=event.state;job.updatedAt=now;job.pastDeadline=now>=job.deadline;
      this.db.prepare('INSERT INTO events VALUES(?,?,?,?)').run(jobId,event.id,eventDigest,canonicalJSON(event));
      this.write(job);return this.get(jobId);
    });
  }
  recovery(jobId,now){
    integer(now,'clock');const job=this.get(jobId);if(!job)throw Error('Unknown job');
    if(now<job.updatedAt)throw Error('Regressed clock');
    return {jobId,state:job.state,pastDeadline:now>=job.deadline,
      action:terminal.has(job.state)?'NONE':job.state==='PREPARED'?'REQUIRE_HOST_APPROVAL':job.providerJobId?'RECONCILE_EXISTING_PROVIDER_JOB':'RECONCILE_SUBMISSION_NO_RETRY',
      maySubmitAgain:false,providerJobId:job.providerJobId,requestDigest:job.requestDigest};
  }
}
