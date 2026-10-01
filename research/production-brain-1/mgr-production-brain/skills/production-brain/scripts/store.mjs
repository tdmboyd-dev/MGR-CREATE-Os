import {DatabaseSync} from 'node:sqlite';
import {createHash} from 'node:crypto';
import {validate, digest} from './brain.mjs';
import {inspectMedia} from './media.mjs';

const text = v => typeof v === 'string' && v.trim().length > 0 && v.length <= 4096;
const hash = b => createHash('sha256').update(b).digest('hex');
function json(value) {
  const seen = new Set();
  function visit(v) {
    if (typeof v === 'number' && !Number.isFinite(v)) throw Error('Nonfinite JSON number');
    if (v === null || ['string','boolean','number'].includes(typeof v)) return;
    if (typeof v !== 'object' || seen.has(v)) throw Error('Plain acyclic JSON required');
    if (!Array.isArray(v) && Object.getPrototypeOf(v) !== Object.prototype) throw Error('Plain JSON objects required');
    seen.add(v); for (const x of Object.values(v)) visit(x); seen.delete(v);
  }
  visit(value); const s=JSON.stringify(value);
  if (Buffer.byteLength(s)>4*1024*1024) throw Error('JSON limit exceeded');
  return s;
}

export class ProductionStore {
  #db;
  constructor(path, {maxAssetBytes=32*1024*1024}={}) {
    if (!Number.isSafeInteger(maxAssetBytes)||maxAssetBytes<1||maxAssetBytes>32*1024*1024) throw Error('Invalid asset limit');
    this.maxAssetBytes=maxAssetBytes;
    this.#db=new DatabaseSync(path, {enableForeignKeyConstraints:true, timeout:3000});
    const application=this.#db.prepare('PRAGMA application_id').get().application_id;
    const tables=this.#db.prepare("SELECT count(*) AS n FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").get().n;
    if(application!==1296511537&&(application!==0||tables!==0)){this.#db.close();throw Error('Not an MGR Production Brain database');}
    const version=this.#db.prepare('PRAGMA user_version').get().user_version;
    if (![0,1].includes(version)) {this.#db.close(); throw Error('Unsupported database version');}
    this.#db.exec(`
      PRAGMA foreign_keys=ON;
      CREATE TABLE IF NOT EXISTS plans(project TEXT NOT NULL, revision INTEGER NOT NULL, body TEXT NOT NULL, digest TEXT NOT NULL, PRIMARY KEY(project,revision));
      CREATE TABLE IF NOT EXISTS objects(digest TEXT PRIMARY KEY, bytes BLOB NOT NULL);
      CREATE TABLE IF NOT EXISTS assets(project TEXT NOT NULL, asset TEXT NOT NULL, version INTEGER NOT NULL, digest TEXT NOT NULL REFERENCES objects(digest), body TEXT NOT NULL, PRIMARY KEY(project,asset,version));
      PRAGMA user_version=1;
      PRAGMA application_id=1296511537;
    `);
  }
  close(){this.#db.close();}
  #transaction(fn){
    this.#db.exec('BEGIN IMMEDIATE');
    try {const result=fn();this.#db.exec('COMMIT');return result;}
    catch(e){try{this.#db.exec('ROLLBACK');}catch{}throw e;}
  }
  getPlan(project, revision){
    const row=revision===undefined
      ?this.#db.prepare('SELECT body,digest FROM plans WHERE project=? ORDER BY revision DESC LIMIT 1').get(project)
      :this.#db.prepare('SELECT body,digest FROM plans WHERE project=? AND revision=?').get(project,revision);
    if(!row)return null;
    const plan=JSON.parse(row.body);
    if(digest(plan)!==row.digest)throw Error('Stored plan integrity failure');
    return plan;
  }
  savePlan(plan,expectedRevision){
    const body=json(plan);
    if(!text(plan.id)||!Number.isSafeInteger(expectedRevision)||expectedRevision<0)throw Error('Project ID and expected revision required');
    return this.#transaction(()=>{
      const previous=this.getPlan(plan.id);
      if((previous?.revision??0)!==expectedRevision)throw Error('Stale revision');
      if(!previous&&plan.revision!==1)throw Error('First revision must be 1');
      const checked=validate(plan,previous??undefined);
      if(!checked.ok){const e=Error('Plan rejected');e.details=checked.errors;throw e;}
      const receipt={project:plan.id,revision:plan.revision,digest:digest(plan)};
      this.#db.prepare('INSERT INTO plans VALUES(?,?,?,?)').run(plan.id,plan.revision,body,receipt.digest);
      return receipt;
    });
  }
  admitAsset(project,metadata,bytes){
    if(!Buffer.isBuffer(bytes)&&!(bytes instanceof Uint8Array))throw Error('Asset bytes required');
    if(bytes.byteLength>this.maxAssetBytes)throw Error('Asset byte limit exceeded');
    const copy=Buffer.from(bytes);
    const inspection=inspectMedia(copy);
    json(metadata);
    for(const field of ['id','provenance','rights'])if(!text(metadata[field]))throw Error('Asset '+field+' required');
    if(!Number.isSafeInteger(metadata.version)||metadata.version<1)throw Error('Positive asset version required');
    const parents=metadata.parents??[];
    if(!Array.isArray(parents)||parents.length>100||parents.some(p=>!p||!text(p.id)||!Number.isSafeInteger(p.version)||p.version<1))throw Error('Invalid parents');
    return this.#transaction(()=>{
      if(!this.getPlan(project))throw Error('Unknown project');
      const latest=this.#db.prepare('SELECT max(version) AS version FROM assets WHERE project=? AND asset=?').get(project,metadata.id).version??0;
      if(metadata.version!==latest+1)throw Error('Asset version must be consecutive');
      for(const p of parents)if(!this.getAsset(project,p.id,p.version))throw Error('Unknown parent in project');
      const receipt={...metadata,project,parents:structuredClone(parents),digest:hash(copy),byteLength:copy.length,inspection};
      const existing=this.#db.prepare('SELECT bytes FROM objects WHERE digest=?').get(receipt.digest);
      if(existing&&!Buffer.from(existing.bytes).equals(copy))throw Error('Object integrity failure');
      this.#db.prepare('INSERT OR IGNORE INTO objects VALUES(?,?)').run(receipt.digest,copy);
      this.#db.prepare('INSERT INTO assets VALUES(?,?,?,?,?)').run(project,metadata.id,metadata.version,receipt.digest,json(receipt));
      return structuredClone(receipt);
    });
  }
  getAsset(project,id,version){
    const row=this.#db.prepare('SELECT body,digest FROM assets WHERE project=? AND asset=? AND version=?').get(project,id,version);
    if(!row)return null;
    const asset=JSON.parse(row.body);
    if(asset.project!==project||asset.id!==id||asset.version!==version||asset.digest!==row.digest)throw Error('Asset metadata integrity failure');
    return asset;
  }
  assetBytes(project,id,version){
    const asset=this.getAsset(project,id,version);
    if(!asset)throw Error('Unknown asset');
    const row=this.#db.prepare('SELECT bytes FROM objects WHERE digest=?').get(asset.digest);
    if(!row)throw Error('Missing asset object');
    const bytes=Buffer.from(row.bytes);
    if(hash(bytes)!==asset.digest||bytes.length!==asset.byteLength)throw Error('Asset byte integrity failure');
    return bytes;
  }
}
