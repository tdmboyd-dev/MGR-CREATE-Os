# MGR Creation OS — Repo-Based Engineering Handbook and Forge Connection

**Audited baseline**: main dcf3b7490a584d1701ac7c7b2f60cd452627519a (2026-10-31). The existing HANDOFF.md is the ONE living product resume authority. This handbook is a source-based how-to and architecture navigator, not a duplicate current status ledger and not a plan to move Forge inside Creation OS.

**Static audit**: 365 tracked files, 178 JS/TS source files read statically (not all runtime paths executed), 138 Markdown documents, 23 test source files and no parse/JSON syntax failure found. Exact file paths, hashes, source declarations and reference graph at that commit: `evidence/audits/2026-10-31-baseline-static-inventory.json`; folder counts in its summary. The old research/legacy directories are not automatically active app behavior.

## What Creation OS really owns

Creation OS is a standalone multi-factory creative coordinator. It owns objectives, multi-step cross-factory orchestration, policy and approvals, budgets, storage references, evaluation/evidence and user/project continuity. It is not a prerequisite for a simple Tevin/ChatGPT/Forge Studio -> MGR API/MCP -> Forge 3D creation job.

| Source area | Real paths | Purpose and caveat |
|---|---|---|
| Product API and runtime | `src/api/service.ts`, `src/runtime/cineforge.ts`, `src/bootstrap.ts` | Orchestrated project lifecycle; does not replace Forge model worker |
| Factories | `src/factories/default-registry.ts`, `src/factories/contracts.ts`, `src/factories/*-factory.ts` | 12 registered families with varying actual implementation; registration not production-ready proof |
| Real evidence | `src/core/evidence.ts`, `src/core/evidence-bundle.ts`, `src/creation/verification.ts` | Acceptance evidence, provenance and guardrails |
| Jobs and recovery | `src/core/approval.ts, src/core/queue.ts`, `src/core/state-machines.ts`, `src/core/idempotency.ts`, `src/core/checkpoints.ts`, `src/core/compensation.ts`, `src/core/outbox.ts` | Existing policy, retry and durable concepts; inspect concrete adapter backing before claiming production |
| Permission/cost | `src/security/permissions.ts`, `src/security/ssrf.ts`, `src/governance/rights.ts`, `src/core/cost.ts`, `src/core/sandbox.ts` | Guard tenant, third-party licensing, active spend and untrusted inputs |
| Content/storage | `src/storage/content-addressed.ts`, `src/storage/s3-compatible.ts`, `src/persistence/interfaces.ts` | Separate Creation OS references/data, not a duplicate raw Forge asset vault |
| Media/cinema | `src/factories/media-factory.ts`, `src/cinema/planner.ts`, `src/cinema/spatial.ts`, `src/cinema/editorial.ts` | Plans and validation, NOT evidence of finished neural 3D render |

## Correct Forge bridge route

An ordinary 3D client calls MGR-API-MCP directly; MGR-3D-FORGE itself owns the 3D job/asset/rig and independent QA. Only **combined creative projects** (example: create dragon + trailer + voice + campaign + publishing) should use Creation OS for coordination; each factory supplies its OWN real artifact hash, storage pointer, rights, verification criteria and outcome. Creation OS stores the evidence references and orchestrated state, not the raw owner Forge Vault or duplicate geometry worker.

The existing `src/factories/media-factory.ts` previously could claim success for a 3D brief with a generated reference; the earlier wave changed it to BLOCK until real provider receipt. That was a legitimate bug repair. Other factory placeholder success paths need distinct implementation audits, real output and UI tests before being called complete.

## Developer workflow

```powershell
cd MGR-CREATE-Os
npm ci --ignore-scripts --no-audit --no-fund
npm run typecheck
npm test
```

Audited baseline completed with 122/122 tests PASS. These test registry, objective, risk, policy and scaffold contracts, not an authenticated production 3D animation rendered by Creation OS. The full repo has `src/`, `test/`, `legacy/`, `research/`, `spec/`, `docs/`; read exact code before deciding a feature is missing because many features were planned before they were coded.

## Extend only after proof

- Add a cross-factory Forge client only if a user journey **genuinely** includes several creation domains, and route through shared MGR-API-MCP permissions. Do not call local Forge directly from untrusted hosted code.
- Validate actual Forge GLB SHA, rights/source ID and independent Blender/engine acceptance before claiming project-level output.
- Preserve stable tenant/workspace/correlation IDs and explicit budget; never treat a 3D model generation as a free provider if it requires GPU/API.
- For any new provider/factory: verify its code and test route, reproduce failure/denials/replays, inspect actual source assets, run end-to-end output and update HANDOFF.md, BUILD-QUEUE.md, AUDIT-LEDGER.md.
- Maintain one active resume record, record original source paths/evidence and reconcile any old `WORK-STATE.md`/`BuildList.md` against current tests, not vice versa.

The full owner-approved Forge roadmap is in sibling `MGR-3D-FORGE/docs/MASTER-FORGE-PROGRAM-2026-10-31.md` and actual current product truth is in Forge `docs/HANDOFF.md`. The 187 research queue records are sources/candidates, not installed components.


## Joined native domain service

`src/api/local-service.ts` owns authenticated native Markdown jobs, exact bytes, actor-bound artifacts, idempotency, audit and SQLite recovery. `src/api/service.ts` remains the broader objective/orchestrator interface. They are different contracts; do not send an actorless objective directly into the authenticated service or create a competing ledger. Use the existing shared API for Tevin access. Principals are captured at service creation; changing caller configuration cannot rebind live credentials. Schema upgrade/reclaim is atomic; close releases an unstarted service. Invalid UTF-8/unpaired surrogates are refused before allocating jobs.

Historical baseline counts above remain tied to their original source. Current joined source passes typecheck/137 tests; explicit two-source owner SDK/HTTP migration qualification is in `scripts/qualification/native-history-migration.test.mjs` and `evidence/creation-history-2026-11-01/REPORT.md`. Full studio/provider readiness remains open. HANDOFF.md is current authority.


## Effectful objective prerequisites

The objective API captures bounded JSON plans; duplicate nodes/invalid budgets/non-JSON values reject before dispatch. Registered factories resolve up front, inputs and responses are isolated, results bind to scoped request identities, and any failed/blocked factory blocks downstream. Exact concurrent service calls share an original attempt; failed attempts require reconciliation. Cache replay returns independent values. The service remains in-memory and does not supply production durable resume, actor authorization, external approval or verified-file custody. Consent window checks effective/expiry/revocation fields but do not prove rights/identity.

Current objective repair qualification: typecheck/176cases, plus separate actual two-native-output fixture; see evidence/objective-integrity-2026-11-01/REPORT.md. The fixture driver is not an installed production adapter. Factory request identity now uses a structured scoped digest; reconcile old external jobs before changing adapter versions. Existing native document request IDs/stores are unaffected.


## Durable multi-factory project runtime

Use the public `createCreationOS({projectRuntime:{dbPath,principal,bridge,forgeWorkspaceId}})` composition in `src/bootstrap.ts` when a trusted host supplies the existing owner workflow interface. `principal` is host-bound tenant/workspace/actor, not a request-body grant. `bridge` contains the original tenant/actor and synchronous assertCurrent plus preview/execute/status/artifact/cancel; it deliberately has no approve/enroll/renew function. Use original owner approval controls for the exact subrequest returned by `service.read(runId).operations`. `service.executeObjective(key,plan)` saves/advances; `resume(runId)` reconciles, `read(runId)` returns scoped state, `cancel(runId)` stops future work while preserving unresolved accepted operations, and `close()` drains/quiesces before the DB is closed.

The concrete repository reuses creation_runs/stage_runs/events and the existing migration ledger, adding actor/plan/checkpoint relations. READY is not restored over RUNNING after a crash. Failed siblings cannot abandon accepted native work; producer revisions prevent stale settlement. Receipt/hash references stay in project state; domain binaries stay native. Do not expose producer tokens or let project metadata become approval authority. Parent retention and the permanent authenticated Tevin project interface still require integration.

The opt-in DOCUMENT adapter uses native creation.document.render; MEDIA delegates the five existing Forge operations when its fixed Forge workspace is supplied. Real current trial covers creature plus Markdown with original approvals/lost reply/four host reopens; other new adapter paths and dynamic cross-step input references remain open. Default factory registrations retain their original honest blocked behavior. Read `evidence/durable-projects-2026-11-01/REPORT.md` for source-specific220case qualification, crash/limits and remaining work; this is not whole-studio or production acceptance.


## Owner metadata and result retention

`service.prepareObjective(key,plan)` saves an immutable QUEUED project without dispatch. `service.list()` returns at most twenty summaries for the exact captured tenant/workspace/actor. Use the existing read/resume/owner approval controls to advance work. `createProjectRetentionGuard(dbPath,{tenantId,actorId},assertCurrent)` is a trusted synchronous read-only host guard. Call `assertUnreferenced(requestId)` before retirement preview, approval and mutation; close it only after the original runtime quiesces. It spans project workspaces for that exact owner, retains completed outputs and denies damaged/unavailable custody. It does not release references or create action authority. ONE's actual host binding and persisted guard requirement are defined in its owning integration; do not copy a separate grant or job store. See evidence/owner-projects-2026-11-01/REPORT.md. Earlier unimplemented-retention statements describe predecessor source.


## Accepted dependency outputs (durable runtime version1)

`DurableObjectiveService.stageOutputReferenceVersion` is1. Inside a stage input, use `{"$stageOutput":{"stage":"biome","value":"requestId"}}` to supply the native request ID of a directly declared dependency, or `{"$stageOutput":{"stage":"biome","value":"artifactRef","index":0}}` for an exact accepted artifact reference (index0..255). `dependsOn` must include that stage. Reference and selector objects accept only these exact fields. Source status/result/request binding must be accepted; values are rebuilt from scoped immutable checkpoints after restart. Stored plans/digests retain the original expression. The original owner preview/approval applies to the resolved native command. An unavailable selected output fails the consumer without calling its factory; tampered/mismatched source custody denies. No-reference plans/native IDs remain compatible and no schema changes are required. Model callers must read runtime_status.creationProjects for exact tenant/project/Forge workspaces, native operations and reference version. This does not imply arbitrary receipt access, expressions, file reads or new authority. Actual six-path native project qualification and adverse tests: evidence/stage-outputs-2026-11-01/REPORT.md.

## SignMe in the existing Document factory

A configured original owner bridge may advertise availableOperations. Unsupported advertised operations block before preview/dispatch. DOCUMENT now supports both creation.document.render and signme.draft.create in the exact project workspace. SignMe input is {workspaceId,title,content}, optionally BOTH documentId and expectedVersion for its next immutable revision. Only zero allocation is currently accepted; title/content must be nonempty well-formed strings, at most500/10000characters. The original owner approves the exact resolved command. Adapter receiving checks original document/version receipt, exact content bytes/hash/length, plain-text media type and immutable target/expected next version. It stores native artifact references, not another document database. Existing dependency artifactRef selectors can write an accepted SignMe reference into notes; they do not ingest arbitrary file contents. Actual mixed SignMe/Creation project/retention/reopen evidence is in evidence/native-signme-owner-2026-11-01/REPORT.md. Full253tests pass; nine new factory checks included. Original twelve-factory studio requirements remain.

## Native identifier recovery protocol version1

Authenticated health advertises identifierLookupVersion:1. Existing job GET/run/cancel paths decode identifiers exactly once. For literal `.`/`..`, use owner-scoped POST /v1/creation/jobs/read `{requestId}` and POST /v1/creation/jobs/control `{requestId,action:"run"|"cancel"}`. Extra actor/tenant keys and unknown actions are rejected. Control reuses the original saved job and producer; repeated cancellation returns the saved descriptor without another cancellation audit. No new job or changed identity is created by recovery. Full current265/265 plus actual shared/owner tests passed; exact-source permanent activation/save/restart/replay passed in the owning evidence report. See evidence/native-identifier-recovery-2026-11-01/REPORT.md.

## Accepted native text between project stages

With artifactTextReferenceVersion=1, use {"$stageOutput":{"stage":"declaredDirectDependency","value":"artifactText","index":0}} in a consumer text field. Only an accepted directly declared source can supply text through its trusted native factory, exact artifact reference/hash, owner/workspace binding and content/version readback. Supports current native Markdown/SignMe UTF8 text up to10000characters/40000bytes, total resolved string payload524288bytes. No binary conversion, filesystem/URL lookup or receipt-expression evaluation. Each resolved consumer requires its own exact original owner approval; original plan/stage references retain provenance. Reopen rechecks sources; cancel/close/failure rechecked after reads. Native Creation->SignMe->Creation and saved/replay fixtures passed; permanent source-specific proof remains separate. Full12factory/rights/signing/production acceptance remains open. See evidence/artifact-text-transfer-2026-11-01/REPORT.md.

Current native text-transfer acceptance: artifactTextReferenceVersion1 resolves only accepted direct dependencies through original factory/native/owner artifact custody, then the exact consumer needs its own original approval. Permanent Creation->SignMe->Creation3stage/save/restart/replay passed, same source/draft hash,0redispatches. API transports still receive concrete original operation inputs; the selector resolves in Creation, not inside arbitrary department calls. No signing/sending/rights or whole-product/cost equivalence inferred. Evidence: evidence/artifact-text-transfer-2026-11-01/REPORT.md. Earlier missing raw-native-text/permanent-activation notes retain predecessor scope only.
