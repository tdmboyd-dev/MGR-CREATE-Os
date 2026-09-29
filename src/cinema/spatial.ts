export type SpatialRepresentation =
  | "MESH"
  | "OPENUSD"
  | "GAUSSIAN_SPLAT"
  | "POINT_CLOUD"
  | "NEURAL_WORLD"
  | "GAME_ENGINE_SCENE";

export interface Bounds3D {
  min: { x: number; y: number; z: number };
  max: { x: number; y: number; z: number };
}

export interface SpatialAssetRef {
  id: string;
  representation: SpatialRepresentation;
  uri: string;
  format: string;
  coordinateSystem: "Y_UP_RIGHT_HANDED" | "Z_UP_RIGHT_HANDED" | "OTHER";
  unitsPerMeter: number;
  bounds?: Bounds3D;
  sourceRefs: string[];
  semanticNodeMap?: Record<string, string>;
  rendererCompatibility: string[];
  provenanceRef?: string;
}

export interface SpatialConversionRecord {
  id: string;
  inputRef: string;
  outputRef: string;
  converter: string;
  converterVersion: string;
  createdAt: string;
  qualityEvidenceRefs: string[];
}

export function validateSpatialAsset(asset: SpatialAssetRef): string[] {
  const issues: string[] = [];
  if (!asset.uri.trim()) issues.push("missing spatial asset URI");
  if (!asset.format.trim()) issues.push("missing spatial asset format");
  if (asset.unitsPerMeter <= 0) issues.push("unitsPerMeter must be positive");
  if (!asset.sourceRefs.length) issues.push("spatial asset requires source lineage");
  if (!asset.rendererCompatibility.length) issues.push("spatial asset requires renderer compatibility metadata");
  return issues;
}
