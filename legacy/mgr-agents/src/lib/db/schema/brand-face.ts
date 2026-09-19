/**
 * Brand Face Schema (Phase V40.10) — user identity assets
 * One row per (user, type). User can maintain Face Lock + Face Pro + Signature
 * + Voice Clone + Soul + Brand Universe entries simultaneously.
 * © 2025-2026 Money Grind Religion Inc. All Rights Reserved.
 */

import { pgTable, text, timestamp, uuid, jsonb, pgEnum, index, uniqueIndex } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { users } from "./auth";

export const brandAssetTypeEnum = pgEnum("brand_asset_type", [
  "face_lock",      // 1 reference photo (free, InstantID/IP-Adapter)
  "face_pro",       // 3-5 photos (PhotoMaker)
  "signature",      // 20+ photos, personal LoRA trained on Vast.ai
  "voice_clone",    // 30-sec voice sample
  "soul",           // bundled face+voice+brand (uses face_pro + voice_clone under hood)
  "brand_universe", // agency-owned per-client LoRA
]);

export const brandAssetStatusEnum = pgEnum("brand_asset_status", [
  "active",
  "training", // signature / brand_universe only — LoRA in training
  "failed",
]);

export type BrandAssetBrandProfile = {
  colors?: string[];          // hex palette
  personality?: string;       // 1-sentence description ("confident, warm, slightly playful")
  agentTone?: string;         // "bold" | "professional" | "friendly" | ...
};

export const userBrandAssets = pgTable(
  "user_brand_assets",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    type: brandAssetTypeEnum("type").notNull(),
    status: brandAssetStatusEnum("status").notNull().default("active"),
    referenceImages: jsonb("reference_images").$type<string[]>().notNull().default([]),
    trainedLoraUrl: text("trained_lora_url"),      // signature / brand_universe only
    trainingJobId: text("training_job_id"),        // Vast.ai job ID
    voiceCloneId: text("voice_clone_id"),          // ElevenLabs / Fish Audio voice id
    voiceSampleUrl: text("voice_sample_url"),      // 30-sec mp3/wav
    triggerWord: text("trigger_word"),             // mgr_[slug] for signature/brand_universe
    brandProfile: jsonb("brand_profile").$type<BrandAssetBrandProfile>().default({}),
    // For brand_universe — link to which client this LoRA belongs to
    clientName: text("client_name"),
    lastError: text("last_error"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index("user_brand_assets_user_idx").on(table.userId),
    typeIdx: index("user_brand_assets_type_idx").on(table.type),
    // One active asset per (user, type) — except brand_universe which is per-client
    userTypeUnique: uniqueIndex("user_brand_assets_user_type_unique")
      .on(table.userId, table.type)
      .where(sql`type != 'brand_universe'`),
  })
);

export const userBrandAssetsRelations = relations(userBrandAssets, ({ one }) => ({
  user: one(users, { fields: [userBrandAssets.userId], references: [users.id] }),
}));

/**
 * Settings on the user row — which brand-face type is active globally?
 * Agents use this to decide whether to apply face-lock / voice-clone on generations.
 */
export type BrandFacePreference = {
  enabled: boolean;                          // master toggle
  activeType: "face_lock" | "face_pro" | "signature" | "soul" | null;
  voiceCloneEnabled: boolean;
};
