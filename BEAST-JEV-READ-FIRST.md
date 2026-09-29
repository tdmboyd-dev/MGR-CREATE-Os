# BEAST + Jev Read First — MGR Creation OS
Canonical operating method: `tdmboyd-dev/mgr-perfect-skill/BEAST.md`.

Creation OS owns the reusable MGR DecisionEngine contract; BEAST governs Creation OS and every other repo.

## Current verdict
The interface-first architecture is correct, but several adapters/verification modules are still thin scaffolding. Treat them as foundations, not proof of production maturity.

## Implemented here
A provider-neutral `src/decision/` layer now exists with typed bounded questions, confidence-based provider fallback, a Jev adapter, and unit tests. `createCreationOS()` exposes the DecisionEngine.

## Lifecycle placement
TRIGGER: intent/risk/capability classification.
PLAN: factory/agent/model/tool routing.
BUILD: cost-quality lane selection.
CONTINUITY_CHECK: conflict/missing-context triage.
APPROVAL: risk classification only; deterministic policy decides approval.
EXECUTE: provider/fallback routing.
VERIFY: bounded rubric judgments can assist; executed evidence proves status.
AUDIT/IMPROVE: defect/cost/regression prioritization.

Never let Jev become the source of truth for permissions, approvals, money, calculations, irreversible state or VERIFIED status.


## BEAST v2.1 synchronization rule
Canonical operating method: `tdmboyd-dev/mgr-perfect-skill/BEAST.md` v2.1.
This repo extends that doctrine; it does not fork a competing BEAST.
Compound capabilities must be decomposed into research tracks, substantial work should run in Backwards-Forwards batches, proven defects should be repaired in the same wave when safe, and architecture/research truth must be embedded in the owning repo rather than left only in chat.
New-repo template: `tdmboyd-dev/mgr-perfect-skill/BEAST-NEW-REPO-BOOTSTRAP.md`.
