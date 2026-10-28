# Local service workflow handoff — 2026-10-27

Creation persists actual MarkdownRenderer bytes in SQLite with hash, byte size, rights declarations, audit events, idempotency, deferred cancellation and restart readback.

Launch with Node24: `node --import tsx src/api/local-service.ts`. Configure absolute DB path via CREATION_DB_PATH and service principals JSON array via CREATION_SERVICE_PRINCIPALS. Each principal contains token (24+ characters), tenantId, actorId. Bearer credentials bind those identities; supplied identity headers must match. Bind is loopback only. Never put actual tokens in Git or reports.

Creation POST /v1/creation/jobs accepts requestId, tenantId, workspaceId, capability document.markdown, input {actorId,correlationId,payload:{title,sections:[{heading,body}],rightsRefs:[reference]}}, acceptanceCriteria:[criterion], maxCost:0. GET /v1/creation/jobs/:requestId retrieves status; /v1/creation/artifacts/:id retrieves actual bytes. Optional defer:true creates a queued job; POST job/run or job/cancel controls deferred work. Rights are caller declarations, not clearance verification.

SignMe POST /v1/documents/drafts accepts requestId, workspaceId, title, content and optional documentId+expectedVersion for revisions. GET /v1/documents/:id, /versions and /versions/:version read owned snapshots; /v1/documents/operations/:requestId reconciles durable receipts. Existing actors required unless SIGNME_PROVISION_LOCAL_USERS=true is explicitly configured for a new isolated lab DB. The service provisions no-password users only in that mode. Never enable that fixture option on a user database. Migration adds sessionToken missing from the original SQL migration; existing migrated databases require baseline review before Prisma deployment.

Proof: Creation120/120 existing+new tests, TypeScript check; SignMe5/5 sidecar process-restart, route ownership and SQLite migration tests. SignMe route tests use transpiled handlers with mocked Prisma, not a deployed Next app. No production, paid generation, real signing, legal validity or external sending proof.

Full source audit remains incomplete. See central wave2 reading ledger for explicit scope.
