import {sha256Canonical} from '../core/digest.js';
import {IdempotencyStore} from '../core/idempotency.js';
import {snapshotPlan,type ObjectivePlan,ObjectiveOrchestrator} from '../objectives/orchestrator.js';
/** In-process objective coordination only. Not a durable effect/approval ledger.
 * Remote adapters must retain their original domain job/receipt and reconcile
 * uncertainty through that owner; a rejected promise never authorizes retry.
 */
export class CreationOSService {
 private idem=new IdempotencyStore();
 private pending=new Map<string,Promise<unknown>>();
 constructor(private objectives:ObjectiveOrchestrator){}
 async executeObjective(key:string,input:ObjectivePlan){
  if(typeof key!=='string'||!key.trim()||key.length>512)throw Error('invalid objective request key');
  const plan=snapshotPlan(input),scope=JSON.stringify([plan.tenantId,plan.workspaceId,key]),digest=sha256Canonical(plan),old=this.idem.get(scope),record=this.idem.begin(scope,digest);
  if(record.status==='SUCCEEDED')return structuredClone(record.result);
  if(record.status==='FAILED')throw Error('objective prior execution failed; original effect reconciliation required before a new attempt');
  const active=this.pending.get(scope);if(active)return structuredClone(await active);
  if(old)throw Error('objective execution custody unavailable; reconciliation required');
  const execution=Promise.resolve().then(()=>this.objectives.execute(plan)).then(result=>{this.idem.succeed(scope,result);return structuredClone(result);},error=>{this.idem.fail(scope,'original execution rejected; outcome requires reconciliation');throw error;}).finally(()=>this.pending.delete(scope));
  this.pending.set(scope,execution);return structuredClone(await execution);
 }
}
