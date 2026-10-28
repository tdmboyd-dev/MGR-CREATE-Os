# Legacy Verification Ledger

Legacy code copied from MGR Agents is evidence only.

## Current known facts
- `legacy/mgr-agents/src/lib/db/schema/creation-os.ts` exists and defines graph, continuity violations, crew rooms, CINEFORGE pipeline state, pipeline runs, and UCT provenance.
- `legacy/mgr-agents/src/lib/db/schema/approvals.ts` defines approval/risk structures and Creation OS action names.
- `legacy/mgr-agents/src/lib/db/schema/brand-face.ts` defines identity/brand asset state.
- `legacy/mgr-agents/src/lib/db/schema/training.ts` defines training queues/jobs/runs/adapters/swarm registry.
- `legacy/mgr-agents/src/lib/db/schema/hybrid.ts` defines a hybrid descriptor/universal grammar primitive.

## Not yet proven
None of the above is considered independently functional merely because schema code exists.

Each capability must be traced through:
schema → migration → service/domain logic → route/event/worker → UI/client if applicable → test → real execution → observed output/evidence.

## Verification categories
UNKNOWN | SCHEMA_ONLY | PARTIAL | EXECUTES_UNVERIFIED | TESTED | VERIFIED

Initial state for all imported legacy capabilities: UNKNOWN until audited.

## 2026-09-29 functional research / stale status repair
Replaced current-tense 58-only scope in docs/BEAST-WAVE-STATUS.md with dated historical scope and links to the 74-track expansion and 40-path child decomposition. Preserved old implementation history. Corrected pending-packet wording in WORK-STATE.md. Primary-source versus existing-code comparison reproduced three iKickItz defects; no foreign product source copied here and no iKickItz repair claimed. Dossier and machine-readable evidence record exact scope.

## 2026-09-29 avatar admission research
Compared the existing AssetRegistry, continuity rules and evidence bundle with glTF 2.0 skin/morph requirements and the iKickItz legacy salvage decision. Found that the registry's default digest hashes blobRef/MIME rather than media bytes; no actual byte-integrity or admission proof follows from its existing status. Documented staged acceptance and failure cases in research/AVATAR-ASSET-ADMISSION-2026-09-29.md. No product source changed or real asset inspected in this batch.
## October 27, 2026 — independent actor-isolation review

Independent real HTTP/SQLite regression reproduced a same-tenant peer reading another actor's job (HTTP200 instead of404). Root cause: tenant-only job/artifact queries despite credential-bound actors. New requests now persist the authenticated actor even when actorId is omitted, and every job/replay/run/cancel/artifact read requires that stored actor. Preserved legacy rows without authoritative stored actors are inaccessible; no ownership is guessed or automatically reassigned.

Verification: `node --test --import tsx test/native-service.test.ts test/native-service-actor-isolation.test.ts` passes2/2 with actual loopback HTTP and disposable SQLite; `npm run typecheck` passes. Checks include same-tenant peer read/download/replay/run/cancel denial, legitimate owner read, and legacy unbound-row quarantine. Evidence is retained in ecosystem wave2/creation-independent-review-tests.txt. This is an ownership repair to the native document slice, not a whole-repository or production audit.
