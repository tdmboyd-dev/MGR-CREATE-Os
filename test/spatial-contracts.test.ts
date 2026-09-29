import assert from "node:assert/strict";
import test from "node:test";
import { validateSpatialAsset } from "../src/cinema/spatial.js";

test("spatial asset requires lineage and renderer metadata", () => {
  assert.deepEqual(validateSpatialAsset({
    id: "world-1",
    representation: "GAUSSIAN_SPLAT",
    uri: "",
    format: "spz",
    coordinateSystem: "Y_UP_RIGHT_HANDED",
    unitsPerMeter: 1,
    sourceRefs: [],
    rendererCompatibility: [],
  }), [
    "missing spatial asset URI",
    "spatial asset requires source lineage",
    "spatial asset requires renderer compatibility metadata",
  ]);
});
