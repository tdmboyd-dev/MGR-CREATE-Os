export interface DatasetItem {
  id: string;
  assetRef: string;
  rightsRefs: string[];
  consentRefs?: string[];
  width?: number;
  height?: number;
  blurScore?: number;
  duplicateGroup?: string;
  subjectCount?: number;
  identityScore?: number;
  poseLabel?: string;
  expressionLabel?: string;
  backgroundLabel?: string;
  caption?: string;
}

export interface DatasetQualityReport {
  datasetId: string;
  itemCount: number;
  score: number;
  blockers: string[];
  warnings: string[];
  metrics: {
    rightsCoverage: number;
    duplicateFraction: number;
    lowResolutionFraction: number;
    identityConsistency?: number;
    poseDiversity?: number;
    expressionDiversity?: number;
  };
}

export function evaluateDatasetQuality(input: {
  datasetId: string;
  items: DatasetItem[];
  requireConsent?: boolean;
  minResolution?: number;
  minIdentityScore?: number;
}): DatasetQualityReport {
  const minResolution = input.minResolution ?? 1024;
  const blockers: string[] = [];
  const warnings: string[] = [];

  if (input.items.length === 0) blockers.push("dataset is empty");

  const rightsCovered = input.items.filter((x) => x.rightsRefs.length > 0).length;
  const consentCovered = input.items.filter((x) => (x.consentRefs?.length ?? 0) > 0).length;
  const lowRes = input.items.filter((x) => (x.width ?? 0) < minResolution || (x.height ?? 0) < minResolution).length;

  const duplicateGroups = new Map<string, number>();
  for (const item of input.items) {
    if (!item.duplicateGroup) continue;
    duplicateGroups.set(item.duplicateGroup, (duplicateGroups.get(item.duplicateGroup) ?? 0) + 1);
  }
  const duplicatedItems = [...duplicateGroups.values()].reduce((sum, n) => sum + Math.max(0, n - 1), 0);

  const identityScores = input.items.map((x) => x.identityScore).filter((x): x is number => x !== undefined);
  const identityConsistency = identityScores.length
    ? identityScores.reduce((a, b) => a + b, 0) / identityScores.length
    : undefined;

  const poseDiversity = diversity(input.items.map((x) => x.poseLabel));
  const expressionDiversity = diversity(input.items.map((x) => x.expressionLabel));

  if (rightsCovered !== input.items.length) blockers.push("not every dataset item has rights evidence");
  if (input.requireConsent && consentCovered !== input.items.length) blockers.push("not every dataset item has consent evidence");
  if (lowRes > 0) warnings.push(`${lowRes} item(s) below target resolution`);
  if (duplicatedItems > 0) warnings.push(`${duplicatedItems} duplicate/near-duplicate item(s)`);
  if (input.minIdentityScore !== undefined && identityConsistency !== undefined && identityConsistency < input.minIdentityScore) {
    blockers.push("identity consistency below required threshold");
  }

  const rightsCoverage = input.items.length ? rightsCovered / input.items.length : 0;
  const duplicateFraction = input.items.length ? duplicatedItems / input.items.length : 0;
  const lowResolutionFraction = input.items.length ? lowRes / input.items.length : 0;

  const score = clamp100(
    rightsCoverage * 40 +
    (1 - duplicateFraction) * 20 +
    (1 - lowResolutionFraction) * 15 +
    (identityConsistency ?? 1) * 15 +
    poseDiversity * 5 +
    expressionDiversity * 5,
  );

  return {
    datasetId: input.datasetId,
    itemCount: input.items.length,
    score,
    blockers,
    warnings,
    metrics: {
      rightsCoverage,
      duplicateFraction,
      lowResolutionFraction,
      ...(identityConsistency !== undefined ? { identityConsistency } : {}),
      poseDiversity,
      expressionDiversity,
    },
  };
}

function diversity(values: Array<string | undefined>): number {
  const present = values.filter((x): x is string => Boolean(x));
  if (present.length <= 1) return 0;
  return Math.min(1, new Set(present).size / present.length);
}

function clamp100(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value * 100) / 100));
}
