# Production knowledge catalog contract

Creation OS owns the canonical production research queue. The plugin ships a dated, digestable snapshot for offline retrieval. Neither copy grants execution or verification authority.

The catalog contains sources with read scope and retrieval date, scoped findings with explicit supporting source IDs, research packets with all sixteen BEAST fields, and the original child tracks/dependencies. Unknown fields and incomplete research remain explicit. A packet can cover several related tracks without completing those tracks. Existing source and runtime evidence is referenced rather than replaced.

The native module validates unique IDs, referential integrity, dependency acyclicity, source dates, the sixteen fields, and scoped findings. Search is deterministic lexical retrieval over user intent and research text, with IDs and exact capability names preferred. Retrieval is not semantic inference. The host agent interprets natural language and must inspect the returned findings and unknowns.

A build handoff expands selected tracks into a topological dependency order. It contains native implementation candidates, acceptance tests, research gaps and evidence. It cannot schedule, authorize, execute or promote a capability. Readiness depends on explicit completed research and current source coverage; existing implementation/verification claims are displayed independently. A source URL alone cannot set researchReady. Unknown and stale evidence fail closed.

Ledger export emits source/claim/evidence records compatible with the existing Creation OS ResearchLedger, plus a separate capability state list. Only the narrow authored finding text receives its explicit SUPPORTS relation. Category names, queued work and suggested implementations are never promoted into supported facts. A Creation OS adapter constructs a fresh existing ledger from these records; the old ResearchFactory is not used as a readiness gate.

Acceptance: real catalog integrity; exact-ID retrieval; unrelated queries return no hits; dependency ordering and cycle rejection; source freshness; empty/malformed input; incomplete packet blocking; collision-free ledger references; round-trip immutability; local installed CLI execution; uploaded release readback. Provider/DCC credentials and real output evaluation remain outside this module.
