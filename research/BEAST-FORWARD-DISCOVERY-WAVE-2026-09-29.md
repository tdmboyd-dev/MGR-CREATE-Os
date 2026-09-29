# BEAST Forward Discovery Wave — 2026-09-29

This wave intentionally goes beyond Pyxa / Firefly / Creatify / Muse / Bluehost / OpenArt.

## New universities

### TensorZero
Open-source LLMOps stack combining gateway, observability, evaluation, experimentation and optimization. Strong fit for MGR's requirement that routing quality be measured, not guessed.

Disposition: PROTOTYPE against LiteLLM and managed gateways behind the MGR ProviderCapability/DecisionEngine contract.

### E2B / Daytona / Modal / Fly-style sandboxes
The 2026 sandbox market confirms that "sandbox" is not one primitive. Important dimensions are kernel/isolation boundary, default-deny egress, tenant isolation, scoped secrets, persistence/checkpointing, GPU support, cold start and total operating cost.

Disposition: do not hard-code one vendor. Creation OS SandboxProfile now models tenant isolation, egress, secrets and persistence so E2B/Firecracker, gVisor/Modal, managed sandboxes and future providers can be compared.

### World Labs Marble / spatial intelligence
Persistent navigable generated worlds reinforce the MGR Persistent Scene Universe direction. Explicit scene graphs and learned world models are complementary: scene graphs give deterministic production control; world models offer generative/spatial synthesis.

Disposition: STUDY/ADAPT. Keep explicit SceneGraph/WorldVersion contracts and allow world-model adapters.

### Runway Aleph 2.0 / Edit Studio
Modern video editing is moving toward localized natural-language edits with sequence preservation across shots. Useful product lesson: preview/refine a reference frame before committing the edit across the whole sequence.

Disposition: ADAPT into MGR video-edit pipeline:
select/edit target -> reference-frame preview -> approved edit intent -> sequence propagation -> locality/continuity verification.

### AdCreative.ai and the broader creative-performance category
The market continues converging on creative generation + performance prediction/feedback. Marketing claims must not be treated as causal proof. MGR should learn from first-party campaign outcomes with delivery context attached.

Disposition: STUDY product workflow, keep MGR CreativeDNA/PerformanceObservation first-party and evidence-based.

## Architecture consequences
1. MGR should not build raw infrastructure when mature replaceable primitives already exist.
2. MGR must own the contracts, rights/privacy rules, data/evidence, evaluations and routing decisions.
3. Learned world models do not replace persistent deterministic scene state.
4. AI video editing needs edit-locality and preservation verification, not only visual appeal.
5. Agent sandbox security is multi-boundary: isolation + egress + tenant + secrets.
6. Routing/gateway selection should be benchmarked against the same MGR workload suite.

## Research status
These are FORWARD discoveries. They are not declared production dependencies until repository/license/benchmark/provider-specific bake-offs complete.
