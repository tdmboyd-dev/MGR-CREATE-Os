# BEAST Ultimate Research Audit — Build Waves A–E

Purpose: verify that implementation did not outrun research. This audit adds implementation-specific research questions that broad category research alone cannot answer.

## Rule
Before a subsystem moves from SPECIFIED to dependency-locked/production implementation, answer:
1. strongest open-source implementation patterns;
2. strongest commercial/industry patterns;
3. standards/specs;
4. failure/incident patterns;
5. licensing/security/maintenance/cost;
6. build-native vs adopt/adapt decision;
7. benchmark/acceptance evidence.

## A — Executable spine: deepening required
Durability: prototype Temporal semantics against native Postgres/outbox. Research workflow versioning/determinism, worker versioning, activity heartbeats, cancellation, long human waits, schedules, child workflows and multi-region implications.
Events: CloudEvents envelope + transactional outbox/inbox, delivery ordering, poison/dead-letter and schema evolution.
Approval: policy-as-code + durable HITL; immutable action digest, quorum, revocation, expiry, preview integrity, post-approval mutation.
Observability: OpenTelemetry GenAI semantic conventions, prompt/content redaction, trace sampling, cost correlation.
Cost: provider usage reconciliation, retries, cached tokens, GPU-seconds, media units, free quotas, price snapshots.
Tenancy: Postgres RLS plus application/storage/search/cache/job isolation; privileged/bypass-role threat model.

## B — Creation truth: deepening required
Asset/version: content-addressed blobs, immutable manifests, professional asset management, version aliases, garbage collection/retention.
UCOS: configuration/scene composition, inheritance/override semantics, schema evolution and conflict explanation.
Continuity: identity/brand/canon benchmarks; multimodal evaluator calibration; false positive/negative tracking.
UCT: OpenLineage + content digests + Sigstore/SLSA/C2PA applicability; provenance privacy.
Verification: deterministic validators first, model judges calibrated to human labels, evaluator versioning and trace rescoring.
Repair: fault localization, targeted regeneration, protected regression set, convergence metrics.

## C — External execution: deepening required
Sandbox: gVisor/Firecracker/containers/managed sandboxes across code/browser/GPU workloads; escape surface, startup/cost, networking/secrets.
Model routing: provider gateway bake-off, Hugging Face model-card/eval ingestion, health/circuit breakers, fallback semantic compatibility.
Connectors: OAuth 2.1/OIDC, MCP auth, webhook verification, pagination, reconciliation, provider schema drift.
Queues: fencing/leases, fairness, quotas, backpressure, GPU scheduling.
Compensation: Saga patterns, irreversible action handling and compensation evidence.

## D — Knowledge/governance: deepening required
Research: planner/executor/reviewer/reviser, source snapshots, citation entailment, contradiction/gap loops, freshness and primary-source preference.
Rights: SPDX expressions, model/dataset licenses, consent/biometric/voice/image permissions, derivative lineage.
Policy: OPA/Cedar-style policy engines, domain packs, explainability, exception lifecycle.
Catalog/search: lexical/vector/hybrid retrieval, ACL-before-disclosure, deletion/index propagation, reranking.
Memory: episodic/project/brand/user/knowledge boundaries, retention/forgetting, provenance, poisoning defenses.
Storage: Postgres + S3-compatible CAS + search/index, backups, encryption, residency, lifecycle.

## E — Collaboration/training/templates/agents: deepening required
Review: exact-version/frame/time/region annotations, comparison, stale-approval prevention.
Training: dataset lineage/rights, LoRA/adapters, eval gates, model registry aliases, rollback, reproducibility, GPU jobs.
Templates: signed/versioned manifests, permissions/dependencies, install/upgrade/migration, malicious-package threat model.
Agents: bounded delegation, role/tool permissions, context isolation, budgets, loop detection, evidence and disagreement preservation.
Replay: workflow/code/model version changes, nondeterminism and branch provenance.

## New native build candidates identified
- Schema Registry for all contracts/events/packages.
- Capability Evaluation Registry separate from provider/model registry.
- Secret Broker with short-lived credential issuance rather than raw secret retrieval.
- Artifact Validator Registry keyed by MIME/artifact type.
- Dependency/License Resolver for TemplatePackage and generated artifacts.
- Experiment/Feature Flag service for controlled factory/product improvements.
- Data Retention/Deletion Orchestrator propagating to blob/search/cache/memory/lineage where legally allowed.
- Health/Circuit Breaker registry for providers/connectors/models.
- Migration Registry for contract/template/workflow/model schema evolution.
- Evidence Bundle exporter for audits/handoffs.

These are candidates until research/spec confirms whether each deserves an independent subsystem or belongs inside an existing category.
