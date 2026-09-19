# MGR Agents → Creation OS Extraction Manifest

## Rule
This manifest tracks the physical extraction of Creation OS evidence from MGR Agents. Copied does not mean verified.

## Extracted architecture/code
- legacy/mgr-agents/src/lib/db/schema/creation-os.ts
- legacy/mgr-agents/src/lib/db/schema/approvals.ts
- legacy/mgr-agents/src/lib/db/schema/brand-face.ts
- legacy/mgr-agents/src/lib/db/schema/training.ts
- legacy/mgr-agents/src/lib/db/schema/hybrid.ts
- legacy/mgr-agents/drizzle/add_approval_gateway.sql
- legacy/mgr-agents/drizzle/add_hybrid_descriptors.sql
- legacy/mgr-agents/drizzle/0001_training_pipeline.sql
- legacy/mgr-agents/drizzle/0002_autopilot_persistence.sql
- legacy/mgr-agents/drizzle/0003_foundation_repair.sql
- legacy/mgr-agents/docs/architecture/IKICKITZ_CHARACTER_LOCKS.md
- legacy/mgr-agents/docs/architecture/MGR_AGENTS_FULL_SPEC.md
- legacy/mgr-agents/docs/architecture/MGR_AGENTS_PLATFORM_BRIEF.md
- legacy/mgr-agents/BRAIN_TRAINING_PLAN.md

## UCOS character-lock corpus
The source repo contains UCOS YAML lock files under public/36Agents/*/config/. Extraction is in progress. These files demonstrate that UCOS concepts were applied to agent character identity, but they remain legacy evidence until their runtime consumers are traced and verified.

## Known source-repo evidence discovered
- dedicated Creation OS schema
- approval gateway schema + migration
- hybrid descriptor schema + migration
- training schema + migration
- UCOS character lock YAMLs
- iKickitz lock architecture
- broader MGR Agents architecture/spec documents
- persistence/foundation migrations potentially touching shared runtime assumptions

## End-to-end audit still required
For every legacy capability trace:
definition/schema → migration → runtime/domain service → route/event/worker → UI/client → tests → real execution → observed output.

## Extraction categories still to inspect
1. Creation graph runtime
2. CINEFORGE orchestration runtime
3. UCOS read/lock resolution
4. continuity detection and repair
5. UCT issuance/lookup/lineage
6. crew simulation / Clash reuse
7. approval interception and resume
8. signal/event bus
9. sandbox/operator registry
10. patterns/workflow shapes
11. model/tool routing
12. cost forecasting/accounting
13. rollback/compensation
14. training router and adapter activation
15. brand/face/voice lock consumers
16. media generation consumers
17. UI/routes/API
18. tests
19. migrations and deployment state
20. background workers/queues/schedulers
21. marketplace/template concepts
22. MGR Agents-specific coupling to remove
23. security/secrets/permissions
24. observability/audit evidence
25. external provider assumptions
26. dead code/placeholders/simulation/mock paths
