# Use the embedded production research

This release embeds 75 child tracks under 18 categories, scoped findings, primary-source references and sixteen-field category packets. Child acceptance criteria, dependencies and unresolved research are retained. Eighteen packets do not mean eighteen complete categories. The catalog explicitly reports zero fully research-ready child capabilities.

Run these commands with the actual installed skill root:

```text
node <skill-root>/scripts/research.mjs status
node <skill-root>/scripts/research.mjs search camera collision
node <skill-root>/scripts/research.mjs show PR-CAMERA-04
node <skill-root>/scripts/research.mjs plan PR-CAMERA-04 PR-COMPOSITE-01
node <skill-root>/scripts/research.mjs ledger
```

Search uses deterministic keywords. The host agent interprets the user's natural language, selects relevant track IDs and reads their packets and source scopes. Use several concrete queries when a brief spans categories. A missing result means broaden the research, not invent a capability.

`plan` expands dependencies in order and emits candidates, missing knowledge, acceptance tests and blockers. It never executes a build, authorizes spending or changes Creation OS status. `ledger` returns source/claim/evidence records compatible with Creation OS ResearchLedger. Only narrow findings have support relations; suggested architectures remain context. Existing ResearchFactory success is not a production-readiness gate.

The embedded snapshot points to Creation OS's research branch. Compare against canonical research before updating project decisions. Refresh provider schemas/prices at execution and inspect selected library versions before admission. Do not treat a dated source snapshot as current provider capability.

Read [research-dossier.md](research-dossier.md) for the earlier asset, camera, simulation and editorial implementation audit, and [competitor-research.md](competitor-research.md) for provider/planning findings. These are scoped evidence, not claims of blockbuster-quality production.

Current external gates include authenticated provider tool discovery/canaries, complete DCC/model source studies, licensed execution runtimes, real media/scene round trips, browser journeys and matched output benchmarks. Continue independent work when any one gate is unavailable.
