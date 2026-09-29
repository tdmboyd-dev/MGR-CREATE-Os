export type CapabilityStatus = "EXPERIMENTAL" | "ACTIVE" | "PREFERRED" | "DEPRECATED" | "RETIRED";
export type ProviderRuntime = "browser" | "server" | "local_cpu" | "local_gpu" | "managed_gpu" | "external_api";

export interface ProviderCapabilitySnapshot {
  id: string;
  provider: string;
  modelOrService: string;
  revision: string;
  capability: string;
  status: CapabilityStatus;
  observedAt: string;
  source: string;
  confidence: number;
  healthy: boolean;
  commercialUse: "ALLOWED" | "PROHIBITED" | "UNKNOWN" | "SEPARATE_LICENSE_REQUIRED";
  privacy: "LOCAL" | "PRIVATE_API" | "PUBLIC_API";

  // Optional evidence-backed runtime facts. Absence means unknown; local does
  // not imply free, unlimited, or capable enough for the workload.
  runtime?: ProviderRuntime;
  modalities?: string[];
  hardware?: {
    cpu?: boolean;
    gpu?: boolean;
    ramMb?: number;
    vramMb?: number;
    notes?: string;
  };
  estimatedCost?: {
    currency: string;
    unit: string;
    amount: number;
    notes?: string;
  };
  limits?: {
    contextTokens?: number;
    maxOutputTokens?: number;
    rpm?: number;
    rpd?: number;
    concurrency?: number;
    notes?: string;
  };
  license?: {
    name?: string;
    redistribution?: "ALLOWED" | "PROHIBITED" | "UNKNOWN" | "SEPARATE_LICENSE_REQUIRED";
    notes?: string;
  };
  quality?: {
    benchmark?: string;
    score?: number;
    notes?: string;
  };
  routing?: {
    priority?: number;
    allowFallback?: boolean;
    sensitiveAllowed?: boolean;
    shadowOnly?: boolean;
  };
  notes?: string[];
}

export function providerSnapshotIsFresh(
  snapshot: ProviderCapabilitySnapshot,
  { maxAgeMs, nowMs = Date.now() }: { maxAgeMs: number; nowMs?: number },
): boolean {
  const observed = Date.parse(snapshot.observedAt);
  if (!Number.isFinite(observed)) return false;
  const age = nowMs - observed;
  return age >= 0 && age <= Math.max(0, maxAgeMs);
}

export class ProviderCapabilityRegistry {
  private readonly snapshots = new Map<string, ProviderCapabilitySnapshot>();

  upsert(snapshot: ProviderCapabilitySnapshot): void {
    if (!snapshot.source.trim()) throw new Error("capability snapshot requires a source");
    const observed = Date.parse(snapshot.observedAt);
    if (!Number.isFinite(observed)) throw new Error("capability snapshot requires a valid observedAt");
    if (snapshot.confidence < 0 || snapshot.confidence > 1) throw new Error("confidence must be 0..1");

    // Do not allow negative/NaN capacity or price facts to become routing truth.
    if (snapshot.estimatedCost && (!Number.isFinite(snapshot.estimatedCost.amount) || snapshot.estimatedCost.amount < 0)) {
      throw new Error("estimated cost must be a non-negative finite number");
    }
    for (const value of [
      snapshot.limits?.contextTokens,
      snapshot.limits?.maxOutputTokens,
      snapshot.limits?.rpm,
      snapshot.limits?.rpd,
      snapshot.limits?.concurrency,
      snapshot.hardware?.ramMb,
      snapshot.hardware?.vramMb,
    ]) {
      if (value !== undefined && (!Number.isFinite(value) || value < 0)) {
        throw new Error("provider numeric capability facts must be non-negative finite numbers");
      }
    }

    const key = this.key(snapshot.provider, snapshot.modelOrService, snapshot.revision, snapshot.capability);
    this.snapshots.set(key, structuredClone(snapshot));
  }

  find(input: {
    capability: string;
    usage?: "RESEARCH" | "INTERNAL" | "COMMERCIAL";
    maxAgeMs?: number;
    nowMs?: number;
    runtime?: ProviderRuntime;
  }): ProviderCapabilitySnapshot[] {
    const now = input.nowMs ?? Date.now();
    return [...this.snapshots.values()]
      .filter((s) => s.capability === input.capability)
      .filter((s) => s.status !== "RETIRED")
      .filter((s) => s.healthy)
      .filter((s) => !input.runtime || s.runtime === input.runtime)
      .filter((s) => {
        if (input.usage !== "COMMERCIAL") return true;
        return s.commercialUse === "ALLOWED";
      })
      .filter((s) => {
        if (input.maxAgeMs === undefined) return true;
        return providerSnapshotIsFresh(s, { maxAgeMs: input.maxAgeMs, nowMs: now });
      })
      .sort((a, b) => {
        const status = rankStatus(b.status) - rankStatus(a.status);
        if (status !== 0) return status;
        return (a.routing?.priority ?? 100) - (b.routing?.priority ?? 100);
      });
  }

  routeCandidates(input: {
    capability: string;
    usage?: "RESEARCH" | "INTERNAL" | "COMMERCIAL";
    maxAgeMs: number;
    nowMs?: number;
    runtime?: ProviderRuntime;
    includeShadow?: boolean;
  }): ProviderCapabilitySnapshot[] {
    return this.find(input)
      .filter((s) => input.includeShadow || s.routing?.shadowOnly !== true)
      .filter((s) => s.status === "ACTIVE" || s.status === "PREFERRED");
  }

  all(): ProviderCapabilitySnapshot[] {
    return [...this.snapshots.values()].map((s) => structuredClone(s));
  }

  private key(provider: string, modelOrService: string, revision: string, capability: string): string {
    return [provider, modelOrService, revision, capability].join("::");
  }
}

function rankStatus(status: CapabilityStatus): number {
  switch (status) {
    case "PREFERRED": return 4;
    case "ACTIVE": return 3;
    case "EXPERIMENTAL": return 2;
    case "DEPRECATED": return 1;
    case "RETIRED": return 0;
  }
}
