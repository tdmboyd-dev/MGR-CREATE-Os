# Live Integration Gates

## Database
READY TO DEPLOY: private creation_os Postgres schema migration.
BLOCKED: no dedicated Creation OS Supabase/Postgres project has been selected/created. Do not contaminate unrelated projects.

## Object storage
READY TO CONNECT: S3CompatibleObjectStore + ContentAddressedStore.
Need live endpoint/bucket/credential reference. Creation OS versions content itself because provider bucket versioning cannot be assumed.

## Research/browser
READY TO CONNECT: SearchAdapter + HttpPageReader + snapshots + citation checks + SSRF guard.
Need chosen search/browser provider and credentials where applicable.

## Documents
READY TO CONNECT: PDF/DOCX/EPUB engine adapter contracts and signature validation.
Need real render engines selected and exercised against actual files.

## Durable workflows
PROTOTYPE GREEN: wait/signal/resume/cancel semantics.
Need Temporal/native bake-off and live crash/resume test.

## Publishing
PROTOTYPE GREEN: publish-once/idempotency/reconciliation.
Need sandbox accounts for target publishing providers.

## Verification rule
A live gate only moves to VERIFIED after its external system returns evidence that can be reconciled to the Creation OS run/artifact/action.
