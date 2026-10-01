# MGR Production Brain1: production craft and output comparison

The intended product owns decisions before model submission: brief, canonical identity, requirements, shot causality, performance beats, camera/scene geometry, lighting, simulation, edit, color and delivery. Model generation is one execution stage. A production tool must also preserve revisions, recover jobs, retain source assets and prove editable delivery.

## Primary production observations

The ASC production account for Avatar: The Way of Water emphasizes recorded performance references, virtual/live camera and lens alignment, correctly timed light, depth compositing, coherent preview/final reflectance, and accurate character eyelines. Weta's studio overview identifies water/facial animation, underwater capture and realtime depth composition as major areas. These accounts explain why a successful film depends on many independently controlled departments; they do not provide proprietary implementation code or establish this plugin's output quality.

Sources: https://theasc.com/article/avatar-the-way-of-water/ and https://www.wetafx.co.nz/films/filmography/avatar-sequels . Read scope is retained in primary-doc-observations.json. The following protocol is an MGR engineering proposal inferred from those craft needs, selected primary implementation reads and observed native behavior.

## Acceptance dimensions

| Dimension | Observations required | Critical failure |
|---|---|---|
| Intent | Every mandatory entity/action/claim traced to actual timed output | Beautiful output omits or reverses the requested action |
| Identity | Face, body, wardrobe and props reviewed independently over views/actions | Face retained while body/costume drifts |
| Performance | Anticipation, effort, reaction, eyeline, weight transfer and settle visible in playback | Motion has no believable contact or emotional cause |
| Camera | Pose/lens/framing/clearance and occlusion checked against declared geometry | Zoom substituted for required translation; subject hidden |
| Physics | Causal constraints, collision, support and cache replay measured | Interpenetration, floating, instant explosive fracture |
| Composite | Registration, alpha edges, spill, shadow, depth and motion blur checked | Halo or inserted element slides away from plate |
| Color | Input/working/look/output transforms recorded and target view controlled | Unknown footage treated as linear or transform baked twice |
| Sound | Dialogue, lip/gesture timing, drift and delivery channels measured | Long-clip sync drifts or exported audio missing |
| Editability | Recipient reopens project and completes a localized revision | Flattened review movie is the only delivery |

Nine dimensions are independent; passing one never substitutes for another. Production function, accessible site behavior, performance and cost also need product-specific gates. The comparison module checks bookkeeping/completeness, not artistic truth. Evaluator reports remain authored observations and need proper review/provenance.

## Matched briefs

Use newly authored characters/environments or admitted licensed assets. Film names explain craft ambition; copyrighted franchise footage is not silently repackaged as a benchmark.

1. **Performance and contact:** one original character stops at a doorway, reacts, transfers weight and changes direction. Review face/body/costume and foot contact.
2. **Dialogue:** an original close-up speaks a rights-cleared line while changing expression. Measure frame/sample alignment, mouth shapes and gaze.
3. **Camera control:** fixed geometry with textured landmarks; request a dolly, pan, orbit and dolly zoom separately. Retain ground-truth poses and estimator uncertainty.
4. **Destruction:** pre-fractured original prop with declared material/scale and impact trigger. Require causal failure, editable fragments and replayable cache.
5. **Assembly:** original multi-part product explodes/reassembles around declared pivots. Require no intersection, measured final transforms and localized timing edit.
6. **Compositing:** original plate plus rendered insert behind/in front of a moving occluder. Check registration, alpha, light and depth.
7. **Cleanup:** admitted moving plate with partial occlusion and a repeated/parallax background. Require stable texture and preserved source.
8. **Toon:** original rig/material under multiple lights and moving camera. Review band stability, outline temporal behavior and editable graph.
9. **Image/vector:** original logo/image with holes, corners and localized repair. Compare topology/error, exported rendering and unaffected region recovery.
10. **Realtime:** declared input-driven graph with delayed feedback/reset. Measure input latency, frame time and export/audio parity on target device.
11. **Motion site:** the same content/actions/device/network budget; verify keyboard, reduced motion, navigation, loading and localized post-build edit.
12. **Conform/master:** declared CFR/VFR sources and audio offset, exact edit points and a specified SDR/HDR delivery. Verify output timing, color and media versions.

## Trial protocol

Pre-register the brief, mandatory gates, sample count, per-arm budget, failed/ambiguous-job accounting, allowed revisions, reference rights and review procedure. Pin provider/model/schema/runtime and admitted asset byte identities. Use a provider-independent neutral production plan and preserve each provider-specific compiled payload. Identical numeric seeds across architectures do not establish equivalent sampling; record seed support and sampling policy rather than invent it.

The initial harness requires at least3 recorded attempts per comparison arm, equal attempt counts, a common currency, matched canonical brief digests, required evaluator evidence, and declared blinded/budget/sampling protocol artifacts. Three samples are a bookkeeping minimum, not a statistical power guarantee. Before a superiority claim, choose an appropriate sample size and analysis, retain confidence intervals and failures, and independently review the evidence. The harness deliberately grants neither superiority nor Hollywood certification automatically.

Include all provider charges, failed jobs, unsettled/ambiguous outcomes, wall time and repair labor. Cost per accepted result is total cost divided by accepted trials; no accepted results means undefined, not zero. Settled provider costs are different from quoted maxima. Zero cost cannot be inserted for an unknown charge.

Artifact verification in production.mjs comparison requires local relative paths confined to the fixture directory, reads bounded bytes and checks each output/evaluation SHA256. This protects identity, not the accuracy of an evaluator's judgments. The runtime compareProduction API assumes its caller supplies recorded observations; host-level review still controls promotion.

## Actual executed output evidence

Blender5.2.2LTS was discovered outside PATH and executed in isolated background processes on CPU. The authored fixture contains a ground collider, falling body, parented keyframe assembly, camera, lighting and procedural surfaces. A48-frame cache was baked, the editable project saved, reopened in another process and rendered again.

- Evaluated simulation/keyframe samples reproduced exactly.
- Final ground contact height passed a0.01m tolerance.
- Assembly returned within1e-6 local-coordinate tolerance.
- Both render images had identical decoded pixels: maximum error0, RMSE0. PNG file-byte hashes differed, so byte equality was not substituted for appearance measurement.
- A separate actual USD export/import preserved the static camera world position/rotation,45mm focal length and36mm sensor width within1e-5 tolerance, and exported explicit stage units/axis.

These are executed technical fixtures. They are not character acting, complex destruction, fluid simulation, a learned camera result, a full material/layer USD round-trip, a competitor comparison, or Hollywood-quality output.

Headless Chrome was also attempted with an isolated profile and the local generated content site. The environment denied Windows IPC/crash-server setup; no DOM/screenshot verification completed. No sandbox bypass was attempted. Browser verification remains unverified.

## Comparison status

| Arm | Current evidence | Result |
|---|---|---|
| MGR native procedural Blender | Saved project, renders, replay measurements, static USD camera round-trip | Technical fixture verified within stated scope |
| Higgsfield | Public interface/helper research; no authenticated live tools or generated trial artifacts | No matched output comparison executed |
| YouArt | Public workflow/MCP research; no authenticated canvas/generation trial | No matched output comparison executed |
| MiniMax/Design | Public helper/model-contract research and local text draft checks; no paid generation | No matched output comparison executed |
| Hollywood production references | Primary craft accounts | Context for acceptance criteria, not an experimental arm |

No cross-provider quality ranking, cost ranking or Hollywood superiority claim is supported by the current output evidence. Live comparisons require the relevant authorized accounts, actual generated outputs, a spending budget and the declared review/evaluation work.
