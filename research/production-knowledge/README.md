# Production research for Creation OS

This directory embeds the production research collected for MGR Production Brain. The canonical queue remains ../production-research-queue-2026-10-01.json. The plugin contains a dated snapshot; it does not own project assets, locks or approvals.

## Use from the repository root

```text
node research/production-knowledge/query.mjs status
node research/production-knowledge/query.mjs search temporal object removal
node research/production-knowledge/query.mjs show PR-CAMERA-04
node research/production-knowledge/query.mjs plan PR-CAMERA-04 PR-COMPOSITE-01
node research/production-knowledge/query.mjs ledger
npm run test:production-research
```

Node 24 was used for the isolated validation. The restricted authoring host requires --test-isolation=none because child spawning is denied. The module itself does not spawn processes or contact providers.

For native application code, import ProductionCatalog from ../../src/knowledge/production-catalog.mjs and construct it with parsed catalog.json. search retrieves candidates; get returns complete scoped packets; plan returns dependency-ordered research-to-build work. No execution or verification authority is granted.

ledgerRecords returns records compatible with the existing ResearchLedger. Add sources, then claims, then evidence to an appropriately scoped ledger. SUPPORTS refers only to the exact authored finding. Design decisions use CONTEXT. Capability readiness is separate and must not be inferred from ResearchFactory success.

The existing ResearchFactory currently succeeds on empty claims even with unanswered questions, and treats arbitrary claim source IDs as supporting evidence. These behaviors were reproduced against fetched source. They remain queued for repair; this module does not change that factory or existing product-pipeline behavior.

## Scope and evidence

75 child tracks, 18 category packets, 20 source records and 15 scoped findings. A packet can supply shared context to several children without completing them. All child researchComplete flags remain false. New selected reads cover SAM 2 state, ProPainter constraints/license, VTracer API/license, Blender keyframes and EEVEE-only Shader-to-RGB, VBench modes, OpenEXR, OCIO, OTIO adapters and Photoshop action errors. Previous asset/camera/simulation/editorial and competitor dossiers are linked from sources.

The repository has a callable research module and CLI; no live Creation OS application pipeline, provider connector, model inference, DCC rendering or complete site builder is installed by this change. Tests cover retrieval, graph/evidence integrity, freshness and ownership. Full repository typecheck/tests and external output benchmarks remain separate gates.

Do not mark research done from the number of files, packets, sources or passing catalog tests. Use OPEN-WORK.json and each child's nextAction/acceptanceCriteria.
