export type ProviderRuntime =
  | "browser"
  | "server"
  | "local_cpu"
  | "local_gpu"
  | "managed_gpu"
  | "external_api";

export type ProviderStatus = "research" | "admitted" | "deprecated" | "blocked";
export type ProviderHealth = "unknown" | "healthy" | "degraded" | "unavailable" | "disabled";

export type ProviderCapabilitySnapshot = {
  version: 1;
  id: string;
  provider: string;
  model?: string;
  modelVersion?: string;
  capability: string;
  modalities: string[];
  runtime: ProviderRuntime;
  status: ProviderStatus;
  health: ProviderHealth;
  local: boolean;
  hardware: {
    cpu: boolean;
    gpu: boolean;
    ramMb?: number;
    vramMb?: number;
    notes?: string;
  };
  limits: {
    contextTokens?: number;
    maxOutputTokens?: number;
    requestsPerMinute?: number;
    concurrency?: number;
    notes?: string;
  };
  pricing?: {
    currency?: string;
    unit?: string;
    inputPerMillion?: number;
    outputPerMillion?: number;
    perUnit?: number;
    monthly?: number;
    freeAllowance?: string;
    notes?: string;
  };
  license: {
    name?: string;
    commercialUse?: boolean;
    redistribution?: boolean;
    notes?: string;
  };
  quality: {
    benchmark?: string;
    score?: number;
    notes?: string;
  };
  evidence: {
    verifiedAt?: string;
    source?: string;
    sourceType?: string;
    checkedBy?: string;
    notes?: string;
  };
  routing: {
    priority: number;
    allowFallback: boolean;
    sensitiveAllowed: boolean;
    shadowOnly: boolean;
  };
};

const runtimes = new Set<ProviderRuntime>(["browser","server","local_cpu","local_gpu","managed_gpu","external_api"]);
const statuses = new Set<ProviderStatus>(["research","admitted","deprecated","blocked"]);
const healthStates = new Set<ProviderHealth>(["unknown","healthy","degraded","unavailable","disabled"]);

function clean(value: unknown, max = 500): string | undefined {
  const text = String(value ?? "").trim();
  return text ? text.slice(0, max) : undefined;
}

function finite(value: unknown): number | undefined {
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

export function normalizeProviderCapability(input: Partial<ProviderCapabilitySnapshot> & {
  provider: string;
  capability: string;
}): ProviderCapabilitySnapshot {
  const provider = clean(input.provider, 120);
  const capability = clean(input.capability, 120);
  if (!provider || !capability) throw new Error("provider and capability are required");

  const runtime: ProviderRuntime = runtimes.has(input.runtime as ProviderRuntime)
    ? input.runtime as ProviderRuntime
    : "external_api";
  const status: ProviderStatus = statuses.has(input.status as ProviderStatus)
    ? input.status as ProviderStatus
    : "research";
  const health: ProviderHealth = healthStates.has(input.health as ProviderHealth)
    ? input.health as ProviderHealth
    : "unknown";

  const verifiedAt = input.evidence?.verifiedAt ? new Date(input.evidence.verifiedAt) : undefined;
  if (verifiedAt && Number.isNaN(verifiedAt.getTime())) throw new Error("verifiedAt is invalid");

  const model = clean(input.model, 160);
  const pricing = input.pricing ? {
    currency: clean(input.pricing.currency, 20),
    unit: clean(input.pricing.unit, 80),
    inputPerMillion: finite(input.pricing.inputPerMillion),
    outputPerMillion: finite(input.pricing.outputPerMillion),
    perUnit: finite(input.pricing.perUnit),
    monthly: finite(input.pricing.monthly),
    freeAllowance: clean(input.pricing.freeAllowance, 240),
    notes: clean(input.pricing.notes, 500),
  } : undefined;

  return {
    version: 1,
    id: clean(input.id, 180) ?? `${provider}:${model ?? "default"}:${capability}`,
    provider,
    model,
    modelVersion: clean(input.modelVersion, 160),
    capability,
    modalities: Array.isArray(input.modalities)
      ? [...new Set(input.modalities.map((v) => clean(v, 60)).filter((v): v is string => Boolean(v)))]
      : [],
    runtime,
    status,
    health,
    local: runtime === "browser" || runtime.startsWith("local_"),
    hardware: {
      cpu: Boolean(input.hardware?.cpu),
      gpu: Boolean(input.hardware?.gpu),
      ramMb: finite(input.hardware?.ramMb),
      vramMb: finite(input.hardware?.vramMb),
      notes: clean(input.hardware?.notes, 500),
    },
    limits: {
      contextTokens: finite(input.limits?.contextTokens),
      maxOutputTokens: finite(input.limits?.maxOutputTokens),
      requestsPerMinute: finite(input.limits?.requestsPerMinute),
      concurrency: finite(input.limits?.concurrency),
      notes: clean(input.limits?.notes, 500),
    },
    pricing,
    license: {
      name: clean(input.license?.name, 160),
      commercialUse: input.license?.commercialUse,
      redistribution: input.license?.redistribution,
      notes: clean(input.license?.notes, 500),
    },
    quality: {
      benchmark: clean(input.quality?.benchmark, 160),
      score: finite(input.quality?.score),
      notes: clean(input.quality?.notes, 500),
    },
    evidence: {
      verifiedAt: verifiedAt?.toISOString(),
      source: clean(input.evidence?.source, 800),
      sourceType: clean(input.evidence?.sourceType, 80),
      checkedBy: clean(input.evidence?.checkedBy, 120),
      notes: clean(input.evidence?.notes, 500),
    },
    routing: {
      priority: finite(input.routing?.priority) ?? 100,
      allowFallback: input.routing?.allowFallback !== false,
      sensitiveAllowed: Boolean(input.routing?.sensitiveAllowed),
      shadowOnly: Boolean(input.routing?.shadowOnly),
    },
  };
}

export function providerFactIsFresh(
  record: ProviderCapabilitySnapshot,
  { maxAgeDays = 30, now = Date.now() } = {},
): boolean {
  if (!record.evidence.verifiedAt) return false;
  const ageMs = now - new Date(record.evidence.verifiedAt).getTime();
  return ageMs >= 0 && ageMs <= Math.max(0, maxAgeDays) * 86_400_000;
}

export class ProviderCapabilityRegistry {
  private readonly records = new Map<string, ProviderCapabilitySnapshot>();

  upsert(input: Partial<ProviderCapabilitySnapshot> & { provider: string; capability: string }) {
    const record = normalizeProviderCapability(input);
    this.records.set(record.id, record);
    return record;
  }

  get(id: string) {
    return this.records.get(id) ?? null;
  }

  list(filters: {
    capability?: string;
    status?: ProviderStatus;
    health?: ProviderHealth;
    runtime?: ProviderRuntime;
    freshOnly?: boolean;
    maxAgeDays?: number;
  } = {}) {
    return [...this.records.values()].filter((record) => {
      if (filters.capability && record.capability !== filters.capability) return false;
      if (filters.status && record.status !== filters.status) return false;
      if (filters.health && record.health !== filters.health) return false;
      if (filters.runtime && record.runtime !== filters.runtime) return false;
      if (filters.freshOnly && !providerFactIsFresh(record, { maxAgeDays: filters.maxAgeDays })) return false;
      return true;
    });
  }

  routeCandidates(capability: string, { maxAgeDays = 30, includeStale = false } = {}) {
    return this.list({ capability, status: "admitted" })
      .filter((record) => record.health === "healthy" || record.health === "unknown")
      .filter((record) => includeStale || providerFactIsFresh(record, { maxAgeDays }))
      .sort((a, b) => a.routing.priority - b.routing.priority || a.id.localeCompare(b.id));
  }
}
