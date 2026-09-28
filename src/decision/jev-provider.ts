import type {
  DecisionAnswer,
  DecisionProvider,
  DecisionRequest,
  DecisionResult,
} from "./types.js";

type JevWireResponse = {
  model: string;
  answers: Record<string, DecisionAnswer>;
  usage?: { input_tokens: number; output_tokens: number };
};

export type JevProviderOptions = {
  apiKey?: string;
  model?: string;
  baseUrl?: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
};

export class JevDecisionProvider implements DecisionProvider {
  readonly name = "jev";
  private readonly apiKey?: string;
  private readonly model: string;
  private readonly baseUrl: string;
  private readonly timeoutMs: number;
  private readonly fetchImpl: typeof fetch;

  constructor(options: JevProviderOptions = {}) {
    this.apiKey = options.apiKey ?? process.env.JEV_API_KEY;
    this.model = options.model ?? process.env.JEV_MODEL ?? "jev-latest";
    this.baseUrl = (options.baseUrl ?? process.env.JEV_BASE_URL ?? "https://api.typesafe.ai").replace(/\/$/, "");
    this.timeoutMs = options.timeoutMs ?? 10_000;
    this.fetchImpl = options.fetchImpl ?? fetch;
  }

  canHandle(): boolean {
    return Boolean(this.apiKey);
  }

  async decide(request: DecisionRequest): Promise<DecisionResult> {
    if (!this.apiKey) throw new Error("JEV_API_KEY is not configured");
    const started = Date.now();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);
    try {
      const response = await this.fetchImpl(`${this.baseUrl}/v1/systemone`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          state: request.state,
          model: request.model ?? this.model,
          questions: request.questions,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const body = await response.text().catch(() => "");
        throw new Error(`Jev request failed (${response.status}): ${body.slice(0, 300)}`);
      }

      const data = (await response.json()) as JevWireResponse;
      return {
        provider: this.name,
        model: data.model,
        answers: data.answers,
        usage: data.usage
          ? {
              inputTokens: data.usage.input_tokens,
              outputTokens: data.usage.output_tokens,
            }
          : undefined,
        durationMs: Date.now() - started,
      };
    } finally {
      clearTimeout(timeout);
    }
  }
}
