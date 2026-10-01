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

## 2026-10-01 recursive production research and implementation audit

Owner requested deeper capability decomposition and canonical queue coverage. Added 18-category/75-child production research queue mapped to existing categories, four scoped 16-field packets, selected source-level Blender/OTIO/FFprobe/CameraCtrl findings and exact read-depth evidence. Corrected the canonical research queue's old 20/48 progress to an explicitly historical record without deleting it.

Executed fetched Creation OS camera/asset/digest source in isolation: 10 gaps reproduced (six camera, one scene cycle, three asset ownership/identity). URL/MIME digest limitation was already recorded on September 29; this batch confirms rather than rediscovers it. Additional observations include empty/out-of-range/nonfinite camera inputs and externally mutable lineage. Product source remains unchanged; no runtime repair or whole-product verification is claimed.

Evidence: evidence/production-research-audit-2026-10-01.json includes source blobs/read depth, observed outputs, local source hashes, reproducible inputs and script. Queue integrity checks passed (75 unique IDs, resolved acyclic dependencies, no false implemented/verified flags). Blender/ffprobe commands were not found on PATH; those runtime checks and all learned-model/rendered comparisons remain open. No model weights downloaded, provider credentials used or generation credits spent.

Research -> build order: asset ownership/byte admission and honest structural validation; bounded media probe; camera geometry/unit proof; editable simulation and editorial round trips; remaining child tracks. Do not mark all 75 researched from the queue's existence.
