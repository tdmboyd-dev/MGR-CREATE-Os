export interface CatalogValidation {ok:boolean;errors:string[]}
export interface SourceRecord {id:string;uri:string;publisher?:string;snapshotRef?:string}
export interface ClaimRecord {id:string;text:string;confidence:number}
export interface EvidenceRecord {id:string;claimId:string;sourceId:string;support:"SUPPORTS"|"CONTEXT"}
export interface Readiness {id:string;researchReady:boolean;blockers:string[];implementationClaim:boolean;verificationClaim:boolean;executionAuthorized:false}
export interface SearchHit {id:string;capability:string;parent:string;score:number;researchComplete:boolean}
export interface CatalogSummary {updated:string;sources:number;findings:number;packets:number;tracks:number;researchReady:number;executionAuthorized:false}
export interface BuildStep {id:string;capability:string;dependencies:string[];candidateImplementations:string;requiredKnowledge:string;acceptanceCriteria:string[];nextAction:string;readiness:Readiness;packetIds:string[]}
export interface BuildHandoff {kind:"RESEARCH_TO_BUILD_HANDOFF";requested:string[];assessedAt:string;executionAuthorized:false;researchReady:boolean;steps:BuildStep[]}
export interface LedgerRecords {sources:SourceRecord[];claims:ClaimRecord[];evidence:EvidenceRecord[];capabilities:{id:string;researchComplete:boolean;implemented:boolean;verified:boolean}[];warning:string}
export const FIELDS:readonly string[];
export function validateCatalog(data:unknown):CatalogValidation;
export class ProductionCatalog {
 constructor(data:unknown);
 get(id:string):{track:Record<string,unknown>;packets:Record<string,unknown>[];findings:Record<string,unknown>[];sources:Record<string,unknown>[]};
 search(query:string,limit?:number):SearchHit[];
 readiness(id:string,now?:string):Readiness;
 plan(ids:string[],now?:string):BuildHandoff;
 ledgerRecords():LedgerRecords;
 summary(now?:string):CatalogSummary;
}
