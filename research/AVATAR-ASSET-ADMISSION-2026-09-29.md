# Backwards–Forwards research: avatar asset admission and identity proof — 2026-09-29

Status: narrow RESEARCHED + proposed SPECIFICATION; implementation and real-asset verification open. This is one deep slice of the 40 function paths AF-06/11/12/13/14/15, not completion of all forty or the 74-track program. Branch/base: main @ fbecbb3d3d1b6a54952b1f0dcc03030e3b4c46a4.

## Backwards: code and claim audit
- `src/creation/assets.ts`: `AssetRegistry` keeps versions in a process-local Map. It rejects duplicate version numbers, but `digest` defaults to a canonical hash of `blobRef` and MIME, not the actual media bytes. The API also accepts a caller-provided digest without verifying bytes. Therefore it cannot prove file integrity, rights, persistence or identity continuity.
- `src/creation/continuity.ts`: `evaluateRules` collects rule failures but has no prescribed avatar rule set, reference/version binding, cross-view metric, or approval transition.
- `src/core/evidence-bundle.ts`: links reference arrays and hashes the bundle; referenced objects are not verified by that function.
- Old iKickItz Supreme randomly generated hundreds of candidate Beings, personality and backstory; the current owner-approved cast stays 21 primary plus Messy Diary appearance. Legacy salvage audit says suggestions and new-founder proposals can be kept, but random canon creation, random rarity and automatic mass insertion are rejected. The separate iKickItz owner queue governs admission; this shared engine owns reusable asset/version/evaluation contracts.
- Existing BuildList marks identity locks, registry and evidence as specified. The actual three modules above are narrower than a production asset-admission pipeline. Do not reinterpret their presence as asset proof.

## External source reading and architecture consequence
- Khronos glTF 2.0 specification (stable 2.0, https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html): skinned animation and morph-target weights are defined; the specification expressly leaves playback order, looping and runtime behavior to the client. **ADAPT** portable asset interchange and validation; write our own runtime cue contract. No third-party source vendored.
- Khronos skin and morph tutorials (https://github.khronos.org/glTF-Tutorials/gltfTutorial/gltfTutorial_019_SimpleSkin.html and https://github.khronos.org/glTF-Tutorials/gltfTutorial/gltfTutorial_017_SimpleMorphTarget.html): a skin deforms vertices by joints/weights; morph deltas with weights support facial expressions. **ADAPT** required checks for joint names, weights, morph target presence and target semantics; a concept image proves none of these.
- Cross-system decision: iKickItz owns approved Being identity and origin-specific visual canon; Creation OS stores immutable candidate/derivative references and produces an evaluation report; iKickItz admits a specific version after founder approval. Avoid shared-engine auto-approval.

## Proposed executable admission contract (not yet implemented)
Input: tenant, character identity, founder authorization reference, candidate asset bytes digest, immutable source/ref version IDs, rights/consent refs, expected skeleton/face target manifest, and explicit `concept | turnaround | rigged | performance` stage.
1. Ingest exact bytes, compute digest server-side, persist immutable object/version transactionally. Reject mismatch, missing bytes, reused IDs with changed payload, and lineage cycles.
2. Validate stage-specific facts. Concept: reference identity and approved visual direction. Turnaround: front/side/back silhouette, clothing/material agreement. Rigged: inspect real glTF/VRM joint/skin/weight and morph bindings on an actual model. Performance: replay expression, gaze, speech and movement against approved cue manifest on target device classes.
3. Preserve separate `candidate`, `evaluated`, `owner_approved`, `admitted`, `rejected` states and exact digest binding. Revisions produce a new immutable version; do not mutate approved identity.
4. Evidence record identifies validator version, actual input digest, measured failures, target manifest version, rig/device, render outputs and explicit human decision. Failed or unavailable validators cannot return admitted.
5. Supply no assumption that a 2D reference already contains animation data. Measure mobile memory, draw/skin cost and fallback experience before choosing an asset budget.

## Failure cases and acceptance to research/build next
- Changed blob with unchanged URL; valid URL without bytes; duplicate version from concurrent workers; derivative pointing to nonexistent parent; approved concept replaced silently; missing skeleton; renamed morph target; clothing clipping in a dance pose; expression sheet drifting across views; expensive effect obscuring the Being. Each must have an observed refusal or recorded blocker, not a green score from schema presence.
- Research still required: exact VRM/glTF importer/runtime compatibility, nonhuman rigs, clothing simulation choices, mobile measurement, licensing/rights of candidate generation and true per-Being reference assets. The owner has not approved any particular new face/model from this dossier. No model training or 3D bake-off executed.

## Queue placement
Keep AF-06/11–15 and BuildList 21/22/24/25/31/32 open. First thin vertical slice: actual-byte digest + immutable version + explicit stage admission using one approved reference; then asset-validator and target-rig tests; then device render. iKickItz branch gate and repair checks belong in its existing pending queue, not this shared engine.
