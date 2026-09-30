import { createHash, randomBytes } from "node:crypto";
import type { ReaperAssignment, ReaperState, TeamId } from "./engine.js";

export interface DrawReceipt {
  receiptVersion: 1;
  sessionId: string;
  drawIndex: number;
  playerId: string;
  teamId: TeamId;
  eligibleTeamIds: TeamId[];
  excluded: ReaperAssignment["excluded"];
  randomUnit: number;
  previousReceiptHash: string | null;
  createdAt: string;
  nonce: string;
  receiptHash: string;
}

function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.entries(value as Record<string, unknown>)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${JSON.stringify(k)}:${canonical(v)}`).join(",")}}`;
  }
  const encoded = JSON.stringify(value);
  if (encoded === undefined) throw new Error("Receipt contains unsupported undefined value");
  return encoded;
}

export function hashReceipt(input: Omit<DrawReceipt, "receiptHash">) {
  return createHash("sha256").update(canonical(input)).digest("hex");
}

export function makeReceipt(
  sessionId: string,
  assignment: ReaperAssignment,
  previousReceiptHash: string | null,
  createdAt = new Date().toISOString(),
  nonce = randomBytes(16).toString("hex"),
): DrawReceipt {
  const base: Omit<DrawReceipt, "receiptHash"> = {
    receiptVersion: 1,
    sessionId,
    drawIndex: assignment.drawIndex,
    playerId: assignment.playerId,
    teamId: assignment.teamId,
    eligibleTeamIds: assignment.eligibleTeamIds,
    excluded: assignment.excluded,
    randomUnit: assignment.randomUnit,
    previousReceiptHash,
    createdAt,
    nonce,
  };
  return { ...base, receiptHash: hashReceipt(base) };
}

export function verifyReceiptChain(receipts: DrawReceipt[]) {
  for (let i = 0; i < receipts.length; i++) {
    const { receiptHash, ...base } = receipts[i];
    if (hashReceipt(base) !== receiptHash) return false;
    if (base.previousReceiptHash !== (i ? receipts[i - 1].receiptHash : null)) return false;
    if (base.drawIndex !== i + 1) return false;
  }
  return true;
}

export interface ReaperSnapshot {
  version: 1;
  sessionId: string;
  state: ReaperState;
  receipts: DrawReceipt[];
}

export function serializeSnapshot(snapshot: ReaperSnapshot) {
  if (!verifyReceiptChain(snapshot.receipts)) throw new Error("Invalid receipt chain");
  return canonical(snapshot);
}
