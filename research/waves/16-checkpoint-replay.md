# checkpoint replay — RESEARCHED

Legacy stageResults are not replay semantics. Study LangGraph checkpoints/time travel and Temporal event-history replay. Separate business state from immutable execution history; nondeterministic side effects must not repeat. Branching creates new lineage. Verify deterministic replay, code-version migration and branch provenance.

BEAST disposition: ADAPT. Implementation remains separate from research status.
