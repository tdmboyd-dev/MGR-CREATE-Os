# Universal BEAST — Executable Repository Contract

This file turns BEAST from philosophy into required repository behavior.

## Required artifacts
Every substantial BEAST wave must update:
- BUILD-QUEUE.md
- AUDIT-LEDGER.md
- EXTRACTION-MANIFEST.md when legacy extraction is involved
- research/ dossiers when outside research changes architecture
- evidence records for verified claims

## Required statuses
QUEUED → RESEARCHED → SPECIFIED → IMPLEMENTED → TESTED → VERIFIED

A feature may not be marked VERIFIED because code exists, a test file exists, a command returned zero, or a model said it looks correct.

## Definition of VERIFIED
VERIFIED requires an acceptance criterion, executed verification method, observed result, and evidence pointer. User-facing artifacts require inspection of the actual artifact. External side effects require reconciliation with the external system.

## Defect contract
Each defect needs: ID, symptom, expected behavior, evidence, suspected cause, root cause once proven, repair, regression test, verification result.

## Bounded repair
Every automated judge/repair loop requires maximum attempts, progress/convergence measurement, repeated-defect detection, escalation and terminal states. A loop that repeatedly rewrites without measurable improvement must stop and surface the blocker.

## Research contract
Each important external candidate records: source, date/version, license, maintenance signal, architecture lesson, dependency/cost/security risks, failure modes, verification approach, and ADOPT/ADAPT/STUDY/REJECT disposition.

## Build contract
Before implementation: map dependencies and acceptance criteria.
During implementation: preserve provenance and reversible changes where practical.
After implementation: break unhappy paths, run tests, inspect real output, update evidence/status.

## Completion language
Use “implemented” only for code that exists.
Use “tested” only for tests actually executed.
Use “verified” only with evidence.
Use “product complete” only when the defined product-level acceptance set is verified.
