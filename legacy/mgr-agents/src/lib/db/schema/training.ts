import { pgTable, text, integer, timestamp, jsonb, boolean, real, index } from "drizzle-orm/pg-core";
import { users } from "./auth";

/**
 * Smart Training Router — schema for the one-click training pipeline.
 * Source of truth: UCOS v3.5.3 SHEET 9 (UCOS_TRAINING) + SHEET 25 (smart_training_router pipeline).
 * © 2025-2026 Money Grind Religion Inc.
 */

// A queue item is one trainable unit detected by the router.
// Examples: brain_v3 dataset, milo character LoRA, milo back-view variant, time_human voice clone.
export const trainingQueue = pgTable("training_queue", {
  id: text("id").primaryKey(),
  itemType: text("item_type", {
    enum: ["brain_v3_dataset", "character_lora", "character_variant", "voice_clone", "rig_glb", "tpose"],
  }).notNull(),
  itemRef: text("item_ref").notNull(), // slug or dataset id (e.g., "milo", "brain-FINAL.jsonl")
  reason: text("reason").notNull(),    // why router queued it ("dataset hash changed", "no LoRA exists", "lock modified")
  estimatedCostUsd: real("estimated_cost_usd").notNull().default(0),
  estimatedDurationSec: integer("estimated_duration_sec").notNull().default(0),
  priority: text("priority", { enum: ["low", "normal", "high", "founder"] }).notNull().default("normal"),
  status: text("status", {
    enum: ["detected", "approved", "rejected", "running", "completed", "failed", "skipped"],
  }).notNull().default("detected"),
  detectedAt: timestamp("detected_at").notNull().defaultNow(),
  approvedAt: timestamp("approved_at"),
  approvedByUserId: text("approved_by_user_id").references(() => users.id),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  jobId: text("job_id"), // FK populated when trainingJobs row created
  metadata: jsonb("metadata"), // dataset hash, lock file path, model target, etc.
}, (table) => ({
  statusIdx: index("training_queue_status_idx").on(table.status),
  itemRefIdx: index("training_queue_item_ref_idx").on(table.itemType, table.itemRef),
}));

// A job is one batch of approved queue items being executed.
// Many queue items → one job (you click "Train All Pending" → one job runs them sequentially).
export const trainingJobs = pgTable("training_jobs", {
  id: text("id").primaryKey(),
  triggeredByUserId: text("triggered_by_user_id").notNull().references(() => users.id),
  status: text("status", {
    enum: ["queued", "waiting_for_swarm", "swarms_resetting", "packaging", "uploading", "training", "downloading", "completed", "failed", "cancelled"],
  }).notNull().default("queued"),
  queueItemCount: integer("queue_item_count").notNull().default(0),
  totalEstimatedCostUsd: real("total_estimated_cost_usd").notNull().default(0),
  totalActualCostUsd: real("total_actual_cost_usd").notNull().default(0),
  swarmsResetAt: timestamp("swarms_reset_at"),
  swarmsRespawnedAt: timestamp("swarms_respawned_at"),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  failedAt: timestamp("failed_at"),
  errorMessage: text("error_message"),
  logs: jsonb("logs"), // streaming log lines, structured
}, (table) => ({
  statusIdx: index("training_jobs_status_idx").on(table.status),
  userIdx: index("training_jobs_user_idx").on(table.triggeredByUserId),
}));

// A run is the result of training one queue item within a job.
// Tracks the actual training execution + output adapter.
export const trainingRuns = pgTable("training_runs", {
  id: text("id").primaryKey(),
  jobId: text("job_id").notNull().references(() => trainingJobs.id, { onDelete: "cascade" }),
  queueItemId: text("queue_item_id").notNull().references(() => trainingQueue.id),
  itemType: text("item_type").notNull(),
  itemRef: text("item_ref").notNull(),
  // Provider tracking
  provider: text("provider", { enum: ["vast_ai", "fal_ai", "local_blender"] }).notNull(),
  providerJobId: text("provider_job_id"), // Vast.ai instance id, fal.ai request id, etc.
  // Hashes — input dataset/lock and output adapter
  inputHash: text("input_hash"),  // sha256 of the source artifact (jsonl, zip of variants, lock string)
  outputAdapterUrl: text("output_adapter_url"), // resulting LoRA / model URL
  outputAdapterHash: text("output_adapter_hash"),
  // Metrics
  durationSec: integer("duration_sec"),
  actualCostUsd: real("actual_cost_usd"),
  metrics: jsonb("metrics"), // loss curve, eval scores, validation split results
  // Lifecycle
  status: text("status", {
    enum: ["queued", "running", "completed", "failed", "rolled_back"],
  }).notNull().default("queued"),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  errorMessage: text("error_message"),
}, (table) => ({
  jobIdx: index("training_runs_job_idx").on(table.jobId),
  itemIdx: index("training_runs_item_idx").on(table.itemType, table.itemRef),
}));

// Tracks which adapters are LIVE in production (hot-swap target).
// Updated atomically when a training run completes successfully.
export const trainingActiveAdapters = pgTable("training_active_adapters", {
  itemType: text("item_type").notNull(),
  itemRef: text("item_ref").notNull(),
  adapterUrl: text("adapter_url").notNull(),
  adapterHash: text("adapter_hash").notNull(),
  trainedFromRunId: text("trained_from_run_id").notNull().references(() => trainingRuns.id),
  activatedAt: timestamp("activated_at").notNull().defaultNow(),
  previousAdapterUrl: text("previous_adapter_url"), // for rollback
  previousAdapterHash: text("previous_adapter_hash"),
}, (table) => ({
  pk: index("training_active_adapters_pk").on(table.itemType, table.itemRef),
}));

// Tracks active swarm processes the orchestrator must reset before training.
// UCOS v3.5.3 SHEET 9 + Time's rule: "swarms must reset before each training, not idle-wait."
export const trainingSwarmRegistry = pgTable("training_swarm_registry", {
  pid: integer("pid").primaryKey(),
  swarmName: text("swarm_name").notNull(), // "brain-v3-generator-v2", "lora-pipeline", etc.
  command: text("command").notNull(),
  startedAt: timestamp("started_at").notNull(),
  lastSeenAt: timestamp("last_seen_at").notNull().defaultNow(),
  resumeCommand: text("resume_command"), // exact command to respawn after training
  status: text("status", { enum: ["active", "stopped_for_training", "respawning"] }).notNull().default("active"),
});

export type TrainingQueueItem = typeof trainingQueue.$inferSelect;
export type TrainingJob = typeof trainingJobs.$inferSelect;
export type TrainingRun = typeof trainingRuns.$inferSelect;
export type TrainingActiveAdapter = typeof trainingActiveAdapters.$inferSelect;
export type TrainingSwarmRegistry = typeof trainingSwarmRegistry.$inferSelect;
