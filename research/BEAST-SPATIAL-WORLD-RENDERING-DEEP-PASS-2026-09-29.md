# BEAST Spatial World / Rendering Deep Pass — 2026-09-29

## New universities
- World Labs Marble: persistent, navigable generated 3D worlds with Gaussian-splat export.
- World Labs Spark: MIT Three.js Gaussian-splat renderer supporting major splat formats, transforms, animation, multi-splat composition and broad WebGL2 device reach.
- nerfstudio/gsplat: Apache-2.0 CUDA Gaussian-splat rasterization with large-scene, batching, depth, camera/sensor and evaluation support.

## MGR conclusion
Persistent spatial production needs two complementary layers:
1. deterministic SceneGraph/WorldVersion contracts owned by Creation OS;
2. renderer/world-model adapters such as meshes/USD, Gaussian splats, learned world models, game engines and future neural scene representations.

Do not make a Gaussian splat the canonical world. It is a render/reconstruction representation.

## Native contracts required
SpatialAssetRef, representation type, coordinate system, transforms, bounds, source capture/generation lineage, renderer compatibility, world version, collision proxy, semantic node mapping and conversion/evaluation evidence.

## iKickItz consequence
MGR Studios, Incubator, Royal Hearts, battle spaces and recurring locations should keep stable semantic IDs/coordinates even when the rendered representation changes from mesh -> splat -> game-engine scene -> future world model.

## Evaluation
- geometry/spatial consistency;
- camera navigation stability;
- scale/orientation;
- subject placement;
- asset alignment;
- mobile/web render performance;
- memory/GPU footprint;
- conversion loss;
- semantic node mapping;
- visual fidelity;
- rights/provenance.

## Disposition
Spark: PROTOTYPE for web/iKickItz spatial viewing.
gsplat: STUDY/PROTOTYPE for server-side training/rasterization; GPU cost and deployment complexity matter.
Marble/World Labs: provider/world-generation university and potential adapter, not architectural dependency.
