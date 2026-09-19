export type Id = string;
export type ISODate = string;
export type RunStatus = "QUEUED"|"PLANNING"|"RUNNING"|"WAITING_APPROVAL"|"WAITING_EVENT"|"WAITING_RESOURCE"|"VERIFYING"|"COMPLETED"|"RETRYING"|"CANCELLING"|"CANCELLED"|"FAILED"|"COMPENSATING"|"COMPENSATED"|"COMPENSATION_FAILED";
export type StageStatus = "PENDING"|"READY"|"RUNNING"|"WAITING_APPROVAL"|"WAITING_EVENT"|"WAITING_RESOURCE"|"SUCCEEDED"|"FAILED"|"RETRY_SCHEDULED"|"CANCELLED";
export interface CreationRun { id:Id; schemaVersion:number; tenantId:Id; workspaceId:Id; pipelineId:Id; pipelineVersion:string; status:RunStatus; traceId:Id; createdAt:ISODate; currentStageId?:Id; }
export interface StageRun { id:Id; creationRunId:Id; stageKey:string; attempt:number; status:StageStatus; inputRefs:Id[]; outputRefs:Id[]; }
export interface EventEnvelope<T=unknown>{specversion:"1.0";id:Id;source:string;type:string;time:ISODate;schemaVersion:number;tenantId:Id;workspaceId:Id;correlationId?:Id;causationId?:Id;traceId:Id;idempotencyKey?:string;data:T}
export type PolicyOutcome="ALLOW"|"DENY"|"REQUIRE_APPROVAL"|"DRY_RUN";
export interface PolicyDecision{id:Id;actionType:string;outcome:PolicyOutcome;reasons:string[];decisionDigest:string}
export interface EvidenceRecord{id:Id;criterion:string;method:string;observed:string;passed:boolean;verifierVersion:string;createdAt:ISODate}
