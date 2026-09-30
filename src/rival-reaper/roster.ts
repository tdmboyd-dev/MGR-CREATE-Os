import type { ReaperGender, ReaperPlayer, ReaperState, ReaperTeam, TeamId } from "./engine.js";

export interface PrivateRosterEntry {
  id: string;
  name: string;
  householdId: string;
  gender: ReaperGender;
  status?: "competitor" | "blackout";
}

const TEAM_IDENTITIES: Array<[TeamId, string]> = [
  ["blood-bloom", "Blood Bloom"],
  ["pressure-gang", "Pressure Gang"],
  ["high-society", "High Society"],
  ["heat-mob", "Heat Mob"],
  ["pink-venom", "Pink Venom"],
];

export function validatePrivateRoster(entries: PrivateRosterEntry[]) {
  const ids = new Set<string>();
  const errors: string[] = [];
  for (const [index, entry] of entries.entries()) {
    if (!entry.id?.trim()) errors.push(`row ${index + 1}: id required`);
    if (!entry.name?.trim()) errors.push(`row ${index + 1}: name required`);
    if (!entry.householdId?.trim()) errors.push(`row ${index + 1}: householdId required`);
    if (entry.gender !== "male" && entry.gender !== "female") errors.push(`row ${index + 1}: gender must be male/female`);
    if (ids.has(entry.id)) errors.push(`row ${index + 1}: duplicate id ${entry.id}`);
    ids.add(entry.id);
  }
  if (errors.length) throw new Error(errors.join("; "));
  return entries;
}

export function buildFiveTeamState(entries: PrivateRosterEntry[]): { state: ReaperState; blackout: PrivateRosterEntry[] } {
  validatePrivateRoster(entries);
  const competitors = entries.filter((e) => e.status !== "blackout");
  const blackout = entries.filter((e) => e.status === "blackout");
  const base = Math.floor(competitors.length / TEAM_IDENTITIES.length);
  let remainder = competitors.length % TEAM_IDENTITIES.length;
  const teams: ReaperTeam[] = TEAM_IDENTITIES.map(([id, name]) => ({
    id, name, capacity: base + (remainder-- > 0 ? 1 : 0),
  }));
  const players: ReaperPlayer[] = competitors.map(({ id, name, householdId, gender }) => ({ id, name, householdId, gender }));
  return { state: { players, teams, assignments: [] }, blackout };
}
