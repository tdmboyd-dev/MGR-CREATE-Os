# Runtime Contracts

## CreationRun
Fields: id, schemaVersion, tenantId, workspaceId, projectId?, objectiveId?, pipelineId, pipelineVersion, trigger, inputRefs[], status, currentStageId?, priority, budgetPolicyId?, contextSnapshotId?, startedAt?, completedAt?, cancelRequestedAt?, failure?, traceId, createdAt.
Status machine:
QUEUED→PLANNING→RUNNING↔WAITING_APPROVAL|WAITING_EVENT|WAITING_RESOURCE; RUNNING→VERIFYING→COMPLETED; any active→CANCELLING→CANCELLED; recoverable→RETRYING→RUNNING; terminal failure→FAILED; compensation path→COMPENSATING→COMPENSATED|COMPENSATION_FAILED.
Invariants: terminal state immutable except administrative annotation; one logical side effect per idempotency key; pipeline version pinned for run.

## StageRun
Fields: id, creationRunId, stageKey, attempt, status, inputRefs, operatorRefs, agentRefs, startedAt, heartbeatAt?, completedAt?, checkpointId?, outputRefs, verificationPlanId?, approvalRequestId?, usageRefs, error.
Stage states: PENDING→READY→RUNNING→SUCCEEDED|FAILED|WAITING_*|CANCELLED; FAILED→RETRY_SCHEDULED→READY within policy.
CINEFORGE stage keys: TRIGGER, UCOS_READ, PLAN, BUILD, CONTINUITY_CHECK, APPROVAL, EXECUTE, VERIFY, AUDIT. Custom pipelines may extend but cannot silently reorder required gates.

## Acceptance
Crash after an external side effect and before stage commit must not duplicate the side effect on resume. A run paused for approval must resume exact pinned state. Cancellation propagates to child work and records unresolved irreversible effects.
