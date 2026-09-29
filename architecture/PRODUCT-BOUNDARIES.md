# Product Boundaries — Creation OS / Create Loco / API-MCP / Brain

## Creation OS
Internal shared creation/control-plane engine.
Owns creation runs, factories, assets, identity/continuity, provenance, rights, media capability routing, verification, cost, durable production and cross-factory orchestration.

## Create Loco
User-facing visual/web reconstruction and repair product.
Owns screenshot/reference understanding, visual IR, web composition, browser visual verification and causal visual repair.
Consumes Creation OS media/asset/provider capabilities.

Do not merge Create Loco into Creation OS right now. They have different product responsibilities and deployment surfaces. Share contracts/services instead.

## MGR-API-MCP
External assistant/API/MCP/task edge.
Owns Task/Job-facing contracts, MCP/API transport, schedules, receipts and portable assistant workflows.
Calls Creation OS; does not duplicate factories/media/identity.

## Brain/CoI
Shared decision/controller subsystem, initially living with MGR-API-MCP.
Decides, retrieves and plans. It does not grant permission and does not render media.

## MGR Agents
Business automation/agent workforce product.
Consumes Brain/API-MCP and Creation OS instead of owning canonical copies of either.

## Merge rule
Merge repos only when two codebases truly share lifecycle, deployment, ownership and release cadence. Similar concepts are not enough.
