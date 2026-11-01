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
