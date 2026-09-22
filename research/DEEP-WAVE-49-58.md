# Deep Research — Categories 49–58

## 49 Schema Registry / Contract Evolution
Universities: Confluent Schema Registry compatibility modes, Protobuf/Avro/JSON Schema evolution, CloudEvents schema versioning, API versioning.
Native need: ContractSchema(id, version, format, compatibilityMode, digest, status), producer/consumer compatibility checks and migrations. Events/operators/templates cannot publish incompatible schemas silently.
Disposition: BUILD NATIVE registry semantics; adapters may use existing schema tooling.

## 50 Capability Evaluation Registry
Universities: Hugging Face Evaluate/model cards, MLflow GenAI evaluation/scorers, benchmark leaderboards.
Native need: capability-level eval suites independent of provider; EvalSuite, DatasetSnapshot, EvaluatorVersion, EvalRun, ResultDistribution, ThresholdPolicy. Router consumes approved snapshots.
Key lesson: provider benchmark claims are inputs, not truth; Creation OS needs reproducible internal task benchmarks.

## 51 Secret Broker
Universities: Vault dynamic secrets, cloud workload identity/STS, OAuth token exchange, GitHub OIDC.
Native need: workflows/operators receive short-lived scoped handles/tokens, never long-lived raw credentials when avoidable. Audit issuance/use/revocation; tenant and operator bound.
Disposition: ADAPT external secret manager/workload identity; Creation OS owns CredentialReference and broker policy.

## 52 Artifact Validator Registry
Universities: MIME/tool validators, browser testing, PDF/EPUB validators, media ffprobe-style validation, accessibility validators.
Native need: registry maps artifact type + acceptance criterion to deterministic validators and optional judges. Validator versions are pinned in VerificationResult.
Key lesson: verification becomes extensible without hardcoding each factory into core.

## 53 Dependency & License Resolver
Universities: SPDX expressions, package lockfiles/SBOM, SLSA provenance, model/dataset cards.
Native need: resolve TemplatePackage/model/dataset/asset dependency graph, licenses, version constraints, vulnerabilities/policy and derivative restrictions before install/publish.
Output: DependencyResolution with conflicts and policy evidence.

## 54 Experiment / Feature Flag Service
Universities: OpenFeature standard, PostHog/LaunchDarkly-style flags/experiments.
Native need: provider/model/workflow/factory variants assigned deterministically by tenant/user/objective; exposure events recorded; kill switch; experiment guardrails. Separate rollout from evaluation.
Disposition: OpenFeature-compatible contract is preferred so providers remain replaceable.

## 55 Retention / Deletion Orchestrator
Universities: data lifecycle/retention systems, privacy deletion patterns, object-store lifecycle, search-index deletion.
Native need: RetentionPolicy and DeletionRun fan out to DB/blob/search/vector/cache/memory while preserving legally required minimal audit/lineage references. Tombstones prevent re-index/re-hydration.
Failure test: deleted data reappears from cache/vector backup or derived artifact.

## 56 Health / Circuit Breaker Registry
Universities: circuit breaker pattern, service mesh/provider health, gateway routing.
Native need: ProviderHealth with rolling failures/latency/rate-limit state, CLOSED/OPEN/HALF_OPEN breaker, cooldown and capability-specific routing exclusion. ModelRouter/ConnectorRegistry consume health.
Key lesson: fallback must react to live health but still obey semantic/license/privacy constraints.

## 57 Migration Registry
Universities: DB migration tools, API/schema compatibility, workflow versioning.
Native need: Migration(id, fromVersion, toVersion, resourceType, transform, preconditions, rollback/irreversibility, verification). Applies to schemas, Context/UCOS, templates, workflows, model metadata and factory contracts.
Rule: historical runs remain interpretable under their pinned schema versions.

## 58 Evidence Bundle / Audit Exporter
Universities: provenance attestations, OpenTelemetry/OpenLineage export, compliance evidence packages.
Native need: given Objective/Run/Artifact produce portable manifest of lineage, digests, approvals, policy decisions, sources, rights, costs, traces, verification and referenced artifacts with redaction policy.
Use: handoff, audit, debugging, customer proof, migration.

## Cross-cutting consequence
These ten are real enough to keep as first-class BuildList entries. They solve evolution, trust, secrets, extensible verification, dependency rights, controlled experimentation, deletion, resilience, migration and portable proof—areas the first 48 did not isolate clearly enough.
