import assert from "node:assert/strict";
import test from "node:test";
import { issueUCT } from "../src/creation/uct.js";
import { uctToC2paDraft } from "../src/creation/c2pa.js";

test("UCT maps to an explicit unsigned C2PA draft without losing MGR lineage", () => {
  const uct = issueUCT({
    artifactVersionId: "asset:v1",
    artifactDigest: "sha256:abc",
    creationRunId: "run-1",
    stageRunId: "stage-1",
    createdBy: "operator-1",
    parentUCTs: ["uct-parent"],
    createdAt: "2026-09-29T10:00:00Z",
    metadata: {},
  });

  const draft = uctToC2paDraft({
    uct,
    mimeType: "image/png",
    modelRefs: ["model:1"],
    rightsRefs: ["rights:1"],
  });

  assert.equal(draft.instanceId, uct.id);
  assert.equal(draft.assertions[0]?.data.artifactDigest, "sha256:abc");
  assert.deepEqual((draft.assertions.find((a) => a.label === "org.mgr.rights")?.data as any).rightsRefs, ["rights:1"]);
});
