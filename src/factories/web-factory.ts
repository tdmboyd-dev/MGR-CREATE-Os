import type { FactoryRequest, FactoryResult, RecoverableFactory } from "./contracts.js";
import { CreateLocoCapabilityAdapter, type CreateLocoBuildRequest, type CreateLocoTransport } from "../adapters/create-loco.js";

export interface WebInput {
  routes: string[];
  interactions: string[];
  responsiveViewports: string[];
  acceptanceJourneys: string[];
  dataContracts: string[];
}

type WebFactoryInput = Partial<WebInput> & {
  operation?: string;
  reconstruction?: Omit<CreateLocoBuildRequest, "requestId" | "tenantId" | "workspaceId">;
};

export class WebFactory implements RecoverableFactory {
  readonly kind = "WEB" as const;
  private readonly reconstruction?: CreateLocoCapabilityAdapter;

  constructor(transport?: CreateLocoTransport) {
    if (transport) this.reconstruction = new CreateLocoCapabilityAdapter(transport);
  }

  async reconcile(req: FactoryRequest): Promise<FactoryResult> {
    const input = req.inputs as WebFactoryInput | null | undefined;
    if (input?.operation === "web.visual_reconstruction.v1" && input.reconstruction) {
      const result = await this.reconstruction?.readResult(this.scoped(req, input.reconstruction));
      if (result) return { ...result, kind: this.kind };
    }
    return {
      requestId: req.id, kind: this.kind, status: "BLOCKED",
      artifactRefs: [], evidenceRefs: [],
      blockers: ["Original reconstruction outcome is unknown; no settled producer result was available"],
      checkpoint: { state: "UNKNOWN", operationRef: req.id },
    };
  }

  async execute(req: FactoryRequest): Promise<FactoryResult> {
    const input = req.inputs as WebFactoryInput | null | undefined;
    const blockers: string[] = [];
    if (input?.operation === "web.visual_reconstruction.v1") {
      const spec = input.reconstruction;
      if (!this.reconstruction) blockers.push("Web artifact production adapter is not configured");
      else if (!spec || !Array.isArray(spec.references) || !hasEntries(spec.target?.routes) ||
          !Array.isArray(spec.target?.responsiveViewports) || !hasEntries(spec.acceptance?.journeys) ||
          !spec.locks || typeof spec.objective !== "string" || !spec.objective.trim()) {
        blockers.push("Reconstruction requires references, a target, design locks and browser acceptance journeys");
      } else {
        const result = await this.reconstruction.execute(this.scoped(req, spec));
        return { ...result, kind: this.kind };
      }
    } else {
      if (!hasEntries(input?.routes)) blockers.push("no routes");
      if (!hasEntries(input?.acceptanceJourneys)) blockers.push("no browser acceptance journeys");
      if (!hasEntries(input?.responsiveViewports)) blockers.push("no responsive targets");
    }
    if (!blockers.length) blockers.push("Web artifact production adapter is not configured");
    return {
      requestId: req.id, kind: this.kind, status: "BLOCKED",
      artifactRefs: [], evidenceRefs: [], blockers,
    };
  }

  private scoped(req: FactoryRequest, spec: NonNullable<WebFactoryInput["reconstruction"]>): CreateLocoBuildRequest {
    return { ...spec, requestId: req.id, tenantId: req.tenantId, workspaceId: req.workspaceId };
  }
}

function hasEntries(values: unknown): boolean {
  return Array.isArray(values) && values.length > 0 &&
    values.every(value => typeof value === "string" && value.trim().length > 0);
}
