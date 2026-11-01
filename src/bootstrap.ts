import { defaultFactoryRegistry } from "./factories/default-registry.js";
import { ObjectiveOrchestrator } from "./objectives/orchestrator.js";
import { CreationOSService } from "./api/service.js";
import { DecisionEngine } from "./decision/engine.js";
import { JevDecisionProvider } from "./decision/jev-provider.js";
import { SqliteCreationRepository, type ProjectPrincipal } from "./persistence/sqlite.js";
import { DurableObjectiveService } from "./api/durable-objectives.js";
import { OwnerWorkflowFactory, type OwnerWorkflowBridge } from "./factories/owner-workflow-factory.js";
export interface CreationOSOptions {
    projectRuntime?: {
        dbPath: string;
        principal: ProjectPrincipal;
        bridge: OwnerWorkflowBridge;
        forgeWorkspaceId?: string;
    };
}
export interface CreationOS<T extends CreationOSService | DurableObjectiveService> {
    factories: ReturnType<typeof defaultFactoryRegistry>;
    objectives: ObjectiveOrchestrator;
    decision: DecisionEngine;
    service: T;
    close(): Promise<void>;
}
export function createCreationOS(options: {
    projectRuntime: NonNullable<CreationOSOptions['projectRuntime']>;
}): CreationOS<DurableObjectiveService>;
export function createCreationOS(options?: {
    projectRuntime?: undefined;
}): CreationOS<CreationOSService>;
export function createCreationOS(options: CreationOSOptions): CreationOS<CreationOSService | DurableObjectiveService>;
export function createCreationOS(options: CreationOSOptions = {}): CreationOS<CreationOSService | DurableObjectiveService> {
    const runtime = options.projectRuntime;
    const factories = defaultFactoryRegistry(runtime ? [new OwnerWorkflowFactory('DOCUMENT', runtime.principal, runtime.bridge), ...(runtime.forgeWorkspaceId ? [new OwnerWorkflowFactory('MEDIA', runtime.principal, runtime.bridge, runtime.forgeWorkspaceId)] : [])] : []);
    const objectives = new ObjectiveOrchestrator(factories);
    const decision = new DecisionEngine([new JevDecisionProvider()]);
    const repository = runtime ? new SqliteCreationRepository(runtime.dbPath, runtime.principal) : undefined;
    const service = repository ? new DurableObjectiveService(repository, factories) : new CreationOSService(objectives);
    return { factories, objectives, decision, service, close: async () => {
            if (service instanceof DurableObjectiveService)
                await service.close();
            repository?.close();
        } };
}
