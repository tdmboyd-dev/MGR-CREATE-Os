export type IsolationClass = "PROCESS" | "CONTAINER_HARDENED" | "USER_KERNEL" | "MICROVM";
export type NetworkPolicy = "NONE" | "ALLOWLIST" | "OPEN";

export interface SandboxProfile {
  id: string;
  version: string;
  isolationClass: IsolationClass;
  network: NetworkPolicy;
  allowedHosts?: string[];
  cpu: number;
  ramMb: number;
  gpu?: string;
  timeoutMs: number;
  secretRefsAllowed: string[];
  tenantIsolation: "SHARED_NAMESPACE" | "TENANT_NAMESPACE" | "DEDICATED";
  persistence: "EPHEMERAL" | "CHECKPOINTED" | "PERSISTENT";
  workspaceMounts?: string[];
}

export interface SandboxRequest {
  risk: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  tenantId: string;
  requiredHosts?: string[];
  requestedSecretRefs?: string[];
  requiresPersistence?: boolean;
}

export function validateSandbox(profile: SandboxProfile, request: SandboxRequest): true {
  if (profile.timeoutMs <= 0 || profile.cpu <= 0 || profile.ramMb <= 0) {
    throw new Error("invalid sandbox resources");
  }

  if (request.risk === "HIGH" || request.risk === "CRITICAL") {
    if (!["USER_KERNEL", "MICROVM"].includes(profile.isolationClass)) {
      throw new Error("insufficient isolation");
    }
    if (profile.tenantIsolation === "SHARED_NAMESPACE") {
      throw new Error("high-risk sandbox requires tenant-isolated namespace or dedicated runtime");
    }
  }

  if (request.risk === "CRITICAL" && profile.network === "OPEN") {
    throw new Error("critical sandbox cannot use open network egress");
  }

  if (request.requiredHosts?.length) {
    if (profile.network === "NONE") throw new Error("sandbox network disabled");
    if (profile.network === "ALLOWLIST") {
      const allowed = new Set(profile.allowedHosts ?? []);
      const missing = request.requiredHosts.filter((host) => !allowed.has(host));
      if (missing.length) throw new Error(`sandbox host not allowed: ${missing.join(", ")}`);
    }
  }

  const allowedSecrets = new Set(profile.secretRefsAllowed);
  const deniedSecrets = (request.requestedSecretRefs ?? []).filter((ref) => !allowedSecrets.has(ref));
  if (deniedSecrets.length) {
    throw new Error(`sandbox secret not allowed: ${deniedSecrets.join(", ")}`);
  }

  if (request.requiresPersistence && profile.persistence === "EPHEMERAL") {
    throw new Error("sandbox persistence requirement not satisfied");
  }

  return true;
}
