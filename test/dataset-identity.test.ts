import assert from "node:assert/strict";
import test from "node:test";
import { evaluateDatasetQuality } from "../src/training/dataset-quality.js";
import { canUseVoiceIdentity, validateIdentityLock } from "../src/identity/index.js";

test("dataset quality fails closed without rights evidence", () => {
  const report = evaluateDatasetQuality({
    datasetId: "d1",
    minIdentityScore: 0.9,
    items: [
      { id: "1", assetRef: "a1", rightsRefs: [], width: 1024, height: 1024, identityScore: 0.95, poseLabel: "front", expressionLabel: "neutral" },
      { id: "2", assetRef: "a2", rightsRefs: ["r2"], width: 1024, height: 1024, identityScore: 0.94, poseLabel: "side", expressionLabel: "smile" },
    ],
  });
  assert.equal(report.blockers.includes("not every dataset item has rights evidence"), true);
});

test("voice identity requires unrevoked purpose-bound consent and rights", () => {
  const voice = {
    id: "v1",
    subjectId: "s1",
    referenceAudioRefs: ["audio:1"],
    consentRefs: ["consent:1"],
    rightsRefs: ["rights:1"],
    allowedPurposes: ["avatar-dialogue"],
  };
  assert.equal(canUseVoiceIdentity(voice, "avatar-dialogue"), true);
  assert.equal(canUseVoiceIdentity({ ...voice, revokedAt: "2026-09-29" }, "avatar-dialogue"), false);
});

test("identity lock requires references and rights", () => {
  assert.deepEqual(validateIdentityLock({
    id: "i1",
    subjectId: "s1",
    modality: "FACE",
    referenceRefs: [],
    allowedVariation: {},
    rightsRefs: [],
  }), [
    "identity lock requires references",
    "identity lock requires rights evidence",
  ]);
});
