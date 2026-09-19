# Dependency Bake-offs

## Durable execution
Candidates: Temporal; native Postgres/outbox minimal engine; other durable workflow engines if license/ops fit.
Decision criteria: crash/replay semantics, human waits, timers, activities, versioning, self-host/managed cost, TypeScript SDK, observability, operational complexity.
Current: Temporal is leading architecture university; NOT selected until prototype AT-004/005/016.

## Sandbox
Candidates: gVisor, Firecracker, managed sandbox services.
Criteria: isolation, startup, GPU/browser support, networking, filesystem, host compatibility, cost/ops.
Likely: profiles may use multiple backends by risk/workload.

## Model gateway/router
Candidates: LiteLLM gateway/router, native adapter layer, provider gateways.
Criteria: routing/fallback, usage/cost, auth, tenancy, model breadth, self-host, failure behavior. Canonical ModelCapability remains ours regardless.

## Registry/evaluation
Candidates: MLflow registry/evals, native DB contracts, hybrid.
Criteria: lineage, aliases, eval versioning, trace rescoring, infra weight.

## Policy
Candidates: OPA for deterministic policy + native domain policy/approval orchestration.
Likely hybrid: OPA-style decisions for machine policy, Creation OS owns action digest/approval lifecycle.

## Observability/lineage/integrity
Prefer standards-compatible OpenTelemetry, OpenLineage and Sigstore/SLSA concepts where fit. Adoption depth determined by prototype overhead and schema mapping.

## Search/storage
Bake off Postgres FTS/pgvector vs dedicated search; S3-compatible object store/content-addressed layer. Choose simplest system meeting scale, ACL, deletion propagation and backup tests.

No candidate becomes a dependency because it appears in research.
