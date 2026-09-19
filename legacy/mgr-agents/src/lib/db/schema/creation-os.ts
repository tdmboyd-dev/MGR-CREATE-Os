/**
 * MGR Creation OS Schema — the operating system layer above all AI models.
 *
 * Holds character/world/franchise/brand locks, continuity engine state, and
 * the creation graph (nodes + edges) that defines how everything connects.
 *
 * © 2025-2026 Money Grind Religion Inc. All Rights Reserved.
 */

import { pgTable, text, timestamp, uuid, jsonb, pgEnum, index, integer, boolean, numeric } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { users } from "./auth";
import { pendingApprovals } from "./approvals";

// ─── ENUMS ──────────────────────────────────────────────────────────────────

export const creationNodeTypeEnum = pgEnum("creation_node_type", [
  "character",       // a person/avatar/persona — locked face/body/voice
  "world",           // setting, environment, era — physics + tone rules
  "franchise",       // brand/IP umbrella — owns multiple characters/worlds
  "ability",         // power/skill — one card per discrete ability
  "asset",           // image / video / audio / 3D / doc artifact
  "scene",           // composed multi-asset moment
  "rule",            // brand/safety/style constraint (negative or positive)
  "lore",            // canon fact/event/history
  "agent",           // an MGR agent assigned to a creation
  "project",         // top-level container (a series, album, campaign)
  "season",          // sub-container of a project (an arc, a season)
  "episode",         // single deliverable inside a season
]);

export const creationEdgeTypeEnum = pgEnum("creation_edge_type", [
  "owns",            // franchise OWNS character/world
  "appears_in",      // character APPEARS_IN scene/episode
  "lives_in",        // character LIVES_IN world
  "uses",            // scene USES asset
  "constrained_by",  // any node CONSTRAINED_BY rule
  "evolves_from",    // child node EVOLVES_FROM parent (breeding, mutation, sequel)
  "references",      // soft reference, citation
  "conflicts_with",  // canon conflict between nodes
  "depends_on",      // hard dependency (ability requires lore moment)
  "produced_by",     // asset PRODUCED_BY agent
  "approved_by",     // node APPROVED_BY user (human in the loop)
]);

export const creationStatusEnum = pgEnum("creation_status", [
  "draft",           // in flight, not locked
  "locked",          // identity locked, immutable on key fields
  "in_review",       // pending approval
  "approved",        // approved, ready to use
  "deprecated",      // retired but kept for history
]);

// ─── CREATION GRAPH NODES ───────────────────────────────────────────────────

export const creationNodes = pgTable(
  "creation_nodes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    type: creationNodeTypeEnum("type").notNull(),
    status: creationStatusEnum("status").notNull().default("draft"),

    name: text("name").notNull(),                   // human-readable, e.g. "TITAN"
    slug: text("slug").notNull(),                   // url-safe identifier
    summary: text("summary"),                       // 1-line description

    // The lock — frozen identity fields. When status=locked, these can't change.
    locks: jsonb("locks").$type<Record<string, unknown>>().notNull().default({}),

    // Open metadata — anything the agent or user wants to attach.
    metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default({}),

    // Visual references for the node (s3 keys / urls)
    assets: jsonb("assets").$type<{ thumbnails?: string[]; references?: string[]; primary?: string }>().notNull().default({}),

    // Trained LoRA path if this node has one (signature ↔ creation_node bridge)
    loraUrl: text("lora_url"),
    loraTriggerWord: text("lora_trigger_word"),

    // Link to franchise / project parent if this node belongs to one
    parentNodeId: uuid("parent_node_id"),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    lockedAt: timestamp("locked_at", { withTimezone: true }),
  },
  (t) => ({
    userIdx: index("creation_nodes_user_idx").on(t.userId),
    typeIdx: index("creation_nodes_type_idx").on(t.type),
    slugIdx: index("creation_nodes_slug_idx").on(t.slug),
    parentIdx: index("creation_nodes_parent_idx").on(t.parentNodeId),
    statusIdx: index("creation_nodes_status_idx").on(t.status),
  })
);

// ─── CREATION GRAPH EDGES ───────────────────────────────────────────────────

export const creationEdges = pgTable(
  "creation_edges",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    fromNodeId: uuid("from_node_id").notNull().references(() => creationNodes.id, { onDelete: "cascade" }),
    toNodeId: uuid("to_node_id").notNull().references(() => creationNodes.id, { onDelete: "cascade" }),
    type: creationEdgeTypeEnum("type").notNull(),

    // Strength / weight (e.g., a soft reference vs a hard constraint)
    weight: integer("weight").notNull().default(1),

    metadata: jsonb("metadata").$type<Record<string, unknown>>().notNull().default({}),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    userIdx: index("creation_edges_user_idx").on(t.userId),
    fromIdx: index("creation_edges_from_idx").on(t.fromNodeId),
    toIdx: index("creation_edges_to_idx").on(t.toNodeId),
    typeIdx: index("creation_edges_type_idx").on(t.type),
  })
);

// ─── CONTINUITY VIOLATIONS ──────────────────────────────────────────────────
// When the continuity engine detects a generated asset breaks a lock or rule,
// it records a violation here. Founder/agent reviews and either fixes or
// approves the deviation.

export const continuityViolations = pgTable(
  "continuity_violations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    nodeId: uuid("node_id").references(() => creationNodes.id, { onDelete: "cascade" }),
    assetUrl: text("asset_url"),
    violationType: text("violation_type").notNull(),  // 'lock_drift' | 'rule_break' | 'continuity_error'
    severity: text("severity").notNull().default("warn"), // 'info' | 'warn' | 'critical'
    detail: text("detail").notNull(),
    suggestedFix: text("suggested_fix"),
    resolved: boolean("resolved").notNull().default(false),
    resolvedAt: timestamp("resolved_at", { withTimezone: true }),
    resolvedBy: text("resolved_by"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    userIdx: index("continuity_violations_user_idx").on(t.userId),
    resolvedIdx: index("continuity_violations_resolved_idx").on(t.resolved),
  })
);

// ─── CREW SIMULATION ROOMS ──────────────────────────────────────────────────
// "Crew sim" lets multiple agents (writer / camera / VFX / sound / marketing)
// argue about a creation decision and converge. Implementation reuses the Clash
// engine but with creation-context binding.

export const crewRooms = pgTable(
  "crew_rooms",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    nodeId: uuid("node_id").references(() => creationNodes.id, { onDelete: "set null" }),
    title: text("title").notNull(),
    decision: text("decision"),       // null until converged
    departments: jsonb("departments").$type<string[]>().notNull().default([]),
    status: text("status").notNull().default("open"),  // open | converged | abandoned
    transcript: jsonb("transcript").$type<Array<{ agent: string; text: string; ts: string }>>().notNull().default([]),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    convergedAt: timestamp("converged_at", { withTimezone: true }),
  },
  (t) => ({
    userIdx: index("crew_rooms_user_idx").on(t.userId),
    nodeIdx: index("crew_rooms_node_idx").on(t.nodeId),
  })
);

// ─── RELATIONS ──────────────────────────────────────────────────────────────

export const creationNodesRelations = relations(creationNodes, ({ one, many }) => ({
  user: one(users, { fields: [creationNodes.userId], references: [users.id] }),
  edgesFrom: many(creationEdges, { relationName: "edges_from" }),
  edgesTo: many(creationEdges, { relationName: "edges_to" }),
}));

export const creationEdgesRelations = relations(creationEdges, ({ one }) => ({
  fromNode: one(creationNodes, { fields: [creationEdges.fromNodeId], references: [creationNodes.id], relationName: "edges_from" }),
  toNode: one(creationNodes, { fields: [creationEdges.toNodeId], references: [creationNodes.id], relationName: "edges_to" }),
}));

export type CreationNode = typeof creationNodes.$inferSelect;
export type NewCreationNode = typeof creationNodes.$inferInsert;
export type CreationEdge = typeof creationEdges.$inferSelect;
export type NewCreationEdge = typeof creationEdges.$inferInsert;

// ─── CREATION PIPELINES (F: Universal Data Card Schema) ───────────────────────
// Every pipeline run produces a UCT-tracked artifact. This table records the
// pipeline definition — the 9-stage CINEFORGE lifecycle with sandbox routing,
// cost forecasting, and approval gating all in one universal shape.

export const pipelineStatusEnum = pgEnum("pipeline_status", [
  "draft",        // being composed
  "approved",     // green-lit to run
  "running",      // executing stages
  "completed",    // all stages green
  "failed",       // one or more stages errored
  "rolled_back",  // inverse-ops chain executed
  "archived",     // kept for history
]);

export const pipelineRunStatusEnum = pgEnum("pipeline_run_status", [
  "queued",
  "stage_running",
  "stage_paused",      // waiting on approval gate
  "stage_failed",
  "completed",
  "rolled_back",
]);

export const CREATION_PIPELINE_STAGES = [
  "TRIGGER",
  "UCOS_READ",
  "PLAN",
  "BUILD",
  "CONTINUITY_CHECK",
  "APPROVAL",
  "EXECUTE",
  "VERIFY",
  "AUDIT",
] as const;

export type CreationPipelineStage = typeof CREATION_PIPELINE_STAGES[number];

export type CreationPipelineStageDefinition = {
  stage: CreationPipelineStage;
  config: Record<string, unknown>;
  agentSlug?: string;
  tool?: string;
  sandboxId?: number;
  estimatedCost?: number;
  dependsOn?: string[];
};

export const creationPipelines = pgTable(
  "creation_pipelines",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),

    // Descriptor: what this pipeline produces
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    summary: text("summary"),

    // 9-stage CINEFORGE lifecycle definition
    stages: jsonb("stages").$type<CreationPipelineStageDefinition[]>().notNull().default([]),

    // Sandbox routing — which sandbox classes this pipeline uses
    sandboxIds: jsonb("sandbox_ids").$type<number[]>().notNull().default([]),

    // Approval gating (pulled from REQUIRES_APPROVAL when stages emit actions)
    approvalClass: text("approval_class"), // A|B|C|D|E|F|G|H|I
    riskTier: text("risk_tier").default("medium"),
    reversibility: text("reversibility").default("reversible"),

    // Cost forecast (aggregated from stage estimates)
    costForecastUsd: numeric("cost_forecast_usd", { precision: 12, scale: 4 }).default("0"),
    actualCostUsd: numeric("actual_cost_usd", { precision: 12, scale: 4 }).default("0"),

    // Status + tracking
    status: pipelineStatusEnum("status").notNull().default("draft"),
    currentStage: integer("current_stage").default(0),  // 0-index into stages[]
    lastError: text("last_error"),
    rollbackPlan: jsonb("rollback_plan").$type<Array<Record<string, unknown>>>(),

    // Marketplace
    templateId: text("template_id"),          // forked from marketplace template
    isTemplate: boolean("is_template").default(false),
    marketplacePrice: integer("marketplace_price"),

    // Audit
    pipelineRunCount: integer("pipeline_run_count").default(0),
    totalRuntimeMs: integer("total_runtime_ms").default(0),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    userIdx: index("creation_pipelines_user_idx").on(t.userId),
    slugIdx: index("creation_pipelines_slug_idx").on(t.slug),
    statusIdx: index("creation_pipelines_status_idx").on(t.status),
    templateIdx: index("creation_pipelines_template_idx").on(t.templateId),
  })
);

// ─── PIPELINE RUNS (one row per execution) ─────────────────────────────────────

export const pipelineRuns = pgTable(
  "pipeline_runs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    pipelineId: uuid("pipeline_id").notNull().references(() => creationPipelines.id, { onDelete: "cascade" }),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),

    status: pipelineRunStatusEnum("status").notNull().default("queued"),
    currentStageIndex: integer("current_stage_index").default(0),
    stageResults: jsonb("stage_results").$type<Array<{
      stage: string;
      status: "pending" | "running" | "paused" | "completed" | "failed";
      startedAt?: string;
      completedAt?: string;
      error?: string;
      output?: Record<string, unknown>;
    }>>().notNull().default([]),

    // Approval id if any stage is paused waiting for human gate
    pendingApprovalId: uuid("pending_approval_id").references(() => pendingApprovals.id, { onDelete: "set null" }),

    // UCT — every completed run gets a Universal Creation Token
    uctToken: text("uct_token"),  // packed provenance blob

    traceId: text("trace_id"),    // signal-bus correlation
    startedAt: timestamp("started_at", { withTimezone: true }),
    completedAt: timestamp("completed_at", { withTimezone: true }),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    pipelineIdx: index("pipeline_runs_pipeline_idx").on(t.pipelineId),
    userIdx: index("pipeline_runs_user_idx").on(t.userId),
    statusIdx: index("pipeline_runs_status_idx").on(t.status),
  })
);

// ─── UCT — UNIVERSAL CREATION TOKEN ───────────────────────────────────────────
// Every artifact produced by any pipeline or tool gets a UCT. The token proves:
//   - WHO created it (user, agent, sandbox)
//   - WHAT pipeline/descriptor produced it
//   - WHEN it was created (immutable timestamp)
//   - WHICH locks were active (face/body/voice/brand at creation time)
//   - WHERE the artifact lives (url, node binding, file path)
//   - WHY — the original task brief that triggered creation
//
// This is the provenance layer. Any artifact can be reverse-compiled back to its
// UCT, and from the UCT back to the pipeline that made it.

export const uctArtifacts = pgTable(
  "uct_artifacts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),

    // The token itself — unique, human-readable-ish, sortable
    // Format: uct_<timestamp>_<random>  e.g. uct_20260508123456_a3f2
    token: text("token").notNull().unique(),

    // What was created
    artifactType: text("artifact_type").notNull(),  // image|video|audio|3d|code|contract|campaign|page|funnel|auto_build
    artifactUrl: text("artifact_url"),
    artifactPath: text("artifact_path"),            // filesystem path if local

    // Provenance chain
    pipelineId: uuid("pipeline_id").references(() => creationPipelines.id, { onDelete: "set null" }),
    pipelineRunId: uuid("pipeline_run_id").references(() => pipelineRuns.id, { onDelete: "set null" }),
    descriptorId: text("descriptor_id"),             // hybrid descriptor if from hybrid engine
    parentUctId: uuid("parent_uct_id"),              // forked/evolved from

    // Who made it
    createdBy: text("created_by").notNull(),         // agent slug | "founder" | "operator" | "swarm"
    sandboxId: integer("sandbox_id"),                // which sandbox produced it

    // Active locks at creation time (snapshot)
    activeLocks: jsonb("active_locks").$type<string[]>(),  // ["face","voice","brand",...]
    lockSnapshots: jsonb("lock_snapshots").$type<Record<string, Record<string, unknown>>>(),

    // The original brief (immutable — what the human/agent asked for)
    creationBrief: text("creation_brief"),

    // Quality metrics
    qualityScore: integer("quality_score"),          // 0-100, auto-assigned by continuity engine
    approvalRequired: boolean("approval_required").default(false),
    approvedBy: text("approved_by"),

    // Billing
    costUsd: numeric("cost_usd", { precision: 10, scale: 4 }).default("0"),
    creditCost: integer("credit_cost").default(0),

    // Tags for search / reverse-compilation
    tags: jsonb("tags").$type<string[]>().default([]),

    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    userIdx: index("uct_artifacts_user_idx").on(t.userId),
    tokenIdx: index("uct_artifacts_token_idx").on(t.token),
    typeIdx: index("uct_artifacts_type_idx").on(t.artifactType),
    pipelineIdx: index("uct_artifacts_pipeline_idx").on(t.pipelineId),
    parentIdx: index("uct_artifacts_parent_idx").on(t.parentUctId),
  })
);
