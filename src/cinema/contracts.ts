export type Vec3 = { x: number; y: number; z: number };

export interface Transform {
  position: Vec3;
  rotationEulerDeg: Vec3;
  scale: Vec3;
}

export interface SceneNode {
  id: string;
  kind: "WORLD" | "SET" | "CHARACTER" | "PROP" | "LIGHT" | "CAMERA" | "VOLUME" | "OTHER";
  name: string;
  parentId?: string;
  transform: Transform;
  assetRef?: string;
  variant?: string;
  metadata?: Record<string, unknown>;
}

export interface SceneGraph {
  id: string;
  version: number;
  nodes: SceneNode[];
  sourceRefs: string[];
}

export interface WorldVersion {
  id: string;
  worldId: string;
  version: number;
  sceneGraphRef: string;
  createdAt: string;
  parentVersionRef?: string;
  continuityLockRefs: string[];
}

export interface LensState {
  focalLengthMm: number;
  sensorWidthMm: number;
  apertureF?: number;
  focusDistanceM?: number;
  shutterAngleDeg?: number;
}

export interface CameraPose {
  position: Vec3;
  rotationEulerDeg: Vec3;
  lens: LensState;
}

export type CameraMove =
  | "STATIC" | "PAN" | "TILT" | "ROLL" | "DOLLY" | "TRUCK"
  | "PEDESTAL" | "CRANE" | "ORBIT" | "TRACK" | "PUSH" | "PULL"
  | "ZOOM" | "HANDHELD" | "DRONE";

export interface FramingConstraint {
  subjectNodeId: string;
  minScreenFraction?: number;
  maxScreenFraction?: number;
  keepVisible?: boolean;
  allowOcclusion?: boolean;
}

export interface CameraKeyframe {
  tMs: number;
  pose: CameraPose;
}

export interface CameraTrajectory {
  id: string;
  move: CameraMove;
  durationMs: number;
  keyframes: CameraKeyframe[];
  framing: FramingConstraint[];
  collisionFreeRequired: boolean;
}

export interface ShotIntent {
  id: string;
  worldVersionRef: string;
  subjectNodeIds: string[];
  purpose: string;
  shotScale?: "ECU" | "CU" | "MCU" | "MS" | "MLS" | "FS" | "LS" | "ELS";
  requestedMove?: CameraMove;
  durationMs: number;
  dialogueRef?: string;
  continuityLockRefs: string[];
}

export interface ShotValidationIssue {
  code:
    | "MISSING_SUBJECT"
    | "INVALID_DURATION"
    | "KEYFRAME_ORDER"
    | "MISSING_CAMERA"
    | "WORLD_REFERENCE"
    | "FRAMING_REFERENCE"
    | "COLLISION_UNVERIFIED";
  message: string;
}

export function validateSceneGraph(graph: SceneGraph): string[] {
  const issues: string[] = [];
  const ids = new Set<string>();
  for (const node of graph.nodes) {
    if (ids.has(node.id)) issues.push(`duplicate node id: ${node.id}`);
    ids.add(node.id);
  }
  for (const node of graph.nodes) {
    if (node.parentId && !ids.has(node.parentId)) issues.push(`missing parent for ${node.id}: ${node.parentId}`);
  }
  return issues;
}

export function validateShot(
  shot: ShotIntent,
  trajectory: CameraTrajectory,
  graph: SceneGraph,
): ShotValidationIssue[] {
  const issues: ShotValidationIssue[] = [];
  const ids = new Set(graph.nodes.map((n) => n.id));

  if (shot.durationMs <= 0 || trajectory.durationMs <= 0) {
    issues.push({ code: "INVALID_DURATION", message: "shot and trajectory duration must be positive" });
  }
  for (const subject of shot.subjectNodeIds) {
    if (!ids.has(subject)) issues.push({ code: "MISSING_SUBJECT", message: `subject not found: ${subject}` });
  }
  for (const frame of trajectory.framing) {
    if (!ids.has(frame.subjectNodeId)) {
      issues.push({ code: "FRAMING_REFERENCE", message: `framing subject not found: ${frame.subjectNodeId}` });
    }
  }
  let last = -1;
  for (const keyframe of trajectory.keyframes) {
    if (keyframe.tMs < last) {
      issues.push({ code: "KEYFRAME_ORDER", message: "camera keyframes must be monotonic" });
      break;
    }
    last = keyframe.tMs;
  }
  return issues;
}
