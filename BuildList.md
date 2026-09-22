# BuildList.md — MGR Creation OS

This is the canonical implementation list. Research explains what to build; this file tracks the build itself.

## Status
[ ] QUEUED  [R] RESEARCHED  [S] SPECIFIED  [I] IMPLEMENTED  [T] TESTED  [V] VERIFIED

## A. Creation OS Kernel
- [S] 01 Durable Orchestrator / CINEFORGE runtime
- [S] 02 Creation Graph (separate semantic, execution and lineage graphs)
- [S] 03 UCOS layered Context Resolver
- [S] 04 Continuity Engine with explainable rule evidence
- [S] 05 UCT provenance + artifact lineage + integrity
- [S] 06 Approval / Policy Gateway with exact-action digest binding
- [S] 07 Event / Signal Bus
- [S] 08 Sandbox Runtime and risk-tiered SandboxProfiles
- [S] 09 Operator / Capability Registry
- [S] 10 Pattern / Composition Engine
- [S] 11 Model / Provider Capability Router
- [S] 12 Tool / Connector SDK and registry
- [S] 13 Cost / Usage / Budget Ledger
- [S] 14 Rollback / Compensation Engine
- [S] 15 Durable Worker / Queue / Scheduler layer
- [S] 16 Checkpoint / Replay / Branching
- [S] 17 Agent / Crew Runtime
- [S] 18 API + SDK + Events + Webhooks + MCP adapter
- [S] 19 Observability / Trace / Evidence system
- [S] 20 Security / Auth / Permissions / Secrets / Tenancy foundation

## B. Creation Substrate
- [S] 21 Asset Registry / immutable Versions / Derivatives
- [S] 22 Identity locks: face, body, anatomy, wardrobe, voice, character, logo, brand, canon
- [S] 23 Dataset / Training / Model / LoRA / Adapter lifecycle
- [S] 24 Provider-neutral Media Generation Runtime
- [S] 25 Verification / Evaluation Engine
- [S] 26 Causal Repair / bounded Convergence Engine
- [S] 27 Research / Evidence / Citation Engine
- [S] 28 Template / Package / Marketplace system
- [S] 29 Collaboration / Review / Annotation / exact-version Approval
- [S] 30 Catalog / Metadata / Search
- [S] 31 Artifact hashes / signatures / attestations
- [S] 32 Rights / License / Consent Engine
- [S] 33 Compliance / Safety / Policy Packs
- [S] 34 Tenant / Organization / Workspace / Project hierarchy
- [S] 35 Relational State + Object Storage + Search + Cache + Memory architecture

## C. Factories
- [R] 36 Product Factory
- [R] 37 Media Factory
- [R] 38 Web Factory
- [R] 39 Campaign Factory
- [R] 40 Course Factory
- [R] 41 Brand Factory
- [R] 42 Research Factory
- [R] 43 Document Factory
- [R] 44 Audio Factory
- [R] 45 Automation Factory
- [R] 46 App / Tool Factory
- [R] 47 Data / Analytics Factory

## D. Objective Brain
- [R] 48 Cross-Factory Objective Orchestrator

## E. Required shared primitives discovered so far
- [R] CreationRun / StageRun state machine
- [R] Artifact / Asset / Version / Derivative contracts
- [R] ContextLayer / Lock / Override / ConflictReport
- [R] Rule / Violation / Evidence / RepairProposal
- [R] UCTRecord / digest / lineage edges / optional attestation
- [R] PolicyDecision / ApprovalRequest / ActionDigest
- [R] EventEnvelope with id/source/type/version/tenant/correlation/causation/trace/idempotency
- [R] SandboxProfile
- [R] OperatorManifest
- [R] PatternDefinition
- [R] ModelCapability / ModelVersion / EvalSnapshot
- [R] ConnectorManifest / CredentialReference / Scope
- [R] UsageEvent / CostLedger / BudgetPolicy
- [R] CompensationPlan
- [R] Queue / Lease / Heartbeat / Quota
- [R] Checkpoint / ReplayBranch
- [R] AgentRole / CrewPlan / Delegation
- [R] Trace / EvidenceRecord
- [R] Tenant / Workspace / Project / Actor / Role
- [R] RightsRecord / ConsentRecord / LicenseExpression
- [R] ResearchRun / Source / Claim / Evidence / Contradiction / FreshnessPolicy
- [R] VerificationPlan / Validator / Judge / VerificationResult
- [R] Defect / RootCause / RepairAttempt / RegressionResult
- [R] TemplatePackage manifest
- [R] ReviewThread / Annotation / VersionDecision
- [R] CatalogRecord / IndexEvent
- [R] DatasetSnapshot / TrainingRun / ModelArtifact / Promotion
- [R] PolicyPack / RuleBundle / DecisionLog
- [R] Memory tiers: Run / Project / Brand / User / Knowledge

## F. Implementation bake-offs before locking dependencies
- [ ] Durable engine: Temporal vs alternatives / native minimum
- [ ] Sandboxing: gVisor vs Firecracker vs managed sandboxes by workload
- [ ] Model gateway: LiteLLM vs native/provider gateways
- [ ] Model registry/evals: MLflow components vs native contracts
- [ ] Observability: OpenTelemetry adoption depth
- [ ] Lineage: OpenLineage adoption depth
- [ ] Integrity: Sigstore/SLSA integration
- [ ] Search/vector/catalog stack
- [ ] Object storage / content-addressed storage strategy
- [ ] Policy engine: OPA vs native policy layer / hybrid
- [ ] Database tenancy and RLS strategy

## G. Legacy migration
- [ ] Map every extracted MGR Agents concept to KEEP / REDESIGN / RETIRE
- [ ] Build compatibility adapter for MGR Agents
- [ ] Build Create Loco integration adapter
- [ ] Prove parity before removing legacy behavior
- [ ] Migration tests + rollback

## H. Product-level proof
- [ ] Standalone repo installs/builds from clean environment
- [ ] Database migrations from zero
- [ ] End-to-end CINEFORGE run
- [ ] Durable crash/resume proof
- [ ] Approval pause/resume proof
- [ ] UCOS lock conflict proof
- [ ] Continuity violation + repair proof
- [ ] UCT lineage/integrity proof
- [ ] Multi-provider routing/fallback proof
- [ ] Real artifact generation + verification
- [ ] Cross-factory objective proof
- [ ] MGR Agents consumes standalone Creation OS
- [ ] Create Loco consumes/provides capability through stable adapter
- [ ] Security/tenant isolation proof
- [ ] Cost ledger reconciliation proof

## Research counter
48 / 48 canonical categories have now received a BEAST research pass.
Wave 3 factory dossiers are in `research/wave3/`.

Research completion does NOT mean implementation completion. Next gate is specification/bake-off: convert research conclusions into canonical contracts, acceptance tests and dependency decisions, then build vertical slices.


## Specification Gate Status
- Canonical contract specifications created under spec/ for all listed shared primitives.
- State machines documented in architecture/STATE-MACHINES.md.
- 30 product acceptance tests cataloged in architecture/ACCEPTANCE-TESTS.md.
- Dependency/build order defined in architecture/DEPENDENCY-ORDER.md.
- Dependency bake-offs defined in architecture/BAKEOFFS.md; no dependency falsely marked selected.
- First executable vertical-slice bootstrap implemented: TypeScript package, CreationRun/StageRun state transitions, CloudEvents-shaped EventEnvelope types, policy/evidence primitives, canonical ActionDigest, and initial unit tests.
- Bootstrap code is IMPLEMENTED but NOT yet marked TESTED/VERIFIED because connected GitHub writes do not execute npm/typecheck. Runtime proof remains required.


## Wave A/B Implementation Checkpoint
### Wave A executable spine — IMPLEMENTED first vertical slice
- [I] EventEnvelope + in-memory deduplicating event bus
- [I] OperatorManifest + versioned registry
- [I] CreationRun/StageRun runtime state transitions
- [I] PolicyEngine + canonical ActionDigest
- [I] append-only in-memory UsageEvent/CostLedger primitive
- [I] EvidenceStore primitive
- [I] core IDs/digest exports
- [I] contract tests committed
- [I] GitHub Actions CI committed (Node 22, typecheck, tests)
- [ ] Durable engine adapter (bake-off/prototype required)
- [ ] persistent database/event outbox
- [ ] real approval durable pause/resume
- [ ] OpenTelemetry/evidence persistence
- [ ] auth/tenant enforcement beyond types

### Wave B creation truth — IMPLEMENTED first vertical slice
- [I] AssetRegistry + immutable version uniqueness/digest primitive
- [I] UCOS ContextLayer/Lock resolver + blocking hard-conflict report
- [I] Continuity Rule evaluator + Violation output
- [I] UCT issuance + artifact digest verification primitive
- [I] VerificationPlan-style blocking criteria executor
- [I] bounded repair convergence stop primitive
- [I] Wave B contract tests committed
- [ ] persistent Asset/UCT/Context/Violation storage
- [ ] multimodal continuity adapters
- [ ] signed attestations
- [ ] full lineage graph
- [ ] causal root-cause engine
- [ ] real artifact validators

### Test truth
GitHub CI is now configured to execute typecheck + tests on push/PR. Do not mark [T] or [V] until an actual workflow run is observed green.

## BEAST Research Expansion 49–58
Implementation-depth audit expanded the known architecture from 48 to 58 categories rather than hiding missing systems.
- [S] 49 Schema Registry / contract evolution
- [S] 50 Capability Evaluation Registry
- [S] 51 Secret Broker / short-lived credentials
- [I] 52 Artifact Validator Registry (first primitive implemented)
- [S] 53 Dependency & License Resolver
- [S] 54 Experiment / Feature Flag service
- [S] 55 Retention / Deletion Orchestrator
- [I] 56 Provider / Connector Health & Circuit Breakers (first primitive implemented)
- [I] 57 Migration Registry (first primitive implemented)
- [S] 58 Evidence Bundle / Audit Exporter

Research: categories 49–58 received dedicated deep pass in research/DEEP-WAVE-49-58.md. Known-category research coverage is now 58/58 first-pass, while dependency-specific research continues during implementation.

## Big BEAST Wave D/E checkpoint
- [I] Research Ledger with Sources/Claims/Evidence/Contradictions
- [I] Rights/Consent/License expression primitives
- [I] versioned PolicyPack evaluator
- [I] tenant-scoped Catalog search primitive
- [I] tiered MemoryStore primitive
- [I] exact-version Review/Annotation/Decision primitive
- [I] DatasetSnapshot/TrainingRun/ModelArtifact/Promotion primitive
- [I] tested-template package manifest/digest primitive
- [I] AgentRole/CrewPlan/Delegation guard primitive
- [I] SchemaRegistry primitive
- [I] Health/CircuitBreaker primitive
- [I] ValidatorRegistry primitive
- [I] MigrationRegistry primitive

Still not TESTED/VERIFIED until executable CI/runtime evidence is observed.