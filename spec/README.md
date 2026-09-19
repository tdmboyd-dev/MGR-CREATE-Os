# Creation OS Specification Gate
This directory is canonical specification, not brainstorming.

## Invariants
1. Every object has stable ID, tenant/workspace scope where applicable, schemaVersion, createdAt and provenance link.
2. State changes happen through explicit commands/events; no hidden mutation.
3. External side effects require idempotency and reconciliation.
4. Consequential actions pass PolicyDecision before execution.
5. Artifacts are immutable versions; aliases/pointers may move.
6. Research evidence and verification evidence are first-class.
7. Providers/models/connectors are adapters behind capability contracts.
8. Durable execution owns retries/checkpoints; agents do not improvise reliability.
9. Cross-tenant references are denied unless an explicit sharing contract exists.
10. VERIFIED requires acceptance criterion + executed check + observed evidence.

## Canonical lifecycle
ObjectivePlan → CreationRun → StageRun → Operators/Agents → Artifacts → Verification → UCT/Lineage → Audit/Improve.

## Spec groups
01 runtime; 02 assets/context/continuity/provenance; 03 policy/events/sandbox/operators/patterns; 04 models/connectors/cost/recovery; 05 queues/checkpoints/agents/observability/tenancy; 06 rights/research/verification/repair/templates/review/catalog/training/policy.
