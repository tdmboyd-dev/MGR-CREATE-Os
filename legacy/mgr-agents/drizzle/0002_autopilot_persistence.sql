CREATE TABLE IF NOT EXISTS "autopilot_configs" (
  "user_id" text PRIMARY KEY NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "enabled" boolean DEFAULT false NOT NULL,
  "timezone" text DEFAULT 'America/New_York' NOT NULL,
  "config" jsonb DEFAULT '{}'::jsonb NOT NULL,
  "last_run_at" timestamp,
  "next_run_at" timestamp,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "autopilot_configs_enabled_idx" ON "autopilot_configs" USING btree ("enabled");
