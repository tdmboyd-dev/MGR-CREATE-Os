export interface MaskAsset {
  id: string;
  sourceArtifactRef: string;
  uri: string;
  width: number;
  height: number;
  format: "PNG" | "WEBP" | "RLE" | "POLYGON";
  source: "MANUAL" | "SEGMENTATION_MODEL" | "TRACKER";
  confidence?: number;
  provenanceRef?: string;
}

export interface ObjectTrackFrame {
  frameIndex: number;
  timestampMs: number;
  maskRef: string;
  confidence?: number;
}

export interface ObjectTrack {
  id: string;
  sourceVideoRef: string;
  label?: string;
  frames: ObjectTrackFrame[];
  tracker: string;
  trackerVersion?: string;
  evidenceRefs: string[];
}

export type EditOperationType =
  | "REMOVE"
  | "REPLACE"
  | "INPAINT"
  | "OUTPAINT"
  | "RELIGHT"
  | "RECOLOR"
  | "RESTYLE"
  | "BACKGROUND_REPLACE"
  | "COMPOSITE_PRECISE"
  | "COMPOSITE_ADAPTIVE";

export interface EditOperation {
  id: string;
  type: EditOperationType;
  sourceArtifactRef: string;
  targetMaskRefs: string[];
  prompt?: string;
  replacementAssetRefs?: string[];
  preserveOutsideMask: boolean;
  preserveIdentityLockRefs: string[];
  acceptanceCriteria: string[];
}

export interface EditLocalityReport {
  operationId: string;
  changedOutsideTargetFraction: number;
  targetCoverageFraction: number;
  identityChecks: Array<{ lockRef: string; passed: boolean; score?: number }>;
  evidenceRefs: string[];
}

export function validateEditOperation(operation: EditOperation): string[] {
  const blockers: string[] = [];
  if (!operation.sourceArtifactRef) blockers.push("missing source artifact");
  if (!operation.targetMaskRefs.length && operation.type !== "OUTPAINT") {
    blockers.push("edit operation requires at least one target mask");
  }
  if (!operation.acceptanceCriteria.length) blockers.push("edit operation requires acceptance criteria");
  if (operation.type === "REPLACE" && !operation.replacementAssetRefs?.length && !operation.prompt) {
    blockers.push("replace operation requires replacement asset or prompt");
  }
  return blockers;
}

export function editPassesLocality(
  report: EditLocalityReport,
  thresholds: { maxOutsideChange: number; minTargetCoverage: number },
): boolean {
  return (
    report.changedOutsideTargetFraction <= thresholds.maxOutsideChange &&
    report.targetCoverageFraction >= thresholds.minTargetCoverage &&
    report.identityChecks.every((check) => check.passed)
  );
}
