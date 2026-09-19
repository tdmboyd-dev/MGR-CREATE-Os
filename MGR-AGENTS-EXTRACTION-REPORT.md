# MGR Agents Extraction — Consolidated Findings

## Extraction checkpoint
Creation OS-relevant evidence has been copied into this repo under legacy/mgr-agents so active redesign can proceed without repeatedly depending on MGR Agents.

## What was physically recovered
- Creation OS schema: graph nodes/edges, continuity violations, crew rooms, CINEFORGE pipeline definitions/runs, UCT artifacts.
- Universal Approval Gateway schema and SQL migration.
- Hybrid descriptor schema and SQL migration.
- Training queue/jobs/runs/active adapters/swarm registry and training SQL migration.
- Brand/face/voice/LoRA asset schema.
- Autopilot persistence and foundation-repair migrations for dependency review.
- iKickitz character-lock architecture.
- MGR Agents full specification and platform brief.
- Brain training plan.
- UCOS lock migration script.
- UCOS YAML lock corpus available at expected paths for many MGR agents, including the original discovered set plus Titan, Victor, Vinnie, Vitals, Stockwell, Voice and Sentinel. Several named agents did not expose a lock at the expected path and are recorded as gaps rather than invented files.

## Strong evidence vs proof
STRONG EVIDENCE: database schemas + matching migrations exist for approvals, hybrid descriptors and training.
STRONG EVIDENCE: UCOS YAML files and a migration script show lock data was materially generated.
SCHEMA/DESIGN EVIDENCE: Creation graph, CINEFORGE, continuity, crew rooms and UCT are defined.
NOT YET PROVEN: independent runtime services for CINEFORGE execution, continuity checking, UCT issuance, crew simulation, sandbox/operator execution, approval interception/resume, or a standalone Creation OS API.

## Important negative finding
Expected obvious standalone runtime files such as src/lib/creation-os, src/lib/uct, src/lib/continuity, and simple signal-bus/approval-gateway paths were not present at the tested paths. This does not prove no runtime exists elsewhere; it does mean the old schema must not be described as an end-to-end engine without further evidence.

## Legacy concepts requiring redesign/research
- 60 sandboxes / 12 classes
- 80 operators / 12 families
- 24 patterns
- 10 workflow shapes
- edge taxonomy
- UCOS read semantics
- continuity evaluator
- UCT issuance/verification
- crew convergence
- signal bus
- model/tool router
- cost forecast/accounting
- rollback/compensation
- marketplace templates
- training activation
- lock consumers
- runtime permissions and approval resume
- observability/evidence

All are in the master research/build queue.

## Working decision
MGR Agents is now a legacy university/source for Creation OS, not the source of truth. New work belongs here. MGR Agents should later consume the verified standalone system through stable adapters.
