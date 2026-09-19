# Universal BEAST — MGR Creation OS Operating Method

Universal BEAST is the way this repository is worked on. It is designed to be project-independent.

## Core rule
Do not guess when the answer can be proven.

## Working doctrine
1. Audit the existing repo and its dependencies end to end before making architectural claims.
2. Treat outside products, repositories, papers, workflows, and platforms as universities: research them deeply, extract capability lessons, compare tradeoffs, and never blindly import a dependency because it looks impressive.
3. Distinguish claims from evidence. Maintain an evidence ledger for important findings.
4. Separate RESEARCHED, SPECIFIED, IMPLEMENTED, TESTED, and VERIFIED states.
5. Build native contracts that are stronger than the systems studied.
6. Deliberately test failure modes, edge cases, bad inputs, partial failures, retries, timeouts, concurrency, missing credentials, stale state, and rollback.
7. Repair causes, not symptoms.
8. Verify real outputs in real environments whenever the work produces an artifact: open the webpage, inspect the PDF, inspect the render, run the workflow, check the database result, inspect logs, and capture evidence.
9. Use bounded repair loops with defect IDs, convergence criteria, retry budgets, escalation rules, and stop conditions. No infinite judge/fix loop.
10. Prefer large end-to-end waves of useful work over stopping after tiny discoveries.
11. Preserve locked decisions, continuity, provenance, and architecture history.
12. Never claim completion without proof.

## BEAST loop
DISCOVER → MAP → RESEARCH → DESIGN → BUILD → BREAK → REPAIR → VERIFY → AUDIT → IMPROVE

### DISCOVER
Find every relevant file, route, schema, service, job, queue, UI, migration, test, integration, dependency, workflow, provider, secret boundary, and external assumption.

### MAP
Create a dependency map, data-flow map, execution map, capability map, and risk map. Identify dead code, simulation, placeholders, missing glue, and host coupling.

### RESEARCH
Research external systems that have solved the same class of problem. Record architecture, contracts, licensing, maintenance health, cost, security, failure modes, and what is worth learning.

### DESIGN
Define canonical contracts, boundaries, state machines, interfaces, evidence requirements, verification criteria, and rollback behavior before implementation.

### BUILD
Implement in small enough units to test, but in waves large enough to deliver meaningful end-to-end progress.

### BREAK
Intentionally test unhappy paths and adversarial conditions. If a feature only passes the happy path, it is not done.

### REPAIR
Fix the root cause. Do not layer cosmetic patches over broken architecture.

### VERIFY
Prove the result in the real execution environment and inspect actual output.

### AUDIT
Record what changed, what was proven, what remains uncertain, what it cost, and what evidence exists.

### IMPROVE
Feed defects, runtime data, user feedback, performance, cost, and external research back into the design.

## Status model
QUEUED → RESEARCHED → SPECIFIED → IMPLEMENTED → TESTED → VERIFIED

Nothing may skip directly from idea to VERIFIED.

## Scorecard
Every major wave should record:
- Before state
- Work performed
- Current state
- Evidence
- Remaining blockers
- Next moves to 100%

## Universal applicability
BEAST must work for Creation OS, MGR Agents, Create Loco, Product Factory, websites, apps, automations, media systems, infrastructure, AI workflows, and future MGR projects. Project-specific rules can extend BEAST but should not weaken its core proof standard.
