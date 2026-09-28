import test from "node:test";
import assert from "node:assert/strict";
import { DecisionEngine } from "../src/decision/engine.js";
import { JevDecisionProvider } from "../src/decision/jev-provider.js";
import type { DecisionProvider } from "../src/decision/types.js";

test("DecisionEngine falls back when confidence is too low", async () => {
  const low: DecisionProvider = {
    name: "low",
    canHandle: () => true,
    async decide() {
      return {
        provider: "low",
        model: "low",
        answers: { route: { type: "choice", choice: "cheap", confidence: 0.55, probabilities: { cheap: 0.55, frontier: 0.45 } } },
        durationMs: 1,
      };
    },
  };
  const high: DecisionProvider = {
    name: "high",
    canHandle: () => true,
    async decide() {
      return {
        provider: "high",
        model: "high",
        answers: { route: { type: "choice", choice: "frontier", confidence: 0.91, probabilities: { cheap: 0.09, frontier: 0.91 } } },
        durationMs: 1,
      };
    },
  };
  const result = await new DecisionEngine([low, high]).decide({
    state: { task: "hard" },
    questions: { route: { type: "choice", criteria: { cheap: "simple", frontier: "hard" } } },
  });
  assert.equal(result.provider, "high");
});

test("Jev provider sends the official System One request shape", async () => {
  let captured = "";
  const fakeFetch: typeof fetch = async (_input, init) => {
    captured = String(init?.body ?? "");
    return new Response(JSON.stringify({
      model: "jev-1.13.0",
      answers: { route: { type: "choice", choice: "cheap", confidence: 0.92, probabilities: { cheap: 0.92, frontier: 0.08 } } },
      usage: { input_tokens: 12, output_tokens: 3 },
    }), { status: 200, headers: { "Content-Type": "application/json" } });
  };

  const provider = new JevDecisionProvider({ apiKey: "test-key", fetchImpl: fakeFetch });
  const result = await provider.decide({
    state: { task: "classify me" },
    questions: { route: { type: "choice", criteria: { cheap: "simple", frontier: "complex" } } },
  });

  const parsed = JSON.parse(captured);
  assert.equal(parsed.model, "jev-latest");
  assert.equal(parsed.questions.route.type, "choice");
  assert.equal(result.model, "jev-1.13.0");
  assert.equal(result.usage?.inputTokens, 12);
});
