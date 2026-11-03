export interface CreateLocoReference {
  id: string;
  kind: "screenshot" | "image" | "url" | "existing_page";
  uri: string;
  viewport?: { width: number; height: number; dpr?: number };
  role?: "primary" | "secondary" | "detail";
}

export interface CreateLocoBuildRequest {
  requestId: string;
  tenantId: string;
  workspaceId: string;
  objective: string;
  references: CreateLocoReference[];
  target: {
    framework: "nextjs" | "react" | "static";
    routes: string[];
    responsiveViewports: Array<{ width: number; height: number; dpr?: number }>;
  };
  locks: {
    preserveContinuousBackgrounds: boolean;
    textAsOverlay: boolean;
    heroMediaBehindOverlay?: boolean;
    brandLockIds: string[];
  };
  acceptance: {
    journeys: string[];
    requiredLayerProbes?: Array<{
      frontId: string;
      backId: string;
      x: number;
      y: number;
      viewport: { width: number; height: number; dpr?: number };
    }>;
    maxVisualDelta?: number;
  };
}

export interface CreateLocoBuildResult {
  requestId: string;
  status: "SUCCEEDED" | "FAILED" | "BLOCKED";
  artifactRefs: string[];
  evidenceRefs: string[];
  layerEvidence?: Array<NonNullable<CreateLocoBuildRequest["acceptance"]["requiredLayerProbes"]>[number] & {
    status: "FRONT_ABOVE" | "BACK_ABOVE" | "INCONCLUSIVE";
    evidenceRef: string;
  }>;
  defects: Array<{
    id: string;
    category: string;
    observed: string;
    expected: string;
    targetRef?: string;
    severity?: "LOW" | "MEDIUM" | "HIGH";
    evidenceRefs?: string[];
  }>;
  blockers?: string[];
}

export interface CreateLocoTransport {
  execute(request: CreateLocoBuildRequest): Promise<CreateLocoBuildResult>;
  /** Read the original scoped result without dispatching work. */
  readResult?(request: CreateLocoBuildRequest): Promise<CreateLocoBuildResult | undefined>;
  readArtifactBytes?(scope: { id: string; tenantId: string; workspaceId: string },
    reference: string, format: "html" | "png"): Promise<Uint8Array>;
}

export class CreateLocoCapabilityAdapter {
  readonly capability = "web.visual_reconstruction.v1";

  constructor(private readonly transport: CreateLocoTransport) {}

  async execute(request: CreateLocoBuildRequest): Promise<CreateLocoBuildResult> {
    const blockers: string[] = [];
    if (!request.references.length) blockers.push("at least one visual/reference source is required");
    if (!request.target.routes.length) blockers.push("at least one target route is required");
    if (!request.target.responsiveViewports.length) blockers.push("responsive viewport targets are required");
    if (!request.acceptance.journeys.length) blockers.push("browser acceptance journeys are required");

    if (blockers.length) {
      return {
        requestId: request.requestId,
        status: "BLOCKED",
        artifactRefs: [],
        evidenceRefs: [],
        defects: [],
        blockers,
      };
    }

    return this.checkResult(request, await this.transport.execute(request));
  }

  async readResult(request: CreateLocoBuildRequest): Promise<CreateLocoBuildResult | undefined> {
    const result = await this.transport.readResult?.(request);
    return result === undefined ? undefined : this.checkResult(request, result);
  }

  private checkResult(request: CreateLocoBuildRequest, result: CreateLocoBuildResult): CreateLocoBuildResult {
    if (result.requestId !== request.requestId) {
      throw new Error("Create Loco transport returned a mismatched request id");
    }
    if (result.status === "SUCCEEDED") {
      for (const refs of [result.artifactRefs, result.evidenceRefs]) {
        if (!Array.isArray(refs) || !refs.length || refs.some(ref => typeof ref !== "string" || !ref.trim())) {
          throw new Error("Create Loco success requires artifact and evidence references");
        }
      }
      if (result.blockers?.length) throw new Error("Create Loco success cannot contain blockers");
      if (!Array.isArray(result.defects)) throw new Error("Create Loco success requires a defect list");
      if (result.defects.some(defect => defect.severity === "HIGH")) {
        return { ...result, status: "FAILED", blockers: ["High-severity reconstruction defects remain"] };
      }
      const captures = Array.isArray(result.layerEvidence) ? result.layerEvidence : [];
      const unverified = (request.acceptance.requiredLayerProbes ?? []).filter(required => {
        const matches = captures.filter(capture =>
          capture?.frontId === required.frontId && capture.backId === required.backId &&
          capture.x === required.x && capture.y === required.y &&
          capture.viewport?.width === required.viewport.width && capture.viewport?.height === required.viewport.height &&
          (capture.viewport?.dpr ?? 1) === (required.viewport.dpr ?? 1));
        const capture = matches[0];
        return matches.length !== 1 || capture?.status !== "FRONT_ABOVE" ||
          !result.evidenceRefs.includes(capture.evidenceRef);
      });
      if (unverified.length) {
        return {
          ...result, status: "FAILED",
          blockers: unverified.map(probe =>
            `Required layer check for ${probe.frontId} above ${probe.backId} at (${probe.x}, ${probe.y}) lacks passing evidence`),
        };
      }
    }
    return result;
  }
}
