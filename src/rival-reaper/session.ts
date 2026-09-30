import { randomBytes } from "node:crypto";
import { drawPlayer, type ReaperState } from "./engine.js";
import { makeReceipt, verifyReceiptChain, type DrawReceipt, type ReaperSnapshot } from "./receipts.js";

export interface RandomSource { next(): number; label: string }

export class CryptoRandomSource implements RandomSource {
  label = "node:crypto/randomBytes";
  next() {
    const bytes = randomBytes(6);
    const n = bytes.readUIntBE(0, 6);
    return n / 281474976710656; // 2^48
  }
}

export class RivalReaperSession {
  readonly sessionId: string;
  readonly receipts: DrawReceipt[];
  readonly state: ReaperState;
  readonly random: RandomSource;

  constructor(state: ReaperState, options?: { sessionId?: string; receipts?: DrawReceipt[]; random?: RandomSource }) {
    this.state = state;
    this.sessionId = options?.sessionId ?? randomBytes(12).toString("hex");
    this.receipts = options?.receipts ?? [];
    this.random = options?.random ?? new CryptoRandomSource();
    if (!verifyReceiptChain(this.receipts)) throw new Error("Invalid receipt chain");
    if (this.receipts.length !== this.state.assignments.length) throw new Error("Receipt/assignment count mismatch");
  }

  drawAndLock(playerId: string, createdAt = new Date().toISOString()) {
    const result = drawPlayer(this.state, playerId, () => this.random.next());
    const previous = this.receipts.at(-1)?.receiptHash ?? null;
    const receipt = makeReceipt(this.sessionId, result.assignment, previous, createdAt);
    this.receipts.push(receipt);
    return { ...result, receipt, randomSource: this.random.label };
  }

  snapshot(): ReaperSnapshot {
    if (!verifyReceiptChain(this.receipts)) throw new Error("Invalid receipt chain");
    return { version: 1, sessionId: this.sessionId, state: this.state, receipts: this.receipts };
  }

  static restore(snapshot: ReaperSnapshot, random?: RandomSource) {
    if (!verifyReceiptChain(snapshot.receipts)) throw new Error("Invalid receipt chain");
    return new RivalReaperSession(snapshot.state, { sessionId: snapshot.sessionId, receipts: snapshot.receipts, random });
  }
}
