# 47 Data / Analytics Factory — BEAST RESEARCH WAVE 3
Universities: PostHog-style product analytics/experiments/replay; warehouse/BI; event schemas; OpenTelemetry; statistical experimentation.
Architecture: EventContracts→Ingestion→Quality/dedupe→Semantic metrics→Funnels/Cohorts/Retention/Paths/Attribution→Experiments→Alerts/Diagnosis→ImprovementSignal.
Required: identity/session model, metric definitions/versioning, internal/bot filters, source tracing, flags/experiments, replay links, cost/usage telemetry, factory KPIs.
Failure: vanity metrics, duplicate events, denominator errors, attribution overclaim, experiment peeking, correlation-as-causation, stale dashboards.
Verification: known-input reconciliation, contract tests, freshness, experiment guardrails and trace-to-source.
