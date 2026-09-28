import {
  answerConfidence,
  type DecisionAttempt,
  type DecisionPolicy,
  type DecisionProvider,
  type DecisionRequest,
  type DecisionResult,
  type DecisionTrace,
} from "./types.js";

function minimumConfidence(result: DecisionResult): number {
  const values = Object.values(result.answers).map(answerConfidence);
  return values.length === 0 ? 0 : Math.min(...values);
}

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
    const startedAt = new Date();
    const attempts: DecisionAttempt[] = [];
    const available = this.providers.filter((provider) => provider.canHandle(request));

    if (available.length === 0) {
      await this.emitTrace({
        startedAt: startedAt.toISOString(),
        finishedAt: new Date().toISOString(),
        attempts,
        metadata: request.metadata,
      });
      throw new Error("No decision provider is available");
    }

    const failures: string[] = [];
    for (const provider of available) {
      const providerStarted = Date.now();
      try {
        const result = await provider.decide(request);
        const min = this.policy.minimumConfidence ?? 0.7;
        const observed = minimumConfidence(result);
        const lowConfidence = observed < min;

        if (lowConfidence && this.policy.fallbackOnLowConfidence) {
          attempts.push({
            provider: provider.name,
            status: "low_confidence",
            durationMs: Date.now() - providerStarted,
            minimumObservedConfidence: observed,
          });
          failures.push(`${provider.name}: below confidence threshold ${min}`);
          continue;
        }

        attempts.push({
          provider: provider.name,
          status: "accepted",
          durationMs: Date.now() - providerStarted,
          minimumObservedConfidence: observed,
        });
        await this.emitTrace({
          startedAt: startedAt.toISOString(),
          finishedAt: new Date().toISOString(),
          selectedProvider: result.provider,
          selectedModel: result.model,
          attempts,
          metadata: request.metadata,
        });
        return result;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        attempts.push({
          provider: provider.name,
          status: "error",
          durationMs: Date.now() - providerStarted,
          error: message,
        });
        failures.push(`${provider.name}: ${message}`);
      }
    }

    await this.emitTrace({
      startedAt: startedAt.toISOString(),
      finishedAt: new Date().toISOString(),
      attempts,
      metadata: request.metadata,
    });

    const message = `Decision providers exhausted: ${failures.join(" | ")}`;
    if (this.policy.failClosed !== false) throw new Error(message);
    throw new Error(message);
  }

  private async emitTrace(trace: DecisionTrace): Promise<void> {
    if (!this.policy.observer) return;
    try {
      await this.policy.observer(trace);
    } catch {
      // Telemetry must never turn a valid decision into a product failure.
    }
  }
}
