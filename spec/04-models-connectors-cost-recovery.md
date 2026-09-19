# Models, Connectors, Cost, Recovery

## ModelCapability / ModelVersion / EvalSnapshot
Capability describes modality/task/contract. ModelVersion pins provider/model/revision, license, context, modalities, hardware, quantization, privacy/residency, structured/tool support. EvalSnapshot pins benchmark set/version, metrics, cost, latency, evaluator versions and date. Router selects only versions satisfying policy + capability + current health.

## ConnectorManifest / CredentialReference
Connector: provider, capability mappings, auth type/scopes, operations, pagination, rate limits, webhook support, reconciliation method, health. CredentialReference contains secret-store pointer and metadata only; never secret material.

## UsageEvent / CostLedger / BudgetPolicy
UsageEvent is append-only: run/stage/operator/provider/model, quantity/unit, priceSnapshot, estimated/actual flag. CostLedger aggregates but does not replace events. BudgetPolicy has limits by tenant/project/run/time/provider/capability and action WARN|THROTTLE|REQUIRE_APPROVAL|DENY.

## CompensationPlan
For every side effect classify REVERSIBLE|COMPENSATABLE|IRREVERSIBLE. Plan contains ordered compensation actions, prerequisites, idempotency, stop/escalation rules and evidence. Compensation failure is terminal evidence, not silently swallowed.
