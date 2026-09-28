import {
  answerConfidence,
  type DecisionPolicy,
  type DecisionProvider,
  type DecisionRequest,
  type DecisionResult,
} from "./types.js";

export class DecisionEngine {
  constructor(
    private readonly providers: DecisionProvider[],
    private readonly policy: DecisionPolicy = {
      minimumConfidence: 0.7,
      failClosed: true,
      fallbackOnLowConfidence: true,
    },
  ) {}

  async decide(request: DecisionRequest): Promise<DecisionResult> {
    const available = this.providers.filter((provider) => provider.canHandle(request));
    if (available.length === 0) throw new Error("No decision provider is available");

    const failures: string[] = [];
    for (const provider of available) {
      try {
        const result = await provider.decide(request);
        const min = this.policy.minimumConfidence ?? 0.7;
        const lowConfidence = Object.values(result.answers).some(
          (answer) => answerConfidence(answer) < min,
        );

        if (lowConfidence && this.policy.fallbackOnLowConfidence) {
          failures.push(`${provider.name}: below confidence threshold ${min}`);
          continue;
        }
        return result;
      } catch (error) {
        failures.push(`${provider.name}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    const message = `Decision providers exhausted: ${failures.join(" | ")}`;
    if (this.policy.failClosed !== false) throw new Error(message);
    throw new Error(message);
  }
}
