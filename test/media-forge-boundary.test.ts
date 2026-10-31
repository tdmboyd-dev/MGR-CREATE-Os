import test from "node:test";
import assert from "node:assert/strict";
import {MediaFactory} from "../src/factories/media-factory.js";

const request = (modality: "3D" | "IMAGE") => ({
  id: "creation-3d-01", kind: "MEDIA" as const, tenantId: "owner",
  workspaceId: "private", acceptanceCriteria: ["a real GLB"],
  inputs: {modality, brief: "dragon", modelCapability: "3d-generator",
           lockRefs: ["identity-lock"], rightsRefs: ["cc0-source"],
           verificationCriteria: ["opened in Blender"]},
});

test("3D media request never reports success just for receiving a brief", async () => {
  const result = await new MediaFactory().execute(request("3D"));
  assert.equal(result.status, "BLOCKED");
  assert.deepEqual(result.artifactRefs, []);
  assert.ok(result.blockers?.some(message => message.includes("verified media artifact")));
  assert.deepEqual(result.evidenceRefs, ["identity-lock", "cc0-source"]);
});

test("IMAGE as well as 3D cannot claim success without actual output", async () => {
  for(const modality of ["IMAGE","3D"] as const){
    const result=await new MediaFactory().execute(request(modality));
    assert.equal(result.status,"BLOCKED");
    assert.deepEqual(result.artifactRefs,[]);
    assert.ok(result.blockers?.some(x=>x.includes("verified media artifact")));
  }
});

test("malformed inputs block rather than crash media factory", async () => {
  const req = {...request("IMAGE"), inputs: null};
  const result = await new MediaFactory().execute(req);
  assert.equal(result.status, "BLOCKED");
  assert.deepEqual(result.artifactRefs, []);
});
