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


## 2026-09-29 — Rival Reaper prototype
- Scope: `src/rival-reaper/engine.ts`, `test/rival-reaper.test.ts`, `examples/rival-reaper/`, MotionSites research dossier.
- Observed need: Rival Day requires a visibly random but constrained five-team draw; support crew must never enter the competitive pool; real roster must not be committed to this public repo.
- Repair/build: added constraint-first/random-tie-break engine, audit fields, fake-data interactive ticket reveal demo and tests.
- Status: IMPLEMENTED only. Tests are authored but were not executed by this connector session; do not mark TESTED/VERIFIED.
- Remaining risk: browser demo duplicates simplified eligibility logic and is not yet wired to the canonical TypeScript engine; production needs one authoritative server/shared module, persistent receipts, authenticated host controls and crash recovery.

### 2026-09-29 Rival Reaper runtime wave
- Added AES-256-GCM local snapshot persistence with atomic file replacement, private roster validation/capacity builder, local HTTP host API, bearer-token host boundary, SSE public state stream, separate host/arena screens and CLI launcher.
- Added 21st.dev/Codex research with ADAPT disposition; visual libraries remain presentation-only and may not own draw truth.
- Tests added for roster capacities and encrypted persistence. Existing receipt/session tests remain.
- Verification blocker: this environment could not resolve github.com from the container, so the branch could not be cloned to execute npm/typecheck locally. No TESTED/VERIFIED claim is made from authored tests alone.
- Architecture defect still open: current server endpoint locks fate immediately; synchronized public badge/ticket/yank reveal state should be added as a presentation state machine without allowing reroll.
