import test from "node:test";
import assert from "node:assert/strict";
import { RevealController } from "../src/rival-reaper/reveal.js";
import { makeReceipt } from "../src/rival-reaper/receipts.js";
import type { ReaperAssignment } from "../src/rival-reaper/engine.js";

test("reveal walks the locked fate through every theatrical phase", () => {
  const assignment: ReaperAssignment = {
    playerId:"p1", teamId:"blood-bloom", drawIndex:1,
    eligibleTeamIds:["blood-bloom"], excluded:{}, randomUnit:0.2,
  };
  const receipt = makeReceipt("s", assignment, null, "2026-10-01T12:00:00Z", "nonce");
  const reveal = new RevealController();
  assert.equal(reveal.begin(receipt, { id:"blood-bloom", name:"Blood Bloom", capacity:9 }).phase, "machine-awakens");
  const phases = [];
  while (reveal.current().phase !== "roster-updated") phases.push(reveal.advance().phase);
  assert.deepEqual(phases, ["colors-fight","badge-selected","ticket-ejects","ink-1","ink-2","ink-3","name-revealed","team-explosion","roster-updated"]);
  assert.equal(reveal.current().receiptHash, receipt.receiptHash);
});
