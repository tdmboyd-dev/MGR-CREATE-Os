export interface ProductClaim {
  text: string;
  evidenceRefs: string[];
  regulated?: boolean;
}

export interface ProductKnowledgeObject {
  id: string;
  sourceRefs: string[];
  name: string;
  category?: string;
  price?: number;
  currency?: string;
  offer?: string;
  benefits: string[];
  features: string[];
  claims: ProductClaim[];
  assetRefs: string[];
  audienceSignals: string[];
  socialProofRefs: string[];
  capturedAt: string;
}

export interface ShotRhythm {
  shotCount: number;
  durationMs: number;
  medianShotMs: number;
  cutsPerMinute: number;
  motionIntensity?: number;
}

export interface CreativeDNA {
  id: string;
  sourceArtifactRef: string;
  hook?: string;
  audience?: string;
  problem?: string;
  desire?: string;
  angle?: string;
  promise?: string;
  mechanism?: string;
  demonstration?: string;
  proof?: string;
  objection?: string;
  offer?: string;
  urgency?: string;
  cta?: string;
  brandRevealMs?: number;
  productRevealMs?: number;
  shotRhythm?: ShotRhythm;
  captionStyle?: {
    density: number;
    maxWordsOnScreen?: number;
    placement?: string;
  };
  cameraMotion?: string[];
  musicEnergy?: number;
  evidenceRefs: string[];
}

export interface DeliveryContext {
  channel: string;
  placement?: string;
  objective: string;
  audienceRef: string;
  budget: number;
  frequency?: number;
  landingPageRef?: string;
  offerRef?: string;
  startedAt: string;
  endedAt?: string;
}

export interface PerformanceMetrics {
  impressions: number;
  clicks?: number;
  spend: number;
  conversions?: number;
  revenue?: number;
  video3sViews?: number;
  video25Pct?: number;
  video50Pct?: number;
  video75Pct?: number;
  video100Pct?: number;
}

export interface PerformanceObservation {
  creativeDnaRef: string;
  delivery: DeliveryContext;
  metrics: PerformanceMetrics;
  sourceRef: string;
  observedAt: string;
}

export function validatePerformanceObservation(
  observation: PerformanceObservation,
): string[] {
  const blockers: string[] = [];
  if (!observation.creativeDnaRef) blockers.push("missing CreativeDNA reference");
  if (!observation.delivery.channel) blockers.push("missing channel");
  if (!observation.delivery.objective) blockers.push("missing campaign objective");
  if (!observation.delivery.audienceRef) blockers.push("missing audience context");
  if (observation.delivery.budget < 0) blockers.push("invalid budget");
  if (observation.metrics.impressions < 0) blockers.push("invalid impressions");
  if (observation.metrics.spend < 0) blockers.push("invalid spend");
  if (!observation.sourceRef) blockers.push("missing performance source evidence");
  return blockers;
}

export function derivedPerformance(observation: PerformanceObservation) {
  const { metrics } = observation;
  return {
    ctr: metrics.impressions > 0 && metrics.clicks !== undefined
      ? metrics.clicks / metrics.impressions
      : null,
    cpa: metrics.conversions && metrics.conversions > 0
      ? metrics.spend / metrics.conversions
      : null,
    roas: metrics.spend > 0 && metrics.revenue !== undefined
      ? metrics.revenue / metrics.spend
      : null,
    completionRate: metrics.video3sViews && metrics.video3sViews > 0 && metrics.video100Pct !== undefined
      ? metrics.video100Pct / metrics.video3sViews
      : null,
  };
}
