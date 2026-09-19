# durable orchestration — RESEARCHED

Internal CINEFORGE has stages/run rows but no proven executor. Study Temporal, LangGraph, n8n. Need crash-safe resume, deterministic orchestration separated from nondeterministic side effects, idempotent external calls, durable pause/cancel/retry/compensation. ADAPT a provider-neutral CreationRun/StageRun contract; evaluate Temporal substrate + agent graph layer. Verify by killing workers mid-run and proving safe resume without duplicate effects.

BEAST disposition: ADAPT unless implementation evaluation proves ADOPT or REJECT.
