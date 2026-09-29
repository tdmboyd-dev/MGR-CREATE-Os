# BEAST Routing / Infrastructure University — 2026-09-28

## Scope
Multi-model routing, cost-aware routing, fallback, capability freshness, quotas, concurrency, provider health, evaluation, promotion, durable provider jobs and reconciliation.

## Required provider record
ProviderCapabilitySnapshot must be versioned and time-bound: provider, model, revision, modality, operation, input/output constraints, quality/eval evidence, latency distribution, availability, rate/concurrency limits, price units, estimated full job cost, commercial rights, data retention/training policy, region, safety limits, source URL/date, confidence and health.

## Routing
Routing is constrained optimization, not “pick cheapest.” Hard filters first: capability, rights/license, privacy, tenant policy, budget ceiling, required quality, input/output limits. Then score eligible candidates on expected quality, latency, reliability and cost. JEV can rank bounded eligible candidates but cannot override authorization or rights.

## Cost
Self-hosted is never automatically zero. Account GPU/CPU/RAM time, cold start, storage, egress, orchestration and operator overhead. Provider advertised “unlimited/free” is represented as a quota/pricing policy with source/date, never Infinity.

## Fallback
Fallback only to semantically compatible capabilities. Record reason, attempt, provider response, partial external state and cost. Circuit breakers prevent repeated calls to unhealthy providers. Unknown external state is reconciled before retry to avoid duplicate paid work.

## Evaluation/promotion
Every candidate model gets the same task-specific eval set, latency/cost capture, failure injection and regression comparison. Promotion is versioned; rollback preserves history. Shadow/assist modes precede active routing for consequential decisions.

## Durable media jobs
Long video/training/render jobs are Job records, not in-process polling loops: submit -> external_id -> status/callback/poll -> cancel -> reconcile -> artifact verification. Worker death must not lose the job.

## MGR placement
Canonical in Creation OS. MGR Agents/iKickItz/Elite/TIME consume it. MGR-API-MCP exposes capabilities; it does not own a second canonical router.
