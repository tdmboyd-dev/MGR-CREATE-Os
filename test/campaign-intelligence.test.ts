import assert from "node:assert/strict";
import test from "node:test";
import {
  derivedPerformance,
  validatePerformanceObservation,
  type PerformanceObservation,
} from "../src/campaign/index.js";

const observation = (): PerformanceObservation => ({
  creativeDnaRef: "creative:dna:1",
  delivery: {
    channel: "meta",
    objective: "purchase",
    audienceRef: "audience:1",
    budget: 100,
    startedAt: "2026-09-29T00:00:00Z",
  },
  metrics: {
    impressions: 1000,
    clicks: 50,
    spend: 100,
    conversions: 10,
    revenue: 400,
    video3sViews: 500,
    video100Pct: 100,
  },
  sourceRef: "provider:report:1",
  observedAt: "2026-09-29T01:00:00Z",
});

test("creative performance keeps delivery context attached to outcomes", () => {
  assert.deepEqual(validatePerformanceObservation(observation()), []);
  const derived = derivedPerformance(observation());
  assert.equal(derived.ctr, 0.05);
  assert.equal(derived.cpa, 10);
  assert.equal(derived.roas, 4);
  assert.equal(derived.completionRate, 0.2);
});

test("performance learning blocks context-free creative scores", () => {
  const row = observation();
  row.delivery.audienceRef = "";
  row.sourceRef = "";
  assert.deepEqual(validatePerformanceObservation(row), [
    "missing audience context",
    "missing performance source evidence",
  ]);
});
