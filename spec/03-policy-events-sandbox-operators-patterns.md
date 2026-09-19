# Policy, Events, Sandbox, Operators, Patterns

## PolicyDecision / ApprovalRequest / ActionDigest
PolicyDecision: id, actionType, actor, resource, policyPackVersions, outcome ALLOW|DENY|REQUIRE_APPROVAL|DRY_RUN, reasons/evidence, decisionDigest.
ActionDigest hashes canonical action payload + target + relevant version IDs + max spend where applicable.
ApprovalRequest binds ActionDigest, preview, risk, approvers/quorum, expiry, revocation, status. Payload change invalidates approval.

## EventEnvelope
CloudEvents-compatible core: specversion, id, source, type, time, subject?, datacontenttype?, data; Creation extensions: schemaVersion, tenantId, workspaceId, actorId, correlationId, causationId, traceId, idempotencyKey, uctRefs. Consumers must dedupe source+id/idempotency.

## SandboxProfile
id/version, isolationClass, runtime, image/environment, CPU/RAM/GPU, filesystem policy, network/egress policy, secretRefsAllowed, tool allowlist, mounts, timeout, persistence, cleanup, telemetry. Risk tier chooses minimum isolation.

## OperatorManifest
id/version, capability, inputSchema, outputSchema, sideEffectClass NONE|INTERNAL|EXTERNAL_REVERSIBLE|EXTERNAL_IRREVERSIBLE, permissions, sandboxProfile, timeout, retry, idempotency, costEstimator, verifier, providerAdapters, deprecation.

## PatternDefinition
id/version, semanticType, graphTemplate, allowed nodes/edges, cancellation, failure propagation, compensation, bounded-loop rule, acceptance suite. Initial patterns: sequence, parallel, fanout/fanin, map/reduce, race, fallback, retry, approval, compensation, bounded-loop, human-review, child-workflow, event-wait, timer-wait, batch, streaming/service.
