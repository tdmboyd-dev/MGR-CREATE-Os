-- MGR foundation repair: creates only tables absent from the connected schema.
-- Safe to re-run. It does not alter or delete any existing table or record.

DO $$ BEGIN CREATE TYPE "agent_cron_status" AS ENUM ('active', 'paused', 'expired', 'error'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE "agent_cron_cadence" AS ENUM ('minute_5', 'minute_15', 'minute_30', 'hourly', 'every_6h', 'every_12h', 'daily', 'weekly', 'monthly', 'custom_expr'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE "cost_profile_modality" AS ENUM ('text', 'image', 'video', 'audio', 'voice', 'music', 'sfx', 'embedding', '3d', 'vision', 'tool_use'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE "cost_profile_quality" AS ENUM ('fast', 'standard', 'premium', 'reasoning', 'specialty'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE "media_audit_type" AS ENUM ('image', 'video', 'audio', 'voice', 'music', 'sfx', '3d_model', '3d_avatar', 'lip_sync', 'upscale', 'bg_remove', 'face_swap', 'inpaint', 'lora_train', 'transcription', 'other'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE "media_audit_status" AS ENUM ('queued', 'running', 'succeeded', 'failed', 'cancelled', 'rate_limited', 'fallback_used'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS "agent_cron" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" text NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "company_id" uuid,
  "name" text NOT NULL,
  "description" text,
  "agent_slug" text NOT NULL,
  "tools_allowed" jsonb DEFAULT '[]'::jsonb,
  "cadence" "agent_cron_cadence" NOT NULL DEFAULT 'daily',
  "cron_expr" text,
  "timezone" text NOT NULL DEFAULT 'UTC',
  "payload" jsonb,
  "prompt_template" text,
  "status" "agent_cron_status" NOT NULL DEFAULT 'active',
  "enabled" boolean NOT NULL DEFAULT true,
  "last_run_at" timestamp with time zone,
  "next_run_at" timestamp with time zone,
  "last_run_status" text,
  "last_run_output" jsonb,
  "success_count" integer NOT NULL DEFAULT 0,
  "failure_count" integer NOT NULL DEFAULT 0,
  "consecutive_failures" integer NOT NULL DEFAULT 0,
  "max_consecutive_failures" integer NOT NULL DEFAULT 5,
  "expires_at" timestamp with time zone,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at" timestamp with time zone NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "agent_cron_user_idx" ON "agent_cron" ("user_id");
CREATE INDEX IF NOT EXISTS "agent_cron_next_run_idx" ON "agent_cron" ("enabled", "status", "next_run_at");
CREATE INDEX IF NOT EXISTS "agent_cron_agent_idx" ON "agent_cron" ("agent_slug");

CREATE TABLE IF NOT EXISTS "agent_workspaces" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" text NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "agent_id" uuid NOT NULL REFERENCES "agents"("id") ON DELETE CASCADE,
  "files" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "browser_state" jsonb,
  "task_queue" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "tool_history" jsonb NOT NULL DEFAULT '[]'::jsonb,
  "scratchpad" jsonb NOT NULL DEFAULT '{}'::jsonb,
  "run_count" integer NOT NULL DEFAULT 0,
  "last_used_at" timestamp with time zone,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at" timestamp with time zone NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "agent_workspaces_user_idx" ON "agent_workspaces" ("user_id");
CREATE INDEX IF NOT EXISTS "agent_workspaces_agent_idx" ON "agent_workspaces" ("agent_id");
CREATE INDEX IF NOT EXISTS "agent_workspaces_last_used_idx" ON "agent_workspaces" ("last_used_at");

CREATE TABLE IF NOT EXISTS "cost_profile" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "provider" text NOT NULL,
  "model" text NOT NULL,
  "modality" "cost_profile_modality" NOT NULL,
  "quality" "cost_profile_quality" NOT NULL,
  "input_cost_per_million" numeric(10,4),
  "output_cost_per_million" numeric(10,4),
  "per_call_cost_usd" numeric(10,6),
  "avg_latency_ms" integer,
  "avg_tokens_per_sec" integer,
  "quality_score" integer,
  "benchmark_source" text,
  "context_length" integer,
  "max_output_tokens" integer,
  "supports_tools" boolean NOT NULL DEFAULT false,
  "supports_vision" boolean NOT NULL DEFAULT false,
  "supports_streaming" boolean NOT NULL DEFAULT true,
  "enabled" boolean NOT NULL DEFAULT true,
  "priority" integer NOT NULL DEFAULT 100,
  "rpd_limit" integer,
  "tpm_limit" integer,
  "notes" text,
  "extra_config" jsonb,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at" timestamp with time zone NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "cost_profile_provider_model_idx" ON "cost_profile" ("provider", "model");
CREATE INDEX IF NOT EXISTS "cost_profile_modality_quality_idx" ON "cost_profile" ("modality", "quality", "priority");
CREATE INDEX IF NOT EXISTS "cost_profile_enabled_idx" ON "cost_profile" ("enabled", "modality");

CREATE TABLE IF NOT EXISTS "media_audit" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" text REFERENCES "users"("id") ON DELETE SET NULL,
  "company_id" uuid,
  "agent_slug" text,
  "run_id" uuid,
  "type" "media_audit_type" NOT NULL,
  "status" "media_audit_status" NOT NULL DEFAULT 'queued',
  "provider" text NOT NULL,
  "provider_model" text NOT NULL,
  "fallback_chain" jsonb DEFAULT '[]'::jsonb,
  "prompt" text,
  "prompt_hash" text,
  "input_params" jsonb,
  "output_url" text,
  "output_thumbnail_url" text,
  "output_bytes" integer,
  "cost_usd" numeric(10,6) DEFAULT '0',
  "credits_charged" numeric(10,4) DEFAULT '0',
  "latency_ms" integer,
  "founder_bypass" boolean NOT NULL DEFAULT false,
  "quality_tier" text,
  "error_code" text,
  "error_message" text,
  "requested_at" timestamp with time zone NOT NULL DEFAULT now(),
  "completed_at" timestamp with time zone
);
CREATE INDEX IF NOT EXISTS "media_audit_user_idx" ON "media_audit" ("user_id", "requested_at");
CREATE INDEX IF NOT EXISTS "media_audit_provider_idx" ON "media_audit" ("provider", "requested_at");
CREATE INDEX IF NOT EXISTS "media_audit_type_idx" ON "media_audit" ("type", "requested_at");
CREATE INDEX IF NOT EXISTS "media_audit_status_idx" ON "media_audit" ("status");
CREATE INDEX IF NOT EXISTS "media_audit_run_idx" ON "media_audit" ("run_id");

CREATE TABLE IF NOT EXISTS "hybrid_descriptors" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" text NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "descriptor_id" text NOT NULL UNIQUE,
  "type" text NOT NULL DEFAULT 'build',
  "trigger_type" text DEFAULT 'user_action',
  "parent_descriptor_id" text,
  "name" text NOT NULL,
  "summary" text,
  "risk_tier" text DEFAULT 'medium',
  "reversibility" text DEFAULT 'reversible',
  "locks" jsonb,
  "agent_slugs" jsonb,
  "tools" jsonb,
  "cost_forecast_usd" numeric(12,4) DEFAULT 0,
  "confidence_score" integer DEFAULT 70,
  "compliance_tags" jsonb,
  "twin_mode" boolean DEFAULT false,
  "notes" text,
  "status" text DEFAULT 'draft',
  "execution_log" jsonb,
  "result_summary" text,
  "published_at" timestamp,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "hybrid_descriptors_user_idx" ON "hybrid_descriptors" ("user_id");
CREATE INDEX IF NOT EXISTS "hybrid_descriptors_parent_idx" ON "hybrid_descriptors" ("parent_descriptor_id");
CREATE INDEX IF NOT EXISTS "hybrid_descriptors_type_idx" ON "hybrid_descriptors" ("type", "status");

CREATE TABLE IF NOT EXISTS "stripe_webhook_events" (
  "event_id" text PRIMARY KEY NOT NULL,
  "event_type" text NOT NULL,
  "status" text NOT NULL DEFAULT 'processing',
  "attempts" integer NOT NULL DEFAULT 1,
  "processed_at" timestamp,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "stripe_webhook_events_status_idx" ON "stripe_webhook_events" ("status");
