import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizeProviderCapability,
  providerFactIsFresh,
  ProviderCapabilityRegistry,
} from "../src/providers/registry.js";

test("unverified provider facts never become fresh by implication", () => {
  const item = normalizeProviderCapability({ provider:"legacy", capability:"llm" });
  assert.equal(item.status, "research");
  assert.equal(item.pricing, undefined);
  assert.equal(providerFactIsFresh(item), false);
});

test("route candidates require admitted and fresh evidence", () => {
  const registry = new ProviderCapabilityRegistry();
  registry.upsert({
    id:"fresh",
    provider:"fresh",
    capability:"llm",
    status:"admitted",
    health:"healthy",
    evidence:{ verifiedAt:"2026-09-29T00:00:00.000Z", source:"official" },
    routing:{ priority:10, allowFallback:true, sensitiveAllowed:false, shadowOnly:false },
  });
  registry.upsert({
    id:"stale",
    provider:"stale",
    capability:"llm",
    status:"admitted",
    health:"healthy",
    evidence:{ verifiedAt:"2025-01-01T00:00:00.000Z", source:"official" },
    routing:{ priority:1, allowFallback:true, sensitiveAllowed:false, shadowOnly:false },
  });

  assert.deepEqual(registry.routeCandidates("llm").map((item) => item.id), ["fresh"]);
});

test("local runtime does not imply zero cost or unlimited capacity", () => {
  const item = normalizeProviderCapability({
    provider:"local",
    capability:"tts",
    runtime:"local_cpu",
  });
  assert.equal(item.local, true);
  assert.equal(item.pricing, undefined);
  assert.equal(item.limits.requestsPerMinute, undefined);
});
