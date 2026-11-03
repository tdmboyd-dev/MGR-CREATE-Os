import assert from "node:assert/strict";
import test from "node:test";
import {
  CreateLocoCapabilityAdapter,
  type CreateLocoBuildRequest,
  type CreateLocoTransport,
} from "../src/adapters/create-loco.js";

const baseRequest = (): CreateLocoBuildRequest => ({
  requestId: "req-1",
  tenantId: "tenant-1",
  workspaceId: "workspace-1",
  objective: "reconstruct the approved landing page",
  references: [{ id: "ref-1", kind: "screenshot", uri: "asset://ref-1", viewport: { width: 1440, height: 1200, dpr: 2 }, role: "primary" }],
  target: {
    framework: "nextjs",
    routes: ["/"],
    responsiveViewports: [{ width: 1440, height: 1200 }, { width: 390, height: 844, dpr: 3 }],
  },
  locks: {
    preserveContinuousBackgrounds: true,
    textAsOverlay: true,
    heroMediaBehindOverlay: true,
    brandLockIds: ["brand-1"],
  },
  acceptance: {
    journeys: ["open / and compare desktop/mobile renders"],
    maxVisualDelta: 0.05,
    requiredLayerProbes: [{ frontId: "title", backId: "image", x: 25, y: 35, viewport: { width: 390, height: 844, dpr: 3 } }],
  },
});

test("Create Loco adapter blocks underspecified reconstruction jobs before transport", async () => {
  let calls = 0;
  const transport: CreateLocoTransport = {
    async execute(request) {
      calls += 1;
      return { requestId: request.requestId, status: "SUCCEEDED", artifactRefs: [], evidenceRefs: [], defects: [] };
    },
  };
  const adapter = new CreateLocoCapabilityAdapter(transport);
  const request = baseRequest();
  request.references = [];
  const result = await adapter.execute(request);
  assert.equal(result.status, "BLOCKED");
  assert.equal(calls, 0);
});

test("Create Loco adapter preserves request identity and evidence contract", async () => {
  const transport: CreateLocoTransport = {
    async execute(request) {
      assert.equal(request.references[0]?.role, "primary");
      assert.equal(request.references[0]?.viewport?.dpr, 2);
      assert.equal(request.target.responsiveViewports[1]?.dpr, 3);
      assert.equal(request.locks.heroMediaBehindOverlay, true);
      assert.deepEqual(request.acceptance.requiredLayerProbes, baseRequest().acceptance.requiredLayerProbes);
      return {
        requestId: request.requestId,
        status: "SUCCEEDED",
        artifactRefs: ["web://build-1"],
        evidenceRefs: ["evidence://browser-1"],
        layerEvidence: [{ ...request.acceptance.requiredLayerProbes![0]!,
          status: "FRONT_ABOVE", evidenceRef: "evidence://browser-1" }],
        defects: [{id: "defect-1",category: "GEOMETRY",observed: "20px",expected: "24px",targetRef: "hero",severity: "LOW",evidenceRefs: ["evidence://browser-1"]}],
      };
    },
  };
  const result = await new CreateLocoCapabilityAdapter(transport).execute(baseRequest());
  assert.equal(result.status, "SUCCEEDED");
  assert.deepEqual(result.evidenceRefs, ["evidence://browser-1"]);
  assert.equal(result.defects[0]?.targetRef, "hero");
  assert.equal(result.defects[0]?.severity, "LOW");
  assert.deepEqual(result.defects[0]?.evidenceRefs, ["evidence://browser-1"]);
});

test("Create Loco adapter rejects a mismatched transport response", async () => {
  const transport: CreateLocoTransport = {
    async execute() {
      return { requestId: "wrong", status: "SUCCEEDED", artifactRefs: [], evidenceRefs: [], defects: [] };
    },
  };
  await assert.rejects(() => new CreateLocoCapabilityAdapter(transport).execute(baseRequest()));
});

test("Create Loco adapter rejects unsubstantiated or blocked success", async () => {
  for (const fields of [
    { artifactRefs: [], evidenceRefs: ["evidence://browser-1"] },
    { artifactRefs: ["web://build-1"], evidenceRefs: [" "] },
    { artifactRefs: ["web://build-1"], evidenceRefs: ["evidence://browser-1"], blockers: ["Browser unavailable"] },
  ]) {
    const adapter = new CreateLocoCapabilityAdapter({
      async execute(request) {
        return { requestId: request.requestId, status: "SUCCEEDED", defects: [], ...fields };
      },
    });
    await assert.rejects(() => adapter.execute(baseRequest()), /success requires|success cannot/);
  }
});

test("Create Loco adapter preserves repair evidence when severe defects invalidate success", async () => {
  const result = {
    requestId: "req-1",
    status: "SUCCEEDED" as const,
    artifactRefs: ["web://build-1"],
    evidenceRefs: ["evidence://browser-1"],
    defects: [{
      id: "layer:hero", category: "GEOMETRY", targetRef: "hero",
      observed: "text behind image", expected: "text above image",
      severity: "HIGH" as const, evidenceRefs: ["evidence://browser-1"],
    }],
  };
  const adapter = new CreateLocoCapabilityAdapter({ async execute() { return result; } });
  assert.deepEqual(await adapter.execute(baseRequest()), {
    ...result, status: "FAILED", blockers: ["High-severity reconstruction defects remain"],
  });
});

test("Create Loco adapter requires matching evidence for direct Creation OS callers", async () => {
  const request = baseRequest();
  const required = request.acceptance.requiredLayerProbes![0]!;
  const capture = { ...required, status: "FRONT_ABOVE" as const, evidenceRef: "evidence://browser-1" };
  for (const layerEvidence of [[], [capture, capture],
    [{ ...capture, viewport: { ...capture.viewport, dpr: 1 } }],
    [{ ...capture, evidenceRef: "evidence://unlisted" }]]) {
    const adapter = new CreateLocoCapabilityAdapter({
      async execute() {
        return { requestId: request.requestId, status: "SUCCEEDED", artifactRefs: ["web://build-1"],
          evidenceRefs: [capture.evidenceRef], defects: [], layerEvidence };
      },
    });
    const result = await adapter.execute(request);
    assert.equal(result.status, "FAILED");
    assert.deepEqual(result.layerEvidence, layerEvidence);
    assert.match(result.blockers?.[0] ?? "", /lacks passing evidence/);
  }
});
