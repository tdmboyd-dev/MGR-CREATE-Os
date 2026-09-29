# Native vs Provider Decision — 2026-09-28

## Recommendation
Do not “add Bluehost/Creatify/OpenArt/Pyxa” as product architecture. Build MGR-native orchestration, contracts, data, identity, rights, memory, routing, verification and feedback. Add external services only as replaceable adapters when they offer an API/MCP/capability whose cost/quality beats building raw inference.

## Must be MGR-native
- Capability registry/router/JEV decision boundary
- Cost/usage ledger and budgets
- Asset/version/lineage
- identity/canon/brand/voice locks
- Dataset QA and eval/promotion
- CreativeDNA/ProductKnowledge/Campaign performance schema
- scene/world/camera/timeline contracts
- rights/consent/C2PA/UCT
- Privacy Firewall
- Action Sentinel/approval/receipts
- durable Task/Job/reconciliation
- memory and first-party learning corpus
- MCP/API contracts

## Prefer standards/open adapters
OpenUSD, OTIO, OCIO/ACES, MaterialX, EXR/OIIO, VDB, C2PA, OpenTelemetry, MCP, OAuth libraries, Temporal-style durable engine, gVisor/Firecracker, Diffusers/ComfyUI where bake-offs support them.

## Optional provider adapters
Firefly, fal, Replicate, OpenArt MCP, Creatify APIs, Meta/Muse APIs when mature, direct model providers, gateways. No application may require one provider unless an owner-approved product decision explicitly makes it exclusive.

## Avoid
Consumer-account browser automation to bypass API limits; “unlimited” assumptions; copying competitor proprietary datasets/assets; hard-coded stale pricing/quality scores; duplicating routers/vaults/memory systems per app.
