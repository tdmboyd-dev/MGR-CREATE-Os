# Executed production and comparison tools

Use the individual branch packets in all-75-branch-studies.md and the embedded catalog before extending or routing a capability. Each packet retains its specific method, alternative, failure fixtures, cost model and remaining evidence. Populated fields are not automatic research closure.

## Durable provider-job bookkeeping

jobs.mjs exports ProductionJobs. It uses a separate SQLite database with application identity1296511538 and version1. Never open the plan/asset DB as the job DB. Construction rejects unrelated nonempty databases. All state changes use transactions and expected revisions; event IDs deduplicate exact repeated observations and reject altered duplicates.

The standalone production.mjs commands are:

- `job-prepare JOBS.sqlite SPEC.json`: persist a proposed request/quote with exact digest; no request submitted.
- `job-get JOBS.sqlite JOB_ID`: inspect durable state.
- `job-recovery JOBS.sqlite JOB_ID`: report the recovery action; no network call or retry.

The request spec requires id, provider, model, payload, capabilitySnapshot, absolute deadline, and quote containing id, currency, integer maximumMinor and absolute expiresAt. Clock timestamps are integer milliseconds. The CLI uses its current clock. No secrets belong in these payloads.

The authenticated host authority must consume a matching spending approval before invoking beginSubmission. Its approval receipt carries approvalId, quoteId and requestDigest. This method records the boundary; it does not validate OAuth or make a local JSON receipt into signed spending authority. There is deliberately no CLI shortcut that claims to authorize a paid request.

Persist SUBMITTING before transport. A lost response is AMBIGUOUS. Recover by reconciling the existing submission; never auto-resubmit. An absolute deadline can expire while remote work continues. Cancellation must retain a successful output that wins the race. SUCCEEDED requires nonempty outputs and an injected resolveOutput callback returning actual admitted bytes with matching SHA256. This callback must scope resolution to the canonical project. Compare actual settlement against quoted maxima and keep over-quote incidents visible. Host provider transport, OAuth, callback authentication and lookup/idempotency semantics remain external integrations.

## Measured comparison records

`production.mjs comparison MANIFEST.json` checks matched brief, trial outcomes, evaluator completeness, times/costs and actual local output/evaluation byte identities. Paths must be relative and stay within the manifest directory even after realpath resolution. Inputs are bounded to32MiB per artifact.

Each trial requires unique id, provider, modelVersion, briefDigest, state, measured wallSeconds/repairSeconds, integer costMinor and currency. Successful trials need outputArtifact/outputSha256. Evaluations for intent, identity, performance, camera, physics, composite, color, sound and editability are PASS/FAIL with evaluatorVersion and evidenceArtifact/evidenceSha256, or UNAVAILABLE with reason. Never invent scores or put zero where a charge is unknown.

The report includes all attempts and repair cost. Missing evaluators produce INCOMPLETE and failed/unavailable output cannot have a PASS evaluation. Even a fully recorded comparison supplies no automatic superiority or Hollywood certification. Protocol metadata and reviewer observations must be independently inspected.

## Actual Blender acceptance fixture

blender_fixture.py creates procedural assets, bakes48 frames, saves an editable .blend and renders on CPU. Run with an admitted Blender executable in isolated background mode:

`blender --background --factory-startup --disable-autoexec --python <skill-root>/scripts/blender_fixture.py -- build NEW_OUTPUT_DIRECTORY`

Then run the same command using verify and that directory. Build refuses to overwrite an existing fixture. This operates on an authored fixture and must not be substituted for the user's open scene. Runtime executable discovery is host-specific; Blender may be installed outside PATH. The executed local runtime was5.2.2LTS. Other versions require their own acceptance checks.

The source/evidence distribution contains decoded-pixel/replay comparison and actual static USD camera round-trip tools. This proves the declared fixture; it does not implement an arbitrary natural-language renderer, full fracture/dust/rigging/compositing or autonomous Hollywood production.
# Read-only provider recovery

`scripts/providers.mjs` normalizes the documented Higgsfield and MiniMax task states and polls an existing job through a host-supplied authenticated GET transport. It checks the provider origin and exact job path, stops on authentication/identity errors, limits retries and counts network time toward one absolute deadline. A timeout requires reconciliation; it never submits another generation. Completed URLs remain pending byte admission. MiniMax prompt-enrichment results remain pending semantic review. Exact decimal USD estimates become conservative cent caps while settlement stays unknown. Five executed tests cover these boundaries; no live account transport has been exercised.

Current official Higgsfield documentation supports replay with the same persisted idempotency key and unchanged endpoint, body and webhook. Replay can return an old queued receipt, requiring a current status read. The durable local job controller intentionally does not replay submissions; a host implementation needs that separately verified contract. MiniMax's DELETE operation can delete terminal records, so it is not wired as a generic cancellation request. Public callback descriptions are not proof of authenticated delivery.
