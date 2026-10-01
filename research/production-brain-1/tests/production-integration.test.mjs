import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import {digest} from '../mgr-production-brain/skills/production-brain/scripts/brain.mjs';
import {run} from '../mgr-production-brain/skills/production-brain/scripts/production.mjs';
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
test('comparison CLI binds actual artifact bytes and rejects modification and directory escape',()=>{
 const root=mkdtempSync(join(tmpdir(),'mgr-comparison-')),file=join(root,'manifest.json'),brief={shot:'fixture'},bytes=Buffer.from('authored output');writeFileSync(join(root,'out.txt'),bytes);
 const manifest={schemaVersion:1,briefId:'fixture',brief,fixtureRights:'Original test',trials:[{id:'one',provider:'native',modelVersion:'fixture-1',briefDigest:digest(brief),state:'SUCCEEDED',wallSeconds:1,repairSeconds:0,costMinor:0,currency:'USD',outputArtifact:'out.txt',outputSha256:hash(bytes),evaluations:{}}]};
 const save=()=>writeFileSync(file,JSON.stringify(manifest));save();assert.equal(run(['comparison',file]).artifactByteIdentityVerified,true);
 writeFileSync(join(root,'out.txt'),'modified');assert.throws(()=>run(['comparison',file]),/bytes differ/);
 manifest.trials[0].outputArtifact='../outside-mgr-comparison.txt';writeFileSync(join(root,'../outside-mgr-comparison.txt'),bytes);save();assert.throws(()=>run(['comparison',file]),/outside fixture/);
});
test('standalone job preparation persists without submitting or granting execution',()=>{
 const root=mkdtempSync(join(tmpdir(),'mgr-job-cli-')),db=join(root,'jobs.sqlite'),file=join(root,'spec.json'),now=Date.now();
 writeFileSync(file,JSON.stringify({id:'job',provider:'fixture',model:'fixture-1',payload:{prompt:'fixture'},capabilitySnapshot:'s1',deadline:now+120000,quote:{id:'q1',currency:'USD',maximumMinor:10,expiresAt:now+120000}}));
 assert.equal(run(['job-prepare',db,file]).state,'PREPARED');assert.equal(run(['job-get',db,'job']).state,'PREPARED');const recovery=run(['job-recovery',db,'job']);assert.equal(recovery.action,'REQUIRE_HOST_APPROVAL');assert.equal(recovery.maySubmitAgain,false);
});
