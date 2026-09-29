export interface EvalSnapshot {
  benchmark: string;
  version: string;
  quality: number;
  latencyMs: number;
  costPerUnit: number;
  at: string;
}

export type CommercialUseStatus =
  | "ALLOWED"
  | "PROHIBITED"
  | "UNKNOWN"
  | "SEPARATE_LICENSE_REQUIRED";

export interface ModelRights {
  commercialUse: CommercialUseStatus;
  derivativeUse?: CommercialUseStatus;
  source?: string;
  notes?: string[];
}

export interface ModelVersion {
  id: string;
  provider: string;
  revision: string;
  capabilities: string[];
  license: string;
  privacy: "LOCAL" | "PRIVATE_API" | "PUBLIC_API";
  healthy: boolean;
  evals: EvalSnapshot[];
  rights?: ModelRights;
}

export interface RouteRequest {
  capability: string;
  allowedLicenses?: string[];
  maxCostPerUnit?: number;
  privacy?: ModelVersion["privacy"];
  usage?: "RESEARCH" | "INTERNAL" | "COMMERCIAL";
}

export class ModelRouter {
  constructor(private models: ModelVersion[]) {}

  route(r: RouteRequest): ModelVersion {
    const candidates = this.models
      .filter((m) => m.healthy && m.capabilities.includes(r.capability))
      .filter((m) => !r.allowedLicenses || r.allowedLicenses.includes(m.license))
      .filter((m) => !r.privacy || m.privacy === r.privacy)
      .filter((m) => {
        if (r.usage !== "COMMERCIAL") return true;
        return m.rights?.commercialUse === "ALLOWED";
      })
      .filter((m) => {
        if (r.maxCostPerUnit === undefined) return true;
        if (!m.evals.length) return false;
        return Math.min(...m.evals.map((e) => e.costPerUnit)) <= r.maxCostPerUnit;
      })
      .sort((a, b) => bestQuality(b) - bestQuality(a));

    if (!candidates[0]) {
      if (r.usage === "COMMERCIAL") {
        throw new Error("no commercially-cleared compliant model");
      }
      throw new Error("no compliant model");
    }
    return candidates[0];
  }
}

function bestQuality(model: ModelVersion): number {
  if (!model.evals.length) return Number.NEGATIVE_INFINITY;
  return Math.max(...model.evals.map((e) => e.quality));
}
