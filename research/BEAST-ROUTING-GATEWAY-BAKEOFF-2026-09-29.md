# BEAST Routing / Gateway Bake-off — 2026-09-29

MGR owns ProviderCapabilitySnapshot, tenant policy, rights/privacy constraints, JEV decisions, task-quality evals, CostLedger, route evidence and promotion/rollback.

Research candidates:
- TensorZero: gateway + observability + feedback + eval + experimentation. Prototype first because it aligns routing with measured outcomes.
- LiteLLM: broad provider compatibility, load balancing, cooldowns, retries, fallbacks and rate tracking. Prototype.
- Vercel AI Gateway: managed multi-model lane with provider failover, cost/latency/availability routing and privacy controls. Keep as adapter.
- Hugging Face Inference Providers: routed/BYOK multi-provider lane tied to the model ecosystem. Keep as adapter.

Recommendation: do not rewrite every gateway feature. Put an MGR-owned control contract around pluggable gateway adapters, then benchmark TensorZero and LiteLLM against Vercel/HF on the same workloads.

Evidence required: capability coverage, p50/p95 latency, failover, 429/timeout/5xx handling, concurrency, cost accuracy, tool/streaming fidelity, multimodal coverage, telemetry, privacy and operating cost.

No hard-coded free/unlimited inventory is canonical.
