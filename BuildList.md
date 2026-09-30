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
- [I] 36 Product Factory
- [I] 37 Media Factory
- [I] 38 Web Factory
- [I] 39 Campaign Factory
- [I] 40 Course Factory
- [I] 41 Brand Factory
- [I] 42 Research Factory
- [I] 43 Document Factory
- [I] 44 Audio Factory
- [I] 45 Automation Factory
- [I] 46 App / Tool Factory
- [I] 47 Data / Analytics Factory

## D. Objective Brain
- [I] 48 Cross-Factory Objective Orchestrator

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
- [I] Build Create Loco integration adapter
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
- [I] Create Loco capability contract/adapter exists; live Create Loco service consumption still needs end-to-end proof
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
- [I] 49 Schema Registry / contract evolution
- [I] 50 Capability Evaluation Registry
- [I] 51 Secret Broker / short-lived credentials
- [I] 52 Artifact Validator Registry (first primitive implemented)
- [I] 53 Dependency & License Resolver
- [I] 54 Experiment / Feature Flag service
- [I] 55 Retention / Deletion Orchestrator
- [I] 56 Provider / Connector Health & Circuit Breakers (first primitive implemented)
- [I] 57 Migration Registry (first primitive implemented)
- [I] 58 Evidence Bundle / Audit Exporter

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

## BEAST Expansion implementation checkpoint
All categories 49–58 now have first implementation primitives except that production-grade backends/adapters remain open. New code includes Capability Eval suites/runs, SecretBroker grants, dependency/license resolution, deterministic experiments, deletion fan-out with verification, and EvidenceBundle export/digest. Tests committed in test/beast-expansion-49-58.test.ts.

## 1,000+ Task Program
TASK-LEDGER.md establishes a baseline 1,735 granular engineering tasks: 500 kernel, 375 creation substrate, 420 factory, 40 objective orchestrator, 200 BEAST expansion, 200 legacy/adapters/release/security/performance. This is a decomposition/counting framework; tasks are only marked complete when their actual artifact/evidence exists.

## Factory / Objective scaffold checkpoint
- [I] FactoryKind/FactoryRequest/FactoryResult/Factory contracts
- [I] FactoryRegistry
- [I] ObjectivePlan dependency/budget validation
- [I] ObjectiveOrchestrator dependency-driven execution
- [I] downstream blocking after failed factory
- [I] objective orchestration contract tests


## Factory BEAST Wave checkpoint
All 12 factories now have first executable contract/guardrail scaffolds and dedicated tests. These are not full production factories: provider adapters, persistence, real rendering/export/publishing and end-to-end verification remain. Objective Orchestrator is implemented as first dependency/budget/blocking scaffold.


## Big Product Vertical BEAST Wave
- [I] Research→Product→Document vertical pipeline
- [I] evidence propagation from research into product/document
- [I] unsupported research blocks downstream creation
- [I] Product Intelligence market signals/opportunity ranking
- [I] Offer validation
- [I] Export Engine with READY vs NEEDS_ADAPTER truth states
- [I] Product Package integrity/duplicate-path guard
- [I] Distribution manifest validation
- [I] Publishing approval-readiness gate
- [I] Performance measurement primitives
- [I] Improvement proposal signals
- [I] Quality Gate
- [I] ObjectStore/SearchIndex/Telemetry adapter interfaces
- [I] in-memory object/search/telemetry adapters for contract development
- [I] product vertical tests

Production adapters remain required before this vertical can be TESTED/VERIFIED end-to-end with real PDF/DOCX/EPUB/store publishing/search/browser systems.


## Runtime/Persistence BEAST Wave
- [I] Persistence SQL schema for runs/stages/events/assets/UCT/evidence
- [I] Repository interfaces for Creation/Event/Asset/Provenance persistence
- [I] in-memory repository with clone/idempotency/version guards
- [I] CINEFORGE nine-stage engine bootstrap
- [I] ordered stage advancement
- [I] outbox publisher with success-only acknowledgement
- [I] Research SearchAdapter/PageReader/ResearchCollector contracts
- [I] DocumentRenderer contract
- [I] real HTML renderer producing bytes and escaping content
- [I] runtime/persistence contract tests
- [I] CI broadened to every push + pull request + manual dispatch
- [ ] production PostgreSQL adapter
- [ ] production S3-compatible object store adapter
- [ ] real web research/search/page snapshot adapter
- [ ] PDF/DOCX/EPUB renderers
- [ ] durable Temporal/native engine prototype
- [ ] observed CI green evidence


## CI / Test Evidence — VERIFIED 2026-09-22
GitHub Actions run 35687452672 on commit ad8e7e6e92131db7c4ea16a78fdef77fb1d9a0ed completed SUCCESS.
- npm install: PASS
- npm run typecheck: PASS
- npm test: PASS
This upgrades the current committed unit/contract test suite from merely written to executed-green. It does NOT verify production adapters or full product behavior.


## Artifact Trust BEAST Wave — VERIFIED CI
- [I/T] JSON deterministic artifact validator
- [I/T] HTML structure validator
- [I/T] ValidatorRegistry execution runner; missing validator cannot produce VERIFIED
- [I/T] Research page snapshot digest + mutation detection
- [I/T] citation quote presence check
- [I/T] HTML/Markdown/JSON renderer registry
- [I/T] content-addressed object storage wrapper with SHA-256 verification
- [I/T] external publishing operation idempotency ledger
- [V] GitHub Actions run 35688136838: install PASS, typecheck PASS, full committed test suite PASS on commit cb340b6140389638a74fa325f2ea5b4f61f20e97.

Next trust boundary: production DB/object-store adapters, browser-backed research snapshots, PDF/DOCX/EPUB render+validators, durable engine prototype, real external publish reconciliation.


## Production Boundary BEAST Wave — CI GREEN
- [I/T] SQL migration runner transaction/rollback/idempotency
- [I/T] S3-compatible ObjectStore adapter contract
- [I/T] HTTP PageReader protocol restriction/timeout/snapshot digest
- [I/T] PDF/DOCX/EPUB renderer adapters with payload signature guards
- [I/T] PDF + ZIP-container validators
- [I/T] durable workflow prototype wait/signal/resume/complete/cancel
- [I/T] external publish-once + reconciliation
- [I/T] recursive secret redaction
- [V] GitHub Actions run 35689296971 SUCCESS on a88dcda4f8f323fa60723fb4358236e6c8100122

Live PostgreSQL/S3/browser/render-engine/provider integrations remain separate verification gates; deterministic adapter tests do not falsely prove live infrastructure.


## Reliability / Security / Service BEAST Wave — GREEN
- [I/T] IdempotencyStore rejects key reuse with different request digest
- [I/T] TokenBucket rate limiting/refill
- [I/T] exponential retry/backoff with bounded attempts
- [I/T] CreationOSError typed error taxonomy
- [I/T] role/resource permission enforcement with default deny
- [I/T] immutable chained AuditLog with digest verification
- [I/T] SSRF guard denies localhost/private/link-local/credential URLs
- [I/T] all-12-factory default registry + Creation OS bootstrap
- [I/T] idempotent CreationOSService objective execution
- [V] CI initially found a bad audit mutation test; test was corrected to assert immutable audit records, then run 35689816187 passed full install/typecheck/test suite on cd243a671a56064c3fadb2fd23ae09006efda17d.


## Live Infrastructure Preparation Wave — GREEN
- [I/T] current Supabase 2026 security/storage behavior researched before integration design
- [I] private creation_os Postgres/Supabase migration committed
- [I] core runs/stages/outbox/assets/UCT/evidence schema + indexes
- [I] public schema access intentionally avoided for core OS data
- [I] Supabase deployment decision documented: no unrelated connected project was modified
- [I] live integration gates documented for DB/storage/research/render/durable/publishing
- [V] CI run 35690524587 SUCCESS on e996619a79b00c460383afae57af1a46f0b93134

Live DB deployment remains blocked on selecting/creating a dedicated Creation OS database/project. This is an environment decision, not a missing code primitive.


## BEAST Expansion 59–132 — Competitor decomposition / film-VFX / agent-security research
The September 28 Pyxa/Firefly/Creatify/Muse/Bluehost/OpenArt pass was decomposed into independent research tracks instead of treating competitor feature labels as implementation knowledge.

Canonical research matrix: `research/BEAST-CAPABILITY-RESEARCH-MATRIX-2026-09-28.md`.
Deep first-pass dossiers:
- `research/BEAST-CINEMA-VFX-UNIVERSITY-2026-09-28.md`
- `research/BEAST-AD-CREATIVE-UNIVERSITY-2026-09-28.md`
- `research/BEAST-MEDIA-IDENTITY-UNIVERSITY-2026-09-28.md`
- `research/BEAST-AGENT-MCP-SECURITY-UNIVERSITY-2026-09-28.md`

Rules:
- each capability progresses DISCOVERED -> SOURCED -> END_TO_END_READ -> SPECIFIED -> IMPLEMENTED -> TESTED -> VERIFIED;
- datasets require independent rights/license/consent review before training use;
- provider APIs are replaceable adapters, not product architecture;
- film/VFX standards and open repos are universities/adapters subject to bake-off, not blind dependencies;
- app repos receive local research/implementation dossiers while shared contracts remain here;
- MGR-API-MCP is the portable assistant/API/MCP edge and must consume Creation OS domain capabilities rather than duplicate them.

New bake-offs now required before dependency lock:
- OpenUSD scene representation vs MGR-native scene graph + adapter boundary
- OpenTimelineIO editorial interchange adapter
- OCIO/ACES color pipeline depth
- MaterialX material interchange depth
- OpenCue vs Creation OS durable render scheduling boundary
- Camera trajectory stack: deterministic parametric planner vs learned MotionCtrl/CameraCtrl/TriMotion/GenDoP-style adapters
- segmentation/edit stack: SAM2 + Diffusers/ControlNet/IP-Adapter vs managed providers
- sandbox profiles: gVisor vs Firecracker vs managed sandbox
- MCP auth/security conformance against current OAuth 2.1/resource-binding requirements
- C2PA signing/manifest integration with UCT
- ad-performance learning: first-party outcome corpus + channel APIs; public/noncommercial datasets limited by license


## BEAST Backwards-Forwards Wave — 2026-09-29
New deep passes committed:
- [R] Brain / agent evaluation university
- [R] Routing gateway bake-off
- [R] Film/VFX standards deep pass
- [R] Camera-control deep pass
- [R] Media perception/editing deep pass

Architecture decisions from this wave:
- Brain/CoI is a model-independent controller, initially colocated with MGR-API-MCP; do not create another repo yet.
- Creation OS stays the shared internal creation/control-plane engine.
- Create Loco stays a distinct user-facing visual/web reconstruction product that consumes Creation OS.
- Product repos remain separate unless lifecycle/deployment/release needs truly converge; unify through contracts/services, not repo count.
- Gateway infrastructure is a bake-off: MGR retains provider/cost/eval/policy truth while TensorZero/LiteLLM/Vercel/HF are candidate adapters rather than reimplementing every gateway feature.
- Film standards are interoperability universities/adapters, not automatic core dependencies.
- Specialized perception/camera models can serve narrow capabilities; frontier models remain valid escalation providers where smaller/open models fail MGR acceptance tests.

New proof gates:
- [ ] Brain protected tool-use eval suite
- [ ] Brain long-term memory eval suite
- [ ] Brain baseline vs Qwen3-8B pilot comparison
- [ ] TensorZero/LiteLLM/managed gateway bake-off
- [ ] OTIO export/import adapter prototype
- [ ] OCIO/ACES color metadata/transform prototype
- [I] CameraTrajectory/SceneGraph/ShotIntent contracts + validators; deterministic planner/renderer adapters still open
- [R] SAM2-style ObjectTrack -> EditOperation prototype


## Current implementation additions — 2026-09-29
- [I] ProviderCapabilityRegistry with source/date/confidence/rights/health/status.
- [I] commercial routing fails closed without explicit commercial-use clearance.
- [I] provider freshness gates can reject stale capability snapshots.
- [I] Create Loco stable reconstruction capability adapter + contract tests.
- [I] SceneGraph / WorldVersion / CameraTrajectory / ShotIntent contracts + structural validators.
- [I] CreativeDNA / ProductKnowledgeObject / PerformanceObservation contracts.
- [I] sandbox policy expanded to tenant isolation, egress, scoped secrets and persistence.
- [R] Forward discovery wave: TensorZero, modern agent sandboxes, World Labs/Marble, Runway Aleph, ad-performance category.

## Functional backwards research — owner correction 2026-09-29
- [S] Avatar/Living Being decomposition: 40 child research questions and acceptance targets in research/AVATAR-FUNCTION-RESEARCH-2026-09-29.md; not 40 completed studies.
- [R] Narrow VRM expression-rule and Rhubarb timing-format review tied to actual iKickItz source; three defects reproduced, repair pending iKickItz preflight.
- [ ] Deepen every child path with versions, rights, implementations, failure modes and measured acceptance even when code already exists.
- [ ] Preserve product-local canon/permissions and ordinary runtime behavior; extract shared creation machinery only after contract/parity evidence.

## Backwards–Forwards avatar admission research — 2026-09-29
- [R] AF-06/11–15 narrow shared-engine asset admission study: actual byte digest, immutable versions, staged concept/turnaround/rig/performance proof, owner approval and glTF skin/morph boundaries. See research/AVATAR-ASSET-ADMISSION-2026-09-29.md. This does not mark the 40 child paths or legacy 74 tracks complete.
- [ ] Build actual-byte/version/evidence admission contract and then run real model/rig/mobile acceptance. Existing registry and continuity stubs are not those proofs.


## Rival Reaper vertical slice — 2026-09-29
- [I] audited five-team draw engine with household/gender/size constraints and random tie-break
- [I] Blackout Krew exclusion by data-boundary design
- [I] draw receipt fields for eligible/excluded teams and random unit
- [I] zero-build host/public visual prototype with three-yank hidden-ink ticket reveal
- [I] fake-roster 45-player demo targeting 9/9/9/9/9
- [I] unit tests authored for balanced fill, uniqueness and support exclusion
- [R] MotionSites prompt/media workflow researched and ADAPT disposition recorded
- [ ] execute typecheck/tests and record evidence
- [I] CSPRNG draw source + tamper-evident chained receipt hashes
- [I] in-memory snapshot/restore contract for crash recovery; durable persistence still open
- [I] encrypted atomic file persistence + reload path across local process restart; browser/runtime rehearsal still required
- [I] authenticated host API/screen + read-only arena screen + SSE synchronization
- [I] private roster import/validation + Blackout exclusion; never commit real family roster to public repo
- [ ] approved badge/media integration + projector/mobile visual verification

- [R] 21st.dev unified MCP/Codex workflow researched; ADAPT for UI primitives while preserving MGR draw authority

### Rival Reaper completion denominator (10 gates)
1. [I] draw/balance engine
2. [I] CSPRNG + audit receipt chain
3. [I] private roster boundary + Blackout exclusion
4. [I] encrypted persistence + restore implementation
5. [I] authenticated host + read-only arena realtime implementation
6. [I] staged ticket interaction prototype
7. [ ] executed typecheck/unit/runtime proof
8. [ ] synchronized staged reveal + crash/reload rehearsal
9. [ ] final MotionSites/21st/Codex visual/audio/accessibility skin
10. [ ] private 45+ roster rehearsal + projector/mobile verification + audit export

Implementation coverage: 6/10 gates materially implemented. Production VERIFIED coverage remains lower until gates 7–10 execute with evidence.
