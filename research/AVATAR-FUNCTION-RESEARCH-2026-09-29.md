# Avatar Creation / Living Being functional research — 2026-09-29

## Owner correction and scope
Backwards-Forwards includes discovering missing knowledge inside ALREADY BUILT features. It is not limited to re-running tests or retrieving old links. Decompose product -> function -> mechanism -> dependencies -> failure modes -> research -> specification -> implementation -> evidence. Finding existing code does not skip research.

This first decomposition contains 40 research paths beneath the Avatar Creation / Living Being example. It is not a claim of 40 completed studies, and it is not a replacement or new denominator for the existing 74-track matrix. Extend it when source reading exposes additional functions.

Evidence base: ikickitz-app integration/current-profile-2026-09-21 at 4bc9e063f1f15c708074c118c3a51cf2ac7d79b5; full Avatar/Living Being queue and salvage audit read. Retrieved 29 relevant source/test files; six service files read fully this batch and eight isolated existing test files executed. Other retrieved source is not falsely marked fully read.

## Function research paths
| ID | Function | Proposed/shared owner | Existing queue | Research question | Required proof | This-batch depth |
|---|---|---|---|---|---|---|
| AF-01 | Brief and intent | iKickItz + OS | LB-040 | What inputs define a new Being without changing the permanent cast? | Required fields, conflicting references and revision history | QUEUED |
| AF-02 | Founder authorization | iKickItz | LB-007 | Which creation actions require founder permission? | Denied user cannot generate, approve or publish | QUEUED |
| AF-03 | Personality dimensions | iKickItz + OS | LB-040 | How are traits, flaws, boundaries and motivations represented? | Stable approved traits survive revisions | QUEUED |
| AF-04 | Origin and lore | iKickItz | LB-041 | How do world chronology and approved lore constrain generation? | Contradictory origin is flagged for owner decision | QUEUED |
| AF-05 | Capability coverage | iKickItz | LB-002 | Can existing Beings fill the role before proposing a new identity? | Capability gap never auto-creates canon | QUEUED |
| AF-06 | Reference identity locking | OS | LB-043 | Which reference features and asset versions must remain stable? | Cross-view identity evaluation before approval | QUEUED |
| AF-07 | Body and anatomy | OS | LB-045 | How are proportions, topology and nonhuman anatomy validated? | Anatomical constraints and deformation checks | QUEUED |
| AF-08 | Clothing and accessories | OS | LB-045 | How are garment layers, fitting and clipping handled? | Motion poses expose clipping and identity drift | QUEUED |
| AF-09 | Materials and power illumination | OS + iKickItz | LB-024 | How are origin-specific materials and bounded effects represented? | Effects preserve character visibility and device budget | QUEUED |
| AF-10 | Concept generation and revision | OS + iKickItz | LB-047 | How are generation requests, retries and approvals linked? | Revision cannot silently replace an approved asset | QUEUED |
| AF-11 | Expression reference sheets | OS | LB-043 | Which poses prove emotion coverage without changing identity? | Approved face matches across expression sheet | QUEUED |
| AF-12 | Turnaround consistency | OS | LB-044 | How do front, side and rear views agree? | Inconsistent silhouette or clothing blocks 3D admission | QUEUED |
| AF-13 | Mesh readiness | OS | LB-045 | What topology, UV and material checks qualify an asset? | Real model inspection, not a 2D-image claim | QUEUED |
| AF-14 | Skeleton and skinning | OS | LB-046 | Which bone mappings and weights support required motion? | Deformation poses and retargeting bake-off | QUEUED |
| AF-15 | Face rig bindings | OS | LB-019 | How do semantic expressions bind to morphs and materials? | Missing targets fail truthfully; no universal-rig assumption | PARTIAL_SOURCE_READ |
| AF-16 | Expression interaction | OS + iKickItz | LB-019 | How do emotion, blink, gaze and mouth overrides combine? | Additive blend suppression, binary and order-invariance cases | RESEARCHED_NARROW |
| AF-17 | Gaze and blinking | OS + iKickItz | LB-019 | How are gaze targets, eyelid interactions and timing controlled? | No eye penetration or competing overrides | PARTIAL_SOURCE_READ |
| AF-18 | Mood event taxonomy | iKickItz + OS | LB-010 | Which verified events change fictional character state? | Client input cannot mutate authoritative state | QUEUED |
| AF-19 | Mood decay and personality baselines | iKickItz + OS | LB-011 | How are decay, bounds and transitions calibrated per Being? | Replay determinism plus owner-approved behavior review | QUEUED |
| AF-20 | Mood-to-performance mapping | iKickItz | LB-013 | How does internal state select expressions, gestures and aura? | No effect on money, votes, rarity or permissions | QUEUED |
| AF-21 | Voice identity and consent | OS + iKickItz | LB-042 | Which voice is approved and what substitutions are allowed? | Disallowed fallback blocked; voice consent recorded | QUEUED |
| AF-22 | CPU speech synthesis | OS | LB-017 | Which exact models meet hardware, quality and rights requirements? | Latency/RAM/voice-quality measured on target CPU | QUEUED |
| AF-23 | Pronunciation and languages | OS + iKickItz | LB-017 | How are names, dialect, language and pronunciation controlled? | Approved utterance set evaluated by language | QUEUED |
| AF-24 | Speech queue and interruption | iKickItz | LB-016 | Who owns speaking turns and how does cancellation propagate? | Cancelled audio cannot continue driving mouth/motion | QUEUED |
| AF-25 | Audio timing extraction | OS | LB-018 | Which source produces timing from actual audio? | Binary execution on real audio and timing-quality review | PARTIAL_SOURCE_READ |
| AF-26 | Mouth-shape mapping | OS + iKickItz | LB-018 | How do Rhubarb shapes map to each rig's actual mouth shapes? | Consonant shapes and rest remain distinct or explicitly approximated | RESEARCHED_NARROW |
| AF-27 | Viseme input validation | OS + iKickItz | LB-018 | What validates timing, weight and timing-source provenance? | Malformed/empty provider output never claims readiness | DEFECT_REPRODUCED |
| AF-28 | Audio-clock synchronization | OS + iKickItz | LB-020 | Which clock drives mouth and motion through pause/seek/resume? | Measured drift, dropped frames and interruption acceptance | QUEUED |
| AF-29 | Signature gestures | iKickItz + OS | LB-014 | Which approved gestures express each Being's origin and job? | Recovered proposals never activate before approval | QUEUED |
| AF-30 | Animation blending and retargeting | OS | LB-015 | How are clips blended, phased, stopped and retargeted? | Interrupted/restarted clip transitions observed on real rig | SOURCE_LOCATED |
| AF-31 | Locomotion and navigation | OS + iKickItz | LB-055 | How do characters move through valid paths and collision boundaries? | No teleporting, clipping or false presence | QUEUED |
| AF-32 | Schedules and presence | iKickItz | LB-055/056/057 | How do approved schedule occurrences differ from verified live activity? | Timezone, midnight, repeated occurrence and stale-signal tests | QUEUED |
| AF-33 | Memory privacy and retention | API/MCP + iKickItz | LB-006 | What is private, public, canonical or inferred? | Cross-user reads denied and retention/deletion proved | QUEUED |
| AF-34 | Relationships | iKickItz + OS | LB-030 | Which evidence permits relationship changes and reversals? | Provenance, duplicate-event and conflicting-evidence tests | QUEUED |
| AF-35 | Progression and achievements | iKickItz | LB-031/032/033/034 | Which named verified events change progress? | Replay-safe counters independent of rarity and money | QUEUED |
| AF-36 | Narrative chapters | iKickItz + OS | LB-035 | What may evolve without rewriting immutable origin? | Unapproved chapter rejected; lineage retained | QUEUED |
| AF-37 | Event persistence and replay | OS + iKickItz | LB-012/031 | How do event IDs, ordering, replay and conflicting retries work? | Same ID/different payload rejected; crash recovery verified | QUEUED |
| AF-38 | Asset rights and lineage | OS | LB-047/054 | Which code, model, data, voice and asset rights are independently cleared? | Missing rights or approval blocks admission | QUEUED |
| AF-39 | Delivery formats and budgets | OS | LB-050/051/052/053 | Which glTF/VRM/USD fields survive export within device limits? | Round-trip, load, memory and frame-time evidence | QUEUED |
| AF-40 | Product integration and UI | iKickItz + Loco + API/MCP | LB-048 | Which product calls which reusable capability, with what authority? | Authenticated request → artifact → review → actual page consumption | QUEUED |

## Every child dossier must supply
Exact source/version and read extent; official docs and standards; maintained implementations and issues; relevant papers/models/datasets; independent code/weights/data/voice/asset rights; CPU/RAM/latency/cost; inputs/outputs/state/failure behavior; test corpus and acceptance; current MGR source and gaps; KEEP/REPAIR/REPLACE/WRAP/RETIRE disposition; owner approvals; unresolved evidence. No fixed single-vendor shortcut. External source recommendations remain candidates until admission.

## Placement recommendation — no code migration authorized by this document
- Creation OS: reusable asset/identity/rig/voice/timing/render/job/rights/evidence contracts and implementations that genuinely serve multiple products.
- iKickItz: its characters, founder access, approved canon, page behavior, schedules, relationships and commercial rules. Keep existing functioning runtime while shared replacements are proven.
- Create Loco: website/interface reconstruction and visual verification; it can build the studio UI, but it is not the authority for Being identity or avatar generation.
- API/MCP: authenticated transport exposing selected capabilities to apps and assistants. A transport is not the renderer, creator or approval authority.
- Ordinary per-frame animation and deterministic state updates should remain local to the runtime where practical. Do not make a network/model call for every blink or pose.
- MooD SHiFT remains the environmental product. Internal Being state is separate.

## Narrow primary-source research completed
VRM 1.0 expression specification was read in full as Markdown, blob 74017309572fbbfcd2880c7fdd5234959a3471b6:
https://github.com/vrm-c/vrm-specification/blob/master/specification/VRMC_vrm-1.0/expressions.md
The relevant requirement sums blend-override strengths before clamping suppression. Current iKickItz sequential multiplication leaves blink at 0.25 for two 0.5 overrides, where that rule gives zero. Binary and same-channel behavior also need regression coverage. Disposition: REPAIR the semantic mixer after iKickItz preflight; this is not full VRM conformance or a real-rig visual test.

Rhubarb README, blob e2bf071c78ebeb9127018ba127a54b87ff1baccd:
https://github.com/DanielSWolf/rhubarb-lip-sync/blob/master/README.adoc
Read mouth shapes, command-line recognizers, threading, output formats and status/versioning instructions; linked integrations/demo and internal recognizer implementation were not audited. Distinct consonant shapes require deliberate rig mapping. A JSON parser alone does not prove audio alignment quality. Disposition: retain as candidate offline timing adapter; binary/model/rights and actual-audio benchmark remain open.

Three.js AnimationAction:
https://threejs.org/docs/pages/AnimationAction.html
Located and read relevant crossfade/weight/play/reset documentation, not the complete source/runtime. Disposition: inspect the existing adapter and actual clip transitions before modifying it; no automatic new animation engine.

## Reproduced current defects — iKickItz source unchanged
1. AF-16: two 0.5 blend overrides yield 0.25 blink weight instead of aggregate-rule zero.
2. AF-27: a NaN viseme weight is accepted and marked productionReady.
3. AF-27: Rhubarb input with duration but absent mouthCues becomes an empty productionReady timeline.
These are deterministic local reproductions against fetched unchanged modules. A readiness flag must not be treated as full model/source/rig admission. Repairs remain pending the repository edit preflight.

## Executed checks and constraints
Thirty existing tests across expression mixing, narrative, timeline, schedule/presence, schedule bridge, state kernel, voice router and Rhubarb mapping passed locally on Node 24.19.0. This is a bounded pure-module check, not Node 22 CI, a live provider, database, rig/browser or whole application result.

Remote directory inspection: all eight required paths exist; six forbidden paths absent; root package and backend entry match the guard's assertions. This is an exact-tree inspection, NOT the required hosted directory-integrity job. No Actions run exists at current iKickItz HEAD. Authenticated local clone was unavailable. Connector supports reading/re-running old jobs but not dispatching a new workflow. Re-running an old commit cannot verify a new one.

## Next implementation batch
Obtain the existing iKickItz CI workflow's manual run on the current integration branch and inspect its directory job. Then refresh source and claim paths, repair the three reproduced defects with regression tests, inspect related binary/order/source cases, update the owning queue and run required final gates. Continue independent child research and shared-system work while this lane is blocked.
