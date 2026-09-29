import assert from "node:assert/strict";
import test from "node:test";
import { validateSceneGraph, validateShot, type CameraTrajectory, type SceneGraph, type ShotIntent } from "../src/cinema/index.js";

const graph: SceneGraph = {
  id: "g1",
  version: 1,
  sourceRefs: [],
  nodes: [
    {
      id: "world",
      kind: "WORLD",
      name: "iKickItz World",
      transform: {
        position: { x: 0, y: 0, z: 0 },
        rotationEulerDeg: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
    },
    {
      id: "nova",
      kind: "CHARACTER",
      name: "Nova",
      parentId: "world",
      transform: {
        position: { x: 0, y: 0, z: 1 },
        rotationEulerDeg: { x: 0, y: 180, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
      },
    },
  ],
};

test("scene graph rejects dangling parents", () => {
  const bad = structuredClone(graph);
  bad.nodes[1].parentId = "missing";
  assert.deepEqual(validateSceneGraph(bad), ["missing parent for nova: missing"]);
});

test("shot validation catches missing subjects and bad keyframe order", () => {
  const shot: ShotIntent = {
    id: "s1",
    worldVersionRef: "world:v1",
    subjectNodeIds: ["missing"],
    purpose: "reveal",
    durationMs: 1000,
    continuityLockRefs: [],
  };
  const trajectory: CameraTrajectory = {
    id: "cam1",
    move: "DOLLY",
    durationMs: 1000,
    keyframes: [
      {
        tMs: 800,
        pose: {
          position: { x: 0, y: 1, z: 2 },
          rotationEulerDeg: { x: 0, y: 0, z: 0 },
          lens: { focalLengthMm: 35, sensorWidthMm: 36 },
        },
      },
      {
        tMs: 100,
        pose: {
          position: { x: 0, y: 1, z: 1 },
          rotationEulerDeg: { x: 0, y: 0, z: 0 },
          lens: { focalLengthMm: 35, sensorWidthMm: 36 },
        },
      },
    ],
    framing: [],
    collisionFreeRequired: true,
  };

  const issues = validateShot(shot, trajectory, graph);
  assert.equal(issues.some((x) => x.code === "MISSING_SUBJECT"), true);
  assert.equal(issues.some((x) => x.code === "KEYFRAME_ORDER"), true);
});
