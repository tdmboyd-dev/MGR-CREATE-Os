# Hugging Face University — Cross-Factory Research

Hugging Face is a mandatory BEAST University source, not an optional GitHub substitute.

## Why it matters
The Hub is simultaneously a model registry, dataset registry, demo/app directory (Spaces), model-card/license/evaluation surface, and deployment/inference ecosystem. Diffusers alone exposes thousands of compatible generation pipelines spanning image, video and audio, with modular components, LoRA/adapters, quantization/offload and custom pipelines.

## Factory mapping
- Media Factory: Diffusers image/video/audio pipelines, adapters, ControlNet-style conditioning, editing and model routing.
- Audio Factory: Spaces/model cards for speech synthesis, voice cloning, conversion, multilingual TTS and audio generation. Current Spaces expose Qwen3-TTS, OmniVoice, Kokoro, Chatterbox, OpenVoice and others; every candidate still requires license/quality/consent/latency evaluation.
- 3D branch of Media Factory: Spaces currently surface TRELLIS/TRELLIS.2, Hunyuan3D, TripoSR, InstantMesh, Stable Fast 3D and other systems. These become evaluation candidates, not automatic dependencies.
- Research Factory: Spaces, papers, datasets, benchmarks and open deep-research systems.
- App/Tool Factory: coding models, agents and model demos.
- Document/Web/Data factories: OCR, document analysis, visual QA, code generation and data-visualization Spaces are discovery surfaces for candidate capabilities.
- Model Router: model cards, task tags, licenses, hardware requirements and evaluations should feed a capability registry.

## BEAST ingestion record for every candidate
Model/repo/Space ID; task; owner; version/date; license; gated status; model size; required VRAM/RAM; quantization options; input/output contract; supported adapters; benchmark evidence; known limitations; safety/consent implications; latency; cost; deployment options; whether local/self-hosted is practical; integration route; evaluation dataset; ADOPT/ADAPT/STUDY/REJECT.

## Important architecture lesson
Do not hard-code Creation OS to one image/video/audio model. Build modality contracts and a capability registry so providers/models can be swapped as quality, cost and licenses change.

Sources:
https://huggingface.co/docs/hub/diffusers
https://huggingface.co/docs/diffusers/main/index
https://huggingface.co/spaces?category=3d-modeling
https://huggingface.co/spaces?q=voice+cloning
https://huggingface.co/spaces?q=open+deep+research
