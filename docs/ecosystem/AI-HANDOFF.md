# MGR-CREATE-Os - AI ecosystem handoff

## Current October27 wave2 checkpoint

Current bounded runtime proof: authenticated local document.markdown renders actual Markdown bytes through the existing renderer and persists SQLite jobs/artifacts/audit records. Tevin owner preview/approval/MCP execution and independent artifact readback are proven by central wave2 evidence. Generic11 content factories without real adapters explicitly block;124/124 local tests and TypeScript pass. Product source150/150 read; historical archive is separate.

See [service contracts](SERVICE-WORKFLOWS.md), [repair record](PRODUCT-SOURCE-REPAIRS.md) and [scorecard](../full-build/SCORECARD.md). The following baseline material retains its original historical scope.

Baseline: `67a7620b44188c0060f2a48227ab01fb103b544c`. Existing default: `main`. Repository: https://github.com/tdmboyd-dev/MGR-CREATE-Os.

Read existing AGENTS/work order/current handoff first. This file is integration context, not an additional work order or grant.

## Architecture and source anchors

Role: creation-control. A hash label or fabricated reference is not artifact bytes; preserve existing native Production Brain and nondefault branch work.

Source anchors: `src/factories/media-factory.ts`, `src/factories/document-factory.ts`, `src/factories/contracts.ts`, `src/core`. Paths are source locators, not an assertion that all internals were read. See the central path/hash ledger for inventory; human-read scope is narrower.

Inputs: Creation brief, workspace/tenant, artifact and rights references, acceptance criteria and execution budget.

Outputs: Creation plans/jobs, artifact/version references, validation and production evidence according to actual adapter.

Declared root package scripts (source declarations; not all were executed):

```json
{
  "typecheck": "tsc --noEmit",
  "test": "node --test --import tsx test/**/*.test.ts"
}
```

## Current repair and proof

Existing 119-test suite passes; no new application source repair claimed in this repo.

This cycle: 119/119 passed for typecheck + core Node suite. This is not whole-product acceptance.

## Next implementation contract

Work item `ECO-008`: Distinguish planning success from artifact production; admit bytes, hash, provenance and cancellation/restart receipts before success.

Before dispatch bind principal, tenant/workspace/resource, canonical domain action, input/artifact revision digest, idempotency/correlation, account/recipient/cost ceiling and grant expiration where applicable. Resolve risk using server-owned action policy, not caller labels. Exact fields must adapt to existing ONE/domain contracts, not duplicate them.

Negative acceptance: wrong actor/tenant/scope, modified payload/target, expired/replayed approval, duplicate request, lost response, cancellation and restart. Domain owner retains authoritative receipt; unknown outcomes are reconciled before retry. Rights and consent follow the actual artifact/model/use.

Rollback: Preserve original source/data; revert only owned source change; reconcile external effects before retry or compensation.

## Integration truth

The new source catalog lists this repository as catalogued, with runtimeVerified=false and no executable tools. Local read-only discovery through ONE/API-MCP has separate integration proof. No discovery response authorizes execution or proves this domain is deployed. No callable MCP endpoint is asserted here; add an admitted adapter only after domain acceptance.

Highest-value measured upgrade: One durable artifact/job lifecycle for media, documents, 3D and reconstruction; benchmark restart correctness and usable-artifact rate.

Current product-source repairs and remaining boundaries: [PRODUCT-SOURCE-REPAIRS.md](PRODUCT-SOURCE-REPAIRS.md). Persistent bounded scorecard: [SCORECARD.md](../full-build/SCORECARD.md).
