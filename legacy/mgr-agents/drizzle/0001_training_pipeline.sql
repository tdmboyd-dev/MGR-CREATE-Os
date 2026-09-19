CREATE TABLE "training_active_adapters" (
	"item_type" text NOT NULL,
	"item_ref" text NOT NULL,
	"adapter_url" text NOT NULL,
	"adapter_hash" text NOT NULL,
	"trained_from_run_id" text NOT NULL,
	"activated_at" timestamp DEFAULT now() NOT NULL,
	"previous_adapter_url" text,
	"previous_adapter_hash" text
);
--> statement-breakpoint
CREATE TABLE "training_jobs" (
	"id" text PRIMARY KEY NOT NULL,
	"triggered_by_user_id" text NOT NULL,
	"status" text DEFAULT 'queued' NOT NULL,
	"queue_item_count" integer DEFAULT 0 NOT NULL,
	"total_estimated_cost_usd" real DEFAULT 0 NOT NULL,
	"total_actual_cost_usd" real DEFAULT 0 NOT NULL,
	"swarms_reset_at" timestamp,
	"swarms_respawned_at" timestamp,
	"started_at" timestamp,
	"completed_at" timestamp,
	"failed_at" timestamp,
	"error_message" text,
	"logs" jsonb
);
--> statement-breakpoint
CREATE TABLE "training_queue" (
	"id" text PRIMARY KEY NOT NULL,
	"item_type" text NOT NULL,
	"item_ref" text NOT NULL,
	"reason" text NOT NULL,
	"estimated_cost_usd" real DEFAULT 0 NOT NULL,
	"estimated_duration_sec" integer DEFAULT 0 NOT NULL,
	"priority" text DEFAULT 'normal' NOT NULL,
	"status" text DEFAULT 'detected' NOT NULL,
	"detected_at" timestamp DEFAULT now() NOT NULL,
	"approved_at" timestamp,
	"approved_by_user_id" text,
	"started_at" timestamp,
	"completed_at" timestamp,
	"job_id" text,
	"metadata" jsonb
);
--> statement-breakpoint
CREATE TABLE "training_runs" (
	"id" text PRIMARY KEY NOT NULL,
	"job_id" text NOT NULL,
	"queue_item_id" text NOT NULL,
	"item_type" text NOT NULL,
	"item_ref" text NOT NULL,
	"provider" text NOT NULL,
	"provider_job_id" text,
	"input_hash" text,
	"output_adapter_url" text,
	"output_adapter_hash" text,
	"duration_sec" integer,
	"actual_cost_usd" real,
	"metrics" jsonb,
	"status" text DEFAULT 'queued' NOT NULL,
	"started_at" timestamp,
	"completed_at" timestamp,
	"error_message" text
);
--> statement-breakpoint
CREATE TABLE "training_swarm_registry" (
	"pid" integer PRIMARY KEY NOT NULL,
	"swarm_name" text NOT NULL,
	"command" text NOT NULL,
	"started_at" timestamp NOT NULL,
	"last_seen_at" timestamp DEFAULT now() NOT NULL,
	"resume_command" text,
	"status" text DEFAULT 'active' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "training_active_adapters" ADD CONSTRAINT "training_active_adapters_trained_from_run_id_training_runs_id_fk" FOREIGN KEY ("trained_from_run_id") REFERENCES "public"."training_runs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "training_jobs" ADD CONSTRAINT "training_jobs_triggered_by_user_id_users_id_fk" FOREIGN KEY ("triggered_by_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "training_queue" ADD CONSTRAINT "training_queue_approved_by_user_id_users_id_fk" FOREIGN KEY ("approved_by_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "training_runs" ADD CONSTRAINT "training_runs_job_id_training_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."training_jobs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "training_runs" ADD CONSTRAINT "training_runs_queue_item_id_training_queue_id_fk" FOREIGN KEY ("queue_item_id") REFERENCES "public"."training_queue"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "training_active_adapters_pk" ON "training_active_adapters" USING btree ("item_type","item_ref");--> statement-breakpoint
CREATE INDEX "training_jobs_status_idx" ON "training_jobs" USING btree ("status");--> statement-breakpoint
CREATE INDEX "training_jobs_user_idx" ON "training_jobs" USING btree ("triggered_by_user_id");--> statement-breakpoint
CREATE INDEX "training_queue_status_idx" ON "training_queue" USING btree ("status");--> statement-breakpoint
CREATE INDEX "training_queue_item_ref_idx" ON "training_queue" USING btree ("item_type","item_ref");--> statement-breakpoint
CREATE INDEX "training_runs_job_idx" ON "training_runs" USING btree ("job_id");--> statement-breakpoint
CREATE INDEX "training_runs_item_idx" ON "training_runs" USING btree ("item_type","item_ref");