import {readFileSync,readdirSync,statSync,existsSync} from 'node:fs';
import {resolve,relative,dirname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../mgr-production-brain');
const json=p=>JSON.parse(readFileSync(p,'utf8').replace(/^\uFEFF/,''));
const manifest=json(resolve(root,'plugin.json'));
assert.equal(manifest.name,'mgr-production-brain');
assert.match(manifest.version,/^\d+\.\d+\.\d+$/);
const ui=manifest.extensions['com.openai'].interface;
assert.ok(ui.shortDescription.length<=30);
for(const illegal of ['skills','mcpServers','apps','interface'])assert.equal(Object.hasOwn(manifest,illegal),false);
const mcp=json(resolve(root,'mcp.json'));
assert.deepEqual(Object.keys(mcp.mcpServers).sort(),['higgsfield','youart']);
for(const s of Object.values(mcp.mcpServers)){assert.equal(s.type,'streamable-http');assert.ok(s.url.startsWith('https://'));assert.equal(Object.keys(s).length,2);}
let checked=0;
function scan(dir){for(const name of readdirSync(dir)){
 const path=resolve(dir,name),st=statSync(path);if(st.isDirectory()){scan(path);continue;}
 checked++;const text=readFileSync(path,'utf8');
 assert.ok(!/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/.test(text),'Private key marker');
 if(name==='SKILL.md'){
  const skillName=relative(resolve(root,'skills'),dirname(path)).split(sep).at(-1);
  assert.ok(text.startsWith('---\nname: '+skillName+'\n'));
  assert.match(text,/\ndescription: .+\n---/);
 }
 if(name.endsWith('.md'))for(const match of text.matchAll(/\]\(([^)]+)\)/g)){
  const target=match[1];if(/^https?:|^#/.test(target))continue;
  const full=resolve(dirname(path),target.split('#')[0]);assert.ok(full.startsWith(root+sep));assert.ok(existsSync(full),'Missing linked file '+target);
 }
}}
scan(root);
console.log(JSON.stringify({ok:true,manifest:manifest.name,version:manifest.version,filesChecked:checked,checks:['manifest fields','subtitle limit','skill identity','local reference paths','MCP endpoint configuration','private-key marker scan'],limitations:['Not the remote service validator','Does not test OAuth or provider tools']},null,2));
