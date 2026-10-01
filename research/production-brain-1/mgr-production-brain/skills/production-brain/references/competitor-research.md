# BEAST research wave: production planning

Inspected 2026-10-01. This supersedes the earlier blueprint's ambiguous competitor name: **YouArt** is the requested competitor. MiniMax Design and the separate MiniMax-AI open skills are tracked independently. The earlier blueprint remains historical; this package is the implementation source of truth for the scoped 0.1 release.

## What was inspected

Selected public source files, not complete competitor systems: Higgsfield generation skill and prompt guide; SDK HTTP transport and upload tests; MiniMax frontend skill, video helper, asset prompt guide and MIT license. Exact Git blob identifiers are in `source-index.json`. Official API and product pages are linked below. Upstream tests were read, not executed. No private desktop code, paid templates, authenticated model calls or internal studio pipeline was inspected.

MGR Create OS inspection included README, AGENTS, the BEAST contract, JEV restrictions, WORK-STATE, BuildList, BUILD-QUEUE, AUDIT-LEDGER, asset/context/continuity specification, package manifest and bootstrap entrypoint. Its existing context/lock/provenance/provider responsibilities constrain this companion's placement. Historical repository CI records are not fresh integration evidence.

## Comparative decisions

| Candidate | Evidence and useful lesson | Decision | Boundary |
|---|---|---|---|
| Higgsfield public skills | Typed generation workflows and mode-aware prompting; website skill already has motion planning | ADAPT ideas with independent code | Skills are MIT; SDK is Apache-2.0; hosted models have separate terms |
| Higgsfield MCP/DCC bundle | Official page advertises 11 production workflows spanning DCC applications | STUDY; optional MCP connection | Advertised workflows are not locally tested integrations |
| MiniMax Design | Official desktop product/canvas description | STUDY | No verified open source for this desktop product located |
| MiniMax open skills | Frontend process plus executable video helper inspected | ADAPT selected concepts | MIT applies to that repository, not all MiniMax products |
| MiniMax H3/Context IR | Documented distinction between video generation and prompt enhancement | ADAPT API contract; prompt expansion optional | Prompt enhancement implementation is closed; no generation executed |
| YouArt | Official MCP, agent workflow and typed canvas documentation | ADAPT graph/revision concepts; optional official connection | No open license for private engine/templates established |
| Motionsites | Public lesson describes a prompt-to-builder workflow | STUDY | Paid library excluded; no template acquisition |
| Creation OS | Canonical contexts, locks, provenance and provider abstractions already exist | ADOPT ownership boundary | Runtime bridge still needs tests against actual service |
| USD / OTIO / OCIO / ACES | Scene, editorial and color standards serve distinct roles | STUDY for adapter tracks | No adapter is installed or certified |
| VBench / StoryDiffusion | Evaluation dimensions and continuity research candidates | STUDY | No downloaded weights, dataset evaluation or GPU run |

## Findings that changed the implementation

1. A new prompting wrapper alone is insufficient: competitors already plan motion and organize workflows. The native deliverable preserves explicit requirements, revision history and dependency impact across shots and website assets.
2. Provider prompt prose and structural controls are different. The compiler retains mandatory controls and fails unsupported mappings. It never labels a requested camera path as guaranteed execution.
3. H3 and H3-Max differ in documented settings. Media mode and ratio interactions need explicit checks. The first release restricts executable-looking request drafts to text-only; media validation is a separate unfinished capability.
4. The inspected MiniMax helper tracks timeout by accumulated sleep intervals; request duration is outside that counter. It downloads full response bytes in memory. These are static findings, not measured production incidents. Future execution needs monotonic deadlines and bounded downloads.
5. The inspected Higgsfield transport retries according to status and attempt; that layer alone does not establish paid-request idempotency. Upload tests intentionally separate API authorization from storage upload headers. Preserve those boundaries in a future executor.
6. The MiniMax frontend skill's broad GPU-only wording for filters/clip-path should not become a rule. Browser paint/compositing measurements determine actual performance. Its design-style bans also should not override user intent.
7. MiniMax Context IR can revise intent. MGR must compare any expansion against the canonical plan before generation; it cannot transfer ownership of requirements to a vendor.

## Sixteen-field packets

### P1 — Portable preproduction and revisions (SPECIFIED; local implementation tested)

1. **Definition:** Structured plan, deterministic validation, lock comparison, prompt/site compilation and transitive change impact.
2. **Production use:** Maintain explicit choices and dependencies between creative revisions; does not guarantee semantic or rendered continuity.
3. **Standards:** JSON, JSON-pointer paths, DAG invariants; align ownership with Creation OS's immutable AssetVersion/context locks. Digest encoding is package-specific.
4. **Research/papers:** StoryDiffusion is a continuity candidate, not required for graph correctness; learned identity consistency remains a separate open track.
5. **Open implementations:** Higgsfield/MiniMax selected skills; MGR canonical specifications. Native code is independently authored.
6. **Models:** Host agent interprets natural language. No model is bundled or trained by the local engine.
7. **Datasets:** Authored three-shot film/site fixture and adversarial mutations; insufficient for general language or visual-quality evaluation.
8. **Licensing:** No third-party implementation copied into plugin. Assets retain rights declarations but rights are not attested by the engine.
9. **APIs/providers:** Neutral handoff supports later tool mapping; no canonical source of truth depends on a vendor.
10. **Native alternative:** Implement plan validation, stable serialization, graph closure and immutable comparison locally. Selected.
11. **Runtime:** Node 24.21.0 tested, CPU only, no package install, no GPU or network required.
12. **Cost:** Local checks incur no generation credits. Host-agent usage, storage and later rendering costs remain external and unmeasured.
13. **Failure modes:** Lost mandatory controls, deleted locks, stale ancestors, cycles, malformed beats, caller-supplied false prior revision.
14. **Evaluation:** Exact invariant tests and inspected compiled artifacts; no semantic accuracy percentage asserted.
15. **Placement:** Companion planning skill upstream of Creation OS execution. Prior-revision authenticity and overrides stay in canonical service.
16. **Acceptance:** Passing malformed/lock/graph/compilation tests and actual CLI handoff inspection. Live canonical integration remains separate.

### P2 — MiniMax text-only provider mapping (SPECIFIED; local implementation tested)

1. **Definition:** Translate a checked shot into a documented H3 request draft without silent substitution.
2. **Production use:** Preflight before an authenticated, separately authorized submission.
3. **Standards:** Provider JSON schema/HTTP bearer interface; generation and prompt-enhancement tasks are distinct.
4. **Research/papers:** No paper needed to reproduce documented request validation; comparative perceptual quality remains open.
5. **Open implementations:** MiniMax frontend video helper inspected as operational evidence; it targets a different API generation and is not used as H3 truth.
6. **Models:** Explicit H3 and H3-Max selection; no universal best-model claim.
7. **Datasets:** Authored constraint-boundary cases, not provider conformance or video benchmarks.
8. **Licensing:** Public documentation informs independent checks. Access and outputs remain subject to provider/account terms; closed prompt enhancer is not copied.
9. **APIs/providers:** Official V2 generation and Context IR sources below; exact generation endpoint preserved in code.
10. **Native alternative:** Own intent and compatibility checks; rent synthesis only when needed.
11. **Runtime:** Drafts require local Node; generation would require network and authorized account.
12. **Cost:** No live quote obtained; account price and credits are unknown. Budget checker cannot authenticate a quote.
13. **Failure modes:** Incompatible settings/media modes, unsupported required controls, provider drift, expired quote, ambiguous paid POST outcome.
14. **Evaluation:** Positive and negative local mapping tests; actual provider acceptance and output quality untested.
15. **Placement:** Boundary after neutral planning; adapter cannot rewrite approved facts.
16. **Acceptance:** Local compiler proves its rules; live schema refresh, authenticated conformance and rendered checks are required before claiming integration.

### P3 — Higgsfield/YouArt MCP boundary (SPECIFIED configuration; live integration BLOCKED)

1. **Definition:** Connect official tools while retaining MGR plan ownership.
2. **Production use:** Discover tools, map verified fields, execute authorized jobs and reconcile results.
3. **Standards:** MCP Streamable HTTP; OAuth/account connection where required.
4. **Research/papers:** Protocol and provider docs are primary; no model paper required for transport selection.
5. **Open implementations:** Higgsfield SDK transport/upload tests inspected; YouArt core source unavailable to this study.
6. **Models:** Runtime catalog must be discovered; no fixed cross-provider equivalence assumed.
7. **Datasets:** A future canary plan must cover each tool role; no live dataset run yet.
8. **Licensing:** Public SDK/skill licenses do not grant rights to closed services, model weights or paid templates.
9. **APIs/providers:** Official endpoints are present in mcp.json; no guessed tool names.
10. **Native alternative:** Keep dependency graph, context and policy local; providers replaceable through explicit contracts.
11. **Runtime:** MCP-capable host, internet and authorized provider accounts. DCC workflows additionally require their applications.
12. **Cost:** YouArt documents normal generation credits for MCP; account-specific rates unverified. No credits spent.
13. **Failure modes:** Login mistaken for tool authorization, token leakage, schema drift, expired media URLs, duplicate submissions, unauthenticated callbacks.
14. **Evaluation:** Endpoint provenance checked; authentication, tool list and job lifecycle not tested.
15. **Placement:** Optional connector layer after planning; not a substitute for Creation OS authorization.
16. **Acceptance:** Account connection, actual tool discovery and a budget-approved canary reconciled to durable output. Configuration alone does not pass.

### P4 — Motion website production (SPECIFIED planning fields; build/visual quality OPEN)

1. **Definition:** Convert a brief into routes, real controls, asset mapping and accessible motion requirements.
2. **Production use:** Handoff to site builder with acceptance criteria and functional states.
3. **Standards:** Semantic HTML, browser rendering behavior, relevant WCAG criteria; no conformance certification.
4. **Research/papers:** Browser performance guidance and W3C interpretation inform the scoped brief; no empirical conversion study performed.
5. **Open implementations:** Higgsfield website and MiniMax frontend workflows inspected; public Motionsites lesson provides comparison.
6. **Models:** Host language model drafts; image/video generation optional, model-independent.
7. **Datasets:** One authored site brief with three routes; no multi-site usability dataset.
8. **Licensing:** Independent design method; paid template collections not included.
9. **APIs/providers:** Installed Sites/coding workflow can consume brief; contact service must be explicitly configured.
10. **Native alternative:** Own requirement-to-component mapping and verification evidence rather than a vendor prompt library.
11. **Runtime:** Brief generation uses Node/host agent; built site needs browser and chosen frontend runtime.
12. **Cost:** No hosting or frontend dependencies incurred by this package; later media/hosting cost depends on implementation.
13. **Failure modes:** Fake form success, video-only content, motion without fallback, hover-only actions, unmeasured performance claims.
14. **Evaluation:** Local completeness tests now; browser keyboard/mobile/loading/error/performance checks later.
15. **Placement:** Parallel website branch sharing canonical context/assets with film, not a video prompt masquerading as a website.
16. **Acceptance:** Planning fields checked. Complete website requires deployed or runnable implementation and actual browser verification.

## Recursive open research

Feature-film craft remains larger than this release: performance capture, rigging, physically based shading, simulation, deep compositing, editorial conform, color interchange and sound mixing each need separate source/implementation/evaluation work. Public studio product pages do not establish complete pipeline understanding. No claim of surpassing Avatar, X-Men, Pixar, Higgsfield, MiniMax or YouArt is supported yet.

Primary sources: https://higgsfield.ai/mcp ; https://docs.higgsfield.ai/docs ; https://www.youart.ai/mcp ; https://www.youart.ai/tutorial/agent-and-workflow-guides ; https://youart.ai/tutorial/canvas-and-nodes ; https://design.minimax.io/ ; https://platform.minimax.io/docs/api-reference/video-generation-v2-create ; https://platform.minimax.io/docs/api-reference/video-generation-v2-h3-context-ir ; https://motionsites.ai/lesson/build-animated-website-with-motionsites ; https://openusd.org/release/intro.html ; https://github.com/AcademySoftwareFoundation/OpenTimelineIO ; https://opencolorio.org ; https://docs.acescentral.com/background/overview/ ; https://renderman.pixar.com/product ; https://github.com/Vchitect/VBench ; https://storydiffusion.github.io/ ; https://web.dev/articles/animations-guide ; https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html .
