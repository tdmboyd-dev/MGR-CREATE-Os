# BEAST Agent / MCP / Security University — First Deep Pass

## MGR-API-MCP finding
The repo is correctly honest: it is a research/build home, not a built assistant or verified MCP service. Preserve that truth. It should become the portable API/MCP edge and assistant task engine, while Creation OS remains the shared creation/control-plane substrate.

## MCP security baseline
Current MCP authorization follows OAuth 2.1 conventions for HTTP transports. Required research/implementation includes protected-resource metadata, authorization-server discovery, PKCE/public-client handling, audience/resource binding, short-lived credentials, refresh rotation, secure token storage and explicit prevention of token passthrough/confused-deputy behavior.

## Agent sandbox
A normal container is not enough for untrusted agent execution.
- gVisor interposes a userspace application kernel and reduces direct host-kernel exposure.
- Firecracker microVMs provide stronger VM-style isolation; production use requires the jailer or equivalent constraints.
Run a bake-off by workload: browser, shell/code, media tool, trusted internal worker. Do not force one sandbox profile on all work.

## Independent Action Sentinel
The reasoning agent proposes; it does not authorize itself.
Pipeline: proposed action -> deterministic policy/risk classification -> exact ActionDigest -> approval if required -> scoped short-lived capability -> executor -> receipt -> reconciliation.
Network egress, filesystem paths, secrets, payments, publishing and destructive operations are explicit capabilities.

## Durable execution
Temporal is the reference university for crash-resilient durable workflow state. Compare against native/minimal alternatives before locking. Cancellation, retries, timeouts, idempotency, compensation and unknown external state need explicit state machines.

## Observability
Use OpenTelemetry-compatible trace/metric/log concepts so Task -> Job -> ToolCall -> ProviderCall -> Artifact -> Approval -> Receipt can be reconstructed.

## MGR-API-MCP build boundary
Own: Task/Job engine, provider/tool contracts, memory, research/coding flows, approval, receipts, budgets, schedules, reconciliation, API, MCP server/client adapters.
Reuse/adapter: OAuth libraries, MCP SDK, sandbox runtimes, durable engine, DB/vector/object stores.
Do not duplicate Creation OS media/asset/rights/continuity logic; call it as capabilities.
