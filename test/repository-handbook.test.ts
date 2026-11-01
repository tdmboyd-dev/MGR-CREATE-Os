import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

test("Creation OS has its own full tracked source baseline and handbook; Forge remains optional",()=>{
 const snapshot=JSON.parse(readFileSync("evidence/audits/2026-10-31-baseline-static-inventory.json","utf8"));
 assert.equal(snapshot.tracked_file_count,365);
 assert.equal(snapshot.all_tracked_file_sha256_bytes_and_parse_classifications.length,365);
 assert.equal(snapshot.js_ts_text_inspected_not_ast,178);
 assert.deepEqual(snapshot.errors,[]);
 const guide=readFileSync("docs/CREATION-OS-ENGINEERING-HANDBOOK.md","utf8");
 for(const name of ["src/api/service.ts","src/factories/media-factory.ts","src/core/approval.ts","src/core/queue.ts"]){
  assert.ok(guide.includes(name),name);
 }
 assert.ok(guide.includes("not a prerequisite"));
 assert.ok(readFileSync("HANDOFF.md","utf8").includes("CREATION-OS-ENGINEERING-HANDBOOK.md"));
});
