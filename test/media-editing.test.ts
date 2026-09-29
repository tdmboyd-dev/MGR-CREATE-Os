import assert from "node:assert/strict";
import test from "node:test";
import { editPassesLocality, validateEditOperation } from "../src/media/index.js";

test("replace operation requires a target and replacement intent", () => {
  assert.deepEqual(validateEditOperation({
    id: "e1",
    type: "REPLACE",
    sourceArtifactRef: "asset:1",
    targetMaskRefs: [],
    preserveOutsideMask: true,
    preserveIdentityLockRefs: [],
    acceptanceCriteria: [],
  }), [
    "edit operation requires at least one target mask",
    "edit operation requires acceptance criteria",
    "replace operation requires replacement asset or prompt",
  ]);
});

test("edit locality requires outside-region preservation and identity checks", () => {
  assert.equal(editPassesLocality({
    operationId: "e1",
    changedOutsideTargetFraction: 0.01,
    targetCoverageFraction: 0.95,
    identityChecks: [{ lockRef: "identity:1", passed: true, score: 0.93 }],
    evidenceRefs: ["evidence:1"],
  }, {
    maxOutsideChange: 0.02,
    minTargetCoverage: 0.9,
  }), true);

  assert.equal(editPassesLocality({
    operationId: "e2",
    changedOutsideTargetFraction: 0.05,
    targetCoverageFraction: 0.95,
    identityChecks: [{ lockRef: "identity:1", passed: true }],
    evidenceRefs: [],
  }, {
    maxOutsideChange: 0.02,
    minTargetCoverage: 0.9,
  }), false);
});
