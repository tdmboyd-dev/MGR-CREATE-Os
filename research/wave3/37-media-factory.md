# 37 Media Factory — BEAST RESEARCH WAVE 3
Universities: Hugging Face Modular Diffusers/Diffusers; ComfyUI graph runtime; Adobe Firefly Creative Production Workflow API; Autodesk/film/VFX asset-version-review pipelines; OpenUSD/virtual production concepts.
Architecture: MediaJob→Shot/Asset graph→PipelineBlocks/Operators→Render workers→QC/Continuity→Version/Review→Derivative/Delivery. Provider-neutral capability registry for image/video/audio/3D.
Key finding: Diffusers modular pipelines support reusable/mixable blocks, lazy component loading, multiple workflows and component management; Adobe demonstrates published workflow IDs, batch execution, controlled concurrency/priority, progress/cancel and per-asset results. Creation OS should combine modular graph semantics with durable batch production.
Required: storyboard/shot graph, reference conditioning, identity locks, camera/motion, compositing, checkpoints, render queue, GPU/VRAM scheduling, codecs, derivatives, rights, continuity, review.
Failure: identity drift, temporal inconsistency, corrupt frames, OOM, partial batch, provider removal, model/license change.
Verification: actual playback/render inspection + technical validators + continuity evidence.
Sources: https://huggingface.co/docs/diffusers/main/modular_diffusers/overview ; https://developer.adobe.com/firefly-services/docs/workflow-builder-api/
