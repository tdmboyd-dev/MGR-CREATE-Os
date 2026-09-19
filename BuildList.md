# BuildList.md — MGR Creation OS

This is the canonical implementation list. Research explains what to build; this file tracks the build itself.

## Status
[ ] QUEUED  [R] RESEARCHED  [S] SPECIFIED  [I] IMPLEMENTED  [T] TESTED  [V] VERIFIED

## A. Creation OS Kernel
- [R] 01 Durable Orchestrator / CINEFORGE runtime
- [R] 02 Creation Graph (separate semantic, execution and lineage graphs)
- [R] 03 UCOS layered Context Resolver
- [R] 04 Continuity Engine with explainable rule evidence
- [R] 05 UCT provenance + artifact lineage + integrity
- [R] 06 Approval / Policy Gateway with exact-action digest binding
- [R] 07 Event / Signal Bus
- [R] 08 Sandbox Runtime and risk-tiered SandboxProfiles
- [R] 09 Operator / Capability Registry
- [R] 10 Pattern / Composition Engine
- [R] 11 Model / Provider Capability Router
- [R] 12 Tool / Connector SDK and registry
- [R] 13 Cost / Usage / Budget Ledger
- [R] 14 Rollback / Compensation Engine
- [R] 15 Durable Worker / Queue / Scheduler layer
- [R] 16 Checkpoint / Replay / Branching
- [R] 17 Agent / Crew Runtime
- [R] 18 API + SDK + Events + Webhooks + MCP adapter
- [R] 19 Observability / Trace / Evidence system
- [R] 20 Security / Auth / Permissions / Secrets / Tenancy foundation

## B. Creation Substrate
- [R] 21 Asset Registry / immutable Versions / Derivatives
- [R] 22 Identity locks: face, body, anatomy, wardrobe, voice, character, logo, brand, canon
- [R] 23 Dataset / Training / Model / LoRA / Adapter lifecycle
- [R] 24 Provider-neutral Media Generation Runtime
- [R] 25 Verification / Evaluation Engine
- [R] 26 Causal Repair / bounded Convergence Engine
- [R] 27 Research / Evidence / Citation Engine
- [R] 28 Template / Package / Marketplace system
- [R] 29 Collaboration / Review / Annotation / exact-version Approval
- [R] 30 Catalog / Metadata / Search
- [R] 31 Artifact hashes / signatures / attestations
- [R] 32 Rights / License / Consent Engine
- [R] 33 Compliance / Safety / Policy Packs
- [R] 34 Tenant / Organization / Workspace / Project hierarchy
- [R] 35 Relational State + Object Storage + Search + Cache + Memory architecture

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
