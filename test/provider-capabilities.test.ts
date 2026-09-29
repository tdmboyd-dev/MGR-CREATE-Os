import assert from "node:assert/strict";
import test from "node:test";
import { ProviderCapabilityRegistry } from "../src/core/provider-capabilities.js";

test("provider registry filters stale and commercially uncleared routes", () => {
  const r = new ProviderCapabilityRegistry();
  r.upsert({
    id: "a",
    provider: "p",
    modelOrService: "m1",
    revision: "1",
    capability: "character.generate",
    status: "PREFERRED",
    observedAt: "2026-09-01T00:00:00Z",
    source: "provider docs",
    confidence: 0.9,
    healthy: true,
    commercialUse: "UNKNOWN",
    privacy: "PUBLIC_API",
  });
  r.upsert({
    id: "b",
    provider: "p2",
    modelOrService: "m2",
    revision: "1",
    capability: "character.generate",
    status: "ACTIVE",
    observedAt: "2026-09-29T09:00:00Z",
    source: "provider terms",
    confidence: 0.95,
    healthy: true,
    commercialUse: "ALLOWED",
    privacy: "PRIVATE_API",
  });

  const found = r.find({
    capability: "character.generate",
    usage: "COMMERCIAL",
    maxAgeMs: 86_400_000,
    nowMs: Date.parse("2026-09-29T10:00:00Z"),
  });

  assert.deepEqual(found.map((x) => x.id), ["b"]);
});

test("provider registry refuses unsourced snapshots", () => {
  const r = new ProviderCapabilityRegistry();
  assert.throws(() => r.upsert({
    id: "x",
    provider: "p",
    modelOrService: "m",
    revision: "1",
    capability: "text",
    status: "ACTIVE",
    observedAt: "2026-09-29T09:00:00Z",
    source: "",
    confidence: 0.5,
    healthy: true,
    commercialUse: "ALLOWED",
    privacy: "PRIVATE_API",
  }));
});
