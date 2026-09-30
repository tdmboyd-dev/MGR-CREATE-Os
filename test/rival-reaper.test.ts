import test from "node:test";
import assert from "node:assert/strict";
import { auditSnapshot, drawPlayer, type ReaperState } from "../src/rival-reaper/engine.js";

const teams = [
  ["blood-bloom", "Blood Bloom"], ["pressure-gang", "Pressure Gang"], ["high-society", "High Society"],
  ["heat-mob", "Heat Mob"], ["pink-venom", "Pink Venom"],
].map(([id, name]) => ({ id: id as any, name, capacity: 2 }));

test("Rival Reaper fills balanced teams without duplicates", () => {
  const players = Array.from({ length: 10 }, (_, i) => ({
    id: `p${i}`, name: `Player ${i}`, householdId: `h${Math.floor(i / 2)}`,
    gender: (i % 2 ? "female" : "male") as "male" | "female",
  }));
  const state: ReaperState = { players, teams, assignments: [] };
  const sequence = [0.01, .91, .21, .71, .41, .61, .31, .81, .11, .51];
  players.forEach((p, i) => drawPlayer(state, p.id, () => sequence[i]));
  assert.equal(new Set(state.assignments.map((a) => a.playerId)).size, 10);
  assert.deepEqual(auditSnapshot(state).map((x) => x.size), [2, 2, 2, 2, 2]);
  for (const team of auditSnapshot(state)) {
    assert.equal(team.male, 1);
    assert.equal(team.female, 1);
  }
});

test("Black/support crew never enters engine unless explicitly supplied as players", () => {
  const state: ReaperState = {
    players: [{ id: "competitor", name: "Competitor", householdId: "h1", gender: "female" }],
    teams: [{ id: "blood-bloom", name: "Blood Bloom", capacity: 1 }],
    assignments: [],
  };
  drawPlayer(state, "competitor", () => 0);
  assert.equal(state.assignments.length, 1);
  assert.equal(state.assignments[0].playerId, "competitor");
});
