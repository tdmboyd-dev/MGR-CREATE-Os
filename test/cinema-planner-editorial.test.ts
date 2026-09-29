import assert from "node:assert/strict";
import test from "node:test";
import { planLinearTrajectory } from "../src/cinema/planner.js";
import { toOtioLike } from "../src/cinema/editorial.js";

test("linear camera planner produces monotonic keyframes and interpolated lens state", () => {
  const trajectory = planLinearTrajectory({
    id: "cam-1",
    move: "DOLLY",
    start: {
      position: { x: 0, y: 1, z: 5 },
      rotationEulerDeg: { x: 0, y: 0, z: 0 },
      lens: { focalLengthMm: 35, sensorWidthMm: 36, focusDistanceM: 5 },
    },
    end: {
      position: { x: 0, y: 1, z: 2 },
      rotationEulerDeg: { x: 0, y: 0, z: 0 },
      lens: { focalLengthMm: 50, sensorWidthMm: 36, focusDistanceM: 2 },
    },
    durationMs: 2000,
    keyframeCount: 3,
  });

  assert.deepEqual(trajectory.keyframes.map((k) => k.tMs), [0, 1000, 2000]);
  assert.equal(trajectory.keyframes[1]?.pose.position.z, 3.5);
  assert.equal(trajectory.keyframes[1]?.pose.lens.focalLengthMm, 42.5);
});

test("editorial adapter preserves source timing and MGR metadata", () => {
  const otio = toOtioLike({
    id: "episode-1",
    frameRate: 24,
    markers: [{ atMs: 1000, label: "beat" }],
    clips: [{
      id: "clip-1",
      sourceRef: "asset://shot-1",
      sourceInMs: 500,
      durationMs: 2000,
      timelineStartMs: 0,
      track: 1,
    }],
  });
  const clip = otio.tracks.children[0]?.children[0] as any;
  assert.equal(clip.metadata.mgrSourceRef, "asset://shot-1");
  assert.equal(clip.source_range.start_time.value, 12);
  assert.equal(clip.source_range.duration.value, 48);
});
