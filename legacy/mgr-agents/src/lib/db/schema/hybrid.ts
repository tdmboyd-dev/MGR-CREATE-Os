/**
 * Hybrid Mind Descriptor Schema — Phase A primitives
 *
 * hybrid_descriptors: One row per named descriptor that can be composed,
 * forked, run, replayed, or published to the Marketplace.
 * Shape mirrors hybrid_mind.tx §2 — the "universal grammar" for hybrid ops.
 *
 * © 2025-2026 Money Grind Religion Inc. All Rights Reserved.
 */

import { pgTable, text, timestamp, uuid, jsonb, index, integer, numeric, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./auth";

export const hybridDescriptors = pgTable(
  "hybrid_descriptors",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),

    // Client-generated stable handle: hd_timestamp_random
    descriptorId: text("descriptor_id").notNull().unique(),

    // Core shape (mirrors HybridDescriptor client type)
    type:            text("type").notNull().default("build"),       // approval|train|build|feature|workflow|pipeline
    triggerType:     text("trigger_type").default("user_action"),   // user_action|signal|cron|agent_propose|event
    parentDescriptorId: text("parent_descriptor_id"),               // null on root, set on fork
    name:            text("name").notNull(),
    summary:         text("summary"),
    riskTier:        text("risk_tier").default("medium"),           // trivial|low|medium|high|critical
    reversibility:   text("reversibility").default("reversible"),   // reversible|partial|irreversible
    locks:           jsonb("locks").$type<string[]>(),              // ["face","voice","brand",...]
    agentSlugs:      jsonb("agent_slugs").$type<string[]>(),
    tools:           jsonb("tools").$type<string[]>(),
    costForecastUsd: numeric("cost_forecast_usd", { precision: 12, scale: 4 }).default("0"),
    confidenceScore: integer("confidence_score").default(70),
    complianceTags:  jsonb("compliance_tags").$type<string[]>(),
    twinMode:        boolean("twin_mode").default(false),
    notes:           text("notes"),

    // Lifecycle
    status:          text("status").default("draft"),               // draft|active|archived|running|completed|failed
    executionLog:    jsonb("execution_log").$type<Array<Record<string, unknown>>>(),
    resultSummary:   text("result_summary"),
    publishedAt:     timestamp("published_at"),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    userIdx:   index("hybrid_descriptors_user_idx").on(table.userId),
    parentIdx: index("hybrid_descriptors_parent_idx").on(table.parentDescriptorId),
    typeIdx:   index("hybrid_descriptors_type_idx").on(table.type, table.status),
  })
);

export const hybridDescriptorsRelations = relations(hybridDescriptors, ({ one }) => ({
  user: one(users, { fields: [hybridDescriptors.userId], references: [users.id] }),
}));
