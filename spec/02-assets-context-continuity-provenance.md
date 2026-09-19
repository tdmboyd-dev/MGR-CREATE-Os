# Assets, Context, Continuity, Provenance

## Artifact / Asset / Version / Derivative
Asset = logical creative object. AssetVersion = immutable content/metadata version with digest, blobRef, mime/type, creator/run, parent versions, rightsRef and technical metadata. Derivative = typed lineage edge (transcode, crop, edit, remix, translation, render, export). Alias points to approved/latest/etc version and may move with audit.

## ContextLayer / Lock / Override / ConflictReport
ContextLayer: scopeType/global|tenant|brand|franchise|world|project|asset|character|scene|task, scopeId, priority, version, values, locks.
Lock: path, lockType HARD|SOFT|ADVISORY, expected/reference, evaluatorRef?, threshold?, owner, version, effective range.
Override: target lock/path, replacement, reason, authority, approvalRef, expiresAt.
Resolver order is explicit and deterministic. ConflictReport lists competing sources, winning rule and unresolved hard conflicts. Hard unresolved conflict blocks BUILD.

## Rule / Violation / Evidence / RepairProposal
Rule: id, family, target, evaluator, threshold, severity, repairPolicy.
Violation: ruleId, artifactVersionId, observed, expected, severity, evidenceRefs, status.
Evidence: type, sourceRef, measurement, timestamp, evaluatorVersion.
RepairProposal: defect/violation refs, target layer, proposed mutation, expected improvement, risk, cost, verificationPlan.

## UCTRecord / digest / lineage
UCTRecord: id, artifactVersionId, digest, creationRunId, stageRunId, createdBy, model/tool/operator versions, contextSnapshot, lockSnapshot, sourceEvidenceRefs, approvalRefs, rightsRefs, costRefs, parentUCTs, attestationRef?, createdAt.
Digest mismatch invalidates integrity. Lineage edges are explicit, never inferred from shared run alone.
