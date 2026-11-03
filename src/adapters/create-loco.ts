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
    maxVisualDelta?: number;
  };
}

export interface CreateLocoBuildResult {
  requestId: string;
  status: "SUCCEEDED" | "FAILED" | "BLOCKED";
  artifactRefs: string[];
  evidenceRefs: string[];
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

    const result = await this.transport.execute(request);
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
    }
    return result;
  }
}
