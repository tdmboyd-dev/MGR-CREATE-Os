# training model lifecycle — RESEARCHED

Legacy queue/jobs/runs/adapters exists but providers are hardcoded assumptions. Study Hugging Face model registry/cards, MLflow-style registry, LoRA training/evaluation, model promotion/rollback. Native ModelArtifact + TrainingRun + DatasetSnapshot + EvalRun + Promotion with hashes/licenses/base-model lineage. Verify dataset hash, reproducibility, eval gates, rollback and provider failure.

BEAST disposition: ADAPT. This dossier defines architecture lessons and verification; it does not mark implementation complete.
