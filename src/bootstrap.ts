import {defaultFactoryRegistry} from "./factories/default-registry.js";
import {ObjectiveOrchestrator} from "./objectives/orchestrator.js";
import {CreationOSService} from "./api/service.js";
import {DecisionEngine} from "./decision/engine.js";
import {JevDecisionProvider} from "./decision/jev-provider.js";

export function createCreationOS(){
  const factories=defaultFactoryRegistry();
  const objectives=new ObjectiveOrchestrator(factories);
  const decision=new DecisionEngine([new JevDecisionProvider()]);
  return{factories,objectives,decision,service:new CreationOSService(objectives)}
}
