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

export type DecisionPolicy = {
  minimumConfidence?: number;
  failClosed?: boolean;
  fallbackOnLowConfidence?: boolean;
};

export function answerConfidence(answer: DecisionAnswer): number {
  if (answer.type === "noul") return Math.abs(answer.noul - 0.5) * 2;
  return answer.confidence;
}
