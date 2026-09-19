# Dependency Order / Build Waves

## Wave A — executable spine
A1 canonical IDs/version/tenant primitives
A2 EventEnvelope
A3 OperatorManifest + registry
A4 CreationRun/StageRun state machine
A5 durable execution adapter
A6 Trace/Evidence
A7 PolicyDecision/Approval/ActionDigest
A8 Usage/Cost
Acceptance: run a no-op operator through CINEFORGE skeleton with trace/cost/policy evidence and crash-safe resume.

## Wave B — creation truth
B1 Asset/Version/Derivative
B2 UCT/lineage/digest
B3 ContextLayer/Lock resolver
B4 Continuity Rule/Violation
B5 VerificationPlan
B6 Defect/Repair
Acceptance: create artifact version, resolve locks, detect seeded violation, repair, verify, reconstruct lineage.

## Wave C — external execution
C1 SandboxProfiles
C2 Connector SDK/Credentials
C3 Model registry/router/evals
C4 queues/workers/quotas
C5 compensation
Acceptance: execute one model/tool/connector through policy+sandbox+cost+verification; inject failures.

## Wave D — knowledge/governance
D1 ResearchRun/evidence
D2 Rights/Consent/License
D3 PolicyPacks
D4 Catalog/Search
D5 Tenant/Workspace/Project
D6 storage/memory
Acceptance: tenant-safe research artifact with sources/rights/catalog retrieval and policy proof.

## Wave E — collaboration/training/templates
E1 review/annotations/version decisions
E2 dataset/training/model promotion
E3 template package/publish/install
E4 checkpoint/replay branches
E5 agent/crew/delegation
Acceptance: versioned reviewed template containing a bounded crew workflow; replay branch and promote evaluated model.

## Wave F — factories
Implement factory contracts on shared substrate: Research first, Document/Automation, Product/Brand, Media/Audio, Web/App, Campaign/Course, Data/Analytics.

## Wave G — Objective Orchestrator
ObjectivePlan + work breakdown/dependency DAG + factory contracts + integration gates + budgets/approvals + objective acceptance evidence.
