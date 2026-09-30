# Jev Read First — MGR Creation OS

Creation OS owns the reusable MGR DecisionEngine contract.

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
