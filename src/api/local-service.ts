import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { DatabaseSync } from "node:sqlite";
import { createHash, randomUUID, timingSafeEqual } from "node:crypto";
import { mkdirSync } from "node:fs";
import { dirname, isAbsolute } from "node:path";
import { pathToFileURL } from "node:url";
import { MarkdownRenderer } from "../documents/markdown-renderer.js";

export interface CreationPrincipal { token:string; tenantId:string; actorId:string }
export interface NativeDocumentRequest {
  requestId:string;tenantId:string;workspaceId:string;capability:"document.markdown";
  input:{actorId?:string;correlationId?:string;payload:{title:string;sections:{heading:string;body:string}[];rightsRefs:string[]}};
  acceptanceCriteria:string[];maxCost?:number;defer?:boolean;
}
type Job={requestId:string;tenantId:string;status:string;digest:string;spec:string;artifactId:string|null;receiptId:string};
const canonical=(x:unknown):string=>x!==null&&typeof x==="object"?(Array.isArray(x)?`[${x.map(canonical).join(",")}]`:`{${Object.entries(x).filter(([,v])=>v!==undefined).sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>JSON.stringify(k)+":"+canonical(v)).join(",")}}`):JSON.stringify(x);
const sha=(x:string|Uint8Array)=>createHash("sha256").update(x).digest("hex");
const nonempty=(x:unknown):x is string=>typeof x==="string"&&x.trim().length>0;
const id=(x:unknown):x is string=>typeof x==="string"&&/^[a-zA-Z0-9_.:-]{1,128}$/.test(x);
class HttpError extends Error {constructor(readonly status:number,message:string){super(message);}}
function validate(value:unknown,p:CreationPrincipal):NativeDocumentRequest{
  if(!value||typeof value!=="object"||Array.isArray(value))throw new HttpError(400,"Invalid creation request");
  const r=value as NativeDocumentRequest;
  if(r.tenantId!==p.tenantId || (r.input?.actorId!==undefined&&r.input.actorId!==p.actorId))throw new HttpError(403,"Identity mismatch");
  if(!id(r.requestId)||!id(r.workspaceId)||r.capability!=="document.markdown")throw new HttpError(400,"Unsupported capability or identity");
  const d=r.input?.payload;
  if(!d||!nonempty(d.title)||d.title.length>500||!Array.isArray(d.sections)||d.sections.length<1||d.sections.length>100||
    !d.sections.every(s=>s&&nonempty(s.heading)&&typeof s.body==="string"&&s.body.length<=100_000)||
    !Array.isArray(d.rightsRefs)||!d.rightsRefs.length||!d.rightsRefs.every(nonempty)||
    !Array.isArray(r.acceptanceCriteria)||!r.acceptanceCriteria.length||!r.acceptanceCriteria.every(nonempty)||
    (r.maxCost!==undefined&&(!Number.isFinite(r.maxCost)||r.maxCost!==0))||
    (r.defer!==undefined&&typeof r.defer!=="boolean"))throw new HttpError(400,"Document content, rights declaration and acceptance criteria are required; this native capability has zero provider cost");
  // Optional caller actor is only an assertion; always persist credential ownership.
  return structuredClone({...r,input:{...r.input,actorId:p.actorId}});
}
async function readJson(req:IncomingMessage){let length=0;const chunks:Buffer[]=[];for await(const c of req){const b=Buffer.from(c);length+=b.length;if(length>1_048_576)throw new HttpError(413,"Request too large");chunks.push(b);}try{return JSON.parse(Buffer.concat(chunks).toString());}catch{throw new HttpError(400,"Invalid JSON");}}
function json(res:ServerResponse,status:number,body:unknown){res.writeHead(status,{"content-type":"application/json","cache-control":"no-store"});res.end(JSON.stringify(body));}

/** Local domain server; credentials bind one principal, never arbitrary caller headers. */
export function createNativeCreationService(options:{dbPath:string;principals:CreationPrincipal[]}){
  if(!isAbsolute(options.dbPath)||!Array.isArray(options.principals)||!options.principals.length||options.principals.some(p=>!p||typeof p.token!=="string"||p.token.trim().length<24||!id(p.tenantId)||!id(p.actorId)))throw Error("Absolute DB path and scoped service principals with strong tokens are required");
  mkdirSync(dirname(options.dbPath),{recursive:true});const db=new DatabaseSync(options.dbPath);
  db.exec(`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS native_creation_jobs(tenantId TEXT NOT NULL,requestId TEXT NOT NULL,status TEXT NOT NULL,digest TEXT NOT NULL,spec TEXT NOT NULL,artifactId TEXT,receiptId TEXT NOT NULL,PRIMARY KEY(tenantId,requestId));
    CREATE TABLE IF NOT EXISTS native_creation_artifacts(id TEXT PRIMARY KEY,tenantId TEXT NOT NULL,requestId TEXT NOT NULL,bytes BLOB NOT NULL,sha256 TEXT NOT NULL,size INTEGER NOT NULL,mime TEXT NOT NULL,rightsRefs TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS native_creation_audit(id INTEGER PRIMARY KEY,tenantId TEXT NOT NULL,requestId TEXT NOT NULL,event TEXT NOT NULL,createdAt TEXT NOT NULL);
    UPDATE native_creation_jobs SET status='QUEUED' WHERE status='RUNNING';`);
  const audit=(tenant:string,request:string,event:string)=>db.prepare("INSERT INTO native_creation_audit(tenantId,requestId,event,createdAt) VALUES(?,?,?,?)").run(tenant,request,event,new Date().toISOString());
  const get=(tenant:string,request:string)=>db.prepare("SELECT * FROM native_creation_jobs WHERE tenantId=? AND requestId=?").get(tenant,request) as unknown as Job|undefined;
  const owns=(job:Job,p:CreationPrincipal)=>JSON.parse(job.spec).input?.actorId===p.actorId;
  const owned=(p:CreationPrincipal,request:string)=>{const job=get(p.tenantId,request);if(!job||!owns(job,p))throw new HttpError(404,"Job not found");return job;};
  const describe=(job:Job)=>{const artifact=job.artifactId?db.prepare("SELECT id,sha256,size,mime,rightsRefs FROM native_creation_artifacts WHERE id=? AND tenantId=?").get(job.artifactId,job.tenantId):undefined;return {requestId:job.requestId,status:job.status,inputDigest:job.digest,artifactRefs:artifact?[job.artifactId]:[],evidenceRefs:[job.receiptId],artifacts:artifact?[{...artifact,bytes:artifact.size,downloadPath:`/v1/creation/artifacts/${job.artifactId}`}]:[],rightsStatus:"caller-declared; not legal clearance",providerCost:0};};
  const produce=async(tenant:string,request:string)=>{
    let job=get(tenant,request);if(!job)throw new HttpError(404,"Job not found");
    if(job.status!=="QUEUED")return describe(job);
    const claimed=db.prepare("UPDATE native_creation_jobs SET status='RUNNING' WHERE tenantId=? AND requestId=? AND status='QUEUED'").run(tenant,request);
    if(!claimed.changes)return describe(get(tenant,request)!);
    const spec=JSON.parse(job.spec) as NativeDocumentRequest;
    try{
      const rendered=await new MarkdownRenderer().render(spec.input.payload);const bytes=rendered.bytes;
      if(!bytes.length)throw Error("Renderer produced no bytes");
      db.exec("BEGIN IMMEDIATE");
      try{
        job=get(tenant,request)!;
        if(job.status==="CANCELLED"){db.exec("COMMIT");return describe(job);}
        const artifactId=randomUUID();
        db.prepare("INSERT INTO native_creation_artifacts VALUES(?,?,?,?,?,?,?,?)").run(artifactId,tenant,request,bytes,sha(bytes),bytes.length,rendered.mime,JSON.stringify(spec.input.payload.rightsRefs));
        db.prepare("UPDATE native_creation_jobs SET status='SUCCEEDED',artifactId=? WHERE tenantId=? AND requestId=?").run(artifactId,tenant,request);audit(tenant,request,"artifact-produced");db.exec("COMMIT");
      }catch(error){db.exec("ROLLBACK");throw error;}
    }catch(error){db.prepare("UPDATE native_creation_jobs SET status='FAILED' WHERE tenantId=? AND requestId=? AND status!='CANCELLED'").run(tenant,request);audit(tenant,request,"renderer-failed");throw error;}
    return describe(get(tenant,request)!);
  };
  const server=createServer(async(req,res)=>{
    try{
      if(req.headers.origin)throw new HttpError(403,"Browser origins are not admitted to this service boundary");
      const host=req.headers.host??"";if(!/^(127\.0\.0\.1|localhost)(:\d+)?$/.test(host))throw new HttpError(421,"Loopback host required");
      const token=req.headers.authorization?.startsWith("Bearer ")?req.headers.authorization.slice(7):"";
      const p=options.principals.find(x=>Buffer.byteLength(x.token)===Buffer.byteLength(token)&&timingSafeEqual(Buffer.from(x.token),Buffer.from(token)));
      if(!p)throw new HttpError(401,"Unauthorized");
      if((req.headers["x-tenant-id"]!==undefined&&req.headers["x-tenant-id"]!==p.tenantId)||(req.headers["x-actor-id"]!==undefined&&req.headers["x-actor-id"]!==p.actorId))throw new HttpError(403,"Identity mismatch");
      const url=new URL(req.url??"/","http://localhost");
      if(req.method==="GET"&&url.pathname==="/health")return json(res,200,{ok:true,service:"mgr-creation-native",capabilities:["document.markdown"],tenantId:p.tenantId,actorId:p.actorId});
      if(req.method==="POST"&&url.pathname==="/v1/creation/jobs"){
        const r=validate(await readJson(req),p);const digest=sha(canonical({...r,defer:undefined}));let job=get(p.tenantId,r.requestId);
        if(job){if(!owns(job,p))throw new HttpError(404,"Job not found");if(job.digest!==digest)throw new HttpError(409,"Idempotency input mismatch");return json(res,200,describe(job));}
        db.prepare("INSERT INTO native_creation_jobs VALUES(?,?,?,?,?,?,?)").run(p.tenantId,r.requestId,"QUEUED",digest,JSON.stringify(r),null,randomUUID());audit(p.tenantId,r.requestId,"job-accepted");
        return json(res,201,r.defer?describe(get(p.tenantId,r.requestId)!):await produce(p.tenantId,r.requestId));
      }
      const route=url.pathname.match(/^\/v1\/creation\/jobs\/([a-zA-Z0-9_.:-]{1,128})(?:\/(run|cancel))?$/);
      if(route){const job=owned(p,route[1]);
        if(req.method==="GET"&&!route[2])return json(res,200,describe(job));
        if(req.method==="POST"&&route[2]==="run"){if(job.status==="CANCELLED")throw new HttpError(409,"Job cancelled");return json(res,200,await produce(p.tenantId,job.requestId));}
        if(req.method==="POST"&&route[2]==="cancel"){if(job.status==="SUCCEEDED")throw new HttpError(409,"Completed artifact cannot be cancelled");db.prepare("UPDATE native_creation_jobs SET status='CANCELLED' WHERE tenantId=? AND requestId=?").run(p.tenantId,job.requestId);audit(p.tenantId,job.requestId,"cancelled");return json(res,200,describe(get(p.tenantId,job.requestId)!));}
      }
      const artifact=url.pathname.match(/^\/v1\/creation\/artifacts\/([a-zA-Z0-9-]{1,128})$/);
      if(req.method==="GET"&&artifact){const row=db.prepare("SELECT a.bytes,a.mime,a.sha256 FROM native_creation_artifacts a JOIN native_creation_jobs j ON j.tenantId=a.tenantId AND j.requestId=a.requestId AND j.artifactId=a.id WHERE a.id=? AND a.tenantId=? AND json_extract(j.spec,'$.input.actorId')=?").get(artifact[1],p.tenantId,p.actorId);if(!row)throw new HttpError(404,"Artifact not found");res.writeHead(200,{"content-type":String(row.mime),"x-content-sha256":String(row.sha256),"cache-control":"no-store"});res.end(row.bytes as Uint8Array);return;}
      throw new HttpError(404,"Not found");
    }catch(error){json(res,error instanceof HttpError?error.status:500,{error:error instanceof HttpError?error.message:"Creation operation failed"});}
  });
  return {server,close:async()=>{await new Promise<void>((resolve,reject)=>server.close(error=>error?reject(error):resolve()));db.close();}};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
  let principals: CreationPrincipal[];
  try { principals=JSON.parse(process.env.CREATION_SERVICE_PRINCIPALS??"[]") as CreationPrincipal[]; }
  catch { throw Error("CREATION_SERVICE_PRINCIPALS must contain valid principal JSON"); }
  const service=createNativeCreationService({dbPath:process.env.CREATION_DB_PATH??"",principals});
  service.server.listen(Number(process.env.CREATION_PORT??8791),"127.0.0.1",()=>console.log(JSON.stringify({service:"mgr-creation-native",port:(service.server.address() as {port:number}).port})));
  for(const signal of ["SIGTERM","SIGINT"] as const)process.once(signal,()=>void service.close());
}
