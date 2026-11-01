export type FactoryKind = "PRODUCT" | "MEDIA" | "WEB" | "CAMPAIGN" | "COURSE" | "BRAND" | "RESEARCH" | "DOCUMENT" | "AUDIO" | "AUTOMATION" | "APP_TOOL" | "DATA_ANALYTICS";
export interface FactoryRequest {
    id: string;
    kind: FactoryKind;
    tenantId: string;
    workspaceId: string;
    inputs: unknown;
    acceptanceCriteria: string[];
    budget?: number;
}
export interface FactoryCheckpoint {
    state: "WAITING_APPROVAL" | "WAITING_RESOURCE" | "UNKNOWN";
    operationRef: string;
}
export interface FactoryResult {
    requestId: string;
    kind: FactoryKind;
    status: "SUCCEEDED" | "FAILED" | "BLOCKED";
    artifactRefs: string[];
    evidenceRefs: string[];
    blockers?: string[];
    checkpoint?: FactoryCheckpoint;
}
export interface Factory {
    kind: FactoryKind;
    execute(req: FactoryRequest): Promise<FactoryResult>;
}
export interface RecoverableFactory extends Factory {
    reconcile(req: FactoryRequest, options?: {
        dispatchAllowed: boolean;
    }): Promise<FactoryResult>;
    cancel?(req: FactoryRequest): Promise<FactoryResult>;
}
