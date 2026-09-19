# Deep Research Findings — Categories 1–35

This document records architecture changes produced by the external BEAST University pass, beyond the earlier internal synthesis.

## 1–10 Kernel mechanics
1 Durable Orchestration: ADAPT Temporal semantics. Workflow state must survive process/infrastructure failure. Side effects become idempotent activities/operators. CINEFORGE remains domain lifecycle, not reliability engine.
2 Creation Graph: split semantic creation graph from execution and lineage graphs. OpenLineage shows why exact edges matter; avoid inferred Cartesian relationships.
3 UCOS Resolver: implement deterministic layered composition with explicit priority/conflict reports; borrow composition thinking from production scene/config systems rather than prompt concatenation.
4 Continuity: multimodal rule engine with per-rule evidence; benchmark detectors separately. One aggregate score is UI sugar, never the truth source.
5 UCT: model Run/Job/Input/Output lineage facets plus artifact digest and optional attestation. UCT ID points to immutable provenance record.
6 Approval: policy decision must be auditable (OPA-style decision ID/revision) and approval binds exact action digest. Human wait is durable.
7 Events: adopt CloudEvents-compatible envelope fields; source+id supports duplicate recognition. Add causation/correlation/tenant/idempotency extensions.
8 Sandboxes: ordinary containers are insufficient for untrusted AI/code. Define risk-tiered SandboxProfiles; gVisor and Firecracker are serious implementation candidates depending workload/isolation/performance.
9 Operators: MCP-like typed tool schema plus OS-specific side-effect/risk/sandbox/cost/verifier metadata.
10 Patterns: pattern library is semantic and tested; no magic historical count.

## 11–20 Platform mechanics
11 Model Router: Hugging Face cards/evals plus local benchmark snapshots feed capability registry; LiteLLM is a university/candidate adapter for provider routing/fallback/cost, not the source of truth.
12 Connectors: capability != provider connector. OAuth/scopes/secrets/health/reconciliation live in connector contracts.
13 Cost: append-only usage ledger; price snapshots and actual-provider reconciliation; forecast ranges/confidence.
14 Rollback: classify reversible/compensatable/irreversible; compensation is explicit and tested.
15 Workers: capability/resource queues, leases, heartbeats, backpressure, tenant quotas; durable orchestrator owns scheduling semantics.
16 Replay: immutable execution history + materialized state; branch creates lineage; side effects never blindly replay.
17 Agents: agent is bounded role with schema/tools/budget/termination. Planner/researcher/reviewer/reviser patterns from GPT Researcher support division of labor rather than one omnipotent agent.
18 Interop: internal API/domain contracts first; SDK/events/webhooks/MCP adapters around them.
19 Observability: OpenTelemetry conventions + OpenLineage/UCT IDs. One trace should reconstruct objective→run→operator/model/tool→artifact→verification.
20 Security/Tenancy: default-deny resource policy; PostgreSQL RLS is one DB-layer defense, not entire tenancy strategy; isolation must also cover caches/search/jobs/storage/connectors.

## 21–35 Creation substrate
21 Assets/Versions: professional production systems track assets, versions, tasks and reviews. Creation OS needs immutable versions + aliases/pointers + derivatives, never destructive overwrite.
22 Identity Locks: lock = policy + references + evaluator + threshold + consent/version, not prose prompt. Hard/soft/override semantics.
23 Model Lifecycle: Hugging Face cards/dataset cards + MLflow registry show required metadata: intended use, limitations, data, evals, license, lineage, versions, aliases/promotion. Training output cannot auto-promote itself.
24 Media Runtime: Diffusers ModularPipeline proves value of componentized/lazy pipelines and memory manager; Adobe shows published reusable workflows + batch/concurrency/progress/cancel/per-asset results. Creation OS MediaJob should combine these ideas behind adapters.
25 Verification: MLflow demonstrates traces can be rescored without rerunning app; code scorers and LLM judges are distinct. Creation OS should cache evidence/traces and version evaluators. Human feedback calibrates judges.
26 Causal Repair: repair must operate on explicit defect/evidence and rerun targeted validators, not regenerate whole artifact. Store attempts and stop on repeated defect/no metric improvement.
27 Research Evidence: GPT Researcher supports planner/executor separation, parallel branches, recursive breadth/depth, progress tracking and source aggregation; multi-agent reference adds reviewer/reviser before writer. Creation OS Research Factory should natively model these stages.
28 Templates: Adobe requires successful workflow execution before publish and publishes a versioned workflow ID with exposed typed inputs. Creation OS template publication should similarly require validation/test evidence.
29 Collaboration: Autodesk Flow emphasizes version comparison and connected review; comments/approval bind exact artifact version/time/frame/range.
30 Catalog/Search: catalog is metadata/ACL/lineage layer; retrieval implementation can combine lexical/vector/structured filters, but authorization is applied before results escape.
31 Integrity: artifact digest belongs in provenance. Signing/attestation is an interoperable extension; don't invent homebrew crypto.
32 Rights/Licensing: SPDX expressions show licenses can be compound AND/OR/WITH; simple single “license” strings are insufficient for dependency/derivative decisions. Model/dataset cards also carry license/limitations.
33 Compliance/Policy: policy engine needs versioned rule bundles and decision logs; policy result/evidence stored with run.
34 Multi-tenancy: RLS default-deny can enforce row visibility, but owners/bypass roles require care. Tenant context must propagate to jobs, search, storage, cache, traces and connectors.
35 Storage/Memory: separate relational truth, object blobs, search index, cache and memory. Every derived index/cache must have invalidation/deletion propagation and tenant ACL.

## Research-created implementation candidates requiring bake-off
- Temporal vs alternative durable engines.
- gVisor vs Firecracker vs managed sandbox products by risk/workload.
- LiteLLM vs custom/provider gateways for model routing.
- MLflow components vs native registry/eval storage.
- OpenTelemetry/OpenLineage direct adoption depth.
- Sigstore/SLSA attestation integration.
- Search/vector stack choice.
These are not selected merely because they were researched.

## What “researched” now means
The categories above have a real multi-source architecture research pass. They are not yet SPECIFIED or IMPLEMENTED. Narrow implementation bake-offs, benchmarks and licensing/security validation still happen before adoption.
