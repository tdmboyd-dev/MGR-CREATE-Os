import type { DrawReceipt } from "./receipts.js";
import type { ReaperTeam } from "./engine.js";

export type RevealPhase =
  | "idle" | "machine-awakens" | "colors-fight" | "badge-selected"
  | "ticket-ejects" | "ink-1" | "ink-2" | "ink-3"
  | "name-revealed" | "team-explosion" | "roster-updated";

export interface RevealState {
  phase: RevealPhase;
  drawIndex: number | null;
  playerId: string | null;
  teamId: ReaperTeam["id"] | null;
  teamName: string | null;
  receiptHash: string | null;
  updatedAt: string;
}

const order: RevealPhase[] = [
  "machine-awakens","colors-fight","badge-selected","ticket-ejects",
  "ink-1","ink-2","ink-3","name-revealed","team-explosion","roster-updated",
];

export class RevealController {
  private value: RevealState = {
    phase:"idle", drawIndex:null, playerId:null, teamId:null, teamName:null, receiptHash:null,
    updatedAt:new Date(0).toISOString(),
  };
  current() { return { ...this.value }; }
  begin(receipt: DrawReceipt, team: ReaperTeam, now = new Date().toISOString()) {
    if (this.value.phase !== "idle" && this.value.phase !== "roster-updated") throw new Error("Reveal already active");
    this.value = {
      phase:"machine-awakens", drawIndex:receipt.drawIndex, playerId:receipt.playerId,
      teamId:team.id, teamName:team.name, receiptHash:receipt.receiptHash, updatedAt:now,
    };
    return this.current();
  }
  advance(now = new Date().toISOString()) {
    if (this.value.phase === "idle") throw new Error("No reveal active");
    const i = order.indexOf(this.value.phase);
    if (i < 0 || i === order.length - 1) return this.current();
    this.value = { ...this.value, phase:order[i + 1], updatedAt:now };
    return this.current();
  }
  restore(state: RevealState) { this.value = { ...state }; return this.current(); }
}
