# Standalone Creation OS ↔ MGR 3D Forge (2026-10-31)

Decision: MGR Creation OS and MGR 3D Forge are independent standalone creative products. Neither must launch the other for a basic job. MGR-API-MCP is the governed shared external bridge. MGR-ONE/Tevin and human-facing apps are consumers of these services.

**Direct 3D path:** Tevin or another application → MGR-API-MCP (verified actor, tenant, scope) → MGR 3D Forge durable job and vault → source-verified artifact hash/receipt → caller. No mandatory Creation OS.

**Cross-factory path:** Creation OS → approved orchestration plan for 3D + audio + video + publishing → appropriate MGR-API-MCP tools / service contracts → Forge owns its 3D jobs; the other factories own theirs. Creation OS must join the resulting evidence and continuity state, not reimplement Blender, geometry, catalog or asset storage.

**Current verified/implemented bounds:** Creation OS has 12 registry factories, objective/queue/approval/storage and verification contracts and 122 passing unit tests. Its `src/factories/media-factory.ts` is not an actual rendered-media provider; historically it could claim a 3D artifact using a generated reference. A 3D request now BLOCKS until a genuine Forge artifact/independent verification receipt exists. Non-3D media placeholder behavior is preserved for separate audit, not production certified.

**Acceptance for future 3D factory adapter:** scoped tenant+actor; exact project and source asset identity; permitted action; source/license decisions; budget ceiling; stable idempotency key; `tools:execute` or caller equivalent; real Forge-created GLB/scene hash and blob path; verification criteria and results; cancel/timeout/restart reconciliation. Reject reference-only success, cross-tenant data, unsupported provider/paid calls, and stale approval.

The Forge public Source Atlas and private vault are **not** Creation OS mirror candidates. Creation OS stores references, legal/provenance decisions and outcome receipts but does not duplicate binary ownership. A separate Forge public API service and production authenticated transport remain open; no hosted Tevin job claimed.

Project truth: `HANDOFF.md` is this repo's one living resume record. The older `WORK-STATE.md` is historical chronology and links here.
