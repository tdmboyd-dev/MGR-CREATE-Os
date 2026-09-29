import test from "node:test";
import assert from "node:assert/strict";
import {
  ProviderCapabilityRegistry,
  providerSnapshotIsFresh,
} from "../src/core/provider-capabilities.js";

const snapshot = (provider: string, observedAt: string, commercialUse: "ALLOWED" | "PROHIBITED" = "ALLOWED") => ({
  id: provider,
  provider,
  modelOrService: "model",
  revision: "rev",
  capability: "llm",
  status: "ACTIVE" as const,
  observedAt,
  source: "official",
  confidence: 1,
  healthy: true,
  commercialUse,
  privacy: "PRIVATE_API" as const,
  routing: { priority: 10, allowFallback: true, sensitiveAllowed: false, shadowOnly: false },
});

test("provider freshness requires current evidence", () => {
  assert.equal(providerSnapshotIsFresh(snapshot("fresh", "2026-09-29T00:00:00Z"), {
    maxAgeMs: 30 * 86400000,
    nowMs: Date.parse("2026-09-29T12:00:00Z"),
  }), true);
  assert.equal(providerSnapshotIsFresh(snapshot("stale", "2025-01-01T00:00:00Z"), {
    maxAgeMs: 30 * 86400000,
    nowMs: Date.parse("2026-09-29T12:00:00Z"),
  }), false);
});

test("commercial routing rejects stale or prohibited candidates", () => {
  const registry = new ProviderCapabilityRegistry();
  registry.upsert(snapshot("fresh", "2026-09-29T00:00:00Z"));
  registry.upsert(snapshot("stale", "2025-01-01T00:00:00Z"));
  registry.upsert(snapshot("blocked", "2026-09-29T00:00:00Z", "PROHIBITED"));

  const candidates = registry.routeCandidates({
    capability: "llm",
    usage: "COMMERCIAL",
    maxAgeMs: 30 * 86400000,
    nowMs: Date.parse("2026-09-29T12:00:00Z"),
  });
  assert.deepEqual(candidates.map((item) => item.provider), ["fresh"]);
});

test("local runtime does not imply free or unlimited", () => {
  const registry = new ProviderCapabilityRegistry();
  registry.upsert({
    ...snapshot("local", "2026-09-29T00:00:00Z"),
    runtime: "local_cpu",
  });
  const item = registry.all()[0];
  assert.equal(item.runtime, "local_cpu");
  assert.equal(item.estimatedCost, undefined);
  assert.equal(item.limits, undefined);
});
