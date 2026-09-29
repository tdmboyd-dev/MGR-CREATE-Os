export type CapabilityStatus = "EXPERIMENTAL" | "ACTIVE" | "PREFERRED" | "DEPRECATED" | "RETIRED";

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
  estimatedCost?: {
    currency: string;
    unit: string;
    amount: number;
  };
  limits?: {
    rpm?: number;
    rpd?: number;
    concurrency?: number;
  };
  notes?: string[];
}

export class ProviderCapabilityRegistry {
  private readonly snapshots = new Map<string, ProviderCapabilitySnapshot>();

  upsert(snapshot: ProviderCapabilitySnapshot): void {
    if (!snapshot.source.trim()) throw new Error("capability snapshot requires a source");
    const observed = Date.parse(snapshot.observedAt);
    if (!Number.isFinite(observed)) throw new Error("capability snapshot requires a valid observedAt");
    if (snapshot.confidence < 0 || snapshot.confidence > 1) throw new Error("confidence must be 0..1");
    const key = this.key(snapshot.provider, snapshot.modelOrService, snapshot.revision, snapshot.capability);
    this.snapshots.set(key, structuredClone(snapshot));
  }

  find(input: {
    capability: string;
    usage?: "RESEARCH" | "INTERNAL" | "COMMERCIAL";
    maxAgeMs?: number;
    nowMs?: number;
  }): ProviderCapabilitySnapshot[] {
    const now = input.nowMs ?? Date.now();
    return [...this.snapshots.values()]
      .filter((s) => s.capability === input.capability)
      .filter((s) => s.status !== "RETIRED")
      .filter((s) => s.healthy)
      .filter((s) => {
        if (input.usage !== "COMMERCIAL") return true;
        return s.commercialUse === "ALLOWED";
      })
      .filter((s) => {
        if (input.maxAgeMs === undefined) return true;
        return now - Date.parse(s.observedAt) <= input.maxAgeMs;
      })
      .sort((a, b) => rankStatus(b.status) - rankStatus(a.status));
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
