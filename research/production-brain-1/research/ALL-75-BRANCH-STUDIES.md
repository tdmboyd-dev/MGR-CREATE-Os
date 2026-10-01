# MGR Production Brain1:75 individual branch studies

75 individual production branch studies and primary-source observations; research closure, implementation and verification remain independently gated.

This is an engineering study and implementation specification. Populated fields and source links do not close uninspected children or establish output quality. Remaining evidence is explicit for each branch.

## PR-INTENT-01 — Semantic requirement extraction

Selected method: Keep source spans for every requested fact; separate host-inferred choices and unresolved references. Bind requirements to shot/route IDs and validate all locks against the prior canonical revision.

Alternative/tradeoff: Host semantic interpretation handles paraphrases; a keyword parser cannot safely resolve negation or pronouns. Deterministic span validation supplies traceability, not semantic understanding.

Sources: plugin-research, cos-research, avatar-asc, minimax-context-ir

**definition**: Semantic requirement extraction. Required knowledge: Separate requested facts, inferred choices and unknowns; map each requirement to a deliverable

**productionUse**: Keep source spans for every requested fact; separate host-inferred choices and unresolved references. Bind requirements to shot/route IDs and validate all locks against the prior canonical revision.

**standards**: Plan schema, JSON pointers, dependency DAG and canonical context ownership.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Keep source spans for every requested fact; separate host-inferred choices and unresolved references. Bind requirements to shot/route IDs and validate all locks against the prior canonical revision. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Paraphrase, negation, pronoun ambiguity, contradictory identity, and dropped locked requirement. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Host semantic interpretation handles paraphrases; a keyword parser cannot safely resolve negation or pronouns. Deterministic span validation supplies traceability, not semantic understanding.

**runtime**: Catalog/planning tools run in Node without GPU. Provider execution, browser/DCC tests and metric runtimes remain separate.

**cost**: Linear span checks plus graph traversal; host interpretation latency and error rate measured separately.

**failureModes**: Paraphrase, negation, pronoun ambiguity, contradictory identity, and dropped locked requirement.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: A rights-cleared semantic benchmark with independently annotated paraphrases and ambiguous references is still needed.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: A paraphrase/ambiguity dataset retains every locked requirement

**Remaining evidence**: A rights-cleared semantic benchmark with independently annotated paraphrases and ambiguous references is still needed.

## PR-INTENT-02 — Contradiction and feasibility resolution

Selected method: Represent mandatory constraints as typed predicates on dimensions, duration, action beats, identity and required controls. Report the smallest identifiable contradictory set without silently relaxing a mandatory constraint.

Alternative/tradeoff: Rule checks are explainable for typed constraints; a general solver adds value only after constraint semantics and units are encoded. A model suggestion cannot establish feasibility.

Sources: plugin-research, cos-research, avatar-asc, minimax-context-ir

**definition**: Contradiction and feasibility resolution. Required knowledge: Detect incompatible actions, timing, formats and unsupported mandatory controls

**productionUse**: Represent mandatory constraints as typed predicates on dimensions, duration, action beats, identity and required controls. Report the smallest identifiable contradictory set without silently relaxing a mandatory constraint.

**standards**: Plan schema, JSON pointers, dependency DAG and canonical context ownership.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Represent mandatory constraints as typed predicates on dimensions, duration, action beats, identity and required controls. Report the smallest identifiable contradictory set without silently relaxing a mandatory constraint. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Positive and negative requirements for the same action; duration shorter than beat sum; unsupported exact camera control; incompatible output dimensions. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Rule checks are explainable for typed constraints; a general solver adds value only after constraint semantics and units are encoded. A model suggestion cannot establish feasibility.

**runtime**: Catalog/planning tools run in Node without GPU. Provider execution, browser/DCC tests and metric runtimes remain separate.

**cost**: Predicate checks scale with constraints; exhaustive minimum-conflict search may be exponential and requires limits.

**failureModes**: Positive and negative requirements for the same action; duration shorter than beat sum; unsupported exact camera control; incompatible output dimensions.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Complete semantic conflict extraction beyond the implemented structural plan validator.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Contradictory shot constraints fail with an actionable explanation

**Remaining evidence**: Complete semantic conflict extraction beyond the implemented structural plan validator.

## PR-INTENT-03 — Story and shot decomposition

Selected method: Create causal start/end state transitions and a motivated shot purpose, then allocate integer-frame beats, spatial continuity, reaction coverage and editorial dependencies before synthesis.

Alternative/tradeoff: A storyboard or animatic exposes staging/timing errors cheaply; independently generated pretty shots can conceal broken causal continuity.

Sources: plugin-research, cos-research, avatar-asc, minimax-context-ir

**definition**: Story and shot decomposition. Required knowledge: Narrative cause/effect, staging, beat allocation and editorial purpose

**productionUse**: Create causal start/end state transitions and a motivated shot purpose, then allocate integer-frame beats, spatial continuity, reaction coverage and editorial dependencies before synthesis.

**standards**: Plan schema, JSON pointers, dependency DAG and canonical context ownership.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Create causal start/end state transitions and a motivated shot purpose, then allocate integer-frame beats, spatial continuity, reaction coverage and editorial dependencies before synthesis. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Door opens before hand reaches it; character changes screen direction without bridge; reaction omitted; dialogue exceeds shot length. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: A storyboard or animatic exposes staging/timing errors cheaply; independently generated pretty shots can conceal broken causal continuity.

**runtime**: Catalog/planning tools run in Node without GPU. Provider execution, browser/DCC tests and metric runtimes remain separate.

**cost**: Previs resolution lowers render cost; include human review and revision time in budget.

**failureModes**: Door opens before hand reaches it; character changes screen direction without bridge; reaction omitted; dialogue exceeds shot length.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Actual animatic craft review and measured narrative comprehension on multiple briefs.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: An animatic reads coherently and every shot has a purpose

**Remaining evidence**: Actual animatic craft review and measured narrative comprehension on multiple briefs.

## PR-INTENT-04 — Prompt expansion and semantic diff

Selected method: Compare structured entity/action/claim requirements in the provider-expanded prompt against approved facts and locks; require explicit report of additions, omissions and changed polarity.

Alternative/tradeoff: String diff catches spelling changes but cannot prove semantic equivalence. Host semantic comparison plus typed requirement mapping is the selected boundary.

Sources: plugin-research, cos-research, avatar-asc, minimax-context-ir

**definition**: Prompt expansion and semantic diff. Required knowledge: Compare vendor-enhanced prompts against approved context and exceptions

**productionUse**: Compare structured entity/action/claim requirements in the provider-expanded prompt against approved facts and locks; require explicit report of additions, omissions and changed polarity.

**standards**: Plan schema, JSON pointers, dependency DAG and canonical context ownership.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Compare structured entity/action/claim requirements in the provider-expanded prompt against approved facts and locks; require explicit report of additions, omissions and changed polarity. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Identity replaced, action negated, unsupported advertising claim injected, attire changed and source prompt reordered without meaning change. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: String diff catches spelling changes but cannot prove semantic equivalence. Host semantic comparison plus typed requirement mapping is the selected boundary.

**runtime**: Catalog/planning tools run in Node without GPU. Provider execution, browser/DCC tests and metric runtimes remain separate.

**cost**: Token and interpretation cost per expansion; retain both prompt versions to localize regressions.

**failureModes**: Identity replaced, action negated, unsupported advertising claim injected, attire changed and source prompt reordered without meaning change.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Provider expansion canaries and independently judged semantic-diff recall across paraphrases.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Injected or changed identities, claims or actions are reported before submission

**Remaining evidence**: Provider expansion canaries and independently judged semantic-diff recall across paraphrases.

## PR-INTENT-05 — Revision invalidation

Selected method: Hash canonical node/context/reference inputs and traverse reverse dependency edges after a revision. Revoke downstream approvals and preserve independent branches.

Alternative/tradeoff: Whole-project invalidation is safe but wasteful; content and dependency hashes enable bounded regeneration while retaining audit history.

Sources: plugin-research, cos-research, avatar-asc, minimax-context-ir

**definition**: Revision invalidation. Required knowledge: Dependency closure across shots, assets, site components and approvals

**productionUse**: Hash canonical node/context/reference inputs and traverse reverse dependency edges after a revision. Revoke downstream approvals and preserve independent branches.

**standards**: Plan schema, JSON pointers, dependency DAG and canonical context ownership.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Hash canonical node/context/reference inputs and traverse reverse dependency edges after a revision. Revoke downstream approvals and preserve independent branches. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Diamond graph, shared texture, unchanged sibling shot, deleted reference and changed locked context. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Whole-project invalidation is safe but wasteful; content and dependency hashes enable bounded regeneration while retaining audit history.

**runtime**: Catalog/planning tools run in Node without GPU. Provider execution, browser/DCC tests and metric runtimes remain separate.

**cost**: O(vertices+edges); compare saved render cost against graph bookkeeping.

**failureModes**: Diamond graph, shared texture, unchanged sibling shot, deleted reference and changed locked context.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Approval revocation must be wired to the canonical Creation OS approval service, beyond local impact reporting.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Changing an upstream asset invalidates every dependent approval and leaves unrelated work intact

**Remaining evidence**: Approval revocation must be wired to the canonical Creation OS approval service, beyond local impact reporting.

## PR-PROVIDER-01 — Capability snapshot discovery

Selected method: Record dated tools/list schemas, model identifier, accepted reference roles, control precision, formats and transport. Route mandatory requirements only when the snapshot explicitly supports them.

Alternative/tradeoff: Marketing presets are useful leads but cannot stand in for a tool schema or proof of exact motion. Unknown capability blocks that route.

Sources: plugin-research, mcp-oauth, hf-discovery, hf-idempotency, hf-lifecycle, hf-errors, hf-polling, hf-webhooks, hf-billing, minimax-h3-query, minimax-h3-delete, youart-mcp

**definition**: Capability snapshot discovery. Required knowledge: Model/tool schemas, freshness, input roles and explicit unsupported fields

**productionUse**: Record dated tools/list schemas, model identifier, accepted reference roles, control precision, formats and transport. Route mandatory requirements only when the snapshot explicitly supports them.

**standards**: Selected MCP2025-06-18 HTTP authorization, resource audience, tool schemas, durable request identity, absolute deadlines and integer currency amounts.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Record dated tools/list schemas, model identifier, accepted reference roles, control precision, formats and transport. Route mandatory requirements only when the snapshot explicitly supports them. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: Live model identifiers, limits and schema are unresolved until authenticated discovery; never substitute guessed IDs.

**datasets**: Own/admitted positive and hard-negative fixtures: Stale schema; removed model; text-only model given first/last frames; camera requirement supported only as prompt text. Independent labels and rights are required for evaluation assets.

**licensing**: Provider service terms and submitted-asset rights must be admitted per account. Public helpers do not confer provider access or ownership. No third-party code copied.

**providers**: Higgsfield and YouArt optional MCP endpoints; MiniMax documented API. Live schemas/accounts and current costs remain separate.

**nativeAlternative**: Marketing presets are useful leads but cannot stand in for a tool schema or proof of exact motion. Unknown capability blocks that route.

**runtime**: Catalog/planning tools run in Node without GPU. Provider execution, browser/DCC tests and metric runtimes remain separate.

**cost**: Discovery calls and snapshot refresh time; no generation cost incurred by research.

**failureModes**: Stale schema; removed model; text-only model given first/last frames; camera requirement supported only as prompt text.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Authenticated live schemas and per-provider non-paid discovery execution.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Unavailable mandatory capability blocks routing; no silent fallback

**Remaining evidence**: Authenticated live schemas and per-provider non-paid discovery execution.

## PR-PROVIDER-02 — OAuth and tool authorization

Selected method: Use protected-resource metadata discovery, OAuth server metadata, PKCE and resource-bound tokens through the host connection layer. Validate issuer, audience, expiry and required scopes at the responsible server.

Alternative/tradeoff: Reusing a website session or passing another resource token is rejected. A local JSON receipt is bookkeeping and never token validation.

Sources: plugin-research, mcp-oauth, hf-discovery, hf-idempotency, hf-lifecycle, hf-errors, hf-polling, hf-webhooks, hf-billing, minimax-h3-query, minimax-h3-delete, youart-mcp

**definition**: OAuth and tool authorization. Required knowledge: Transport, token audience, scopes and account connection lifecycle

**productionUse**: Use protected-resource metadata discovery, OAuth server metadata, PKCE and resource-bound tokens through the host connection layer. Validate issuer, audience, expiry and required scopes at the responsible server.

**standards**: Selected MCP2025-06-18 HTTP authorization, resource audience, tool schemas, durable request identity, absolute deadlines and integer currency amounts.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Use protected-resource metadata discovery, OAuth server metadata, PKCE and resource-bound tokens through the host connection layer. Validate issuer, audience, expiry and required scopes at the responsible server. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: Live model identifiers, limits and schema are unresolved until authenticated discovery; never substitute guessed IDs.

**datasets**: Own/admitted positive and hard-negative fixtures: Wrong audience, expired session, missing scope, malicious redirect and token embedded in query/log. Independent labels and rights are required for evaluation assets.

**licensing**: Provider service terms and submitted-asset rights must be admitted per account. Public helpers do not confer provider access or ownership. No third-party code copied.

**providers**: Higgsfield and YouArt optional MCP endpoints; MiniMax documented API. Live schemas/accounts and current costs remain separate.

**nativeAlternative**: Reusing a website session or passing another resource token is rejected. A local JSON receipt is bookkeeping and never token validation.

**runtime**: Catalog/planning tools run in Node without GPU. Provider execution, browser/DCC tests and metric runtimes remain separate.

**cost**: Authentication round trips; refresh failures are distinct from paid-job failures.

**failureModes**: Wrong audience, expired session, missing scope, malicious redirect and token embedded in query/log.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Live authorized connection tests for each optional provider; tokens must remain outside package and evidence.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Wrong audience/scope and expired sessions fail without secret disclosure

**Remaining evidence**: Live authorized connection tests for each optional provider; tokens must remain outside package and evidence.

## PR-PROVIDER-03 — Paid request identity and reconciliation

Selected method: Persist PREPARED and SUBMITTING before transport; bind canonical request digest and quote to a host approval receipt. Lost response becomes AMBIGUOUS and can only reconcile, never silently resubmit.

Alternative/tradeoff: Provider idempotency keys help only when provider semantics are verified. When no lookup/idempotency exists, unresolved acceptance must remain ambiguous.

Sources: plugin-research, mcp-oauth, hf-discovery, hf-idempotency, hf-lifecycle, hf-errors, hf-polling, hf-webhooks, hf-billing, minimax-h3-query, minimax-h3-delete, youart-mcp

**definition**: Paid request identity and reconciliation. Required knowledge: Submit ambiguity, idempotency support, retry classification and cancellation

**productionUse**: Persist PREPARED and SUBMITTING before transport; bind canonical request digest and quote to a host approval receipt. Lost response becomes AMBIGUOUS and can only reconcile, never silently resubmit.

**standards**: Selected MCP2025-06-18 HTTP authorization, resource audience, tool schemas, durable request identity, absolute deadlines and integer currency amounts.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Persist PREPARED and SUBMITTING before transport; bind canonical request digest and quote to a host approval receipt. Lost response becomes AMBIGUOUS and can only reconcile, never silently resubmit. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: Live model identifiers, limits and schema are unresolved until authenticated discovery; never substitute guessed IDs.

**datasets**: Own/admitted positive and hard-negative fixtures: Process restart immediately after submit; timeout before returned ID; conflicting duplicate callback; second worker starts same job. Independent labels and rights are required for evaluation assets.

**licensing**: Provider service terms and submitted-asset rights must be admitted per account. Public helpers do not confer provider access or ownership. No third-party code copied.

**providers**: Higgsfield and YouArt optional MCP endpoints; MiniMax documented API. Live schemas/accounts and current costs remain separate.

**nativeAlternative**: Provider idempotency keys help only when provider semantics are verified. When no lookup/idempotency exists, unresolved acceptance must remain ambiguous.

**runtime**: Catalog/planning tools run in Node without GPU. Provider execution, browser/DCC tests and metric runtimes remain separate.

**cost**: One durable transaction per state/event; include ambiguous charges in total cost.

**failureModes**: Process restart immediately after submit; timeout before returned ID; conflicting duplicate callback; second worker starts same job.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Official provider lookup/idempotency semantics and a live lost-response canary; offline controller is executed.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Lost submission response cannot trigger an untracked duplicate charge

**Remaining evidence**: Official provider lookup/idempotency semantics and a live lost-response canary; offline controller is executed.

## PR-PROVIDER-04 — Deadline and partial-job recovery

Selected method: Retain one absolute deadline and provider job ID; poll the existing job with bounded request time and backoff. Deadline expiry requests reconciliation/cancellation, never erases remote execution.

Alternative/tradeoff: A sleep-counter deadline misses network time. Callback delivery reduces polling but requires event identity, authentication and replay checks.

Sources: plugin-research, mcp-oauth, hf-discovery, hf-idempotency, hf-lifecycle, hf-errors, hf-polling, hf-webhooks, hf-billing, minimax-h3-query, minimax-h3-delete, youart-mcp

**definition**: Deadline and partial-job recovery. Required knowledge: Monotonic wall time, polling, callbacks, restart and cancellation races

**productionUse**: Retain one absolute deadline and provider job ID; poll the existing job with bounded request time and backoff. Deadline expiry requests reconciliation/cancellation, never erases remote execution.

**standards**: Selected MCP2025-06-18 HTTP authorization, resource audience, tool schemas, durable request identity, absolute deadlines and integer currency amounts.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Retain one absolute deadline and provider job ID; poll the existing job with bounded request time and backoff. Deadline expiry requests reconciliation/cancellation, never erases remote execution. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: Live model identifiers, limits and schema are unresolved until authenticated discovery; never substitute guessed IDs.

**datasets**: Own/admitted positive and hard-negative fixtures: Slow network, worker restart, callback after local timeout, cancellation racing successful output, expired transient output URL. Independent labels and rights are required for evaluation assets.

**licensing**: Provider service terms and submitted-asset rights must be admitted per account. Public helpers do not confer provider access or ownership. No third-party code copied.

**providers**: Higgsfield and YouArt optional MCP endpoints; MiniMax documented API. Live schemas/accounts and current costs remain separate.

**nativeAlternative**: A sleep-counter deadline misses network time. Callback delivery reduces polling but requires event identity, authentication and replay checks.

**runtime**: Catalog/planning tools run in Node without GPU. Provider execution, browser/DCC tests and metric runtimes remain separate.

**cost**: Poll count, wall clock, retry reads and storage; deadline does not guarantee remote cancellation.

**failureModes**: Slow network, worker restart, callback after local timeout, cancellation racing successful output, expired transient output URL.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Actual transport timeout/cancellation tests and authenticated callback handling.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Slow network and restarted worker produce bounded, reconciled outcomes

**Remaining evidence**: Actual transport timeout/cancellation tests and authenticated callback handling.

## PR-PROVIDER-05 — Quote and spending authority

Selected method: Quote integer minor currency units with quote ID, maximum amount, expiry and exact payload/model/capability digest. Host authority consumes the approval; settlement records actual cost and over-quote incidents.

Alternative/tradeoff: Arithmetic validation cannot grant spending authority. A changed model, payload, currency or quote requires fresh approval from the authority owner.

Sources: plugin-research, mcp-oauth, hf-discovery, hf-idempotency, hf-lifecycle, hf-errors, hf-polling, hf-webhooks, hf-billing, minimax-h3-query, minimax-h3-delete, youart-mcp

**definition**: Quote and spending authority. Required knowledge: Fresh provider quote, currency/minor units, approval binding and actual settlement

**productionUse**: Quote integer minor currency units with quote ID, maximum amount, expiry and exact payload/model/capability digest. Host authority consumes the approval; settlement records actual cost and over-quote incidents.

**standards**: Selected MCP2025-06-18 HTTP authorization, resource audience, tool schemas, durable request identity, absolute deadlines and integer currency amounts.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Quote integer minor currency units with quote ID, maximum amount, expiry and exact payload/model/capability digest. Host authority consumes the approval; settlement records actual cost and over-quote incidents. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: Live model identifiers, limits and schema are unresolved until authenticated discovery; never substitute guessed IDs.

**datasets**: Own/admitted positive and hard-negative fixtures: Price changes after preview, decimal floating-point money, changed payload, old approval reused and currency mismatch. Independent labels and rights are required for evaluation assets.

**licensing**: Provider service terms and submitted-asset rights must be admitted per account. Public helpers do not confer provider access or ownership. No third-party code copied.

**providers**: Higgsfield and YouArt optional MCP endpoints; MiniMax documented API. Live schemas/accounts and current costs remain separate.

**nativeAlternative**: Arithmetic validation cannot grant spending authority. A changed model, payload, currency or quote requires fresh approval from the authority owner.

**runtime**: Catalog/planning tools run in Node without GPU. Provider execution, browser/DCC tests and metric runtimes remain separate.

**cost**: All retries, failed jobs and repair work included; unknown settlement prevents a final cost claim.

**failureModes**: Price changes after preview, decimal floating-point money, changed payload, old approval reused and currency mismatch.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Live price source and signed/consumed host authority integration; offline bindings are tested.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Changed payload or price cannot reuse an old approval

**Remaining evidence**: Live price source and signed/consumed host authority integration; offline bindings are tested.

## PR-ASSET-01 — Byte identity and immutable storage

Selected method: Admit actual bytes into immutable content-addressed objects, then atomically publish version metadata and lineage. Rehash on export; source URL is provenance, never identity.

Alternative/tradeoff: SQLite BLOB storage is sufficient for bounded local assets; object storage with atomic metadata publication is preferable for large production media.

Sources: ffprobe-options, exr, prior-dossier, minimax-h3-create

**definition**: Byte identity and immutable storage. Required knowledge: Hash exact bytes; bind immutable object version and storage transaction

**productionUse**: Admit actual bytes into immutable content-addressed objects, then atomically publish version metadata and lineage. Rehash on export; source URL is provenance, never identity.

**standards**: Content digest, version ownership, codec/container, time base, color, EXR window/channel metadata.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Admit actual bytes into immutable content-addressed objects, then atomically publish version metadata and lineage. Rehash on export; source URL is provenance, never identity. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Same URL returns different bytes; original buffer mutated; corrupted BLOB; transaction interrupted and duplicate version. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: SQLite BLOB storage is sufficient for bounded local assets; object storage with atomic metadata publication is preferable for large production media.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: O(bytes) hashing/storage; disk amplification and backup cost measured per asset.

**failureModes**: Same URL returns different bytes; original buffer mutated; corrupted BLOB; transaction interrupted and duplicate version.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Streaming large-object admission and durable remote object storage beyond the 32 MiB local limit.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Changed bytes at same URL are detected; no URL-only integrity claim

**Remaining evidence**: Streaming large-object admission and durable remote object storage beyond the 32 MiB local limit.

## PR-ASSET-02 — Defensive registry ownership

Selected method: Defensively copy nested metadata on admission/read; enforce unique asset/version and existing same-project parent references. Preserve historic versions and optimistic revision writes.

Alternative/tradeoff: Shallow Object.freeze cannot protect nested arrays. Multi-tenant ownership requires authenticated server boundaries beyond local project IDs.

Sources: ffprobe-options, exr, prior-dossier, minimax-h3-create

**definition**: Defensive registry ownership. Required knowledge: Deep immutability, copied returns, uniqueness, tenancy and parent existence

**productionUse**: Defensively copy nested metadata on admission/read; enforce unique asset/version and existing same-project parent references. Preserve historic versions and optimistic revision writes.

**standards**: Content digest, version ownership, codec/container, time base, color, EXR window/channel metadata.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Defensively copy nested metadata on admission/read; enforce unique asset/version and existing same-project parent references. Preserve historic versions and optimistic revision writes. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Mutate returned parents, cross-project parent, duplicate version, stale writer and cyclic/nonfinite metadata. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Shallow Object.freeze cannot protect nested arrays. Multi-tenant ownership requires authenticated server boundaries beyond local project IDs.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Metadata size bounded to 4 MiB; contention measured with concurrent writers.

**failureModes**: Mutate returned parents, cross-project parent, duplicate version, stale writer and cyclic/nonfinite metadata.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Server tenancy and access-control integration; local defensive ownership and lineage are tested.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Returned nested arrays and lineage lists cannot mutate stored versions

**Remaining evidence**: Server tenancy and access-control integration; local defensive ownership and lineage are tested.

## PR-ASSET-03 — Media technical inspection

Selected method: Identify container and streams from bounded bytes; distinguish codec, dimensions, pixel format, sample aspect, rotation, color metadata and decode status. Unknown values stay unknown.

Alternative/tradeoff: The native inspector validates a strict PNG/PCM-WAVE subset. A sandboxed ffprobe plus decoder supports general media but requires admitted runtime and limits.

Sources: ffprobe-options, exr, prior-dossier, minimax-h3-create

**definition**: Media technical inspection. Required knowledge: Container versus codec, streams, dimensions, sample aspect, rotation and color metadata

**productionUse**: Identify container and streams from bounded bytes; distinguish codec, dimensions, pixel format, sample aspect, rotation, color metadata and decode status. Unknown values stay unknown.

**standards**: Content digest, version ownership, codec/container, time base, color, EXR window/channel metadata.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Identify container and streams from bounded bytes; distinguish codec, dimensions, pixel format, sample aspect, rotation, color metadata and decode status. Unknown values stay unknown. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: MP4 extension on garbage, PNG CRC error, truncated IDAT, unsupported critical chunk, malformed WAV alignment and missing color tags. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: The native inspector validates a strict PNG/PCM-WAVE subset. A sandboxed ffprobe plus decoder supports general media but requires admitted runtime and limits.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Probe/decode CPU, memory, pixel count and stdout cap; header validity does not guarantee all frames decode.

**failureModes**: MP4 extension on garbage, PNG CRC error, truncated IDAT, unsupported critical chunk, malformed WAV alignment and missing color tags.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Admit and execute a bounded full-codec probe/decoder; native subset is executed.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Disguised media, unknown metadata and forbidden codec combinations fail explicitly

**Remaining evidence**: Admit and execute a bounded full-codec probe/decoder; native subset is executed.

## PR-ASSET-04 — Frame/time interpretation

Selected method: Preserve rational stream time base and per-frame presentation timestamps. Use integer counts for CFR edits; VFR duration derives from timestamps and frame durations, not rounded nominal fps.

Alternative/tradeoff: Declared fps is adequate only for explicit CFR contracts. Container duration and average_frame_rate cannot prove exact edit timing.

Sources: ffprobe-options, exr, prior-dossier, minimax-h3-create

**definition**: Frame/time interpretation. Required knowledge: Variable frame rate, rational rates, stream duration and packet/frame counts

**productionUse**: Preserve rational stream time base and per-frame presentation timestamps. Use integer counts for CFR edits; VFR duration derives from timestamps and frame durations, not rounded nominal fps.

**standards**: Content digest, version ownership, codec/container, time base, color, EXR window/channel metadata.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Preserve rational stream time base and per-frame presentation timestamps. Use integer counts for CFR edits; VFR duration derives from timestamps and frame durations, not rounded nominal fps. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: 24000/1001 rate, nonzero start PTS, missing duration, duplicate/out-of-order timestamps, VFR and audio padding. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Declared fps is adequate only for explicit CFR contracts. Container duration and average_frame_rate cannot prove exact edit timing.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Frame scans scale with clip length; bounded interval sampling cannot certify whole-file duration.

**failureModes**: 24000/1001 rate, nonzero start PTS, missing duration, duplicate/out-of-order timestamps, VFR and audio padding.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Actual packet/frame timestamp extraction and VFR conform fixtures.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: 23.976-style rates and variable-timestamp fixtures do not silently round into wrong duration

**Remaining evidence**: Actual packet/frame timestamp extraction and VFR conform fixtures.

## PR-ASSET-05 — Bounded acquisition and probing

Selected method: Acquire into a staging object under URL/redirect/byte/time limits; reject credentials and unapproved network targets. Probe isolated local bytes with network protocols disabled and bounded output.

Alternative/tradeoff: Provider-download helpers alone do not prevent SSRF or decoder resource exhaustion. Local structural inspection avoids network but is narrower.

Sources: ffprobe-options, exr, prior-dossier, minimax-h3-create

**definition**: Bounded acquisition and probing. Required knowledge: URL egress policy, redirects, credentials, size/time/memory budgets and sandbox

**productionUse**: Acquire into a staging object under URL/redirect/byte/time limits; reject credentials and unapproved network targets. Probe isolated local bytes with network protocols disabled and bounded output.

**standards**: Content digest, version ownership, codec/container, time base, color, EXR window/channel metadata.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Acquire into a staging object under URL/redirect/byte/time limits; reject credentials and unapproved network targets. Probe isolated local bytes with network protocols disabled and bounded output. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Redirect to private host, decompression bomb, growing file, huge dimensions, timeout and truncated stream. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Provider-download helpers alone do not prevent SSRF or decoder resource exhaustion. Local structural inspection avoids network but is narrower.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Enforce byte, pixel, duration, memory and wall-clock budgets independently.

**failureModes**: Redirect to private host, decompression bomb, growing file, huge dimensions, timeout and truncated stream.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Host-enforced DNS/IP egress controls and process-resource sandbox for a general decoder.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Oversized/truncated/malicious input terminates within limits with no unintended network access

**Remaining evidence**: Host-enforced DNS/IP egress controls and process-resource sandbox for a general decoder.

## PR-ASSET-06 — Reference-mode admission

Selected method: Validate each reference role against the selected model input mode, media type, per-item limits and aggregate totals. Bind admitted digest and role in the request hash.

Alternative/tradeoff: A model accepting reference images does not imply it accepts first/last conditioning simultaneously or exact semantic identity locking.

Sources: ffprobe-options, exr, prior-dossier, minimax-h3-create

**definition**: Reference-mode admission. Required knowledge: Role/type compatibility, per-item and aggregate provider limits

**productionUse**: Validate each reference role against the selected model input mode, media type, per-item limits and aggregate totals. Bind admitted digest and role in the request hash.

**standards**: Content digest, version ownership, codec/container, time base, color, EXR window/channel metadata.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Validate each reference role against the selected model input mode, media type, per-item limits and aggregate totals. Bind admitted digest and role in the request hash. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Mixed first/last and reference mode, video where image required, excessive aggregate bytes and duplicate role. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: A model accepting reference images does not imply it accepts first/last conditioning simultaneously or exact semantic identity locking.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Reference upload bytes, retained storage and provider reference fees measured separately.

**failureModes**: Mixed first/last and reference mode, video where image required, excessive aggregate bytes and duplicate role.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Live provider schemas and measured behavior for each reference mode.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Mixed first/last and reference modes, wrong media types and over-limit totals fail

**Remaining evidence**: Live provider schemas and measured behavior for each reference mode.

## PR-CAMERA-01 — Camera units and coordinate conversion

Selected method: Canonicalize world units, up axis, handedness and c2w/w2c. USD cameras look along -Z with +Y local up; filmback/focal values are tenths of stage units, so convert all optical lengths together.

Alternative/tradeoff: Blender metre scenes and USD centimetre defaults require explicit conversion. CameraCtrl +Z ray convention needs a declared basis transform, not an accidental image flip.

Sources: camera-plucker, usd-camera, usd-metrics, camera-paper, camera-runtime

**definition**: Camera units and coordinate conversion. Required knowledge: World units, handedness, axis conventions, w2c/c2w, lens/sensor units

**productionUse**: Canonicalize world units, up axis, handedness and c2w/w2c. USD cameras look along -Z with +Y local up; filmback/focal values are tenths of stage units, so convert all optical lengths together.

**standards**: Right-handed coordinate conventions, explicit c2w/w2c and stage units; USD camera optical values in tenths of stage unit. Declare scene/path/estimator digests.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Canonicalize world units, up axis, handedness and c2w/w2c. USD cameras look along -Z with +Y local up; filmback/focal values are tenths of stage units, so convert all optical lengths together. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: CameraCtrl/AnimateDiff or SVD are studied candidates, with old CUDA-dependent environment and separately admitted weights. Prompt presets are not exact pose control.

**datasets**: Own/admitted positive and hard-negative fixtures: Metres versus centimetres, Y-up/Z-up, inverse matrix mistaken as pose, mirrored basis and only focal length converted. Independent labels and rights are required for evaluation assets.

**licensing**: Native mathematical preflight is own code. CameraCtrl README says academic use, so learned weights are not admitted as a commercial default. USD/Blender source is studied and not vendored.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Blender metre scenes and USD centimetre defaults require explicit conversion. CameraCtrl +Z ray convention needs a declared basis transform, not an accidental image flip.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Matrix conversion is constant per camera sample; export/import and render parity dominate.

**failureModes**: Metres versus centimetres, Y-up/Z-up, inverse matrix mistaken as pose, mirrored basis and only focal length converted.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Actual USD export/import optical and world-pose round-trip.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Equivalent cameras round-trip across USD and renderer without scale or orientation drift

**Remaining evidence**: Actual USD export/import optical and world-pose round-trip.

## PR-CAMERA-02 — Trajectory structural validity

Selected method: Require finite positive optical parameters, strictly increasing samples spanning the shot and a nondegenerate look-at/up basis. Bind scene and path digests to inspection.

Alternative/tradeoff: Interpolated animation can overshoot even valid samples; continuous path validation requires evaluating the actual interpolant.

Sources: camera-plucker, usd-camera, usd-metrics, camera-paper, camera-runtime

**definition**: Trajectory structural validity. Required knowledge: Finite values, bounds, keyframe count/order, duration agreement and lens ranges

**productionUse**: Require finite positive optical parameters, strictly increasing samples spanning the shot and a nondegenerate look-at/up basis. Bind scene and path digests to inspection.

**standards**: Right-handed coordinate conventions, explicit c2w/w2c and stage units; USD camera optical values in tenths of stage unit. Declare scene/path/estimator digests.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Require finite positive optical parameters, strictly increasing samples spanning the shot and a nondegenerate look-at/up basis. Bind scene and path digests to inspection. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: CameraCtrl/AnimateDiff or SVD are studied candidates, with old CUDA-dependent environment and separately admitted weights. Prompt presets are not exact pose control.

**datasets**: Own/admitted positive and hard-negative fixtures: NaN, empty path, repeated time, out-of-range keyframe, negative lens and parallel up/look vectors. Independent labels and rights are required for evaluation assets.

**licensing**: Native mathematical preflight is own code. CameraCtrl README says academic use, so learned weights are not admitted as a commercial default. USD/Blender source is studied and not vendored.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Interpolated animation can overshoot even valid samples; continuous path validation requires evaluating the actual interpolant.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: O(samples); sample limits protect the preflight runtime.

**failureModes**: NaN, empty path, repeated time, out-of-range keyframe, negative lens and parallel up/look vectors.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Continuous interpolant validation; static linear path preflight is executed.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: NaN, empty paths, out-of-range times and invalid lenses are rejected

**Remaining evidence**: Continuous interpolant validation; static linear path preflight is executed.

## PR-CAMERA-03 — Move semantics and subject anchors

Selected method: Separate dolly translation, pan/tilt rotation, orbit around an anchor, zoom focal change and dolly-zoom compensation. Measure pose, focal/FOV and subject scale against intended move.

Alternative/tradeoff: Motion labels are hypotheses. A zoom prompt is not proof of physical translation, and the same framing can result from different motions.

Sources: camera-plucker, usd-camera, usd-metrics, camera-paper, camera-runtime

**definition**: Move semantics and subject anchors. Required knowledge: Distinguish optical zoom from camera translation; pose and target constraints

**productionUse**: Separate dolly translation, pan/tilt rotation, orbit around an anchor, zoom focal change and dolly-zoom compensation. Measure pose, focal/FOV and subject scale against intended move.

**standards**: Right-handed coordinate conventions, explicit c2w/w2c and stage units; USD camera optical values in tenths of stage unit. Declare scene/path/estimator digests.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Separate dolly translation, pan/tilt rotation, orbit around an anchor, zoom focal change and dolly-zoom compensation. Measure pose, focal/FOV and subject scale against intended move. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: CameraCtrl/AnimateDiff or SVD are studied candidates, with old CUDA-dependent environment and separately admitted weights. Prompt presets are not exact pose control.

**datasets**: Own/admitted positive and hard-negative fixtures: Zoom substituted for dolly, anchor drifts, orbit changes radius unexpectedly and abrupt roll. Independent labels and rights are required for evaluation assets.

**licensing**: Native mathematical preflight is own code. CameraCtrl README says academic use, so learned weights are not admitted as a commercial default. USD/Blender source is studied and not vendored.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Motion labels are hypotheses. A zoom prompt is not proof of physical translation, and the same framing can result from different motions.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Pose sampling plus render/estimation; report estimator failure rather than a zero error.

**failureModes**: Zoom substituted for dolly, anchor drifts, orbit changes radius unexpectedly and abrupt roll.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Measured rendered trajectories for each move class and estimator uncertainty.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Requested move matches measured position/orientation/FOV change

**Remaining evidence**: Measured rendered trajectories for each move class and estimator uncertainty.

## PR-CAMERA-04 — Collision and clearance evidence

Selected method: Check the full declared rig clearance against geometry and time. Existing native slabs prove only linear segments against declared static AABBs; missing geometry produces unverified coverage.

Alternative/tradeoff: A camera point ray is insufficient for a crane/cable rig or swept frustum. Mesh/convex continuous collision is the required production extension.

Sources: camera-plucker, usd-camera, usd-metrics, camera-paper, camera-runtime

**definition**: Collision and clearance evidence. Required knowledge: Scene geometry, swept camera/rig volumes, version-bound collision certificates

**productionUse**: Check the full declared rig clearance against geometry and time. Existing native slabs prove only linear segments against declared static AABBs; missing geometry produces unverified coverage.

**standards**: Right-handed coordinate conventions, explicit c2w/w2c and stage units; USD camera optical values in tenths of stage unit. Declare scene/path/estimator digests.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Check the full declared rig clearance against geometry and time. Existing native slabs prove only linear segments against declared static AABBs; missing geometry produces unverified coverage. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: CameraCtrl/AnimateDiff or SVD are studied candidates, with old CUDA-dependent environment and separately admitted weights. Prompt presets are not exact pose control.

**datasets**: Own/admitted positive and hard-negative fixtures: Tangent hit, collision outside finite segment, undeclared obstacle, moving actor and large rig passing narrow doorway. Independent labels and rights are required for evaluation assets.

**licensing**: Native mathematical preflight is own code. CameraCtrl README says academic use, so learned weights are not admitted as a commercial default. USD/Blender source is studied and not vendored.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: A camera point ray is insufficient for a crane/cable rig or swept frustum. Mesh/convex continuous collision is the required production extension.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Naive O(segments*obstacles); broad-phase bounds reduce candidate pairs but do not close coverage gaps.

**failureModes**: Tangent hit, collision outside finite segment, undeclared obstacle, moving actor and large rig passing narrow doorway.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Scene-version-bound swept rig/mesh collision proof with dynamic geometry.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: collisionFreeRequired cannot pass without the matching scene and proof

**Remaining evidence**: Scene-version-bound swept rig/mesh collision proof with dynamic geometry.

## PR-CAMERA-05 — Framing and visibility proof

Selected method: Project actual geometry at approved times and measure subject occupancy, eyeline, focus and occlusion. Native corner projection checks declared bounds only and is not visibility proof.

Alternative/tradeoff: Screen-space bounding boxes are cheap but can count fully occluded subjects. Depth/object-ID render passes or ray tests provide visibility evidence.

Sources: camera-plucker, usd-camera, usd-metrics, camera-paper, camera-runtime

**definition**: Framing and visibility proof. Required knowledge: Projection, screen occupancy, eye line, occlusion and focus target

**productionUse**: Project actual geometry at approved times and measure subject occupancy, eyeline, focus and occlusion. Native corner projection checks declared bounds only and is not visibility proof.

**standards**: Right-handed coordinate conventions, explicit c2w/w2c and stage units; USD camera optical values in tenths of stage unit. Declare scene/path/estimator digests.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Project actual geometry at approved times and measure subject occupancy, eyeline, focus and occlusion. Native corner projection checks declared bounds only and is not visibility proof. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: CameraCtrl/AnimateDiff or SVD are studied candidates, with old CUDA-dependent environment and separately admitted weights. Prompt presets are not exact pose control.

**datasets**: Own/admitted positive and hard-negative fixtures: Required subject behind a wall, impossible min/max occupancy, near-plane crossing and contradictory eyelines. Independent labels and rights are required for evaluation assets.

**licensing**: Native mathematical preflight is own code. CameraCtrl README says academic use, so learned weights are not admitted as a commercial default. USD/Blender source is studied and not vendored.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Screen-space bounding boxes are cheap but can count fully occluded subjects. Depth/object-ID render passes or ray tests provide visibility evidence.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Ray/pass cost scales with pixels/subjects/frames; temporal sampling uncertainty must be explicit.

**failureModes**: Required subject behind a wall, impossible min/max occupancy, near-plane crossing and contradictory eyelines.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Actual geometry depth/object-ID visibility checks over interpolated frames.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Contradictory fractions and occluded required subject fail on actual geometry

**Remaining evidence**: Actual geometry depth/object-ID visibility checks over interpolated frames.

## PR-CAMERA-06 — Learned camera conditioning

Selected method: For learned conditioning, record pose convention, normalized intrinsics, image-crop changes, Plucker ray encoding, model/checkpoint hashes and base-model compatibility. Measure output rather than trust prompt syntax.

Alternative/tradeoff: CameraCtrl selected code uses per-pixel rays, while motion presets offer weaker control. Academic-only release and old CUDA stack prevent selecting it as a commercial default.

Sources: camera-plucker, usd-camera, usd-metrics, camera-paper, camera-runtime

**definition**: Learned camera conditioning. Required knowledge: Pose normalization, intrinsics, Plucker features, checkpoint provenance

**productionUse**: For learned conditioning, record pose convention, normalized intrinsics, image-crop changes, Plucker ray encoding, model/checkpoint hashes and base-model compatibility. Measure output rather than trust prompt syntax.

**standards**: Right-handed coordinate conventions, explicit c2w/w2c and stage units; USD camera optical values in tenths of stage unit. Declare scene/path/estimator digests.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: For learned conditioning, record pose convention, normalized intrinsics, image-crop changes, Plucker ray encoding, model/checkpoint hashes and base-model compatibility. Measure output rather than trust prompt syntax. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: CameraCtrl/AnimateDiff or SVD are studied candidates, with old CUDA-dependent environment and separately admitted weights. Prompt presets are not exact pose control.

**datasets**: Own/admitted positive and hard-negative fixtures: Flip image without corresponding pose rays, wrong crop intrinsics, mismatched base weights and requested curve replaced with stock move. Independent labels and rights are required for evaluation assets.

**licensing**: Native mathematical preflight is own code. CameraCtrl README says academic use, so learned weights are not admitted as a commercial default. USD/Blender source is studied and not vendored.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: CameraCtrl selected code uses per-pixel rays, while motion presets offer weaker control. Academic-only release and old CUDA stack prevent selecting it as a commercial default.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: GPU model and checkpoint memory/cost unavailable here; no owner self-host requirement is introduced.

**failureModes**: Flip image without corresponding pose rays, wrong crop intrinsics, mismatched base weights and requested curve replaced with stock move.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Commercially admissible learned-control route and actual pose-conditioned evaluation.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Pose-conditioned output is measured; prompt text alone is not called exact control

**Remaining evidence**: Commercially admissible learned-control route and actual pose-conditioned evaluation.

## PR-CAMERA-07 — Rendered camera evaluation

Selected method: Separate rotation, translation, smoothness, framing and reconstruction success. Align estimator scale explicitly and retain confidence/failure clips; compare to fixed-scene ground truth.

Alternative/tradeoff: CameraCtrl paper uses COLMAP-based trajectory errors. Reconstruction can fail on generated deforming scenes, so do not score failure as perfect control.

Sources: camera-plucker, usd-camera, usd-metrics, camera-paper, camera-runtime

**definition**: Rendered camera evaluation. Required knowledge: Trajectory estimation, pose error, smoothness, framing and domain shift

**productionUse**: Separate rotation, translation, smoothness, framing and reconstruction success. Align estimator scale explicitly and retain confidence/failure clips; compare to fixed-scene ground truth.

**standards**: Right-handed coordinate conventions, explicit c2w/w2c and stage units; USD camera optical values in tenths of stage unit. Declare scene/path/estimator digests.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Separate rotation, translation, smoothness, framing and reconstruction success. Align estimator scale explicitly and retain confidence/failure clips; compare to fixed-scene ground truth. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: CameraCtrl/AnimateDiff or SVD are studied candidates, with old CUDA-dependent environment and separately admitted weights. Prompt presets are not exact pose control.

**datasets**: Own/admitted positive and hard-negative fixtures: Textureless scene, deforming subject, pure rotation scale ambiguity, abrupt cut and failed reconstruction. Independent labels and rights are required for evaluation assets.

**licensing**: Native mathematical preflight is own code. CameraCtrl README says academic use, so learned weights are not admitted as a commercial default. USD/Blender source is studied and not vendored.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: CameraCtrl paper uses COLMAP-based trajectory errors. Reconstruction can fail on generated deforming scenes, so do not score failure as perfect control.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Pose reconstruction/render time and failure rate reported independently of visual score.

**failureModes**: Textureless scene, deforming subject, pure rotation scale ambiguity, abrupt cut and failed reconstruction.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Actual estimator installation/run and fixed-scene held-out benchmark.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Matched fixed-scene benchmark reports each error dimension and uncertainty

**Remaining evidence**: Actual estimator installation/run and fixed-scene held-out benchmark.

## PR-IDENTITY-01 — Reference and dataset quality

Selected method: Record consent/rights, view/lighting/expression coverage, duplicate clusters and identity labels; separate reference/training views from held-out evaluation views.

Alternative/tradeoff: More near-duplicate frontal images do not replace missing profile/body coverage. Human review catches identity drift beyond one embedding metric.

Sources: faceid-card, ip-adapter-license, blender-armature, avatar-asc

**definition**: Reference and dataset quality. Required knowledge: View coverage, consent, deduplication, train/test leakage and pose diversity

**productionUse**: Record consent/rights, view/lighting/expression coverage, duplicate clusters and identity labels; separate reference/training views from held-out evaluation views.

**standards**: Asset/version references, skeleton conventions, facial controls and synchronized time bases.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Record consent/rights, view/lighting/expression coverage, duplicate clusters and identity labels; separate reference/training views from held-out evaluation views. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: FaceID and adapter routes studied, not commercially admitted or run. Actual DCC rig geometry supplies a deterministic alternative without claiming learned identity performance.

**datasets**: Own/admitted positive and hard-negative fixtures: Duplicate train/test views, mismatched wardrobe, low-quality profile and incorrectly labelled individual. Independent labels and rights are required for evaluation assets.

**licensing**: IP-Adapter root code Apache2 does not admit FaceID weights. FaceID model card says research/non-commercial due to InsightFace pretrained restrictions. Character, voice and dataset rights are separate.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: More near-duplicate frontal images do not replace missing profile/body coverage. Human review catches identity drift beyond one embedding metric.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Dataset curation and rights verification time; embeddings do not certify likeness rights.

**failureModes**: Duplicate train/test views, mismatched wardrobe, low-quality profile and incorrectly labelled individual.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Admitted multi-view dataset and held-out cross-shot trials.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Held-out views retain identity without training/reference leakage

**Remaining evidence**: Admitted multi-view dataset and held-out cross-shot trials.

## PR-IDENTITY-02 — Face/body/wardrobe conditioning

Selected method: Measure face, body proportions, costume and accessories separately. Condition only through admitted model-specific mechanisms; record adapter/base/checkpoint compatibility and strength.

Alternative/tradeoff: IP-Adapter separates text and image attention; FaceID adds face embedding/LoRA but has research-only restrictions. Explicit DCC geometry/wardrobe is more editable and deterministic.

Sources: faceid-card, ip-adapter-license, blender-armature, avatar-asc

**definition**: Face/body/wardrobe conditioning. Required knowledge: Reference encoders, LoRA/adapters and cross-shot state

**productionUse**: Measure face, body proportions, costume and accessories separately. Condition only through admitted model-specific mechanisms; record adapter/base/checkpoint compatibility and strength.

**standards**: Asset/version references, skeleton conventions, facial controls and synchronized time bases.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Measure face, body proportions, costume and accessories separately. Condition only through admitted model-specific mechanisms; record adapter/base/checkpoint compatibility and strength. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: FaceID and adapter routes studied, not commercially admitted or run. Actual DCC rig geometry supplies a deterministic alternative without claiming learned identity performance.

**datasets**: Own/admitted positive and hard-negative fixtures: Face preserved but costume changes, body shape drift, accessories mirrored and high adapter strength suppresses requested action. Independent labels and rights are required for evaluation assets.

**licensing**: IP-Adapter root code Apache2 does not admit FaceID weights. FaceID model card says research/non-commercial due to InsightFace pretrained restrictions. Character, voice and dataset rights are separate.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: IP-Adapter separates text and image attention; FaceID adds face embedding/LoRA but has research-only restrictions. Explicit DCC geometry/wardrobe is more editable and deterministic.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Model inference and repair effort; no claim that one scalar identity score captures costume or body.

**failureModes**: Face preserved but costume changes, body shape drift, accessories mirrored and high adapter strength suppresses requested action.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: A commercially admissible identity-conditioning model and actual multi-view/action measurements.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Identity and costume measured independently across view/action changes

**Remaining evidence**: A commercially admissible identity-conditioning model and actual multi-view/action measurements.

## PR-IDENTITY-03 — Rig and facial control admission

Selected method: Inspect actual armature bones, skin weights, rest pose, constraints and shape-key/expression channels. Validate expected controls for the admitted character species and record missing channels.

Alternative/tradeoff: Names in a rig manifest cannot prove the mesh deforms correctly. Pose/face action fixtures must exercise the actual asset.

Sources: faceid-card, ip-adapter-license, blender-armature, avatar-asc

**definition**: Rig and facial control admission. Required knowledge: Skeleton, skin weights, morph semantics, nonhuman rig support

**productionUse**: Inspect actual armature bones, skin weights, rest pose, constraints and shape-key/expression channels. Validate expected controls for the admitted character species and record missing channels.

**standards**: Asset/version references, skeleton conventions, facial controls and synchronized time bases.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Inspect actual armature bones, skin weights, rest pose, constraints and shape-key/expression channels. Validate expected controls for the admitted character species and record missing channels. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: FaceID and adapter routes studied, not commercially admitted or run. Actual DCC rig geometry supplies a deterministic alternative without claiming learned identity performance.

**datasets**: Own/admitted positive and hard-negative fixtures: Missing jaw bone, disconnected weight, duplicate joint, zero-length bone and nonhuman rig checked as human. Independent labels and rights are required for evaluation assets.

**licensing**: IP-Adapter root code Apache2 does not admit FaceID weights. FaceID model card says research/non-commercial due to InsightFace pretrained restrictions. Character, voice and dataset rights are separate.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Names in a rig manifest cannot prove the mesh deforms correctly. Pose/face action fixtures must exercise the actual asset.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Inspection O(joints+weights); deformation/render cost scales with vertices and frames.

**failureModes**: Missing jaw bone, disconnected weight, duplicate joint, zero-length bone and nonhuman rig checked as human.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Real rig admission and deformation fixtures beyond selected RNA source inspection.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Real model inspection proves expected joints and expressions exist

**Remaining evidence**: Real rig admission and deformation fixtures beyond selected RNA source inspection.

## PR-IDENTITY-04 — Performance timing and contact

Selected method: Represent anticipation, action, contact, weight transfer and settle beats in integer frames. Measure support/contact and deformation during playback, then review emotional readability.

Alternative/tradeoff: Physics can establish contact but cannot certify acting. A procedural contact fixture is technical evidence only.

Sources: faceid-card, ip-adapter-license, blender-armature, avatar-asc

**definition**: Performance timing and contact. Required knowledge: Anticipation, action, settle, weight transfer, hand/foot/object contact

**productionUse**: Represent anticipation, action, contact, weight transfer and settle beats in integer frames. Measure support/contact and deformation during playback, then review emotional readability.

**standards**: Asset/version references, skeleton conventions, facial controls and synchronized time bases.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Represent anticipation, action, contact, weight transfer and settle beats in integer frames. Measure support/contact and deformation during playback, then review emotional readability. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: FaceID and adapter routes studied, not commercially admitted or run. Actual DCC rig geometry supplies a deterministic alternative without claiming learned identity performance.

**datasets**: Own/admitted positive and hard-negative fixtures: Foot sliding, float above floor, hand penetrates prop, weight transfer after takeoff and flat timing. Independent labels and rights are required for evaluation assets.

**licensing**: IP-Adapter root code Apache2 does not admit FaceID weights. FaceID model card says research/non-commercial due to InsightFace pretrained restrictions. Character, voice and dataset rights are separate.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Physics can establish contact but cannot certify acting. A procedural contact fixture is technical evidence only.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Per-frame contact checks and human craft review; include repair time.

**failureModes**: Foot sliding, float above floor, hand penetrates prop, weight transfer after takeoff and flat timing.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Character-specific animation and rendered contact/performance review; rigid-body contact fixture is executed.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Rendered movement has observable timing and contact checks

**Remaining evidence**: Character-specific animation and rendered contact/performance review; rigid-body contact fixture is executed.

## PR-IDENTITY-05 — Voice/lip/gesture synchronization

Selected method: Keep audio sample time and animation frame time in a shared rational clock. Map language-aware phonemes to actual viseme channels with coarticulation; synchronize gaze/gesture beats independently.

Alternative/tradeoff: Audio envelope drives mouth energy but not phonetic correctness. A lip-sync provider must prove timing and multilingual behavior on actual output.

Sources: faceid-card, ip-adapter-license, blender-armature, avatar-asc

**definition**: Voice/lip/gesture synchronization. Required knowledge: Phonemes/visemes, multilingual timing, voice identity and gaze

**productionUse**: Keep audio sample time and animation frame time in a shared rational clock. Map language-aware phonemes to actual viseme channels with coarticulation; synchronize gaze/gesture beats independently.

**standards**: Asset/version references, skeleton conventions, facial controls and synchronized time bases.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Keep audio sample time and animation frame time in a shared rational clock. Map language-aware phonemes to actual viseme channels with coarticulation; synchronize gaze/gesture beats independently. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: FaceID and adapter routes studied, not commercially admitted or run. Actual DCC rig geometry supplies a deterministic alternative without claiming learned identity performance.

**datasets**: Own/admitted positive and hard-negative fixtures: Long-clip drift, plosive closed lips missed, wrong language mapping, gesture anticipates wrong word and silent audio. Independent labels and rights are required for evaluation assets.

**licensing**: IP-Adapter root code Apache2 does not admit FaceID weights. FaceID model card says research/non-commercial due to InsightFace pretrained restrictions. Character, voice and dataset rights are separate.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Audio envelope drives mouth energy but not phonetic correctness. A lip-sync provider must prove timing and multilingual behavior on actual output.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Alignment/inference time, language coverage and manual cleanup per dialogue minute.

**failureModes**: Long-clip drift, plosive closed lips missed, wrong language mapping, gesture anticipates wrong word and silent audio.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Commercial voice/lip route admission and actual audiovisual synchronization measurements.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Audio-video offset and mouth/gesture timing measured on actual output

**Remaining evidence**: Commercial voice/lip route admission and actual audiovisual synchronization measurements.

## PR-DESTRUCTION-01 — Fracture topology and materials

Selected method: Generate closed fragments with consistent scale, interior faces/material IDs and recorded seed; inspect manifold/watertight requirements before rigid-body admission.

Alternative/tradeoff: Pre-fractured editable geometry is controllable; video synthesis may show debris while delivering no editable fragment topology.

Sources: rigidbody-step, avatar-weta

**definition**: Fracture topology and materials. Required knowledge: Closed meshes, fragment distributions, interior surfaces, scale and mass

**productionUse**: Generate closed fragments with consistent scale, interior faces/material IDs and recorded seed; inspect manifold/watertight requirements before rigid-body admission.

**standards**: Mesh scale, mass/inertia, collision shapes, solver substeps, time scale and cache provenance.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Generate closed fragments with consistent scale, interior faces/material IDs and recorded seed; inspect manifold/watertight requirements before rigid-body admission. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Open interiors, inverted normals, tiny mass fragments, missing cut material and duplicate overlapping shards. Independent labels and rights are required for evaluation assets.

**licensing**: Blender selected source uses GPL2-or-later. No Blender binary/source is redistributed. Procedural fixture is newly authored; production asset licenses must be retained.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Pre-fractured editable geometry is controllable; video synthesis may show debris while delivering no editable fragment topology.

**runtime**: Blender5.2.2LTS background CPU is available and an isolated procedural bake/reopen/render fixture executed. Main-branch source reads are contextual; actual runtime build hash is recorded separately.

**cost**: Fragment/face count and collision shape complexity drive simulation/render memory.

**failureModes**: Open interiors, inverted normals, tiny mass fragments, missing cut material and duplicate overlapping shards.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Actual fracture implementation and mesh-topology fixtures.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Fragments are editable, watertight where required and preserve material intent

**Remaining evidence**: Actual fracture implementation and mesh-topology fixtures.

## PR-DESTRUCTION-02 — Breakable constraint graph

Selected method: Create a structural constraint graph with explicit connected bodies, breaking impulse threshold, collision policy, trigger timing and solver parameters. Inspect failure sequence against intended causal action.

Alternative/tradeoff: RNA exposes impulse threshold, not a universal material-strength law. Artistic thresholds require scale-aware calibration and fracture geometry.

Sources: rigidbody-step, avatar-weta

**definition**: Breakable constraint graph. Required knowledge: Constraint connectivity, break thresholds, trigger fields and stability

**productionUse**: Create a structural constraint graph with explicit connected bodies, breaking impulse threshold, collision policy, trigger timing and solver parameters. Inspect failure sequence against intended causal action.

**standards**: Mesh scale, mass/inertia, collision shapes, solver substeps, time scale and cache provenance.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Create a structural constraint graph with explicit connected bodies, breaking impulse threshold, collision policy, trigger timing and solver parameters. Inspect failure sequence against intended causal action. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: All constraints break on first frame, detached body reference, trigger after visible fracture and explosive initial interpenetration. Independent labels and rights are required for evaluation assets.

**licensing**: Blender selected source uses GPL2-or-later. No Blender binary/source is redistributed. Procedural fixture is newly authored; production asset licenses must be retained.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: RNA exposes impulse threshold, not a universal material-strength law. Artistic thresholds require scale-aware calibration and fracture geometry.

**runtime**: Blender5.2.2LTS background CPU is available and an isolated procedural bake/reopen/render fixture executed. Main-branch source reads are contextual; actual runtime build hash is recorded separately.

**cost**: Constraint count, substeps and iterations; higher settings increase accuracy and runtime.

**failureModes**: All constraints break on first frame, detached body reference, trigger after visible fracture and explosive initial interpenetration.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Breakable graph execution and calibrated structural-failure fixtures.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Intended structural failure sequence occurs without immediate explosive instability

**Remaining evidence**: Breakable graph execution and calibrated structural-failure fixtures.

## PR-DESTRUCTION-03 — Rigid-body stepping and cache

Selected method: Bake sequential frame stepping using explicit fps, time scale, substeps and iterations. Bind cache to scene/runtime/inputs; reopen in a separate process and compare evaluated transforms.

Alternative/tradeoff: Selected Blender core advances only one forward frame when unbaked. Jumping to a later frame is not equivalent to sequential simulation.

Sources: rigidbody-step, avatar-weta

**definition**: Rigid-body stepping and cache. Required knowledge: FPS/time scale, substeps, solver iterations, sequential evaluation and bake invalidation

**productionUse**: Bake sequential frame stepping using explicit fps, time scale, substeps and iterations. Bind cache to scene/runtime/inputs; reopen in a separate process and compare evaluated transforms.

**standards**: Mesh scale, mass/inertia, collision shapes, solver substeps, time scale and cache provenance.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Bake sequential frame stepping using explicit fps, time scale, substeps and iterations. Bind cache to scene/runtime/inputs; reopen in a separate process and compare evaluated transforms. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Future-frame jump, changed collision geometry, different solver settings and reopened scene using an old cache. Independent labels and rights are required for evaluation assets.

**licensing**: Blender selected source uses GPL2-or-later. No Blender binary/source is redistributed. Procedural fixture is newly authored; production asset licenses must be retained.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Selected Blender core advances only one forward frame when unbaked. Jumping to a later frame is not equivalent to sequential simulation.

**runtime**: Blender5.2.2LTS background CPU is available and an isolated procedural bake/reopen/render fixture executed. Main-branch source reads are contextual; actual runtime build hash is recorded separately.

**cost**: O(frames*substeps*solver work); cache storage and replay latency included.

**failureModes**: Future-frame jump, changed collision geometry, different solver settings and reopened scene using an old cache.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Cache invalidation after input edits still needs a dedicated executed fixture; basic bake/reopen contact replay is executed.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Frame jumps, scene edits and reopen/replay cannot silently reuse wrong simulation cache

**Remaining evidence**: Cache invalidation after input edits still needs a dedicated executed fixture; basic bake/reopen contact replay is executed.

## PR-DESTRUCTION-04 — Dust and secondary effects

Selected method: Emit secondary particles/volumes from measured impact events; separate dust density, scale, lifetime, collision and light integration. Cap particle/voxel budgets before final render.

Alternative/tradeoff: A dust overlay is cheap but lacks 3D occlusion and interaction. Full fluid/volume simulation needs an admitted solver and causal event coupling.

Sources: rigidbody-step, avatar-weta

**definition**: Dust and secondary effects. Required knowledge: Volume domain, particle coupling, collisions, emission timing and cache budgets

**productionUse**: Emit secondary particles/volumes from measured impact events; separate dust density, scale, lifetime, collision and light integration. Cap particle/voxel budgets before final render.

**standards**: Mesh scale, mass/inertia, collision shapes, solver substeps, time scale and cache provenance.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Emit secondary particles/volumes from measured impact events; separate dust density, scale, lifetime, collision and light integration. Cap particle/voxel budgets before final render. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Dust before impact, smoke hides critical action, particles through walls and voxel memory explosion. Independent labels and rights are required for evaluation assets.

**licensing**: Blender selected source uses GPL2-or-later. No Blender binary/source is redistributed. Procedural fixture is newly authored; production asset licenses must be retained.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: A dust overlay is cheap but lacks 3D occlusion and interaction. Full fluid/volume simulation needs an admitted solver and causal event coupling.

**runtime**: Blender5.2.2LTS background CPU is available and an isolated procedural bake/reopen/render fixture executed. Main-branch source reads are contextual; actual runtime build hash is recorded separately.

**cost**: Voxel resolution grows cubically; particle count and simulation duration bounded explicitly.

**failureModes**: Dust before impact, smoke hides critical action, particles through walls and voxel memory explosion.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Dust/volume solver source study and actual impact-coupled render fixtures.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Dust follows causal impact and passes memory/occlusion checks

**Remaining evidence**: Dust/volume solver source study and actual impact-coupled render fixtures.

## PR-DESTRUCTION-05 — Editable destruction delivery

Selected method: Deliver editable scene, source meshes, constraint graph, cache, renderer/config versions and artifact hashes. Reopen and render approved samples before accepting delivery.

Alternative/tradeoff: A flattened MP4 is a review artifact, not an editable destruction project. Bundle external dependencies with rights/provenance and clear cache invalidation rules.

Sources: rigidbody-step, avatar-weta

**definition**: Editable destruction delivery. Required knowledge: Scene versions, dependencies, bake provenance, camera and render configuration

**productionUse**: Deliver editable scene, source meshes, constraint graph, cache, renderer/config versions and artifact hashes. Reopen and render approved samples before accepting delivery.

**standards**: Mesh scale, mass/inertia, collision shapes, solver substeps, time scale and cache provenance.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Deliver editable scene, source meshes, constraint graph, cache, renderer/config versions and artifact hashes. Reopen and render approved samples before accepting delivery. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Missing texture/cache, renamed body IDs, lost external dependency and render configuration mismatch. Independent labels and rights are required for evaluation assets.

**licensing**: Blender selected source uses GPL2-or-later. No Blender binary/source is redistributed. Procedural fixture is newly authored; production asset licenses must be retained.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: A flattened MP4 is a review artifact, not an editable destruction project. Bundle external dependencies with rights/provenance and clear cache invalidation rules.

**runtime**: Blender5.2.2LTS background CPU is available and an isolated procedural bake/reopen/render fixture executed. Main-branch source reads are contextual; actual runtime build hash is recorded separately.

**cost**: Project/cache transfer bytes, recipient reopen time and recompute cost.

**failureModes**: Missing texture/cache, renamed body IDs, lost external dependency and render configuration mismatch.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Destruction-specific project delivery beyond executed simple rigid-body fixture.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Saved project reopens and produces the same approved preview within declared tolerance

**Remaining evidence**: Destruction-specific project delivery beyond executed simple rigid-body fixture.

## PR-ASSEMBLY-01 — Part hierarchy and pivots

Selected method: Preserve original local/world transforms and parent/pivot identity. Explode parts relative to declared assembly anchors; reassembly compares every evaluated transform within a declared tolerance.

Alternative/tradeoff: Animating source mesh vertices damages reuse. Separate object transforms retain editable geometry and a recoverable original pose.

Sources: blender-key, rigidbody-step

**definition**: Part hierarchy and pivots. Required knowledge: Component identification, local/world transforms and pivot placement

**productionUse**: Preserve original local/world transforms and parent/pivot identity. Explode parts relative to declared assembly anchors; reassembly compares every evaluated transform within a declared tolerance.

**standards**: Local/world transforms, pivot frame, parenting and interpolation conventions.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Preserve original local/world transforms and parent/pivot identity. Explode parts relative to declared assembly anchors; reassembly compares every evaluated transform within a declared tolerance. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Wrong pivot, parent scale doubled, mirrored part, original transform overwritten and child moved in world rather than local space. Independent labels and rights are required for evaluation assets.

**licensing**: Blender source is studied, not copied. Newly authored fixture uses procedural assets; external model/texture rights require admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Animating source mesh vertices damages reuse. Separate object transforms retain editable geometry and a recoverable original pose.

**runtime**: Actual Blender5.2.2LTS CPU keyframe/project fixture executed; more complex constraints/pivots are specified and unverified.

**cost**: O(parts*frames); metadata preserves source transforms without duplicating geometry.

**failureModes**: Wrong pivot, parent scale doubled, mirrored part, original transform overwritten and child moved in world rather than local space.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Matrix/quaternion pivot fixtures beyond the executed simple parented assembly.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Reassembly returns every part to its exact original transform

**Remaining evidence**: Matrix/quaternion pivot fixtures beyond the executed simple parented assembly.

## PR-ASSEMBLY-02 — Collision-aware assembly paths

Selected method: Plan ordered clearance paths and easing, then evaluate part overlap and camera legibility throughout motion. Use conservative proxies only with explicit declared coverage.

Alternative/tradeoff: Radial explode is simple but may intersect adjacent parts or hide labels. Collision-aware scheduling needs full geometry and motion interpolation.

Sources: blender-key, rigidbody-step

**definition**: Collision-aware assembly paths. Required knowledge: Path clearance, staging order, easing and camera readability

**productionUse**: Plan ordered clearance paths and easing, then evaluate part overlap and camera legibility throughout motion. Use conservative proxies only with explicit declared coverage.

**standards**: Local/world transforms, pivot frame, parenting and interpolation conventions.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Plan ordered clearance paths and easing, then evaluate part overlap and camera legibility throughout motion. Use conservative proxies only with explicit declared coverage. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Parts swap through each other, oversized proxy hides valid route, eased curve overshoots and assembly order visually unclear. Independent labels and rights are required for evaluation assets.

**licensing**: Blender source is studied, not copied. Newly authored fixture uses procedural assets; external model/texture rights require admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Radial explode is simple but may intersect adjacent parts or hide labels. Collision-aware scheduling needs full geometry and motion interpolation.

**runtime**: Actual Blender5.2.2LTS CPU keyframe/project fixture executed; more complex constraints/pivots are specified and unverified.

**cost**: Pairwise overlap is O(parts squared) before broad phase; planner search and sample count bounded.

**failureModes**: Parts swap through each other, oversized proxy hides valid route, eased curve overshoots and assembly order visually unclear.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Executed swept-part collision planner and visual sequencing review.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Parts do not intersect and sequencing remains visually legible

**Remaining evidence**: Executed swept-part collision planner and visual sequencing review.

## PR-ASSEMBLY-03 — Editable animation reconstruction

Selected method: Store keyframes, constraint/driver targets and owning data-block identities. Save/reopen and perform a localized timing edit while retaining original part meshes.

Alternative/tradeoff: Blender keyframe insertion must target the owning ID for nested properties. Flattened baked geometry can lose editable controls.

Sources: blender-key, rigidbody-step

**definition**: Editable animation reconstruction. Required knowledge: Keyframes, constraints, drivers, undo and project serialization

**productionUse**: Store keyframes, constraint/driver targets and owning data-block identities. Save/reopen and perform a localized timing edit while retaining original part meshes.

**standards**: Local/world transforms, pivot frame, parenting and interpolation conventions.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Store keyframes, constraint/driver targets and owning data-block identities. Save/reopen and perform a localized timing edit while retaining original part meshes. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Action lost after reopen, driver points to renamed object, nested property keyed on wrong owner and edit changes source geometry. Independent labels and rights are required for evaluation assets.

**licensing**: Blender source is studied, not copied. Newly authored fixture uses procedural assets; external model/texture rights require admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Blender keyframe insertion must target the owning ID for nested properties. Flattened baked geometry can lose editable controls.

**runtime**: Actual Blender5.2.2LTS CPU keyframe/project fixture executed; more complex constraints/pivots are specified and unverified.

**cost**: Key count, evaluation time and recipient repair effort measured.

**failureModes**: Action lost after reopen, driver points to renamed object, nested property keyed on wrong owner and edit changes source geometry.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Localized post-reopen edit/undo fixture; simple keyframes survive the executed fixture.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Edits remain editable after save/reopen and do not alter source assets

**Remaining evidence**: Localized post-reopen edit/undo fixture; simple keyframes survive the executed fixture.

## PR-SCENE-01 — Scene hierarchy invariants

Selected method: Validate stable IDs, unique names, parent existence, acyclic hierarchy and finite transforms before admitting the scene. Resolve namespace collisions without changing canonical asset identity.

Alternative/tradeoff: A graph file can serialize a cycle that an application rejects. The canonical contract should catch it before DCC mutation.

Sources: usd-stage, usd-metrics

**definition**: Scene hierarchy invariants. Required knowledge: Parent cycles, namespaces, transforms and stable identity

**productionUse**: Validate stable IDs, unique names, parent existence, acyclic hierarchy and finite transforms before admitting the scene. Resolve namespace collisions without changing canonical asset identity.

**standards**: Stage units/up-axis, prim paths, resolver mappings, layer strength and asset identity.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Validate stable IDs, unique names, parent existence, acyclic hierarchy and finite transforms before admitting the scene. Resolve namespace collisions without changing canonical asset identity. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Parent cycle, dangling parent, duplicate identity and nonfinite transform. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: A graph file can serialize a cycle that an application rejects. The canonical contract should catch it before DCC mutation.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: O(nodes+edges); hierarchy depth bounded to prevent recursive exhaustion.

**failureModes**: Parent cycle, dangling parent, duplicate identity and nonfinite transform.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Creation OS SceneContext repair and actual DCC admission checks.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Cycle/dangling-parent/duplicate identity cases are rejected

**Remaining evidence**: Creation OS SceneContext repair and actual DCC admission checks.

## PR-SCENE-02 — Layer/reference/variant composition

Selected method: Use explicit root/sublayers, references, variants and edit targets; retain composed and authored views. Record whether a delivery preserves composition or flattens it.

Alternative/tradeoff: USD session layers are ephemeral and flattening discards layering structure. Native .blend retains controls but does not automatically preserve arbitrary USD opinions.

Sources: usd-stage, usd-metrics

**definition**: Layer/reference/variant composition. Required knowledge: Asset references, overrides, edit targets and stronger opinions

**productionUse**: Use explicit root/sublayers, references, variants and edit targets; retain composed and authored views. Record whether a delivery preserves composition or flattens it.

**standards**: Stage units/up-axis, prim paths, resolver mappings, layer strength and asset identity.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Use explicit root/sublayers, references, variants and edit targets; retain composed and authored views. Record whether a delivery preserves composition or flattens it. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Variant selection in unsaved session, missing reference, stronger override lost and flatten claimed as layered round-trip. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: USD session layers are ephemeral and flattening discards layering structure. Native .blend retains controls but does not automatically preserve arbitrary USD opinions.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Payload/load rules bound working set; flattening may dramatically increase file size.

**failureModes**: Variant selection in unsaved session, missing reference, stronger override lost and flatten claimed as layered round-trip.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: USD composition round-trip with references and variants in an admitted runtime.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Round-trip preserves intended overrides and variant selection

**Remaining evidence**: USD composition round-trip with references and variants in an admitted runtime.

## PR-SCENE-03 — Layout and object relationships

Selected method: Express floor support, separation, containment, eyeline and adjacency as measurable world-space predicates. Build layout from admitted bounds and scene scale, then inspect actual evaluated geometry.

Alternative/tradeoff: A language description can guide arrangement but cannot prove a chair rests on the floor or a doorway is traversable.

Sources: usd-stage, usd-metrics

**definition**: Layout and object relationships. Required knowledge: Scale, placement, support/contact, collision and semantic relations

**productionUse**: Express floor support, separation, containment, eyeline and adjacency as measurable world-space predicates. Build layout from admitted bounds and scene scale, then inspect actual evaluated geometry.

**standards**: Stage units/up-axis, prim paths, resolver mappings, layer strength and asset identity.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Express floor support, separation, containment, eyeline and adjacency as measurable world-space predicates. Build layout from admitted bounds and scene scale, then inspect actual evaluated geometry. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Floating prop, overlapping wall, human/creature eyeline mismatch and incorrect scale ratio. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: A language description can guide arrangement but cannot prove a chair rests on the floor or a doorway is traversable.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Spatial-index construction plus pairwise candidate checks; distinguish proxy from mesh proof.

**failureModes**: Floating prop, overlapping wall, human/creature eyeline mismatch and incorrect scale ratio.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Constraint layout solver and geometry-bound acceptance fixtures.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Generated set satisfies measurable spatial relationships

**Remaining evidence**: Constraint layout solver and geometry-bound acceptance fixtures.

## PR-TOON-01 — Toon light response

Selected method: Choose a renderer-specific light-response method, authored normal convention and ramp thresholds; test multiple lights and viewpoints. Explicitly mark Shader-to-RGB as an EEVEE path.

Alternative/tradeoff: Cycles diffuse/toon or portable baked look differs from EEVEE Shader-to-RGB; do not silently switch renderer while claiming identical material.

Sources: blender-toon, blender-key

**definition**: Toon light response. Required knowledge: Ramp thresholds, normals, light direction and renderer compatibility

**productionUse**: Choose a renderer-specific light-response method, authored normal convention and ramp thresholds; test multiple lights and viewpoints. Explicitly mark Shader-to-RGB as an EEVEE path.

**standards**: Renderer/version, normal/tangent conventions, light inputs and color-space treatment.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Choose a renderer-specific light-response method, authored normal convention and ramp thresholds; test multiple lights and viewpoints. Explicitly mark Shader-to-RGB as an EEVEE path. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Cycles receives EEVEE-only node, normal inversion, highlights jump at ramp threshold and multiple lights wash out bands. Independent labels and rights are required for evaluation assets.

**licensing**: Selected Blender sources use GPL-2.0-or-later headers; no source/binary is vendored. Asset rights and adapter distribution are separate.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Cycles diffuse/toon or portable baked look differs from EEVEE Shader-to-RGB; do not silently switch renderer while claiming identical material.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Preview engine budget and per-frame light/shader work; avoid claiming cross-engine numerical parity.

**failureModes**: Cycles receives EEVEE-only node, normal inversion, highlights jump at ramp threshold and multiple lights wash out bands.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Actual multi-light toon rendering and renderer compatibility measurements.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Material behaves coherently under multiple lights and camera views

**Remaining evidence**: Actual multi-light toon rendering and renderer compatibility measurements.

## PR-TOON-02 — Outline construction

Selected method: Select inverted-hull, geometric/Freestyle or screen-space outlines and declare thickness units, depth behavior and temporal antialiasing. Evaluate moving silhouettes and thin features.

Alternative/tradeoff: Inverted hull is editable but can fail concavities; screen-space depth edges depend on resolution and can flicker.

Sources: blender-toon, blender-key

**definition**: Outline construction. Required knowledge: Geometry/freestyle/screen-space options, depth and temporal aliasing

**productionUse**: Select inverted-hull, geometric/Freestyle or screen-space outlines and declare thickness units, depth behavior and temporal antialiasing. Evaluate moving silhouettes and thin features.

**standards**: Renderer/version, normal/tangent conventions, light inputs and color-space treatment.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Select inverted-hull, geometric/Freestyle or screen-space outlines and declare thickness units, depth behavior and temporal antialiasing. Evaluate moving silhouettes and thin features. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Thin fingers merge, outlines disappear on backfaces, camera-distance thickness drift and edge flicker. Independent labels and rights are required for evaluation assets.

**licensing**: Selected Blender sources use GPL-2.0-or-later headers; no source/binary is vendored. Asset rights and adapter distribution are separate.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Inverted hull is editable but can fail concavities; screen-space depth edges depend on resolution and can flicker.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Additional geometry or image passes; resolution and supersampling cost explicitly compared.

**failureModes**: Thin fingers merge, outlines disappear on backfaces, camera-distance thickness drift and edge flicker.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Executed outline motion fixtures and sampled temporal edge measurement.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Outlines preserve silhouette and avoid flicker in motion

**Remaining evidence**: Executed outline motion fixtures and sampled temporal edge measurement.

## PR-TOON-03 — Material editability and export

Selected method: Preserve material graph, parameter names, texture/color interpretation and renderer compatibility. Export with an explicit unsupported-feature/loss report and editable original.

Alternative/tradeoff: A baked texture can preserve appearance while losing parametric light response; it is a fallback with declared loss.

Sources: blender-toon, blender-key

**definition**: Material editability and export. Required knowledge: Node graph parameters, texture color spaces and portable fallbacks

**productionUse**: Preserve material graph, parameter names, texture/color interpretation and renderer compatibility. Export with an explicit unsupported-feature/loss report and editable original.

**standards**: Renderer/version, normal/tangent conventions, light inputs and color-space treatment.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Preserve material graph, parameter names, texture/color interpretation and renderer compatibility. Export with an explicit unsupported-feature/loss report and editable original. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Ramp nodes flatten, wrong texture space, missing image and unsupported node silently removed. Independent labels and rights are required for evaluation assets.

**licensing**: Selected Blender sources use GPL-2.0-or-later headers; no source/binary is vendored. Asset rights and adapter distribution are separate.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: A baked texture can preserve appearance while losing parametric light response; it is a fallback with declared loss.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Graph/texture payload, shader compile time and fallback bake cost.

**failureModes**: Ramp nodes flatten, wrong texture space, missing image and unsupported node silently removed.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Actual toon export/reopen comparisons across selected target renderers.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Saved material remains editable; unsupported exports report loss

**Remaining evidence**: Actual toon export/reopen comparisons across selected target renderers.

## PR-EDITORIAL-01 — Ingest/logging/proxies

Selected method: Assign source and proxy byte digests plus rational timing, channel layout and derived relationship. Relink by verified identity, never basename alone.

Alternative/tradeoff: Low-resolution proxies reduce edit cost but cannot replace originals for conform; same filename can refer to different takes.

Sources: otio-track, otio-adapters, ffprobe-options

**definition**: Ingest/logging/proxies. Required knowledge: Media IDs, bins, metadata, proxies and relinking

**productionUse**: Assign source and proxy byte digests plus rational timing, channel layout and derived relationship. Relink by verified identity, never basename alone.

**standards**: Rational time value/rate, available/source/parent ranges, exclusive end and media-reference contracts.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Assign source and proxy byte digests plus rational timing, channel layout and derived relationship. Relink by verified identity, never basename alone. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Moved original, renamed proxy, duplicate basename, mismatched audio channels and stale proxy after source update. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Low-resolution proxies reduce edit cost but cannot replace originals for conform; same filename can refer to different takes.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Proxy encode/storage cost versus edit decode latency; include original preservation.

**failureModes**: Moved original, renamed proxy, duplicate basename, mismatched audio channels and stale proxy after source update.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Actual proxy generation, relocation and NLE bin/relink execution.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Original/proxy mapping survives rename/move without wrong media relink

**Remaining evidence**: Actual proxy generation, relocation and NLE bin/relink execution.

## PR-EDITORIAL-02 — Audio/video synchronization

Selected method: Map recording timecode and/or measured waveform offset into one rational timeline; measure long-clip drift and explicitly resample only when rate mismatch is demonstrated.

Alternative/tradeoff: A clap/start-offset fixes alignment but not clock drift. Nominal fps and sample rate alone do not prove synchronized recording clocks.

Sources: otio-track, otio-adapters, ffprobe-options

**definition**: Audio/video synchronization. Required knowledge: Timecode, waveform alignment, drift and sample rates

**productionUse**: Map recording timecode and/or measured waveform offset into one rational timeline; measure long-clip drift and explicitly resample only when rate mismatch is demonstrated.

**standards**: Rational time value/rate, available/source/parent ranges, exclusive end and media-reference contracts.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Map recording timecode and/or measured waveform offset into one rational timeline; measure long-clip drift and explicitly resample only when rate mismatch is demonstrated. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: 24000/1001 versus24,44.1k versus48k, drifting recorders, silence and ambiguous repeated waveform. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: A clap/start-offset fixes alignment but not clock drift. Nominal fps and sample rate alone do not prove synchronized recording clocks.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Correlation/alignment and resampling CPU plus manual ambiguity resolution.

**failureModes**: 24000/1001 versus24,44.1k versus48k, drifting recorders, silence and ambiguous repeated waveform.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Executed long-clip synchronization and drift fixtures.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Long clips retain sync under declared error tolerance

**Remaining evidence**: Executed long-clip synchronization and drift fixtures.

## PR-EDITORIAL-03 — Timeline/timecode interchange

Selected method: Keep available range, source trim and record placement distinct in rational frame units. Export supported OTIO schema and reject unimplemented transition/retime semantics.

Alternative/tradeoff: OTIO preserves edit decisions, not playable media or all NLE-specific effects. Selected trimming algorithm rejects cuts through transitions.

Sources: otio-track, otio-adapters, ffprobe-options

**definition**: Timeline/timecode interchange. Required knowledge: Rational time, trims, gaps, transitions, handles and mixed rates

**productionUse**: Keep available range, source trim and record placement distinct in rational frame units. Export supported OTIO schema and reject unimplemented transition/retime semantics.

**standards**: Rational time value/rate, available/source/parent ranges, exclusive end and media-reference contracts.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Keep available range, source trim and record placement distinct in rational frame units. Export supported OTIO schema and reject unimplemented transition/retime semantics. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Negative trim, insufficient transition handles, adjacent transitions, mixed rates and unavailable media. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: OTIO preserves edit decisions, not playable media or all NLE-specific effects. Selected trimming algorithm rejects cuts through transitions.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: O(edit items); adapter conversion and conform review time dominate.

**failureModes**: Negative trim, insufficient transition handles, adjacent transitions, mixed rates and unavailable media.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Actual OTIO/NLE import-export round-trip; native cuts/gaps serialization is tested.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Round-trip preserves edit points, missing-media state and durations

**Remaining evidence**: Actual OTIO/NLE import-export round-trip; native cuts/gaps serialization is tested.

## PR-EDITORIAL-04 — Conform and relink verification

Selected method: Conform each clip to exact admitted original version and verify codec/timing/channel compatibility. Mark missing or mismatched media offline and block a complete master claim.

Alternative/tradeoff: Successful timeline JSON serialization cannot prove a render uses the right media. Final frame/sample checks are required.

Sources: otio-track, otio-adapters, ffprobe-options

**definition**: Conform and relink verification. Required knowledge: Version-bound media references, effects loss and offline media

**productionUse**: Conform each clip to exact admitted original version and verify codec/timing/channel compatibility. Mark missing or mismatched media offline and block a complete master claim.

**standards**: Rational time value/rate, available/source/parent ranges, exclusive end and media-reference contracts.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Conform each clip to exact admitted original version and verify codec/timing/channel compatibility. Mark missing or mismatched media offline and block a complete master claim. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Wrong take with same name, unavailable original, stale proxy and shifted audio start. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Successful timeline JSON serialization cannot prove a render uses the right media. Final frame/sample checks are required.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Media retrieval/decode, final render and visual/audio QC time.

**failureModes**: Wrong take with same name, unavailable original, stale proxy and shifted audio start.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Executed NLE conform and final-frame/audio verification.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Unavailable media cannot be presented as a complete final edit

**Remaining evidence**: Executed NLE conform and final-frame/audio verification.

## PR-COMPOSITE-01 — Keying and mattes

Selected method: Keep segmentation/matte, spill suppression, edge treatment and premultiplication explicit. Test fine hair, transparent objects, motion blur and temporal edge stability.

Alternative/tradeoff: SAM2 binary object masks are not a production alpha matte for hair/glass. Blender keying exposes edge/core/garbage/despill stages but needs shot-specific tuning.

Sources: blender-alpha-over, blender-keying, ocio-overview

**definition**: Keying and mattes. Required knowledge: Segmentation, temporal edges, spill, premultiplication and motion blur

**productionUse**: Keep segmentation/matte, spill suppression, edge treatment and premultiplication explicit. Test fine hair, transparent objects, motion blur and temporal edge stability.

**standards**: Premultiplication, scene-linear operations, channel semantics, data/display windows and deep sample limits.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Keep segmentation/matte, spill suppression, edge treatment and premultiplication explicit. Test fine hair, transparent objects, motion blur and temporal edge stability. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Green spill, dark halo, opaque glass, blurred hand clipped and matte chatter. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: SAM2 binary object masks are not a production alpha matte for hair/glass. Blender keying exposes edge/core/garbage/despill stages but needs shot-specific tuning.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Per-pixel/time memory; operator choices and manual edge repair measured.

**failureModes**: Green spill, dark halo, opaque glass, blurred hand clipped and matte chatter.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Executed keying/matting renders on challenging admitted plates.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Hair/transparent/fast-motion edges pass frame and playback review

**Remaining evidence**: Executed keying/matting renders on challenging admitted plates.

## PR-COMPOSITE-02 — Tracking and reconstruction

Selected method: Separate point/planar/3D reconstruction and calibrate lens distortion, image crop and coordinate conventions. Measure reprojection/registration residual over the whole shot.

Alternative/tradeoff: A planar track can attach a sign to a wall but cannot reconstruct arbitrary depth/parallax. Missing scene scale produces ambiguous 3D translation.

Sources: blender-alpha-over, blender-keying, ocio-overview

**definition**: Tracking and reconstruction. Required knowledge: Point/planar/3D tracking, lens distortion and coordinate conversion

**productionUse**: Separate point/planar/3D reconstruction and calibrate lens distortion, image crop and coordinate conventions. Measure reprojection/registration residual over the whole shot.

**standards**: Premultiplication, scene-linear operations, channel semantics, data/display windows and deep sample limits.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Separate point/planar/3D reconstruction and calibrate lens distortion, image crop and coordinate conventions. Measure reprojection/registration residual over the whole shot. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Planar assumption on nonplanar object, rolling shutter, lens distortion ignored, occlusion and motion blur. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: A planar track can attach a sign to a wall but cannot reconstruct arbitrary depth/parallax. Missing scene scale produces ambiguous 3D translation.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Feature detection/matching/solve cost; failed tracks remain explicit.

**failureModes**: Planar assumption on nonplanar object, rolling shutter, lens distortion ignored, occlusion and motion blur.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Admitted tracker runtime, actual reconstruction and residual fixtures.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Inserted element stays registered across the shot with measured residual

**Remaining evidence**: Admitted tracker runtime, actual reconstruction and residual fixtures.

## PR-COMPOSITE-03 — Light/depth/grain integration

Selected method: Composite in a declared linear working space with premultiplied alpha; match exposure, shadow direction, depth of field, motion blur and grain in an appropriate order.

Alternative/tradeoff: A color filter cannot fix a wrong contact shadow or depth relationship. Grain and display transforms require source/working/output distinction.

Sources: blender-alpha-over, blender-keying, ocio-overview

**definition**: Light/depth/grain integration. Required knowledge: Exposure, color space, contact shadows, depth of field and noise

**productionUse**: Composite in a declared linear working space with premultiplied alpha; match exposure, shadow direction, depth of field, motion blur and grain in an appropriate order.

**standards**: Premultiplication, scene-linear operations, channel semantics, data/display windows and deep sample limits.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Composite in a declared linear working space with premultiplied alpha; match exposure, shadow direction, depth of field, motion blur and grain in an appropriate order. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Double transform, straight alpha treated as premultiplied, wrong shadow direction, mismatched blur and grain in only inserted element. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: A color filter cannot fix a wrong contact shadow or depth relationship. Grain and display transforms require source/working/output distinction.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Render passes, linear compositing memory and human match review.

**failureModes**: Double transform, straight alpha treated as premultiplied, wrong shadow direction, mismatched blur and grain in only inserted element.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Rendered plate/CG integration and controlled playback review.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Composite passes controlled match review without halos or double transforms

**Remaining evidence**: Rendered plate/CG integration and controlled playback review.

## PR-COMPOSITE-04 — Layered editable delivery

Selected method: Deliver named editable layers/passes, mask/track data, input byte identities and transform configuration. Reopen with all external dependencies resolved and revise one layer.

Alternative/tradeoff: Flattened beauty output is useful for review but fails an editable-layer requirement. Native DCC/PSD/project structures must accompany it.

Sources: blender-alpha-over, blender-keying, ocio-overview

**definition**: Layered editable delivery. Required knowledge: Passes, masks, tracking data, external assets and project version

**productionUse**: Deliver named editable layers/passes, mask/track data, input byte identities and transform configuration. Reopen with all external dependencies resolved and revise one layer.

**standards**: Premultiplication, scene-linear operations, channel semantics, data/display windows and deep sample limits.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Deliver named editable layers/passes, mask/track data, input byte identities and transform configuration. Reopen with all external dependencies resolved and revise one layer. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Lost matte, unsupported layer effect, missing tracking data and absent external plate. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Flattened beauty output is useful for review but fails an editable-layer requirement. Native DCC/PSD/project structures must accompany it.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Pass count*resolution*bit depth drives storage; dependency packaging time included.

**failureModes**: Lost matte, unsupported layer effect, missing tracking data and absent external plate.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Actual layered project delivery and recipient reopen/local-edit fixture.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Recipient can reopen and revise layers without flattened-only dependencies

**Remaining evidence**: Actual layered project delivery and recipient reopen/local-edit fixture.

## PR-CLEANUP-01 — Removal masks and tracking

Selected method: Bind object IDs and prompt corrections to frame/coordinate space; propagate masks both directions as needed and retain corrections/version history.

Alternative/tradeoff: SAM2 defers memory encoding after prompt corrections; masks must be checked under occlusion, not presumed stable from initial frame.

Sources: sam2-corrections, sam2-paper-method, propainter-inference, propainter-license

**definition**: Removal masks and tracking. Required knowledge: Object selection, temporal propagation and occlusion

**productionUse**: Bind object IDs and prompt corrections to frame/coordinate space; propagate masks both directions as needed and retain corrections/version history.

**standards**: Frame/object IDs, mask transforms, temporal window settings and versioned output deltas.

**papers**: SAM 2 (2408.00714), ProPainter (2309.03897): repository/API sections read; full papers and independent reproduction remain OPEN.

**implementations**: Bind object IDs and prompt corrections to frame/coordinate space; propagate masks both directions as needed and retain corrections/version history. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: SAM 2 is a candidate for segmentation only. Checkpoint/runtime evaluation and other needed models remain OPEN.

**datasets**: Own/admitted positive and hard-negative fixtures: Box after old point prompts without clearing, wrong original image scale, ID swap during occlusion and correction not propagated. Independent labels and rights are required for evaluation assets.

**licensing**: SAM 2 README identifies Apache-2.0 code/checkpoints with separately licensed demo fonts. ProPainter code/models use non-commercial S-Lab license; no commercial default.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: SAM2 defers memory encoding after prompt corrections; masks must be checked under occlusion, not presumed stable from initial frame.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Video/model memory and correction effort; CPU offload trades memory for runtime.

**failureModes**: Box after old point prompts without clearing, wrong original image scale, ID swap during occlusion and correction not propagated.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: SAM2 inference and mask-tracking metrics on admitted footage.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Mask stays attached through motion and partial occlusion

**Remaining evidence**: SAM2 inference and mask-tracking metrics on admitted footage.

## PR-CLEANUP-02 — Background reconstruction

Selected method: Separate mask generation, completed optical flow, temporal propagation and generative hole filling. Preserve source timing and inspect disocclusions/parallax/texture recurrence.

Alternative/tradeoff: ProPainter combines flow and inpainting but is non-commercial under its retrieved license. Commercial routing requires another admitted implementation or explicit permission.

Sources: sam2-corrections, sam2-paper-method, propainter-inference, propainter-license

**definition**: Background reconstruction. Required knowledge: Clean plates, parallax, disocclusion and texture synthesis

**productionUse**: Separate mask generation, completed optical flow, temporal propagation and generative hole filling. Preserve source timing and inspect disocclusions/parallax/texture recurrence.

**standards**: Frame/object IDs, mask transforms, temporal window settings and versioned output deltas.

**papers**: SAM 2 (2408.00714), ProPainter (2309.03897): repository/API sections read; full papers and independent reproduction remain OPEN.

**implementations**: Separate mask generation, completed optical flow, temporal propagation and generative hole filling. Preserve source timing and inspect disocclusions/parallax/texture recurrence. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: SAM 2 is a candidate for segmentation only. Checkpoint/runtime evaluation and other needed models remain OPEN.

**datasets**: Own/admitted positive and hard-negative fixtures: New background revealed, repeated texture swims, foreground occluder smeared, mask too tight and wrong export fps. Independent labels and rights are required for evaluation assets.

**licensing**: SAM 2 README identifies Apache-2.0 code/checkpoints with separately licensed demo fonts. ProPainter code/models use non-commercial S-Lab license; no commercial default.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: ProPainter combines flow and inpainting but is non-commercial under its retrieved license. Commercial routing requires another admitted implementation or explicit permission.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Resolution/window size/model memory and repair time; chunk boundaries require continuity review.

**failureModes**: New background revealed, repeated texture swims, foreground occluder smeared, mask too tight and wrong export fps.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Commercial cleanup route admission and actual temporal reconstruction trials.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Removed region has stable texture with no temporal smear

**Remaining evidence**: Commercial cleanup route admission and actual temporal reconstruction trials.

## PR-CLEANUP-03 — Repair evidence and rollback

Selected method: Retain original bytes, mask versions, fill outputs and a localized composition recipe. Hash before/after artifacts; roll back the affected region independently of other approved edits.

Alternative/tradeoff: Replacing the original with the repaired frame destroys provenance. Layered recipes enable selective undo and comparison.

Sources: sam2-corrections, sam2-paper-method, propainter-inference, propainter-license

**definition**: Repair evidence and rollback. Required knowledge: Original plate, edit mask, generated fill and versioned comparison

**productionUse**: Retain original bytes, mask versions, fill outputs and a localized composition recipe. Hash before/after artifacts; roll back the affected region independently of other approved edits.

**standards**: Frame/object IDs, mask transforms, temporal window settings and versioned output deltas.

**papers**: SAM 2 (2408.00714), ProPainter (2309.03897): repository/API sections read; full papers and independent reproduction remain OPEN.

**implementations**: Retain original bytes, mask versions, fill outputs and a localized composition recipe. Hash before/after artifacts; roll back the affected region independently of other approved edits. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: SAM 2 is a candidate for segmentation only. Checkpoint/runtime evaluation and other needed models remain OPEN.

**datasets**: Own/admitted positive and hard-negative fixtures: Original overwritten, mask changed without fill invalidation, unrelated region altered and repair version mislabeled. Independent labels and rights are required for evaluation assets.

**licensing**: SAM 2 README identifies Apache-2.0 code/checkpoints with separately licensed demo fonts. ProPainter code/models use non-commercial S-Lab license; no commercial default.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Replacing the original with the repaired frame destroys provenance. Layered recipes enable selective undo and comparison.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Original and derived storage plus replay CPU; compare repair effort to full regeneration.

**failureModes**: Original overwritten, mask changed without fill invalidation, unrelated region altered and repair version mislabeled.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Actual mask/fill composition and localized rollback fixtures.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Source is preserved and localized edit can be reverted independently

**Remaining evidence**: Actual mask/fill composition and localized rollback fixtures.

## PR-VECTOR-01 — Shape and edge extraction

Selected method: Segment color/shape regions, retain hole topology and fit contours into an editable vector document IR. Pin frontend configuration and cache segmentation only when clustering inputs match.

Alternative/tradeoff: Current VTracer pipeline splits segmentation from color/curve/composition optimization; reuse lowers interactive tuning cost but changes to clustering require re-segmentation.

Sources: vector-pipeline, vector-simplify, vector-svg, vector-spline-test, vtracer-license

**definition**: Shape and edge extraction. Required knowledge: Segmentation, contours, holes, color grouping and path fitting

**productionUse**: Segment color/shape regions, retain hole topology and fit contours into an editable vector document IR. Pin frontend configuration and cache segmentation only when clustering inputs match.

**standards**: SVG path/fill/viewBox, coordinate precision, color palette and safe embedded-resource policy.

**papers**: Selected implementation documents a Schneider-style sampled cubic refit. No original-paper read or continuous geometric-error guarantee claimed.

**implementations**: Segment color/shape regions, retain hole topology and fit contours into an editable vector document IR. Pin frontend configuration and cache segmentation only when clustering inputs match. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: Selected vectorization path is deterministic; no trained model required. Text/font recognition would be a separate capability.

**datasets**: Own/admitted positive and hard-negative fixtures: Hole filled, touching colors merged, speckle removed from intended dot and stale segmentation reused with changed threshold. Independent labels and rights are required for evaluation assets.

**licensing**: VTracer root MIT license read. Crate/dependency admission remains required before distribution or execution.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Current VTracer pipeline splits segmentation from color/curve/composition optimization; reuse lowers interactive tuning cost but changes to clustering require re-segmentation.

**runtime**: Selected current Rust pipeline, simplifier, SVG writer and regression tests read. Cargo dependencies identified; runtime binary/tests have not run.

**cost**: Clustering dominates; record region/point counts and memory at target image size.

**failureModes**: Hole filled, touching colors merged, speckle removed from intended dot and stale segmentation reused with changed threshold.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Actual current VTracer build/run and raster-topology comparisons.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Topology and holes match source within declared tolerance

**Remaining evidence**: Actual current VTracer build/run and raster-topology comparisons.

## PR-VECTOR-02 — Path simplification and editability

Selected method: Simplify smooth cubic runs while pinning junction endpoints/corners and preserving closed rings. Measure geometric error against both fitted geometry and original contour, then report node count.

Alternative/tradeoff: VTracer sampled refit tolerance is not a proven continuous Hausdorff bound. Shared mosaic edges must be simplified once to avoid seams.

Sources: vector-pipeline, vector-simplify, vector-svg, vector-spline-test, vtracer-license

**definition**: Path simplification and editability. Required knowledge: Bezier fitting, node count, groups and text handling

**productionUse**: Simplify smooth cubic runs while pinning junction endpoints/corners and preserving closed rings. Measure geometric error against both fitted geometry and original contour, then report node count.

**standards**: SVG path/fill/viewBox, coordinate precision, color palette and safe embedded-resource policy.

**papers**: Selected implementation documents a Schneider-style sampled cubic refit. No original-paper read or continuous geometric-error guarantee claimed.

**implementations**: Simplify smooth cubic runs while pinning junction endpoints/corners and preserving closed rings. Measure geometric error against both fitted geometry and original contour, then report node count. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: Selected vectorization path is deterministic; no trained model required. Text/font recognition would be a separate capability.

**datasets**: Own/admitted positive and hard-negative fixtures: Corner rounded away, closed seam split, shared boundary fits diverge and sparse sampling hides a bulge. Independent labels and rights are required for evaluation assets.

**licensing**: VTracer root MIT license read. Crate/dependency admission remains required before distribution or execution.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: VTracer sampled refit tolerance is not a proven continuous Hausdorff bound. Shared mosaic edges must be simplified once to avoid seams.

**runtime**: Selected current Rust pipeline, simplifier, SVG writer and regression tests read. Cargo dependencies identified; runtime binary/tests have not run.

**cost**: Sample density grows as tolerance shrinks; fewer output nodes improve editability only if design survives.

**failureModes**: Corner rounded away, closed seam split, shared boundary fits diverge and sparse sampling hides a bulge.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Executed simplification tests and dense/original-contour error measurement.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Editable vector retains design with bounded geometric error

**Remaining evidence**: Executed simplification tests and dense/original-contour error measurement.

## PR-VECTOR-03 — Vector export validation

Selected method: Parse generated SVG with bounded safe geometry, validate viewBox/units/fill rule/closed subpaths and compare rasterization in target renderers. Reject hidden raster substitution when vectors are mandatory.

Alternative/tradeoff: VTracer serializes absolute/relative commands and same-fill groups while preserving paint order; text/font/clipping require separate handling.

Sources: vector-pipeline, vector-simplify, vector-svg, vector-spline-test, vtracer-license

**definition**: Vector export validation. Required knowledge: SVG feature support, fonts, clipping and render parity

**productionUse**: Parse generated SVG with bounded safe geometry, validate viewBox/units/fill rule/closed subpaths and compare rasterization in target renderers. Reject hidden raster substitution when vectors are mandatory.

**standards**: SVG path/fill/viewBox, coordinate precision, color palette and safe embedded-resource policy.

**papers**: Selected implementation documents a Schneider-style sampled cubic refit. No original-paper read or continuous geometric-error guarantee claimed.

**implementations**: Parse generated SVG with bounded safe geometry, validate viewBox/units/fill rule/closed subpaths and compare rasterization in target renderers. Reject hidden raster substitution when vectors are mandatory. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: Selected vectorization path is deterministic; no trained model required. Text/font recognition would be a separate capability.

**datasets**: Own/admitted positive and hard-negative fixtures: Z current point wrong, missing hole fill rule, font absent, embedded raster instead of paths and remote resource. Independent labels and rights are required for evaluation assets.

**licensing**: VTracer root MIT license read. Crate/dependency admission remains required before distribution or execution.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: VTracer serializes absolute/relative commands and same-fill groups while preserving paint order; text/font/clipping require separate handling.

**runtime**: Selected current Rust pipeline, simplifier, SVG writer and regression tests read. Cargo dependencies identified; runtime binary/tests have not run.

**cost**: Serialization O(path commands); raster comparison and target-app import time.

**failureModes**: Z current point wrong, missing hole fill rule, font absent, embedded raster instead of paths and remote resource.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Executed SVG export/render parity and font/clipping admission.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Export renders consistently and does not substitute raster artwork silently

**Remaining evidence**: Executed SVG export/render parity and font/clipping admission.

## PR-IMAGE-01 — Non-destructive layer operations

Selected method: Use stable document/layer IDs, non-destructive masks/adjustments and scoped history transactions. On Photoshop, await executeAsModal and respect cancellation without swallowing exceptions.

Alternative/tradeoff: Flattened direct pixel edits are easier but fail independent rollback. Host modal access prevents competing mutations; it is not broad authorization to change unrelated documents.

Sources: photoshop, adobe-modal, exr

**definition**: Non-destructive layer operations. Required knowledge: Masks, blend modes, adjustment layers and source preservation

**productionUse**: Use stable document/layer IDs, non-destructive masks/adjustments and scoped history transactions. On Photoshop, await executeAsModal and respect cancellation without swallowing exceptions.

**standards**: Document/layer IDs, action results, masks, working/output profiles and revision identity.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Use stable document/layer IDs, non-destructive masks/adjustments and scoped history transactions. On Photoshop, await executeAsModal and respect cancellation without swallowing exceptions. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Active layer changes, duplicate names, cancellation halfway through edit and history suspension never resumed. Independent labels and rights are required for evaluation assets.

**licensing**: Photoshop UXP documentation describes integration; Adobe application/account entitlement is separate. No private application source copied.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Flattened direct pixel edits are easier but fail independent rollback. Host modal access prevents competing mutations; it is not broad authorization to change unrelated documents.

**runtime**: Selected Photoshop async/modal APIs read. Actual Photoshop document mutation/reopen is unavailable until its admitted host runtime is used.

**cost**: Layer count, pixel size and history memory; cancellation limits long-running operations.

**failureModes**: Active layer changes, duplicate names, cancellation halfway through edit and history suspension never resumed.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Actual Photoshop/other layered editor execution and localized rollback.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Editing one region leaves untouched pixels/layers recoverable

**Remaining evidence**: Actual Photoshop/other layered editor execution and localized rollback.

## PR-IMAGE-02 — Texture and lighting repair

Selected method: Repair in the proper surface/perspective space, separate texture from illumination and constrain modifications to admitted masks. Compare repeated structures and light direction after repair.

Alternative/tradeoff: A seamless local patch may still break perspective or global lighting. Generative replacement needs measured untouched-region and structure checks.

Sources: photoshop, adobe-modal, exr

**definition**: Texture and lighting repair. Required knowledge: Perspective, repeat patterns, material and illumination consistency

**productionUse**: Repair in the proper surface/perspective space, separate texture from illumination and constrain modifications to admitted masks. Compare repeated structures and light direction after repair.

**standards**: Document/layer IDs, action results, masks, working/output profiles and revision identity.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Repair in the proper surface/perspective space, separate texture from illumination and constrain modifications to admitted masks. Compare repeated structures and light direction after repair. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Brick repetition bends, highlights reverse, material detail changes and mask bleeds into untouched area. Independent labels and rights are required for evaluation assets.

**licensing**: Photoshop UXP documentation describes integration; Adobe application/account entitlement is separate. No private application source copied.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: A seamless local patch may still break perspective or global lighting. Generative replacement needs measured untouched-region and structure checks.

**runtime**: Selected Photoshop async/modal APIs read. Actual Photoshop document mutation/reopen is unavailable until its admitted host runtime is used.

**cost**: Patch/model cost plus cleanup time; preserve original resolution and color interpretation.

**failureModes**: Brick repetition bends, highlights reverse, material detail changes and mask bleeds into untouched area.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Actual localized repair fixtures and surface/light consistency review.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Repeated structures and light direction survive localized repair

**Remaining evidence**: Actual localized repair fixtures and surface/light consistency review.

## PR-IMAGE-03 — Image export and color fidelity

Selected method: Record bit depth, profile/encoding, alpha convention and export format. Reopen output and compare intended appearance under the same display transform, preserving an editable original.

Alternative/tradeoff: An ICC/profile tag does not guarantee correct pixel conversion. PNG structural inspection cannot certify color appearance or arbitrary profile processing.

Sources: photoshop, adobe-modal, exr

**definition**: Image export and color fidelity. Required knowledge: Bit depth, profiles, alpha and metadata preservation

**productionUse**: Record bit depth, profile/encoding, alpha convention and export format. Reopen output and compare intended appearance under the same display transform, preserving an editable original.

**standards**: Document/layer IDs, action results, masks, working/output profiles and revision identity.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Record bit depth, profile/encoding, alpha convention and export format. Reopen output and compare intended appearance under the same display transform, preserving an editable original. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Alpha becomes opaque, straight/premultiplied mismatch, profile dropped,8-bit clipping and wrong input space. Independent labels and rights are required for evaluation assets.

**licensing**: Photoshop UXP documentation describes integration; Adobe application/account entitlement is separate. No private application source copied.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: An ICC/profile tag does not guarantee correct pixel conversion. PNG structural inspection cannot certify color appearance or arbitrary profile processing.

**runtime**: Selected Photoshop async/modal APIs read. Actual Photoshop document mutation/reopen is unavailable until its admitted host runtime is used.

**cost**: Bit depth and layer count drive storage; transform and encode time recorded.

**failureModes**: Alpha becomes opaque, straight/premultiplied mismatch, profile dropped,8-bit clipping and wrong input space.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Executed color-managed image export/reopen and alpha fixtures.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Reopen/export tests preserve intended alpha and color appearance

**Remaining evidence**: Executed color-managed image export/reopen and alpha fixtures.

## PR-REALTIME-01 — Operator graph and feedback

Selected method: Build explicit typed operator inputs and delayed feedback targets with reset behavior, parameter ranges and versioned dependencies. Validate graph and then execute stability under changing inputs.

Alternative/tradeoff: TouchDesigner Feedback TOP targets downstream output and provides reset/resetpulse. A generic DAG cycle ban must exempt only explicit time-delayed feedback, not arbitrary loops.

Sources: td-feedback, td-performance, td-export

**definition**: Operator graph and feedback. Required knowledge: TOP/CHOP/SOP domains, feedback stability and parameter mapping

**productionUse**: Build explicit typed operator inputs and delayed feedback targets with reset behavior, parameter ranges and versioned dependencies. Validate graph and then execute stability under changing inputs.

**standards**: Declared frame rate, control protocol, feedback state, color and export contract require source verification.

**papers**: No learned-method paper is needed for the selected documented graph/measurement contract. Runtime measurements remain required.

**implementations**: Build explicit typed operator inputs and delayed feedback targets with reset behavior, parameter ranges and versioned dependencies. Validate graph and then execute stability under changing inputs. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No learned model needed for declared operator graph. External AI TOPs would require their own runtime and license admission.

**datasets**: Own/admitted positive and hard-negative fixtures: Target itself, reset omitted at restart, feedback runaway, type mismatch and missing dependency. Independent labels and rights are required for evaluation assets.

**licensing**: TouchDesigner is proprietary and edition/account permissions must be verified. No proprietary source, binaries or example project are copied.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: TouchDesigner Feedback TOP targets downstream output and provides reset/resetpulse. A generic DAG cycle ban must exempt only explicit time-delayed feedback, not arbitrary loops.

**runtime**: Official docs successfully retrieved through derivative.ca/UserGuide after docs.derivative.ca403. No admitted TouchDesigner runtime has executed.

**cost**: Feedback texture memory and cook work; resolution/pixel format are budget controls.

**failureModes**: Target itself, reset omitted at restart, feedback runaway, type mismatch and missing dependency.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Actual TouchDesigner or admitted native realtime runtime execution; official operator behavior is sourced.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Graph has explicit inputs and remains stable under parameter changes

**Remaining evidence**: Actual TouchDesigner or admitted native realtime runtime execution; official operator behavior is sourced.

## PR-REALTIME-02 — Real-time timing and control

Selected method: Measure frame intervals, dropped frames, input-to-output delay and GPU work on the agreed device; bound controls and reset state. Collect short controlled performance captures.

Alternative/tradeoff: Derivative warns most TOP cook times measure CPU submission, not GPU execution. Continuous logging can perturb the workload.

Sources: td-feedback, td-performance, td-export

**definition**: Real-time timing and control. Required knowledge: Audio/reactive inputs, frame pacing, latency and reset semantics

**productionUse**: Measure frame intervals, dropped frames, input-to-output delay and GPU work on the agreed device; bound controls and reset state. Collect short controlled performance captures.

**standards**: Declared frame rate, control protocol, feedback state, color and export contract require source verification.

**papers**: No learned-method paper is needed for the selected documented graph/measurement contract. Runtime measurements remain required.

**implementations**: Measure frame intervals, dropped frames, input-to-output delay and GPU work on the agreed device; bound controls and reset state. Collect short controlled performance captures. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No learned model needed for declared operator graph. External AI TOPs would require their own runtime and license admission.

**datasets**: Own/admitted positive and hard-negative fixtures: CPU cook appears fast while GPU stalls, input burst, device reconnect, frame drop and high-resolution feedback. Independent labels and rights are required for evaluation assets.

**licensing**: TouchDesigner is proprietary and edition/account permissions must be verified. No proprietary source, binaries or example project are copied.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Derivative warns most TOP cook times measure CPU submission, not GPU execution. Continuous logging can perturb the workload.

**runtime**: Official docs successfully retrieved through derivative.ca/UserGuide after docs.derivative.ca403. No admitted TouchDesigner runtime has executed.

**cost**: p50/p95/p99 frame time, memory and end-to-end input latency; declare measurement overhead.

**failureModes**: CPU cook appears fast while GPU stalls, input burst, device reconnect, frame drop and high-resolution feedback.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Actual target-device latency/performance capture.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Measured latency/frame timing stays within the agreed device budget

**Remaining evidence**: Actual target-device latency/performance capture.

## PR-REALTIME-03 — Preview/export parity

Selected method: Export with explicit movie fps, resolution, codec, alpha and time-sliced audio input; inspect actual frames/samples and compare to the approved preview state.

Alternative/tradeoff: Movie File Out supports different codecs with differing alpha behavior. Preview screenshots cannot certify full-length/audio export parity.

Sources: td-feedback, td-performance, td-export

**definition**: Preview/export parity. Required knowledge: Output resolution, codec, color and recorded time base

**productionUse**: Export with explicit movie fps, resolution, codec, alpha and time-sliced audio input; inspect actual frames/samples and compare to the approved preview state.

**standards**: Declared frame rate, control protocol, feedback state, color and export contract require source verification.

**papers**: No learned-method paper is needed for the selected documented graph/measurement contract. Runtime measurements remain required.

**implementations**: Export with explicit movie fps, resolution, codec, alpha and time-sliced audio input; inspect actual frames/samples and compare to the approved preview state. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No learned model needed for declared operator graph. External AI TOPs would require their own runtime and license admission.

**datasets**: Own/admitted positive and hard-negative fixtures: Audio CHOP not time-sliced, last frame missing, wrong pixel format, codec strips alpha and realtime capture drops frames. Independent labels and rights are required for evaluation assets.

**licensing**: TouchDesigner is proprietary and edition/account permissions must be verified. No proprietary source, binaries or example project are copied.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Movie File Out supports different codecs with differing alpha behavior. Preview screenshots cannot certify full-length/audio export parity.

**runtime**: Official docs successfully retrieved through derivative.ca/UserGuide after docs.derivative.ca403. No admitted TouchDesigner runtime has executed.

**cost**: Encode/write bandwidth, dropped-frame count and final delivery bytes.

**failureModes**: Audio CHOP not time-sliced, last frame missing, wrong pixel format, codec strips alpha and realtime capture drops frames.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Actual runtime export and decoded preview/export parity.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Export matches approved preview without missing dependencies

**Remaining evidence**: Actual runtime export and decoded preview/export parity.

## PR-COLOR-01 — Input transform identification

Selected method: Record source encoding, primaries, transfer, range and alpha independently; distinguish scene-linear radiance from display-referred footage and non-color data. Unknown encoding blocks automatic conversion.

Alternative/tradeoff: ACEScg is a defined linear working encoding, not a magic tag for every EXR. File extensions cannot determine source color space.

Sources: ocio, ocio-overview, exr

**definition**: Input transform identification. Required knowledge: Encoding, gamut, transfer, range and scene/display-referred distinction

**productionUse**: Record source encoding, primaries, transfer, range and alpha independently; distinguish scene-linear radiance from display-referred footage and non-color data. Unknown encoding blocks automatic conversion.

**standards**: Config version, roles, context variables, LUT digest, input/view/output transforms and metadata.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Record source encoding, primaries, transfer, range and alpha independently; distinguish scene-linear radiance from display-referred footage and non-color data. Unknown encoding blocks automatic conversion. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: sRGB treated as linear, log footage viewed without transform, normals color-converted and limited range interpreted full. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: ACEScg is a defined linear working encoding, not a magic tag for every EXR. File extensions cannot determine source color space.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Input conversion per pixel; metadata uncertainty costs manual identification.

**failureModes**: sRGB treated as linear, log footage viewed without transform, normals color-converted and limited range interpreted full.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Executed source/transform identification fixtures and bounded metadata inspection.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Unknown encoding is explicit; display footage is not silently treated as linear

**Remaining evidence**: Executed source/transform identification fixtures and bounded metadata inspection.

## PR-COLOR-02 — Look and shot matching

Selected method: Match exposure/white balance/contrast and intended look in a controlled viewing pipeline. Check skin, highlights, shadow detail and gamut per shot before comparing creative results.

Alternative/tradeoff: A global histogram match may destroy motivated lighting and cannot establish aesthetic match. Reference stills and human review complement measurements.

Sources: ocio, ocio-overview, exr

**definition**: Look and shot matching. Required knowledge: Exposure, white balance, contrast, skin and gamut behavior

**productionUse**: Match exposure/white balance/contrast and intended look in a controlled viewing pipeline. Check skin, highlights, shadow detail and gamut per shot before comparing creative results.

**standards**: Config version, roles, context variables, LUT digest, input/view/output transforms and metadata.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Match exposure/white balance/contrast and intended look in a controlled viewing pipeline. Check skin, highlights, shadow detail and gamut per shot before comparing creative results. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Clipped highlight, crushed shadow, skin hue drift, wrong white point and mixed display transforms. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: A global histogram match may destroy motivated lighting and cannot establish aesthetic match. Reference stills and human review complement measurements.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Pixel processing plus colorist/review time; retain pre-look neutral version.

**failureModes**: Clipped highlight, crushed shadow, skin hue drift, wrong white point and mixed display transforms.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Controlled shot-match renders and qualified visual review.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Shots match under controlled viewing without clipped or invalid colors

**Remaining evidence**: Controlled shot-match renders and qualified visual review.

## PR-COLOR-03 — Transform provenance

Selected method: Hash selected config, LUTs, context variables, input/look/output transforms and application/runtime. Apply display/output transform exactly once and preserve the recipe with assets.

Alternative/tradeoff: OCIO executes the transforms in its config; merely naming OCIO does not identify color science or approved look. Missing LUT/config invalidates replay.

Sources: ocio, ocio-overview, exr

**definition**: Transform provenance. Required knowledge: Input/look/output transform IDs, versions and metadata

**productionUse**: Hash selected config, LUTs, context variables, input/look/output transforms and application/runtime. Apply display/output transform exactly once and preserve the recipe with assets.

**standards**: Config version, roles, context variables, LUT digest, input/view/output transforms and metadata.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Hash selected config, LUTs, context variables, input/look/output transforms and application/runtime. Apply display/output transform exactly once and preserve the recipe with assets. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Config same name different bytes, context path changes, display transform baked twice and missing LUT. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: OCIO executes the transforms in its config; merely naming OCIO does not identify color science or approved look. Missing LUT/config invalidates replay.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Config/LUT load and processing; package size small relative to media but essential to replay.

**failureModes**: Config same name different bytes, context path changes, display transform baked twice and missing LUT.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Executed config/LUT provenance replay and double-transform detection.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: No double transform; replay uses identical approved configuration

**Remaining evidence**: Executed config/LUT provenance replay and double-transform detection.

## PR-COLOR-04 — Display and mastering validation

Selected method: Specify SDR/HDR transfer, primaries, mastering/display target, range, codec/bit depth and required metadata. Validate actual output on its intended viewing path; keep archive working master separate.

Alternative/tradeoff: An8-bit preview or uncalibrated browser cannot certify HDR mastering. A valid media header alone cannot prove the target appearance.

Sources: ocio, ocio-overview, exr

**definition**: Display and mastering validation. Required knowledge: SDR/HDR targets, viewing transforms, codecs and QC

**productionUse**: Specify SDR/HDR transfer, primaries, mastering/display target, range, codec/bit depth and required metadata. Validate actual output on its intended viewing path; keep archive working master separate.

**standards**: Config version, roles, context variables, LUT digest, input/view/output transforms and metadata.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Specify SDR/HDR transfer, primaries, mastering/display target, range, codec/bit depth and required metadata. Validate actual output on its intended viewing path; keep archive working master separate. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: PQ tagged on SDR pixels, gamut mismatch, metadata lost in transcode and display clips intended peak. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: An8-bit preview or uncalibrated browser cannot certify HDR mastering. A valid media header alone cannot prove the target appearance.

**runtime**: Catalog runs in Node. Actual DCC/model/media execution has not been performed here; do not require owner GPU self-hosting as a default.

**cost**: Master encode, storage and display-review resources; no HDR certification from this CPU fixture.

**failureModes**: PQ tagged on SDR pixels, gamut mismatch, metadata lost in transcode and display clips intended peak.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Actual mastering encode/metadata checks and target-display review.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Master is checked on intended output path with preserved metadata

**Remaining evidence**: Actual mastering encode/metadata checks and target-display review.

## PR-WEB-01 — Requirements to component mapping

Selected method: Map each requested action to a route/component and testable state transition with content/data ownership. Build an explicit responsive component contract before choosing decorative motion.

Alternative/tradeoff: Native single-page content-site generator covers anchors/details/cards only. Arbitrary application routes or data mutations require a full app workflow.

Sources: web-animation-cancel, web-motion, wcag

**definition**: Requirements to component mapping. Required knowledge: Routes, content, actions, responsive behavior and data needs

**productionUse**: Map each requested action to a route/component and testable state transition with content/data ownership. Build an explicit responsive component contract before choosing decorative motion.

**standards**: Route/data contracts, keyboard/focus, reduced motion, asset delivery and performance budgets.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Map each requested action to a route/component and testable state transition with content/data ownership. Build an explicit responsive component contract before choosing decorative motion. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Dead button, missing route, responsive overflow, content lost in rewrite and navigation with no target. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Native single-page content-site generator covers anchors/details/cards only. Arbitrary application routes or data mutations require a full app workflow.

**runtime**: Catalog/planning tools run in Node without GPU. Provider execution, browser/DCC tests and metric runtimes remain separate.

**cost**: Build and browser verification time; reuse approved components to lower edit cost.

**failureModes**: Dead button, missing route, responsive overflow, content lost in rewrite and navigation with no target.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Browser journeys for generated pages and full app implementation for unsupported actions.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Every required action maps to a working component and acceptance test

**Remaining evidence**: Browser journeys for generated pages and full app implementation for unsupported actions.

## PR-WEB-02 — Motion behavior and accessibility

Selected method: Define trigger, duration, easing, interruption and reduced-motion behavior; preserve keyboard/focus semantics and visible content without animation. Cancel/reconcile animations on visibility or preference change.

Alternative/tradeoff: Web Animations cancellation resets effects and rejects relevant promises. Motion must support task completion; CSS/media-query fallback preserves content.

Sources: web-animation-cancel, web-motion, wcag

**definition**: Motion behavior and accessibility. Required knowledge: Triggers, interruption, scroll, reduced-motion, keyboard and focus

**productionUse**: Define trigger, duration, easing, interruption and reduced-motion behavior; preserve keyboard/focus semantics and visible content without animation. Cancel/reconcile animations on visibility or preference change.

**standards**: Route/data contracts, keyboard/focus, reduced motion, asset delivery and performance budgets.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Define trigger, duration, easing, interruption and reduced-motion behavior; preserve keyboard/focus semantics and visible content without animation. Cancel/reconcile animations on visibility or preference change. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Reduced motion toggled mid-animation, focus hidden, offscreen infinite animation and inaccessible hover-only control. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Web Animations cancellation resets effects and rejects relevant promises. Motion must support task completion; CSS/media-query fallback preserves content.

**runtime**: Catalog/planning tools run in Node without GPU. Provider execution, browser/DCC tests and metric runtimes remain separate.

**cost**: Prefer transform/opacity; measure actual frame/interaction performance rather than infer from CSS.

**failureModes**: Reduced motion toggled mid-animation, focus hidden, offscreen infinite animation and inaccessible hover-only control.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Executed browser/device keyboard, reduced-motion and interruption tests.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Motion alternatives and all controls work on target devices

**Remaining evidence**: Executed browser/device keyboard, reduced-motion and interruption tests.

## PR-WEB-03 — Media delivery performance

Selected method: Use explicit media dimensions/posters/responsive variants and a fixed device/network budget. Measure loading, layout shift, playback startup and fallback while preserving task-critical content.

Alternative/tradeoff: A compressed hero video can still monopolize bandwidth. Server caching and delayed video should be evaluated against the desired experience.

Sources: web-animation-cancel, web-motion, wcag

**definition**: Media delivery performance. Required knowledge: Poster/load states, responsive sources, caching and layout stability

**productionUse**: Use explicit media dimensions/posters/responsive variants and a fixed device/network budget. Measure loading, layout shift, playback startup and fallback while preserving task-critical content.

**standards**: Route/data contracts, keyboard/focus, reduced motion, asset delivery and performance budgets.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Use explicit media dimensions/posters/responsive variants and a fixed device/network budget. Measure loading, layout shift, playback startup and fallback while preserving task-critical content. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Autoplay blocked, no poster, large video shifts layout, mobile decoder overload and missing fallback. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: A compressed hero video can still monopolize bandwidth. Server caching and delayed video should be evaluated against the desired experience.

**runtime**: Catalog/planning tools run in Node without GPU. Provider execution, browser/DCC tests and metric runtimes remain separate.

**cost**: Transferred bytes, decode time, cache policy and startup latency; compare representative mobile budget.

**failureModes**: Autoplay blocked, no poster, large video shifts layout, mobile decoder overload and missing fallback.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Actual browser loading/playback metrics at specified network/device conditions.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Measured loading and playback meet a fixed device/network budget

**Remaining evidence**: Actual browser loading/playback metrics at specified network/device conditions.

## PR-WEB-04 — Post-build editing and regression

Selected method: Translate edit requests into changed requirements and components; preserve locked design/content and run affected journeys plus unrelated regression checks. Version approved build and evidence.

Alternative/tradeoff: Whole-page regeneration can discard approved functionality. Structured component/requirement IDs support localized edits.

Sources: web-animation-cancel, web-motion, wcag

**definition**: Post-build editing and regression. Required knowledge: DOM/component/asset dependency mapping and visual diff

**productionUse**: Translate edit requests into changed requirements and components; preserve locked design/content and run affected journeys plus unrelated regression checks. Version approved build and evidence.

**standards**: Route/data contracts, keyboard/focus, reduced motion, asset delivery and performance budgets.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Translate edit requests into changed requirements and components; preserve locked design/content and run affected journeys plus unrelated regression checks. Version approved build and evidence. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Change headline breaks form, motion update removes keyboard path, style edit changes unrelated content and mobile regression. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Whole-page regeneration can discard approved functionality. Structured component/requirement IDs support localized edits.

**runtime**: Catalog/planning tools run in Node without GPU. Provider execution, browser/DCC tests and metric runtimes remain separate.

**cost**: Affected build/test set and repair time; full regression required when dependency coverage uncertain.

**failureModes**: Change headline breaks form, motion update removes keyboard path, style edit changes unrelated content and mobile regression.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Natural-language post-build edits with browser visual/function regression.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Natural-language change preserves unrelated behavior and approved design

**Remaining evidence**: Natural-language post-build edits with browser visual/function regression.

## PR-WEB-05 — Backend and publication proof

Selected method: Use a real backend/auth/service for mutations and verify resulting stored state plus deployment endpoint. Surface failure honestly; preview success does not prove published integration.

Alternative/tradeoff: A contact mailto link is transparent and valid for that requirement; it cannot substitute for a required persistent form workflow.

Sources: web-animation-cancel, web-motion, wcag

**definition**: Backend and publication proof. Required knowledge: Auth, forms, service responses, preview and deployment state

**productionUse**: Use a real backend/auth/service for mutations and verify resulting stored state plus deployment endpoint. Surface failure honestly; preview success does not prove published integration.

**standards**: Route/data contracts, keyboard/focus, reduced motion, asset delivery and performance budgets.

**papers**: Applicable papers and method comparisons are recorded as an OPEN child research obligation; no exhaustive literature review claimed.

**implementations**: Use a real backend/auth/service for mutations and verify resulting stored state plus deployment endpoint. Surface failure honestly; preview success does not prove published integration. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: No trained model is bundled by this catalog. Provider models require current capability and account checks.

**datasets**: Own/admitted positive and hard-negative fixtures: Fake success without network write, wrong tenant, auth bypass, deploy points at old build and server error hidden. Independent labels and rights are required for evaluation assets.

**licensing**: Source and distribution licenses, checkpoint terms and asset rights must be recorded for the selected implementation; catalog inclusion is not admission.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: A contact mailto link is transparent and valid for that requirement; it cannot substitute for a required persistent form workflow.

**runtime**: Catalog/planning tools run in Node without GPU. Provider execution, browser/DCC tests and metric runtimes remain separate.

**cost**: Service/storage/hosting costs and operational recovery; deployment needs actual configured account.

**failureModes**: Fake success without network write, wrong tenant, auth bypass, deploy points at old build and server error hidden.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Authorized backend setup, end-to-end data mutation and published deployment verification.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: No fake form success; verify real service and deployment result

**Remaining evidence**: Authorized backend setup, end-to-end data mutation and published deployment verification.

## PR-EVAL-01 — Intent/continuity evaluation

Selected method: Join each criterion to output/evaluator/evidence identities and distinguish PASS, FAIL and UNAVAILABLE. Require all mandatory dimensions before any verified-output claim.

Alternative/tradeoff: A completed job is transport success, not intent or continuity success. Empty evaluation must never become a successful quality report.

Sources: vbench-subject, vbench-license, avatar-asc

**definition**: Intent/continuity evaluation. Required knowledge: Requirement traceability, identity, temporal state and uncertain judgments

**productionUse**: Join each criterion to output/evaluator/evidence identities and distinguish PASS, FAIL and UNAVAILABLE. Require all mandatory dimensions before any verified-output claim.

**standards**: Fixed brief, model/version, sample count, budget, blinded review and artifact provenance.

**papers**: Selected VBench source behavior, CameraCtrl trajectory metrics and primary production accounts guide protocol design; published scores are not local trials.

**implementations**: Join each criterion to output/evaluator/evidence identities and distinguish PASS, FAIL and UNAVAILABLE. Require all mandatory dimensions before any verified-output claim. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: DINO subject-consistency source inspected; no checkpoint or video score executed. Craft/physical dimensions need separate evaluators.

**datasets**: Own/admitted positive and hard-negative fixtures: Missing evaluator, failed evaluator, evaluator reads wrong output, criterion omitted and contradictory lock ignored. Independent labels and rights are required for evaluation assets.

**licensing**: VBench root Apache2 license read. Metric checkpoint/data licenses and fixture rights require separate admission; film references are study context, not reusable test footage.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: A completed job is transport success, not intent or continuity success. Empty evaluation must never become a successful quality report.

**runtime**: Catalog/planning tools run in Node without GPU. Provider execution, browser/DCC tests and metric runtimes remain separate.

**cost**: Evaluator inference/human time plus evidence storage; report uncertainty and unavailable coverage.

**failureModes**: Missing evaluator, failed evaluator, evaluator reads wrong output, criterion omitted and contradictory lock ignored.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Actual rendered multi-shot intent/continuity evaluations; fail-closed report logic is tested.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Failed or unavailable evaluator cannot produce a verified outcome

**Remaining evidence**: Actual rendered multi-shot intent/continuity evaluations; fail-closed report logic is tested.

## PR-EVAL-02 — Visual and physical quality

Selected method: Evaluate anatomy, contact, occlusion, temporal stability, composition and material/light coherence separately, retaining representative failure frames/clips. Inspect metric assumptions before use.

Alternative/tradeoff: VBench DINO consistency averages adjacent/first-frame similarity; static or wrong-action output can score well. Technical metrics do not replace blinded craft review.

Sources: vbench-subject, vbench-license, avatar-asc

**definition**: Visual and physical quality. Required knowledge: Anatomy, contact, occlusion, temporal coherence and perceptual review

**productionUse**: Evaluate anatomy, contact, occlusion, temporal stability, composition and material/light coherence separately, retaining representative failure frames/clips. Inspect metric assumptions before use.

**standards**: Fixed brief, model/version, sample count, budget, blinded review and artifact provenance.

**papers**: Selected VBench source behavior, CameraCtrl trajectory metrics and primary production accounts guide protocol design; published scores are not local trials.

**implementations**: Evaluate anatomy, contact, occlusion, temporal stability, composition and material/light coherence separately, retaining representative failure frames/clips. Inspect metric assumptions before use. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: DINO subject-consistency source inspected; no checkpoint or video score executed. Craft/physical dimensions need separate evaluators.

**datasets**: Own/admitted positive and hard-negative fixtures: Static clip high consistency, face drift under occlusion, sliding contact, duplicated limb and incorrect action with attractive still. Independent labels and rights are required for evaluation assets.

**licensing**: VBench root Apache2 license read. Metric checkpoint/data licenses and fixture rights require separate admission; film references are study context, not reusable test footage.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: VBench DINO consistency averages adjacent/first-frame similarity; static or wrong-action output can score well. Technical metrics do not replace blinded craft review.

**runtime**: Catalog/planning tools run in Node without GPU. Provider execution, browser/DCC tests and metric runtimes remain separate.

**cost**: Model metric/decoder cost and human review; separate perceptual quality from physical correctness.

**failureModes**: Static clip high consistency, face drift under occlusion, sliding contact, duplicated limb and incorrect action with attractive still.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Actual domain metrics plus blinded craft review on admitted matched outputs.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Report separate dimensions and retain representative failure clips

**Remaining evidence**: Actual domain metrics plus blinded craft review on admitted matched outputs.

## PR-EVAL-03 — Cost/latency/editability comparison

Selected method: Pre-register matched brief, budget, attempts, model versions and sampling/revision rules. Include failed/ambiguous jobs, total wall time, repair labor and actual editable-delivery behavior.

Alternative/tradeoff: Public marketing galleries and paper scores are contextual evidence, not our matched competitor trials. Identical seeds across different architectures do not ensure equal sampling.

Sources: vbench-subject, vbench-license, avatar-asc

**definition**: Cost/latency/editability comparison. Required knowledge: Matched briefs, seeds where applicable, budgets, retries and human repair time

**productionUse**: Pre-register matched brief, budget, attempts, model versions and sampling/revision rules. Include failed/ambiguous jobs, total wall time, repair labor and actual editable-delivery behavior.

**standards**: Fixed brief, model/version, sample count, budget, blinded review and artifact provenance.

**papers**: Selected VBench source behavior, CameraCtrl trajectory metrics and primary production accounts guide protocol design; published scores are not local trials.

**implementations**: Pre-register matched brief, budget, attempts, model versions and sampling/revision rules. Include failed/ambiguous jobs, total wall time, repair labor and actual editable-delivery behavior. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: DINO subject-consistency source inspected; no checkpoint or video score executed. Craft/physical dimensions need separate evaluators.

**datasets**: Own/admitted positive and hard-negative fixtures: Only best sample reported, retries omitted, repair labor excluded, unfair budget and editable artifact absent. Independent labels and rights are required for evaluation assets.

**licensing**: VBench root Apache2 license read. Metric checkpoint/data licenses and fixture rights require separate admission; film references are study context, not reusable test footage.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: Public marketing galleries and paper scores are contextual evidence, not our matched competitor trials. Identical seeds across different architectures do not ensure equal sampling.

**runtime**: Catalog/planning tools run in Node without GPU. Provider execution, browser/DCC tests and metric runtimes remain separate.

**cost**: Cost per accepted result includes all attempts and repairs; unsettled charges stay unknown.

**failureModes**: Only best sample reported, retries omitted, repair labor excluded, unfair budget and editable artifact absent.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Authorized live Higgsfield/YouArt/MiniMax trial runs and actual competitor artifacts; bookkeeping harness is tested.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Competitor comparison includes failed jobs and total repair cost

**Remaining evidence**: Authorized live Higgsfield/YouArt/MiniMax trial runs and actual competitor artifacts; bookkeeping harness is tested.

## PR-EVAL-04 — Evaluation data and promotion

Selected method: Use rights-cleared fixtures, independently separated hold-outs and blinded versioned review. Promote only against declared per-dimension gates with replayable evidence and rollback baseline.

Alternative/tradeoff: A composite average can hide fatal failures. Minimum samples are a protocol choice, not a statistical proof of universal superiority.

Sources: vbench-subject, vbench-license, avatar-asc

**definition**: Evaluation data and promotion. Required knowledge: Rights-cleared fixtures, blinded review, holdouts and regression thresholds

**productionUse**: Use rights-cleared fixtures, independently separated hold-outs and blinded versioned review. Promote only against declared per-dimension gates with replayable evidence and rollback baseline.

**standards**: Fixed brief, model/version, sample count, budget, blinded review and artifact provenance.

**papers**: Selected VBench source behavior, CameraCtrl trajectory metrics and primary production accounts guide protocol design; published scores are not local trials.

**implementations**: Use rights-cleared fixtures, independently separated hold-outs and blinded versioned review. Promote only against declared per-dimension gates with replayable evidence and rollback baseline. Selected source/API read scopes are listed in sourceIds; this does not claim inspection of every candidate implementation.

**models**: DINO subject-consistency source inspected; no checkpoint or video score executed. Craft/physical dimensions need separate evaluators.

**datasets**: Own/admitted positive and hard-negative fixtures: Train/test leakage, reviewer sees provider name, threshold chosen after results, regression hidden and previous baseline unavailable. Independent labels and rights are required for evaluation assets.

**licensing**: VBench root Apache2 license read. Metric checkpoint/data licenses and fixture rights require separate admission; film references are study context, not reusable test footage.

**providers**: A provider or DCC must prove this exact capability and preserve the required editable artifacts; product marketing is insufficient.

**nativeAlternative**: A composite average can hide fatal failures. Minimum samples are a protocol choice, not a statistical proof of universal superiority.

**runtime**: Catalog/planning tools run in Node without GPU. Provider execution, browser/DCC tests and metric runtimes remain separate.

**cost**: Dataset/review maintenance and repeated trial expense; sample-size/power decisions declared before testing.

**failureModes**: Train/test leakage, reviewer sees provider name, threshold chosen after results, regression hidden and previous baseline unavailable.

**evaluation**: Execute the original acceptance criteria with the declared fixtures; save measured artifacts and runtime/evaluator version. Remaining evidence: Executed repeatable held-out comparison and promotion/rollback on actual production outputs.

**placement**: Plugin first: the individual branch packet guides routing, native build and validation. Creation OS retains canonical requirements/assets/approvals; embedded files are knowledge until its application invokes the integration.

**acceptance**: Model/provider promotion requires repeatable evidence and rollback criteria

**Remaining evidence**: Executed repeatable held-out comparison and promotion/rollback on actual production outputs.
