export type ReaperGender = "male" | "female";
export type TeamId = "blood-bloom" | "pressure-gang" | "high-society" | "heat-mob" | "pink-venom";

export interface ReaperPlayer {
  id: string;
  name: string;
  householdId: string;
  gender: ReaperGender;
}

export interface ReaperTeam {
  id: TeamId;
  name: string;
  capacity: number;
}

export interface ReaperAssignment {
  playerId: string;
  teamId: TeamId;
  drawIndex: number;
  eligibleTeamIds: TeamId[];
  excluded: Partial<Record<TeamId, string[]>>;
  randomUnit: number;
}

export interface ReaperState {
  players: ReaperPlayer[];
  teams: ReaperTeam[];
  assignments: ReaperAssignment[];
}

export interface DrawResult {
  assignment: ReaperAssignment;
  team: ReaperTeam;
}

function assignmentsForTeam(state: ReaperState, teamId: TeamId) {
  return state.assignments.filter((a) => a.teamId === teamId);
}

function playersForTeam(state: ReaperState, teamId: TeamId) {
  const ids = new Set(assignmentsForTeam(state, teamId).map((a) => a.playerId));
  return state.players.filter((p) => ids.has(p.id));
}

function targetGenderCounts(state: ReaperState) {
  const capacities = state.teams.map((t) => t.capacity);
  const totalCapacity = capacities.reduce((a, b) => a + b, 0);
  if (totalCapacity !== state.players.length) {
    throw new Error(`Team capacity ${totalCapacity} must equal player count ${state.players.length}`);
  }
  const males = state.players.filter((p) => p.gender === "male").length;
  const females = state.players.length - males;
  return { males, females };
}

export function eligibleTeams(state: ReaperState, player: ReaperPlayer) {
  targetGenderCounts(state);
  if (state.assignments.some((a) => a.playerId === player.id)) throw new Error("Player already assigned");

  const excluded: Partial<Record<TeamId, string[]>> = {};
  const open = state.teams.filter((team) => {
    const reasons: string[] = [];
    const roster = playersForTeam(state, team.id);
    if (roster.length >= team.capacity) reasons.push("team-full");

    // Household separation is a preference, not an absolute rule. We first identify
    // collision-free teams and only relax this constraint if every open team collides.
    if (roster.some((p) => p.householdId === player.householdId)) reasons.push("household-collision");
    if (reasons.length) excluded[team.id] = reasons;
    return roster.length < team.capacity;
  });

  if (!open.length) throw new Error("No team has capacity");

  const collisionFree = open.filter((team) => !playersForTeam(state, team.id).some((p) => p.householdId === player.householdId));
  const householdPool = collisionFree.length ? collisionFree : open;

  // Balance gender by preferring the teams with the lowest count for this player's gender.
  const genderCounts = householdPool.map((team) => ({
    team,
    count: playersForTeam(state, team.id).filter((p) => p.gender === player.gender).length,
  }));
  const minGender = Math.min(...genderCounts.map((x) => x.count));
  const genderPool = genderCounts.filter((x) => x.count === minGender).map((x) => x.team);

  // Finally prefer the least-filled teams. Randomness only breaks true ties.
  const sizes = genderPool.map((team) => ({ team, size: playersForTeam(state, team.id).length }));
  const minSize = Math.min(...sizes.map((x) => x.size));
  const eligible = sizes.filter((x) => x.size === minSize).map((x) => x.team);

  for (const team of state.teams) {
    if (!eligible.some((x) => x.id === team.id)) {
      const reasons = excluded[team.id] ?? [];
      if (!reasons.length) reasons.push("balance-preference");
      excluded[team.id] = reasons;
    }
  }

  return { eligible, excluded };
}

export function drawPlayer(state: ReaperState, playerId: string, random: () => number = Math.random): DrawResult {
  const player = state.players.find((p) => p.id === playerId);
  if (!player) throw new Error("Unknown player");
  const { eligible, excluded } = eligibleTeams(state, player);
  const randomUnit = Math.max(0, Math.min(0.999999999, random()));
  const team = eligible[Math.floor(randomUnit * eligible.length)];
  const assignment: ReaperAssignment = {
    playerId,
    teamId: team.id,
    drawIndex: state.assignments.length + 1,
    eligibleTeamIds: eligible.map((t) => t.id),
    excluded,
    randomUnit,
  };
  state.assignments.push(assignment);
  return { assignment, team };
}

export function auditSnapshot(state: ReaperState) {
  return state.teams.map((team) => {
    const roster = playersForTeam(state, team.id);
    return {
      teamId: team.id,
      teamName: team.name,
      size: roster.length,
      capacity: team.capacity,
      male: roster.filter((p) => p.gender === "male").length,
      female: roster.filter((p) => p.gender === "female").length,
      households: [...new Set(roster.map((p) => p.householdId))].length,
    };
  });
}
