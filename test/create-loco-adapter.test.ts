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
  references: [{ id: "ref-1", kind: "screenshot", uri: "asset://ref-1", viewport: { width: 1440, height: 1200 } }],
  target: {
    framework: "nextjs",
    routes: ["/"],
    responsiveViewports: [{ width: 1440, height: 1200 }, { width: 390, height: 844 }],
  },
  locks: {
    preserveContinuousBackgrounds: true,
    textAsOverlay: true,
    brandLockIds: ["brand-1"],
  },
  acceptance: {
    journeys: ["open / and compare desktop/mobile renders"],
    maxVisualDelta: 0.05,
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
      return {
        requestId: request.requestId,
        status: "SUCCEEDED",
        artifactRefs: ["web://build-1"],
        evidenceRefs: ["evidence://browser-1"],
        defects: [],
      };
    },
  };
  const result = await new CreateLocoCapabilityAdapter(transport).execute(baseRequest());
  assert.equal(result.status, "SUCCEEDED");
  assert.deepEqual(result.evidenceRefs, ["evidence://browser-1"]);
});

test("Create Loco adapter rejects a mismatched transport response", async () => {
  const transport: CreateLocoTransport = {
    async execute() {
      return { requestId: "wrong", status: "SUCCEEDED", artifactRefs: [], evidenceRefs: [], defects: [] };
    },
  };
  await assert.rejects(() => new CreateLocoCapabilityAdapter(transport).execute(baseRequest()));
});
