# Queues, Checkpoints, Agents, Observability, Tenancy

## Queue / Lease / Heartbeat / Quota
Queue keyed by capability/resource class. WorkItem has priority, tenant, resource needs, notBefore, attempts, deadline. Lease has worker, expiry and fencing token. Heartbeat renews lease. Quota controls concurrency/rate/cost. Expired lease may requeue only with idempotency safeguards.

## Checkpoint / ReplayBranch
Checkpoint pins run state, stage outputs, context/model/operator versions and event-history position. Replay never repeats recorded external side effects. ReplayBranch creates new run lineage from checkpoint with explicit overrides.

## AgentRole / CrewPlan / Delegation
AgentRole: purpose, allowed tools/operators, context policy, output schema, budget, termination, evidence requirements.
CrewPlan: roles, objective, rounds, decision protocol, disagreement policy, synthesizer.
Delegation: parent/child task, scope, budget, deadline, return schema. Cycle detection and max depth mandatory.

## Trace / EvidenceRecord
Trace IDs propagate objective→run→stage→operator/model/tool→artifact. EvidenceRecord links acceptance criterion to method, observed result, raw artifact/log/measurement and verifier version. Sensitive prompt/content capture is policy controlled.

## Tenant / Workspace / Project / Actor / Role
Tenant owns isolation boundary. Workspace organizes teams/resources. Project scopes creations. Actor may human/service/agent. Role grants permissions; connector scopes and approval authority are separate. Tenant context is mandatory on DB/search/cache/storage/jobs/events/traces.
