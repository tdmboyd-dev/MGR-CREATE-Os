# BEAST Camera Control Deep Pass — 2026-09-29

"cinematic camera" is not a usable contract. Camera intent must be explicit and renderer-independent.

Native ontology must cover shot intent/scale, camera pose, subject anchor, pan/tilt/roll, dolly/truck, pedestal, crane, orbit/arc, tracking, push/pull, zoom, handheld/drone, lens/sensor, focal length, aperture, focus, shutter/motion blur, duration, speed/easing, collision/occlusion and framing constraints.

Universities:
- MotionCtrl: separates camera motion from object motion.
- CameraCtrl: pose-conditioned camera control for video generation.
- CinemaTraj: decomposes natural language into atomic camera moves over a 3D scene graph and plans collision-aware trajectories.
- RealEstate10K and related trajectory datasets are research/eval leads; underlying video rights need separate review.

Recommended pipeline: direction -> ShotIntent -> anchors -> trajectory planner -> CameraTrajectory -> validator -> renderer adapter -> rendered-motion validator.

Evaluate move match, trajectory error, framing, target visibility, collision/occlusion, smoothness, lens/focus, continuity and rendered intent.
