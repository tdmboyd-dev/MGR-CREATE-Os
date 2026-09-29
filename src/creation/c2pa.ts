import type { UCTRecord } from "./uct.js";

export interface C2paAssertion {
  label: string;
  data: Record<string, unknown>;
}

export interface C2paManifestDraft {
  claimGenerator: string;
  title?: string;
  format: string;
  instanceId: string;
  assertions: C2paAssertion[];
}

/**
 * Maps MGR provenance into a C2PA-shaped draft.
 * This does NOT sign or embed a real C2PA manifest. Signing/embedding remains a
 * separate adapter so UCT does not pretend interoperability before the official
 * C2PA SDK path is wired and verified.
 */
export function uctToC2paDraft(input: {
  uct: UCTRecord;
  mimeType: string;
  title?: string;
  modelRefs?: string[];
  toolRefs?: string[];
  rightsRefs?: string[];
  consentRefs?: string[];
}): C2paManifestDraft {
  const assertions: C2paAssertion[] = [
    {
      label: "org.mgr.creation",
      data: {
        uctId: input.uct.id,
        creationRunId: input.uct.creationRunId,
        stageRunId: input.uct.stageRunId,
        artifactVersionId: input.uct.artifactVersionId,
        artifactDigest: input.uct.artifactDigest,
        parentUCTs: input.uct.parentUCTs,
        createdBy: input.uct.createdBy,
        createdAt: input.uct.createdAt,
      },
    },
  ];

  if (input.modelRefs?.length) {
    assertions.push({ label: "org.mgr.models", data: { refs: input.modelRefs } });
  }
  if (input.toolRefs?.length) {
    assertions.push({ label: "org.mgr.tools", data: { refs: input.toolRefs } });
  }
  if (input.rightsRefs?.length || input.consentRefs?.length) {
    assertions.push({
      label: "org.mgr.rights",
      data: {
        rightsRefs: input.rightsRefs ?? [],
        consentRefs: input.consentRefs ?? [],
      },
    });
  }

  return {
    claimGenerator: "MGR Creation OS",
    ...(input.title ? { title: input.title } : {}),
    format: input.mimeType,
    instanceId: input.uct.id,
    assertions,
  };
}
