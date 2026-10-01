import {readSync,writeFileSync,openSync,fstatSync,closeSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {ProductionStore} from './store.mjs';
import {inspectCamera} from './camera.mjs';
import {inspectMedia} from './media.mjs';
import {assembleTimeline} from './editorial.mjs';
import {buildSite} from './site.mjs';

function readBounded(path,limit=32*1024*1024){
  const fd=openSync(path,'r');
  try{const s=fstatSync(fd);if(!s.isFile()||s.size>limit)throw Error('Input file type or size limit');const b=Buffer.alloc(s.size+1);let at=0;while(at<b.length){const n=readSync(fd,b,at,b.length-at,null);if(!n)break;at+=n;}if(at>s.size)throw Error('Input grew while reading; retry a stable file');return b.subarray(0,at);}finally{closeSync(fd);}
}
const json=path=>JSON.parse(readBounded(path,4*1024*1024).toString('utf8').replace(/^\uFEFF/,''));
const positive=v=>{const n=Number(v);if(!Number.isSafeInteger(n)||n<1)throw Error('Positive integer required');return n;};
export function run(args){
  const [command,...a]=args;
  const counts={'save-plan':3,'get-plan':2,'admit-asset':4,'get-asset':4,'export-asset':5,'inspect-media':1,'camera-check':1,'timeline':1,'site-build':2};
  if(!Object.hasOwn(counts,command)||a.length!==counts[command])throw Error('Usage: production.mjs save-plan DB PLAN.json EXPECTED_REVISION | get-plan DB PROJECT | admit-asset DB PROJECT METADATA.json FILE | get-asset DB PROJECT ASSET VERSION | export-asset DB PROJECT ASSET VERSION NEW_FILE | inspect-media FILE | camera-check SCENE.json | timeline EDIT.json | site-build SITE.json NEW.html');
  if(command==='inspect-media')return inspectMedia(readBounded(a[0]));
  if(command==='camera-check')return inspectCamera(json(a[0]));
  if(command==='timeline')return assembleTimeline(json(a[0]));
  if(command==='site-build'){const built=buildSite(json(a[0]));writeFileSync(a[1],built.html,{flag:'wx'});return {...built.receipt,output:a[1]};}
  const db=new ProductionStore(a[0]);
  try{
    if(command==='save-plan')return db.savePlan(json(a[1]),Number(a[2]));
    if(command==='get-plan')return db.getPlan(a[1]);
    if(command==='admit-asset')return db.admitAsset(a[1],json(a[2]),readBounded(a[3]));
    if(command==='get-asset')return db.getAsset(a[1],a[2],positive(a[3]));
    if(command==='export-asset'){const bytes=db.assetBytes(a[1],a[2],positive(a[3]));writeFileSync(a[4],bytes,{flag:'wx'});return {exported:a[4],byteLength:bytes.length};}
  }finally{db.close();}
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
  try{process.stdout.write(JSON.stringify(run(process.argv.slice(2)),null,2)+'\n');}
  catch(e){process.stderr.write(JSON.stringify({ok:false,error:e.message,details:e.details})+'\n');process.exitCode=1;}
}
