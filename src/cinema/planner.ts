import type { CameraMove, CameraPose, CameraTrajectory, FramingConstraint, Vec3 } from "./contracts.js";

export interface LinearTrajectoryPlan {
  id: string;
  move: CameraMove;
  start: CameraPose;
  end: CameraPose;
  durationMs: number;
  framing?: FramingConstraint[];
  collisionFreeRequired?: boolean;
  keyframeCount?: number;
}

export function planLinearTrajectory(input: LinearTrajectoryPlan): CameraTrajectory {
  if (input.durationMs <= 0) throw new Error("duration must be positive");
  const count = Math.max(2, input.keyframeCount ?? 3);
  const keyframes = Array.from({ length: count }, (_, index) => {
    const alpha = index / (count - 1);
    return {
      tMs: Math.round(input.durationMs * alpha),
      pose: {
        position: lerpVec3(input.start.position, input.end.position, alpha),
        rotationEulerDeg: lerpVec3(input.start.rotationEulerDeg, input.end.rotationEulerDeg, alpha),
        lens: {
          focalLengthMm: lerp(input.start.lens.focalLengthMm, input.end.lens.focalLengthMm, alpha),
          sensorWidthMm: lerp(input.start.lens.sensorWidthMm, input.end.lens.sensorWidthMm, alpha),
          ...(interpolateOptional(input.start.lens.apertureF, input.end.lens.apertureF, alpha) !== undefined
            ? { apertureF: interpolateOptional(input.start.lens.apertureF, input.end.lens.apertureF, alpha)! }
            : {}),
          ...(interpolateOptional(input.start.lens.focusDistanceM, input.end.lens.focusDistanceM, alpha) !== undefined
            ? { focusDistanceM: interpolateOptional(input.start.lens.focusDistanceM, input.end.lens.focusDistanceM, alpha)! }
            : {}),
          ...(interpolateOptional(input.start.lens.shutterAngleDeg, input.end.lens.shutterAngleDeg, alpha) !== undefined
            ? { shutterAngleDeg: interpolateOptional(input.start.lens.shutterAngleDeg, input.end.lens.shutterAngleDeg, alpha)! }
            : {}),
        },
      },
    };
  });

  return {
    id: input.id,
    move: input.move,
    durationMs: input.durationMs,
    keyframes,
    framing: input.framing ?? [],
    collisionFreeRequired: input.collisionFreeRequired ?? true,
  };
}

function lerp(a: number, b: number, alpha: number): number {
  return a + (b - a) * alpha;
}

function lerpVec3(a: Vec3, b: Vec3, alpha: number): Vec3 {
  return {
    x: lerp(a.x, b.x, alpha),
    y: lerp(a.y, b.y, alpha),
    z: lerp(a.z, b.z, alpha),
  };
}

function interpolateOptional(a: number | undefined, b: number | undefined, alpha: number): number | undefined {
  if (a === undefined && b === undefined) return undefined;
  if (a === undefined) return b;
  if (b === undefined) return a;
  return lerp(a, b, alpha);
}
