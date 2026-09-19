# Rights, Research, Verification, Repair, Packages, Review, Catalog, Training, Policy

## RightsRecord / ConsentRecord / LicenseExpression
RightsRecord binds asset/model/dataset/person/source to machine-readable license expression, usage scope, territory, commercial/derivative rights, attribution, restrictions, effective/expiry. ConsentRecord binds person/identity modality to granted purposes, revocation and evidence. Publication policy evaluates full lineage.

## ResearchRun / Source / Claim / Evidence / Contradiction
ResearchRun pins objective/questions/source strategy/freshness. Source records URL/origin, publisher, date, type, snapshot, authority metadata. Claim has exact proposition and confidence. Evidence links claim→source passage/data. Contradiction links competing claims/evidence. No research artifact may promote unsupported claim to fact.

## VerificationPlan / Validator / Judge / VerificationResult
Plan lists acceptance criteria. Validator is deterministic/programmatic where possible. Judge is model/human evaluator with version/rubric/calibration. Result records pass/fail/score, evidence, observed values and evaluator version. VERIFIED requires all blocking criteria pass.

## Defect / RootCause / RepairAttempt / RegressionResult
Defect has symptom/expected/evidence/severity. RootCause is hypothesis until proven. RepairAttempt targets smallest causal layer and predicts improvement. RegressionResult reruns affected + protected checks. Loop stops on max attempts, repeated defect or no measurable progress.

## TemplatePackage
Manifest: id/version/license, exposed inputs/outputs, dependencies, operators/models/connectors, permissions, policy/risk, tests, examples, migration and integrity digest. Publish only after validation run.

## ReviewThread / Annotation / VersionDecision
Review bound to exact artifact version. Annotation may bind frame/time/range/region. VersionDecision APPROVE|REJECT|CHANGES_REQUESTED includes actor, criteria and evidence. Approval never transfers to modified version automatically.

## CatalogRecord
Typed searchable metadata with tenant ACL, resource/version refs, lineage, rights, tags, full-text/vector refs, freshness/index status. Search must apply authorization before disclosure.

## DatasetSnapshot / TrainingRun / ModelArtifact / Promotion
DatasetSnapshot immutable digest + sources/rights/splits. TrainingRun pins base model/code/config/hardware/dataset. ModelArtifact immutable weights/adapters + metrics. Promotion changes alias/stage only after eval/policy/approval. Rollback moves alias; history remains.

## PolicyPack / RuleBundle / DecisionLog
PolicyPack versioned by domain/jurisdiction/company. RuleBundle contains machine rules + human-review rules. DecisionLog records policy versions, inputs digest, outcome, reasons and evidence. Exceptions are explicit, scoped, expiring and audited.
