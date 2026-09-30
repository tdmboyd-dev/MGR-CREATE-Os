import test from "node:test";
import assert from "node:assert/strict";
import { encryptSnapshot, decryptSnapshot } from "../src/rival-reaper/persistence.js";
import type { ReaperSnapshot } from "../src/rival-reaper/receipts.js";

test("encrypted snapshot round-trips and rejects wrong secret", () => {
  const snapshot: ReaperSnapshot = {
    version: 1, sessionId: "s",
    state: { players: [], teams: [], assignments: [] },
    receipts: [],
  };
  const encrypted = encryptSnapshot(snapshot, "this-is-a-long-test-secret");
  assert.equal(encrypted.includes('"sessionId":"s"'), false);
  assert.deepEqual(decryptSnapshot(encrypted, "this-is-a-long-test-secret"), snapshot);
  assert.throws(() => decryptSnapshot(encrypted, "this-is-the-wrong-secret"));
});
