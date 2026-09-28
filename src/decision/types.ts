export type DecisionQuestion =
  | { type: "noul"; instructions?: unknown; criteria?: { true?: unknown; false?: unknown } }
  | { type: "choice"; instructions?: unknown; criteria: Record<string, unknown> }
  | { type: "score"; instructions?: unknown; criteria: unknown[] };

export type DecisionRequest = {
  state: unknown;
  questions: Record<string, DecisionQuestion>;
  model?: string;
  metadata?: Record<string, unknown>;
};

export type NoulAnswer = { type: "noul"; noul: number };
export type ChoiceAnswer = {
  type: "choice";
  choice: string;
  confidence: number;
  probabilities: Record<string, number>;
};
export type ScoreAnswer = {
  type: "score";
  score: number;
  confidence: number;
  legend: Record<string, unknown>;
  probabilities: Record<string, number>;
};
export type DecisionAnswer = NoulAnswer | ChoiceAnswer | ScoreAnswer;

export type DecisionResult = {
  provider: string;
  model: string;
  answers: Record<string, DecisionAnswer>;
  usage?: { inputTokens: number; outputTokens: number };
  durationMs: number;
};

export type DecisionProvider = {
  readonly name: string;
  canHandle(request: DecisionRequest): boolean;
  decide(request: DecisionRequest): Promise<DecisionResult>;
};

export type DecisionAttempt = {
  provider: string;
  status: "accepted" | "low_confidence" | "error";
  durationMs: number;
  minimumObservedConfidence?: number;
  error?: string;
};

export type DecisionTrace = {
  startedAt: string;
  finishedAt: string;
  selectedProvider?: string;
  selectedModel?: string;
  attempts: DecisionAttempt[];
  metadata?: Record<string, unknown>;
};

export type DecisionObserver = (trace: DecisionTrace) => void | Promise<void>;

export type DecisionPolicy = {
  minimumConfidence?: number;
  failClosed?: boolean;
  fallbackOnLowConfidence?: boolean;
  observer?: DecisionObserver;
};

export function answerConfidence(answer: DecisionAnswer): number {
  if (answer.type === "noul") return Math.abs(answer.noul - 0.5) * 2;
  return answer.confidence;
}
