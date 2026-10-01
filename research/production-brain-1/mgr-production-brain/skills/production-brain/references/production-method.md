# Production planning before model selection

This is an independently authored planning method. It is not a claim to reproduce a named studio's pipeline or trained expertise. When a brief invokes Avatar, superhero cinema or feature animation, extract the specific requested properties: scale, performance, creature appeal, interaction, coherent light, environmental depth, editorial rhythm. Preserve the user's creative intent; do not substitute a generic cinematic adjective list.

## Development and preproduction

Write a premise, audience, desired emotional change and delivery format. Break the narrative into beats with a clear cause and consequence. Build world/character sheets with identity, silhouette, proportions, wardrobe, materials, voice and behavioral constraints. Label unknowns and lock only approved facts. Reference evidence should describe what it teaches and its permitted use.

For each shot specify dramatic purpose, subject, screen direction, eye line, staging, framing, lens intention, camera path, focus intention, light motivation, action timing, sound and cut motivation. Use one dominant readable action when model duration or motion limits demand it. Record start/end states; request handles when supported. Avoid mutually contradictory moves and unexplained lighting changes.

Animation planning separates pose readability, anticipation, main action, settle, weight transfer, arcs and overlap. Inspect performance at key frames and at playback speed. A prompt naming these concepts is not evidence the output follows them. Continuity includes identity, costume, props, hand occupancy, direction, environment, time and audio perspective; compare adjacent shot boundaries explicitly.

## VFX and 3D decomposition

Choose where actual geometry, simulation or compositing is needed. Decompose difficult interactions into plate/background, subject, contact/shadow, atmosphere, effects, typography and sound. Keep object scale, coordinate conventions, camera data and asset versions explicit. A 2D generated clip cannot be called an editable 3D scene.

OpenUSD offers structured scene composition and references; it is not a renderer. OTIO represents editorial relationships and timing; media storage remains a separate responsibility. Adapters for either require round-trip tests before claiming native interchange support. These are candidate integration targets, not dependencies installed by this plugin.

Lighting/look development should identify sources, exposure relationships, materials and reflection/contact behavior. Separate beauty from useful render passes when using a real renderer. Color planning records input encoding, working space, transforms and delivery encoding; never assume a generated MP4 is scene-linear. ACES workflows require explicit transform management, not a filter labelled cinematic.

## Review gates

1. Brief: intent and constraints are understandable and noncontradictory.
2. Boards/animatic: story, staging, duration and cuts read before expensive final work.
3. Asset/look: identity and materials are approved with evidence.
4. Shot: motion, anatomy, contact, occlusion, camera and lighting pass actual playback inspection.
5. Edit: continuity, rhythm, sound, titles and color are reviewed together.
6. Delivery: dimensions, frame rate, duration, audio, codec, accessibility and rights/provenance match the target.

Keep evidence separate across these gates. VBench can inform dimensions for evaluation, but no benchmark score substitutes for the user's shot requirements. Blind pairwise reviews should compare identical briefs and matched budgets, retain failures and measure edit time as well as visual preference. This release has no rendered benchmark results.

Primary foundations: [OpenUSD](https://openusd.org/release/intro.html), [OpenTimelineIO](https://github.com/AcademySoftwareFoundation/OpenTimelineIO), [RenderMan](https://renderman.pixar.com/product), [ACES overview](https://docs.acescentral.com/background/overview/), [VBench](https://github.com/Vchitect/VBench). These support specific pipeline components, not a blanket Hollywood-quality claim.
