# BEAST University Evidence Ledger — Categories 1–35

This ledger is the external evidence backbone for the first 35 build categories. Individual category dossiers inherit these sources and must add narrower sources when implementation choices are made.

## Durable execution / workflow / agent state
- Temporal docs & AI reference architecture — durable workflows, Activities, task queues, retries, signals/updates, crash recovery: https://docs.temporal.io/ and https://go.temporal.io/platform-hub/ai-engineering/ai-reference-architecture
- LangGraph — explicit state graphs, persistence/checkpoints, interrupts/time travel: https://docs.langchain.com/oss/python/langgraph/
- n8n — executions, sub-workflows, integrations and workflow operations: https://docs.n8n.io/

## Event / lineage / observability
- CloudEvents 1.0 — required id/source/specversion/type and duplicate semantics: https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md
- OpenLineage 1.53 — Run/Job/Dataset model, facets and exact lineage edges: https://openlineage.io/docs/spec/
- OpenTelemetry semantic conventions — common trace/metric/log naming including GenAI conventions: https://opentelemetry.io/docs/concepts/semantic-conventions/

## Policy / isolation / tenancy
- Open Policy Agent decision logs — decision IDs, policy/bundle revision and auditability: https://www.openpolicyagent.org/docs/management-decision-logs
- gVisor — application-kernel isolation for untrusted/container workloads; containers alone are not a sufficient sandbox: https://gvisor.dev/docs/architecture_guide/intro/
- Firecracker — microVM isolation plus seccomp/cgroups/namespaces/jailing: https://github.com/firecracker-microvm/firecracker/blob/main/docs/design.md
- PostgreSQL Row-Level Security — per-row access policy and default-deny behavior when enabled without matching policy: https://www.postgresql.org/docs/17/ddl-rowsecurity.html

## Models / training / media runtime / routing
- Hugging Face Model Cards — intended use, limitations, training data/parameters, license and eval metadata: https://huggingface.co/docs/hub/model-cards
- Hugging Face Dataset Cards — license/language/size/context/bias metadata: https://huggingface.co/docs/hub/datasets-cards
- Hugging Face Evaluate — leaderboards/model-card results and custom evaluation tooling: https://huggingface.co/docs/evaluate/
- Diffusers ModularPipeline — composable/lazy model components, multiple workflows, dynamic component/memory management: https://huggingface.co/docs/diffusers/main/modular_diffusers/modular_pipeline
- Diffusers LoRA — multiple named adapters, weights, enable/disable/device movement: https://huggingface.co/docs/diffusers/api/loaders/lora
- Diffusers quantization/offload — hardware-aware model loading: https://huggingface.co/docs/diffusers/api/quantization
- MLflow Model Registry — model lineage, versions, aliases, tags, promotion/rollback concepts: https://mlflow.org/docs/latest/ml/model-registry
- LiteLLM — multi-provider gateway, router retries/fallbacks, multi-tenant spend/cost controls: https://docs.litellm.ai/

## Evaluation / verification / repair
- MLflow GenAI Evaluation — traces, built-in/custom LLM judges, code scorers, human-alignment workflow and scorer versioning: https://mlflow.org/docs/latest/genai/eval-monitor/scorers/
- Ragas metrics — retrieval, faithfulness, multimodal, tool-call and agent-goal metrics: https://docs.ragas.io/en/latest/concepts/metrics/available_metrics/

## Creative production / assets / review
- Adobe Firefly Creative Production Workflow API — published workflow versions, batch execution, concurrency/priority, progress, cancel and per-asset errors/results: https://developer.adobe.com/firefly-services/docs/workflow-builder-api/
- Autodesk Flow Production Tracking — central assets/shots/tasks/budgets/timelines and connected review/version comparison: https://www.autodesk.com/products/flow-production-tracking/overview
- Autodesk 2026 Review update — version comparison, feedback and distributed collaboration: https://blogs.autodesk.com/media-and-entertainment/2026/06/29/new-review-and-collaboration-tools-in-flow-production-tracking/

## Research engine
- GPT Researcher — planner/execution agents, parallel source gathering, source tracking, deep recursive breadth/depth research, reviewer/reviser/writer separation: https://github.com/assafelovic/gpt-researcher

## Rights / integrity
- SPDX 3.0.1 license expressions — machine-readable AND/OR/WITH license combinations: https://spdx.github.io/spdx-spec/v3.0.1/annexes/spdx-license-expressions/
- Sigstore/SLSA remain implementation-evaluation targets for artifact signing/attestation; UCT design should not invent a proprietary crypto trust model when interoperable standards can be adapted.

## Key cross-category conclusions
1. Creation OS should own canonical domain contracts while durable execution, model providers, connectors and storage are replaceable adapters.
2. Fixed historical counts for sandboxes/operators/patterns are not architecture; registries are.
3. CINEFORGE needs durable orchestration beneath agent reasoning.
4. UCOS needs deterministic layered resolution.
5. UCT must become verifiable lineage + integrity, not only a token string.
6. Verification requires deterministic validators plus calibrated model judges where appropriate; judge-only proof is insufficient.
7. Untrusted code/media tooling needs real isolation profiles; ordinary containers are not automatically safe sandboxes.
8. Model lifecycle must record license, data lineage, evals, hardware, version and promotion state.
9. Asset/version/review semantics should resemble professional production tracking, with feedback bound to exact versions.
10. Research itself needs planner/executor/reviewer separation, evidence tracking, breadth/depth controls and progress state.
