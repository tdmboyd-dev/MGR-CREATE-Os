-- ═══════════════════════════════════════════════════════════════════
-- Hybrid Mind Descriptors — Phase A schema
-- ═══════════════════════════════════════════════════════════════════
-- Creates hybrid_descriptors table with full index set.
-- Idempotent: CREATE TABLE IF NOT EXISTS + CREATE INDEX IF NOT EXISTS
--
-- Reference: src/lib/db/schema/hybrid.ts
-- Doctrine:  hybrid_mind.tx §2 (universal grammar for hybrid ops)
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS "hybrid_descriptors" (
  "id"                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id"               TEXT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "descriptor_id"         TEXT NOT NULL UNIQUE,
  "type"                  TEXT NOT NULL DEFAULT 'build',
  "trigger_type"          TEXT DEFAULT 'user_action',
  "parent_descriptor_id"  TEXT,
  "name"                  TEXT NOT NULL,
  "summary"               TEXT,
  "risk_tier"             TEXT DEFAULT 'medium',
  "reversibility"         TEXT DEFAULT 'reversible',
  "locks"                 JSONB,
  "agent_slugs"           JSONB,
  "tools"                 JSONB,
  "cost_forecast_usd"     NUMERIC(12, 4) DEFAULT 0,
  "confidence_score"      INTEGER DEFAULT 70,
  "compliance_tags"       JSONB,
  "twin_mode"             BOOLEAN DEFAULT FALSE,
  "notes"                 TEXT,
  "status"                TEXT DEFAULT 'draft',
  "execution_log"         JSONB,
  "result_summary"        TEXT,
  "published_at"          TIMESTAMP,
  "created_at"            TIMESTAMP NOT NULL DEFAULT NOW(),
  "updated_at"            TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS "hybrid_descriptors_user_idx"
  ON "hybrid_descriptors" ("user_id");

CREATE INDEX IF NOT EXISTS "hybrid_descriptors_parent_idx"
  ON "hybrid_descriptors" ("parent_descriptor_id");

CREATE INDEX IF NOT EXISTS "hybrid_descriptors_type_idx"
  ON "hybrid_descriptors" ("type", "status");
