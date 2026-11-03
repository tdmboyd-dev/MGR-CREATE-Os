import type { Factory, FactoryRequest, FactoryResult } from "./contracts.js";

export interface WebInput {
  routes: string[];
  interactions: string[];
  responsiveViewports: string[];
  acceptanceJourneys: string[];
  dataContracts: string[];
}

export class WebFactory implements Factory {
  readonly kind = "WEB" as const;

  async execute(req: FactoryRequest): Promise<FactoryResult> {
    const input = req.inputs as Partial<WebInput> | null | undefined;
    const blockers: string[] = [];
    if (!hasEntries(input?.routes)) blockers.push("no routes");
    if (!hasEntries(input?.acceptanceJourneys)) blockers.push("no browser acceptance journeys");
    if (!hasEntries(input?.responsiveViewports)) blockers.push("no responsive targets");
    if (!blockers.length) blockers.push("Web artifact production adapter is not configured");
    return {
      requestId: req.id, kind: this.kind, status: "BLOCKED",
      artifactRefs: [], evidenceRefs: [], blockers,
    };
  }
}

function hasEntries(values: unknown): boolean {
  return Array.isArray(values) && values.length > 0 &&
    values.every(value => typeof value === "string" && value.trim().length > 0);
}
