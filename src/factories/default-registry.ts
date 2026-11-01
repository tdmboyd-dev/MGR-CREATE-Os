import type { Factory } from "./contracts.js";
import { FactoryRegistry } from "./registry.js";
import { ResearchFactory } from "./research-factory.js";
import { DocumentFactory } from "./document-factory.js";
import { ProductFactory } from "./product-factory.js";
import { BrandFactory } from "./brand-factory.js";
import { AutomationFactory } from "./automation-factory.js";
import { MediaFactory } from "./media-factory.js";
import { WebFactory } from "./web-factory.js";
import { CampaignFactory } from "./campaign-factory.js";
import { CourseFactory } from "./course-factory.js";
import { AudioFactory } from "./audio-factory.js";
import { AppToolFactory } from "./app-tool-factory.js";
import { DataAnalyticsFactory } from "./data-analytics-factory.js";
export function defaultFactoryRegistry(overrides: Factory[] = []) { const r = new FactoryRegistry(); [new ResearchFactory(), new DocumentFactory(), new ProductFactory(), new BrandFactory(), new AutomationFactory(), new MediaFactory(), new WebFactory(), new CampaignFactory(), new CourseFactory(), new AudioFactory(), new AppToolFactory(), new DataAnalyticsFactory()].map(f => overrides.find(x => x.kind === f.kind) ?? f).forEach(f => r.register(f)); if (new Set(overrides.map(x => x.kind)).size !== overrides.length || overrides.some(x => !r.kinds().includes(x.kind)))
    throw Error("invalid factory overrides"); return r; }
