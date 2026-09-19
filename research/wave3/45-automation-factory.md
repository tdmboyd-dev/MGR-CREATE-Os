# 45 Automation Factory — BEAST RESEARCH WAVE 3
Universities: Temporal durable workflows, n8n, Activepieces, LangGraph, event-driven architecture.
Architecture: Intent→AutomationSpec→typed Trigger/Action graph→policy/dry-run→durable execution→retries/approval/compensation→observability→version/replay.
Required: connectors, secret refs, idempotency, timeouts, schedules/events/webhooks, subflows, human gates, rollback, rate limits, versioning, template package.
Failure: duplicate side effects, provider outage, stale credential, partial success, infinite loop, missed schedule, unreconciled external state.
Verification: fault injection, restart recovery, replay, duplicate-event and side-effect reconciliation.
