# Production capability research: recursive implementation audit

Date: 2026-10-01. Base: `67a7620b44188c0060f2a48227ab01fb103b544c`. Branch: `research/production-brain-2026-10-01`.

## Owner direction and source of truth

The owner requires category -> functions -> components -> dependencies -> child research, rather than a competitor-name inventory. Missing or unproven shared capabilities belong in Creation OS research. This batch follows that instruction without changing runtime code or declaring a whole category complete.

The canonical 48-category queue, later 74-track expansion and 40 Avatar child paths overlap. Their counts must not be summed into a completion percentage. The older queue's 20/48 and 41.7% entries are historical, not current completeness evidence. This dossier adds 75 child tracks under 18 production categories, mapped to both existing namespaces in `production-research-queue-2026-10-01.json`. Every child has required knowledge, candidate implementations, dependencies, acceptance and a next research action. Even a sourced child remains unfinished until its implementation and evidence gates close.

The private Production Brain 0.1.0 companion has 31 passing local tests for its limited plan/compiler scope. Those tests do not validate Creation OS, film quality, browser functionality or any provider. Its code is not installed into Creation OS by this batch.

## Inspected Creation OS implementation

- `src/cinema/contracts.ts` and `test/cinema-contracts.test.ts`, full files: scene/shot types and a narrow structural validator. Existing tests cover missing parents/subjects and decreasing keyframes. They do not demonstrate the broader promised camera conditions.
- `src/creation/assets.ts` and `src/core/digest.ts`, full files: process-local version map and canonical hashing. Reconciled with the September 29 asset-admission dossier; URL/MIME hashing was already documented and is not credited as a new discovery.
- Existing BEAST contract, entry instructions, JEV bounds, WORK-STATE, BUILD-QUEUE, AUDIT-LEDGER, canonical research queue, capability matrix, wave status, camera-control and asset-admission dossiers.

Ten isolated reproductions executed against fetched source using Node 24.21.0 type stripping. Only the digest import was rebound to the identical fetched implementation. This is narrow source execution, not a complete repository build or deployed-system audit. Evidence includes source hashes, inputs, reproducer and observed results.

| Finding | Observed behavior | Research/repair target |
|---|---|---|
| COS-CAM-01 | Collision-required shot returns no issue without geometric evidence | Version-bound collision proof and fail-closed unavailable checks |
| COS-CAM-02 | NaN duration returns no issue | Finite numeric and unit validation |
| COS-CAM-03 | Keyframe beyond duration returns no issue | Time range and endpoint semantics |
| COS-CAM-04 | Empty camera path returns no issue | Required trajectory/camera evidence |
| COS-CAM-05 | Negative focal length returns no issue | Physical parameter and adapter validation |
| COS-CAM-06 | Minimum framing fraction greater than maximum returns no issue | Framing satisfiability and actual projection |
| COS-GRAPH-01 | Parent cycle returns no issue | Scene hierarchy acyclicity |
| COS-ASSET-01 | Default digest has no byte input and is identical for matching URL/MIME | Existing byte-admission gap; bind exact media bytes |
| COS-ASSET-02 | Caller can mutate stored parent IDs through returned version | Deep defensive ownership |
| COS-ASSET-03 | Caller can delete stored versions through returned lineage array | Return copies/read-only views backed by immutable storage |

No product repair is claimed. The user requested research and queue coverage before assuming those capabilities exist. The proposed build order starts with ownership, numeric/graph checks and honest unverified results; geometric collision or full media admission must not be replaced with superficial validation.

## Competitor workflow decomposition

Higgsfield's production bundle is a routing entry point for eleven application workflows, not evidence that one image/video model implements every capability. Its public instructions require local applications and actual integration checks. It covers Blender destruction/assembly/scenes/materials; Premiere ingest; After Effects compositing/cleanup; Illustrator vectorization; Photoshop repair; TouchDesigner effects; Resolve grading. The publicly inspected skills repository does not establish the private runtime implementation of these DCC workflows.

YouArt's documented node/workflow interface motivates typed asset flow and preserved revisions. MiniMax Design's desktop product is separate from the official open skills repository. MiniMax H3 Context IR is optional hosted prompt enhancement, not our core semantic planner. None grants access to closed code, trained weights or paid template libraries.

Each DCC category has child research for inputs, transforms/algorithms, state, editability, runtime requirements, failure/recovery and actual output validation. These entries are work obligations, not checked-off capabilities.

## Packet A — Asset identity, registry ownership and technical inspection

Status: narrow existing-code behavior RESEARCHED; full admission/inspection capability OPEN. Tracks PR-ASSET-01 through 06.

1. **Definition:** Admit exact bytes and immutable identity, retain trustworthy lineage, inspect technical media facts separately from declared metadata.
2. **Production use:** Inputs to reference conditioning, proxies, render jobs, review and conform must bind to the same version actually inspected.
3. **Standards:** SHA-256 byte identity; codec/container distinctions; rational time bases; existing Creation OS AssetVersion/admission contracts. A content hash is not rights or identity proof.
4. **Research/papers:** Cryptographic identity does not require a learned model. Perceptual identity/quality metrics belong to separate tracks; no paper is claimed read here for that wider task.
5. **Open implementations:** Existing registry/digest code fully read and executed; selected FFmpeg `fftools/ffprobe.c` input-opening and stream-reporting functions inspected. Repository-wide FFmpeg audit not claimed.
6. **Models:** None required for byte/format facts. Semantic image/video evaluation is a distinct model boundary.
7. **Datasets:** Isolated mutation/hash fixtures now; planned mislabeled files, truncation, unknown metadata, variable frame rate, rotation, multiple streams and decode-failure corpus.
8. **Licensing:** FFprobe source header states LGPL-2.1-or-later; shipped FFmpeg build options and linked codecs require their own review. No binary/code is vendored here. Asset consent/rights remain independent.
9. **APIs/providers:** Higgsfield/YouArt assets and MiniMax reference inputs eventually consume admitted versions; provider metadata cannot attest to local bytes.
10. **Native alternative:** Native ingestion/ownership/evidence wrapper around a selected media inspector. Do not implement another codec stack or let a mutable Map represent final durable admission.
11. **Runtime:** Local Node reproduction executed. ffprobe/ffmpeg were not found on PATH; media probing was not run. Production needs bounded subprocess or isolated worker and durable storage.
12. **Cost:** Byte scan/storage/network and decode cost scale with media; no latency/memory benchmark measured. Limits must be explicit before production.
13. **Failure modes:** URL-only digest, shallow freeze, exposed internal arrays, concurrent version collision, nonexistent lineage, unknown fields coerced to zero, cover art mistaken for video, network-enabled probing.
14. **Evaluation:** Current proof establishes exact registry failure behavior. Future acceptance must inspect actual bytes and decode results with resource ceilings.
15. **Placement:** Creation OS admission/asset registry owns identity and versioning. Providers and product UIs receive immutable references and evidence.
16. **Acceptance:** Changed bytes at same locator detected; callers cannot mutate stored lineage; missing/duplicate/cyclic parents rejected; bounded malicious-file tests; each admitted version carries validator/config/input digest.

FFprobe findings: selected code emits codec, dimensions, sample/display aspect, pixel/color data, rational frame rates, time base and optional counts. Some fields are unavailable rather than zero. Documentation warns interval seeking is not exact. Therefore metadata probing, frame scanning and complete decode are different evidence levels. Proposed probe schema must retain UNKNOWN and declare inspection coverage.

## Packet B — Camera structure, geometry and learned conditioning

Status: narrow Creation OS invariant failures RESEARCHED; units/conditioning SOURCED with selected implementation reads. Full camera capability OPEN. Tracks PR-CAMERA-01 through 07 and PR-SCENE-01.

1. **Definition:** Translate directorial intent into a valid trajectory, prove geometric constraints, map to a renderer/model and evaluate actual output.
2. **Production use:** Camera staging combines pose, lens, target, timing and scene geometry; prompt adjectives do not replace these contracts.
3. **Standards:** OpenUSD camera conventions and stage units; Creation OS CameraTrajectory/LensState/ShotIntent. USD 24.08 documents lens/filmback in tenths of scene units, unlike focus/clipping distances. Explicit conversion is required.
4. **Research/papers:** CameraCtrl paper 2404.02101 and MotionCtrl 2312.03641 remain study leads; full paper/ablation review is OPEN. Selected CameraCtrl code provides concrete conditioning evidence beyond the README.
5. **Open implementations:** Current Creation OS validator and tests fully read; CameraCtrl inference's relative-pose, ray-conditioning, intrinsic-rescale and checkpoint assembly sections inspected. Blender/explicit geometry remains a separate controllable alternative.
6. **Models:** CameraCtrl main uses AnimateDiffV3/SD1.5 plus pose adapter; its SVD branch is different. Checkpoint/base/LoRA compatibility must be pinned independently. No model installed.
7. **Datasets:** RealEstate10K is a candidate source cited by the project, not automatically cleared training material. Fixed synthetic scenes can first validate coordinate conversions without dataset-rights ambiguity.
8. **Licensing:** CameraCtrl README says academic use; root LICENSE lookup returned 404. Do not infer commercial permission from public code. Resolve code, base-model, adapter and dataset terms separately before adoption.
9. **APIs/providers:** Hosted video controls require actual schemas and measured compliance. Model pose conditioning and exact geometric camera animation are different capabilities.
10. **Native alternative:** Own camera ontology, unit normalization, deterministic structure/geometry validation and evidence; use replaceable renderer or learned adapter.
11. **Runtime:** Local validator repro needs CPU Node only. Candidate CameraCtrl environment documents Python/PyTorch/CUDA; GPU/VRAM and modern compatibility were not measured.
12. **Cost:** Geometric checks and generative inference have different costs. No benchmark or cloud price claimed.
13. **Failure modes:** NaN, empty/out-of-bounds paths, invalid lens, contradictory framing, wrong world units, w2c/c2w confusion, crop-adjusted intrinsics mismatch, unsupported exact controls and dataset-domain shift.
14. **Evaluation:** Separate structural validity, unit round-trip, collision clearance, projected framing, trajectory error and perceived motion. Current reproductions prove only listed gaps.
15. **Placement:** Creation OS cinema contracts/validators; adapter maps explicit coordinates and evidence to selected executor. Product plugin supplies intent and references.
16. **Acceptance:** Reject reproduced malformed cases; scene-version-bound collision/framing proof; USD/renderer unit round-trip; independent measured camera motion on rendered fixed-scene tests.

Source-level finding: CameraCtrl normalizes poses relative to the first camera, rescales intrinsics for aspect differences, builds per-pixel ray features and passes them into a pose-conditioned pipeline. This is a substantially different implementation from adding camera words to a prompt. It exposes separate child work for transforms, calibration, sampling, checkpoint loading and evaluation.

## Packet C — Destruction simulation and cache correctness

Status: SOURCED with selected core-function reads; no simulation executed. Tracks PR-DESTRUCTION-01 through 05.

1. **Definition:** Editable fractured geometry, breakable constraints, physical motion, secondary effects and reproducible delivery.
2. **Production use:** Destruction shots require deliberate failure order and camera readability; simulation and final image generation are not interchangeable.
3. **Standards:** Blender scene/rigid-body state, frame rate, transforms, caches; interchange to USD is a separate adapter decision.
4. **Research/papers:** Fracture methods, constraint solvers, contact stability and volume coupling need separate studies. No comprehensive physics-paper review completed.
5. **Open implementations:** Blender RNA substep/solver/cache definitions and `BKE_rigidbody_do_simulation` selected source read; physics backend is Bullet in this path. Fracture operator and dust implementation still OPEN.
6. **Models:** Deterministic physics path needs no generative model; learned effects are optional alternatives requiring their own evidence.
7. **Datasets:** Planned small stack, constrained bridge, triggered collapse and extreme-scale regression scenes; no actual .blend fixture run.
8. **Licensing:** Inspected Blender code headers GPL-2.0-or-later. No code copied; application/extension distribution strategy must be reviewed before bundling.
9. **APIs/providers:** Public Higgsfield workflow describes Blender integration but not its underlying implementation. Independently verify live Blender Python/MCP control before editing.
10. **Native alternative:** Own fracture/constraint intent and provenance; use established physics renderer behind an editable scene adapter instead of implementing physics without research.
11. **Runtime:** Blender not found on PATH in this environment. CPU simulation, memory and render GPU requirements depend on scene complexity and require measurements.
12. **Cost:** Higher substeps/iterations trade compute for stability. Cache/storage/render costs unmeasured; no arbitrary production budget asserted.
13. **Failure modes:** Wrong scale/mass, tunneling, unstable constraints, missing backend, stale cache, frame skipping, nondeterministic replay, memory-heavy dust and loss of editable project dependencies.
14. **Evaluation:** Contact/penetration, intended break timing, conservation plausibility, replay tolerance, editability and resource usage independently.
15. **Placement:** Creation OS Media Factory operator contract with scene/version/cache binding and application-specific executor.
16. **Acceptance:** Simulate/reopen/replay actual scene, invalidate cache after relevant edit, preserve parts/materials/constraints, inspect rendered sequence and bound resources.

Implementation consequence: inspected core checks cache state, clamps to its frame range, handles baked results and advances simulation one frame at a time. Substeps update forces and kinematic targets before stepping the physics world. A controller that jumps to a late frame and screenshots it has not proven the intended simulation ran.

## Packet D — Editorial timing and media linking

Status: SOURCED with full architecture/header and selected test reads; no OTIO runtime/round-trip executed. Tracks PR-EDITORIAL-01 through 04.

1. **Definition:** Maintain shot timing, trims, tracks/transitions and versioned media links across applications.
2. **Production use:** Editorial changes must preserve the distinction between available source media and the portion used in the cut.
3. **Standards:** OTIO Timeline/Stack/Track/Clip/Gap/Transition; RationalTime/TimeRange; target adapter conventions and timecode.
4. **Research/papers:** Precise interchange is primarily schema/implementation research; perceptual editing/rhythm research remains a separate track.
5. **Open implementations:** OTIO architecture document and RationalTime header fully read; selected rounding/base-conversion/timecode tests inspected. Adapter-specific losses not yet audited.
6. **Models:** None needed for time math or linking. Automatic shot detection/edit suggestions are optional separate model capabilities.
7. **Datasets:** Planned mixed-rate, missing-media, nested-trim, transition-handle and drop-frame fixtures; no runtime corpus executed.
8. **Licensing:** Inspected header/tests Apache-2.0; third-party adapter and media terms independent.
9. **APIs/providers:** Premiere/Resolve imports/exports and application APIs must be verified with actual versions; product claims do not prove round-trip parity.
10. **Native alternative:** Own edit intent/provenance and adapter loss report; use established OTIO structures where measured preservation supports adoption.
11. **Runtime:** Python/C++ OTIO environment plus target DCC for round trips; neither used in this batch.
12. **Cost:** Local serialization differs from media storage/proxy generation/conform costs. No measured throughput stated.
13. **Failure modes:** Inclusive/exclusive endpoint errors, rounded rates, invalid time, missing media, wrong relinked version, adapter loss of effects and source/parent time confusion.
14. **Evaluation:** Compare exact timing/media identity and a rendered reference cut; native serialization alone is insufficient for application interchange.
15. **Placement:** Creation OS editorial contract linked to immutable assets; app adapters expose support/loss explicitly.
16. **Acceptance:** Read/write/reopen across selected DCC; preserve cuts/gaps/transitions/handles and missing-reference state; compare rendered duration and A/V sync.

Implementation consequence: RationalTime stores value and rate and rescales during comparisons/arithmetic. Inclusive and exclusive duration constructors differ by one sample. Architecture distinguishes available range from source trim and parent-container time. Media linking is a separate plugin step; an OTIO file is not evidence that its external footage is present.

## Cross-source decisions

ADAPT: standard scene/editorial/color contracts where actual interoperability tests support them. STUDY: closed competitor workflows and academic model candidates until rights/runtime/evaluation are established. MGR-NATIVE: canonical intent, immutable ownership, freshness, approvals, evidence and multidimensional quality decisions. REJECT: treating schema existence, package installation, a generated preview or a named vendor feature as completion.

No automatic installation of Blender, FFmpeg, CameraCtrl weights or paid applications occurred. No account credential was used. No generated film/site is benchmarked. The absence of a command on PATH is recorded narrowly and does not prove no installation exists elsewhere.

## Next depth-first work

1. Resolve source ownership/immutability and fail-closed numeric/graph invariants with regression tests in a separately scoped implementation change.
2. Complete bounded media-inspector research and execute an actual byte-to-admission fixture.
3. Complete camera units/scene geometry specification and render a known camera test before selecting a learned controller.
4. Execute one editable Blender simulation and one OTIO/DCC round trip; feed new missing subcomponents back into child queue.
5. Continue the remaining category leaves; models, datasets, licenses, costs, test artifacts and contradictions stay attached to their specific capability. Do not mark all 75 as researched because the queue exists.

Source index and exact read depth are in `../evidence/production-research-audit-2026-10-01.json`; reproduced observations include an executable script and source snapshots sufficient to repeat the narrow audit.

## Category crosswalk

| Category | Existing matrix IDs | Child tracks | Candidate implementations |
|---|---|---:|---|
| Intent-to-production compiler | 69, 47 | 5 | Host agent, typed intermediate representation, Creation OS context resolver |
| Provider execution | 1, 4, 5, 7, 65, 66 | 5 | Official Higgsfield/YouArt MCP, MiniMax V2, Creation OS routing/runtime |
| Media ingestion and immutable assets | 19, 21, 50 | 6 | Creation OS AssetRegistry, FFmpeg/ffprobe, image/3D validators |
| Camera intent and geometric proof | 42, 43, 44, 45, 54 | 7 | Creation OS cinema contracts, OpenUSD camera, CameraCtrl/MotionCtrl candidates |
| Character and performance continuity | 20, 21, 22, 23, 24, 25, 26 | 5 | Existing avatar admission dossier; conditioning, rig and motion candidates |
| Blender destruction | 52, 53 | 5 | Blender rigid-body/Bullet source; fracture and volume candidates |
| Object assembly animation | 44, 48, 50 | 3 | Blender transform/keyframe APIs; independent staging planner |
| 3D scene construction | 49, 50, 54 | 3 | OpenUSD, Blender scene/dependency graph, asset catalog |
| Stylized materials | 51 | 3 | Blender shader nodes, outline methods and renderer-specific behavior |
| Footage organization and editing | 48 | 4 | OpenTimelineIO; Premiere/Resolve interfaces to verify |
| VFX shot compositing | 11, 14, 15, 46, 52 | 4 | After Effects documented automation; OpenEXR/OCIO and compositor candidates |
| Temporal object removal | 9, 11, 14 | 3 | After Effects cleanup workflow; segmentation/inpainting candidates |
| Raster-to-editable vector | 8, 18 | 3 | Illustrator tracing; open SVG/path-fitting candidates |
| Layered image repair | 9, 10, 11, 13, 16 | 3 | Photoshop masks/editing APIs; open image-processing candidates |
| TouchDesigner visual effects | 52, 53 | 3 | TouchDesigner operator docs; GPU graph alternatives |
| Color and finishing | 46, 51 | 4 | ACES/OCIO; Resolve nodes; OpenEXR |
| Natural-language motion sites | 69, 70, 71, 73, 74 | 5 | Higgsfield/MiniMax workflows, Motionsites public lesson, browser standards |
| Multidimensional quality proof | 6, 37, 74 | 4 | VBench and domain-specific validators; matched competitor experiments |

