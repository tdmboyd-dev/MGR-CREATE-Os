import {readFileSync,mkdtempSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const installed=process.argv[2];if(!installed)throw Error('Installed plugin root required');
const skill=join(installed,'skills/production-brain');
const hashes=[];
for(const file of ['brain','catalog','camera','editorial','media','production','site','store','jobs','comparison','providers']){
 const relative='skills/production-brain/scripts/'+file+'.mjs',local=readFileSync(resolve('mgr-production-brain',relative)),cached=readFileSync(join(installed,relative));
 assert.ok(local.equals(cached),'Installed bytes differ: '+relative);hashes.push({file:relative,sha256:createHash('sha256').update(cached).digest('hex')});
}
const {run}=await import(pathToFileURL(join(skill,'scripts/production.mjs')).href);
const work=mkdtempSync(join(tmpdir(),'mgr-installed-1-')),db=join(work,'project.sqlite');
const plan=run(['save-plan',db,join(skill,'assets/example-plan.json'),'0']);assert.equal(run(['get-plan',db,plan.project]).revision,1);
const metadata=join(work,'asset.json'),asset=join(work,'asset.txt'),output=join(work,'recovered.txt');
writeFileSync(metadata,JSON.stringify({id:'asset',version:1,provenance:'installed runtime fixture',rights:'original fixture'}));writeFileSync(asset,'installed Brain 1 exact-byte fixture');run(['admit-asset',db,plan.project,metadata,asset]);run(['export-asset',db,plan.project,'asset','1',output]);assert.ok(readFileSync(asset).equals(readFileSync(output)));
assert.equal(run(['camera-check',join(skill,'assets/example-camera.json')]).pathStatus,'COLLISION');assert.equal(run(['timeline',join(skill,'assets/example-timeline.json')]).totalFrames,432);const site=run(['site-build',join(skill,'assets/example-site.json'),join(work,'site.html')]);assert.ok(readFileSync(site.output,'utf8').includes('<details>'));
const receipt={product:'MGR Production Brain 1',verifiedAt:new Date().toISOString(),installedRoot:installed,runtime:process.version,ok:true,byteMatches:hashes,executed:['save-plan','get-plan','admit-asset','export-asset','camera-check','timeline','site-build'],limitations:['Host filesystem/Node commands verified, not a hosted MCP server','Provider authorization and generated output unverified','Browser/NLE acceptance unverified']};writeFileSync('evidence/installed-1.json',JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify(receipt,null,2));
