# BEAST Capability Research Matrix — 2026-09-28

## Rule
A competitor feature name is not implementation knowledge. Every capability below is an independent research track. A track is not build-ready until primary documentation, standards, open implementations, datasets/benchmarks, licensing, failure modes, evaluation criteria, cost/hardware, provider alternatives and MGR placement are recorded.

States: DISCOVERED -> SOURCED -> END_TO_END_READ -> SPECIFIED -> IMPLEMENTED -> TESTED -> VERIFIED.

## Capability tracks
### Routing and infrastructure
1. Multi-model routing
2. Cost-aware routing
3. Provider fallback / health / circuit breaking
4. Capability registry and freshness
5. Budget / quota / concurrency / rate-limit control
6. Shadow traffic / model evaluation / promotion
7. Durable queues, cancellation, reconciliation and background jobs

### Image and design
8. Image generation
9. Generative fill / inpainting
10. Expand / outpainting
11. Object / subject selection and segmentation
12. Background removal
13. Harmonization / relighting
14. Precise compositing
15. Adaptive compositing
16. Upscaling / restoration / deblur / denoise
17. Reference conditioning / style transfer
18. Brand controls and reusable brand spaces
19. C2PA / provenance / rights

### Identity / training
20. Custom-model lifecycle
21. Dataset QA
22. LoRA / DreamBooth / adapters
23. Character face/body/wardrobe consistency
24. Voice identity / consent
25. Avatar generation
26. Lip sync / dubbing
27. Multilingual speech / translation

### Advertising
28. URL -> product intelligence
29. URL -> video/ad
30. Advertisement understanding
31. Creative-DNA extraction
32. Hook / angle / offer / proof / objection / CTA taxonomy
33. Visual tempo / shot rhythm / pacing
34. Caption / typography / safe-zone analysis
35. Ad variants / batch generation
36. Competitor creative intelligence
37. Creative performance feedback / attribution
38. Automatic ad launcher
39. IAB responsive-format adaptation
40. Interactive HTML5 ads
41. Creative fatigue / experiment / budget feedback

### Cinema / 3D / worlds
42. Shot language / shot scale / composition
43. Camera movement taxonomy
44. Camera trajectory planning
45. Lens / aperture / focus / depth-of-field
46. Lighting / color / ACES pipeline
47. Storyboard / shot graph
48. Editorial timeline / transitions / rhythm
49. Persistent 3D worlds
50. Scene graph / transforms / variants / references
51. Materials / shading
52. Volumes / VFX
53. Render scheduling / farms
54. Spatial continuity / collision-aware camera planning
55. World models / interactive environments
56. One-click story orchestration

### Agents / trust / MCP
57. Secure agent sandbox / VM
58. Independent action Sentinel
59. Credential-blind Secret Broker
60. Approval binding
61. Agent audit trail / receipts
62. Durable long-horizon execution
63. Memory tiers
64. Privacy inference firewall / PII redaction
65. MCP authorization / scopes / token audience / anti-confused-deputy
66. MCP tool/resource/prompt contracts
67. Agent-facing creative MCP
68. Observability / traces / metrics / logs

### Web
69. Intent amplification / requirement clarification
70. Prompt/screenshot -> website
71. Natural-language post-build editing
72. WordPress/WooCommerce export adapter
73. SEO / accessibility / responsive validation
74. Browser visual verification / causal repair

## Primary source universities identified
- Pixar/OpenUSD: scene composition, layers, references, variants, cameras and production scene graphs.
- Pixar RenderMan + Unreal CineCamera/Sequencer: production cinematography, lens/camera rigs, rail/crane/keyframing.
- Academy Software Foundation: OpenTimelineIO, OpenColorIO/ACES, MaterialX, OpenImageIO/OpenEXR, OpenVDB, OpenCue.
- Hugging Face Diffusers: inpaint/outpaint, ControlNet, IP-Adapter, LoRA/DreamBooth and modular media pipelines.
- Meta SAM 2: promptable image/video segmentation and object tracking.
- Tencent MotionCtrl + CameraCtrl + TriMotion + CinemaTraj + GenDoP: camera/object motion control and camera trajectory planning.
- CameraBench / MovieShots / MultiCamVideo / CineScene / DataDoP: camera and cinematic evaluation/training research.
- C2PA: signed content provenance.
- IAB Tech Lab: HTML5, display, video and CTV ad formats.
- Google Ads API and official channel APIs: campaign/assets/performance integration.
- Temporal: durable execution.
- Firecracker and gVisor: workload isolation.
- MCP specification: OAuth 2.1 authorization, audience binding and confused-deputy defenses.
- OpenTelemetry: trace/metric/log evidence.
- LiteLLM/OpenRouter/provider-native gateways: routing/fallback reference behavior.

## Dataset policy
Datasets are research candidates, never automatic training material. Record license, source rights, subject consent, commercial-use rights, redistribution rights, PII/biometric risk and model-weight license independently. Non-commercial datasets can be used to understand/evaluate research only when their terms allow it; they cannot silently become commercial MGR training data.

## Important dataset leads
- CameraBench: expert camera-motion labels and captions.
- MovieShots: 46K shots with scale and movement labels.
- Kling MultiCamVideo: large camera-motion dataset, Apache-2.0 dataset card.
- CineScene Scene-Decoupled Video: camera trajectories + panoramas + dynamic-subject video.
- DataDoP: camera trajectories, depth and directorial intent; copyright caveats require review.
- MAdVerse: 50K+ multilingual ads; CC BY-NC and underlying-image copyright means research/evaluation, not commercial training by default.
- AdsTrace: second-by-second ad engagement/CTR research lead; license/data rights must be cleared before use.
- Pitt Image Ads: ad topic/sentiment/visual-rhetoric research; rights review required.
- SA-V/SAM 2: video segmentation research and evaluation.
- RealEstate10K/WebVid-derived camera research: verify original dataset terms before any use.

## Architecture consequence
Creation OS owns contracts, evidence, routing, identity, provenance, rights, continuity, durable execution and verification. Providers are replaceable adapters. MGR apps consume capabilities; they do not own provider-specific architecture.
