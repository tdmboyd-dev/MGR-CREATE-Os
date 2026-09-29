# BEAST Media Editing / Identity University — First Deep Pass

## Image-editing primitives
Selection/segmentation -> mask -> edit/generate -> composite -> validate.
- SAM 2 is a strong open university for promptable image/video segmentation and tracking.
- Diffusers inpainting uses masks; ControlNet adds depth/edge/pose/segmentation structural conditioning.
- Diffusers outpainting can combine inpainting, ControlNet and depth.
- IP-Adapter supplies lightweight reference-image conditioning without full model fine-tuning.
- Real-ESRGAN provides 2x/4x restoration/upscale families; GFPGAN is a face-restoration specialist.

## Identity consistency
Do not reduce identity to “same face.” Locks need face geometry/embedding, hair, body proportions, skin, wardrobe, accessories, voice, movement signature, canon and allowed variation. Identity verification is separate from generation.

## Training/customization
- Firefly’s current public custom-model guidance uses 10–30 representative images and a dataset quality score, recommending improvement below 85.
- DreamBooth demonstrates subject personalization from a few images.
- LoRA reduces trainable parameters and produces small adapters.
- IP-Adapter is useful when training is unnecessary.
Every model/weight license must be checked separately from code license.

## Dataset QA gate
Required checks: rights/consent, resolution, corruption, duplicates/near-duplicates, blur, subject count, identity consistency, pose/view diversity, expression diversity, background leakage, wardrobe/prop leakage, caption accuracy, unsafe content, demographic/coverage bias, train/eval leakage.

## Voice / speech / lip sync
Research stack includes Whisper for ASR, pyannote for diarization, multilingual translation systems such as SeamlessM4T, and lip-sync candidates such as MuseTalk/LatentSync. Voice cloning requires explicit consent and a VoiceIdentity rights record. F5-TTS illustrates why code license and model-weight license must be tracked separately: its code is MIT while pretrained weights are non-commercial due to training data.

## MGR contracts
MaskAsset, Selection, EditOperation, CompositePlan, IdentityLock, VoiceIdentity, TrainingDataset, DatasetQualityReport, AdapterArtifact, ModelArtifact, EvaluationSuite, PromotionDecision.

## Routing rule
Cheap/local/open is preferred only when license, hardware, latency and quality pass the task policy. “Self-hosted = free” is false; compute and operations must enter CostLedger.
