# BEAST Cinema / VFX University — First Deep Pass

## Why this exists
“Camera movement,” “3D,” “visual tempo,” “lighting,” and “cinematic” are not single features. They are production disciplines. Creation OS must learn their primitives before generating or judging them.

## Production interchange stack to study/adapt
- OpenUSD: canonical scene graph/interchange candidate for worlds, transforms, cameras, layers, references, variants and composition.
- OpenTimelineIO: editorial timeline/cut interchange candidate.
- OpenColorIO + ACES: color-management and consistent display/render pipeline.
- MaterialX: renderer-neutral material/look-development representation.
- OpenImageIO + OpenEXR: production image IO and HDR/metadata.
- OpenVDB: sparse volumetric effects representation.
- OpenCue: render-job decomposition, dispatch and farm scheduling.
- OpenSubdiv: production subdivision surfaces.

These should be adapters/standards around MGR contracts, not reasons to couple the OS to one DCC.

## Camera ontology required
Shot scale: extreme close-up, close-up, medium, full, long/wide and domain-specific variants.
Orientation: eye-level, high, low, top-down, worm's-eye, over-shoulder, POV, aerial.
Physical/virtual movement primitives: static, pan, tilt, roll, dolly/truck, pedestal, crane/jib, orbit/arc, tracking/follow, push/pull, zoom, handheld/shake, drone/fly-through.
Lens state: focal length, sensor/filmback, aperture, focus distance, depth of field, shutter/motion blur.
Trajectory state: pose over time, target/anchor, speed, easing, collision constraints, visibility/occlusion and framing constraints.

## Strong open research
- CameraBench: camera-motion understanding benchmark with expert taxonomy.
- MotionCtrl: independent camera and object motion control.
- CameraCtrl: camera pose control for video diffusion.
- TriMotion: text/video/pose camera controls mapped to shared motion representation.
- CinemaTraj: LLM plans atomic orbit/crane/dolly/pan/tilt/zoom/arc moves over a 3D scene graph with collision-aware paths.
- GenDoP/DataDoP: director-of-photography trajectory generation; directorial-intent metadata.
- CineScene: scene-decoupled dataset with explicit camera trajectories and panoramas.
- Veo reference-image + first/last-frame controls: useful provider capability, not our architecture.
- Genie/world-model research: interactive world consistency is a separate path from explicit 3D scene graphs; keep both abstractions.

## MGR native contracts implied
CameraRig, LensState, CameraPose, CameraTrajectory, ShotIntent, FramingConstraint, SubjectAnchor, SceneGraph, WorldVersion, LightRig, MaterialGraph, VolumeAsset, EditorialTimeline, RenderJob, ReviewVersion.

## Evaluation
Never judge “cinematic” with one aesthetic score. Evaluate geometry/path validity, subject framing, collision/occlusion, camera-motion match, temporal smoothness, continuity, focus/lens behavior, exposure/color, editorial rhythm and intent match separately.

## Native vs provider
Native: ontology, scene/timeline contracts, trajectory planner, continuity, evaluation, storage, rights, routing.
Adapt open standards: USD, OTIO, OCIO/ACES, MaterialX, EXR/OIIO, VDB where they survive bake-offs.
Provider/API: expensive generative video/rendering may be routed externally.
