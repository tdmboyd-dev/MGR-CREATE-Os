-- ═══════════════════════════════════════════════════════════════════
-- Universal Approval Gateway v1 — schema extension
-- ═══════════════════════════════════════════════════════════════════
-- Adds 6 new enums + 16 new columns + 3 indexes to pending_approvals.
-- All new columns are nullable so existing rows keep working untouched.
-- Idempotent: safe to re-apply (every CREATE / ADD uses IF NOT EXISTS).
--
-- Reference: src/lib/db/schema/approvals.ts
-- Doctrine:  pipeline.txt §4.1 (extended schema, 13+ new columns)
-- ═══════════════════════════════════════════════════════════════════

-- ─── New enums ─────────────────────────────────────────────────────

DO $$ BEGIN
  CREATE TYPE "approval_risk_tier" AS ENUM ('trivial', 'low', 'medium', 'high', 'critical');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "approver_role" AS ENUM ('self', 'founder', 'owner', 'peer', 'quorum', 'parent', 'agency_client', 'attorney', 'compliance');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "approval_timeout_policy" AS ENUM ('instant', 't5min', 't1h', 't24h', 't72h', 't7d', 'never');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "approval_auto_degrade" AS ENUM ('auto_approve_if_safe', 'auto_reject', 'hold', 'fallback_to_dryrun', 'fallback_to_preview');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "approval_preview_format" AS ENUM ('text', 'image', 'video', 'audio', 'multi_asset', 'diff');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE "approval_revocation_window" AS ENUM ('none', 't1min', 't5min', 't1h');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ─── New columns on pending_approvals ──────────────────────────────

ALTER TABLE "pending_approvals" ADD COLUMN IF NOT EXISTS "risk_tier" "approval_risk_tier";
ALTER TABLE "pending_approvals" ADD COLUMN IF NOT EXISTS "approver_role" "approver_role";
ALTER TABLE "pending_approvals" ADD COLUMN IF NOT EXISTS "approver_user_ids" jsonb;
ALTER TABLE "pending_approvals" ADD COLUMN IF NOT EXISTS "quorum_required" integer DEFAULT 1;
ALTER TABLE "pending_approvals" ADD COLUMN IF NOT EXISTS "delivery_surfaces" jsonb;
ALTER TABLE "pending_approvals" ADD COLUMN IF NOT EXISTS "timeout_policy" "approval_timeout_policy";
ALTER TABLE "pending_approvals" ADD COLUMN IF NOT EXISTS "auto_degrade" "approval_auto_degrade";
ALTER TABLE "pending_approvals" ADD COLUMN IF NOT EXISTS "preview_format" "approval_preview_format";
ALTER TABLE "pending_approvals" ADD COLUMN IF NOT EXISTS "preview_url" text;
ALTER TABLE "pending_approvals" ADD COLUMN IF NOT EXISTS "revocation_window" "approval_revocation_window" DEFAULT 'none';
ALTER TABLE "pending_approvals" ADD COLUMN IF NOT EXISTS "parent_approval_id" uuid;
ALTER TABLE "pending_approvals" ADD COLUMN IF NOT EXISTS "bundle_id" uuid;
ALTER TABLE "pending_approvals" ADD COLUMN IF NOT EXISTS "cost_estimate_usd" numeric(12, 4);
ALTER TABLE "pending_approvals" ADD COLUMN IF NOT EXISTS "risk_signals" jsonb;
ALTER TABLE "pending_approvals" ADD COLUMN IF NOT EXISTS "counter_proposal" jsonb;
ALTER TABLE "pending_approvals" ADD COLUMN IF NOT EXISTS "signature" text;
ALTER TABLE "pending_approvals" ADD COLUMN IF NOT EXISTS "delegated_from" text;
ALTER TABLE "pending_approvals" ADD COLUMN IF NOT EXISTS "sent_at" jsonb;
ALTER TABLE "pending_approvals" ADD COLUMN IF NOT EXISTS "approver_decision_log" jsonb;
ALTER TABLE "pending_approvals" ADD COLUMN IF NOT EXISTS "trace_id" text;
ALTER TABLE "pending_approvals" ADD COLUMN IF NOT EXISTS "confidence_score" integer;

-- ─── New indexes ───────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS "pending_approvals_bundle_idx"
  ON "pending_approvals" ("bundle_id");

CREATE INDEX IF NOT EXISTS "pending_approvals_parent_idx"
  ON "pending_approvals" ("parent_approval_id");

CREATE INDEX IF NOT EXISTS "pending_approvals_risk_idx"
  ON "pending_approvals" ("risk_tier", "status");
