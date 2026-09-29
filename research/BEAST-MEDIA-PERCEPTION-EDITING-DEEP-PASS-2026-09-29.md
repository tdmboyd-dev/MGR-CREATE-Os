# BEAST Media Perception / Editing Deep Pass — 2026-09-29

Canonical pipeline: perceive/select -> mask/track -> edit/generate -> composite -> verify locality/identity/continuity.

SAM 2 is a strong open university for promptable object selection and tracking across image/video. Reference conditioning through IP-Adapter/ControlNet-style systems should be tested before training a new LoRA when inference-time references can meet the target.

MGR contracts: SelectionPrompt, MaskAsset, ObjectTrack, EditRegion, EditOperation, CompositePlan, EditLocalityReport, IdentityVerification and TemporalConsistencyReport.

Verification must measure mask/track accuracy, unwanted changed pixels outside the target, identity preservation, text/brand preservation, temporal flicker, final format and provenance. A successful provider response is not a successful edit.
