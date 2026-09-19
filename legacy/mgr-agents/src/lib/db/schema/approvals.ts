/**
 * Approval Workflows Schema (V41.3 → Universal Approval Gateway v1)
 * Human-in-the-loop gates for high-risk AI actions.
 * Signal Bus checks pending_approvals before firing risky events.
 *
 * Universal Approval Gateway (D7-E build): one schema absorbs ~5.76M
 * variations. Every action plugs in via signal emission — gate.intercept
 * subscriber resolves policy + queues + delivers + re-emits on approve.
 *
 * © 2025-2026 Money Grind Religion Inc. All Rights Reserved.
 */

import { pgTable, text, timestamp, uuid, jsonb, pgEnum, index, integer, numeric, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./auth";

export const approvalStatusEnum = pgEnum("approval_status", [
  "pending",
  "approved",
  "rejected",
  "expired",
  "auto_approved",
]);

export const riskTierEnum = pgEnum("approval_risk_tier", [
  "trivial",   // audit-only, no human gate
  "low",       // 1-click in_app, t24h, auto_approve_if_safe
  "medium",    // 1-click in_app + email, t1h
  "high",      // 1-click in_app + push + email, t1h
  "critical",  // quorum 2-of-3 + 2FA, t1h, fallback_to_dryrun
]);

export const approverRoleEnum = pgEnum("approver_role", [
  "self",            // actor approves own (rare double-check)
  "founder",         // bypass-eligible
  "owner",           // workspace/company owner
  "peer",            // team member round-robin
  "quorum",          // N-of-M
  "parent",          // COPPA path
  "agency_client",   // reseller end-client must approve
  "attorney",        // legal docs > threshold
  "compliance",      // regulated categories
]);

export const timeoutPolicyEnum = pgEnum("approval_timeout_policy", [
  "instant",
  "t5min",
  "t1h",
  "t24h",
  "t72h",
  "t7d",
  "never",
]);

export const autoDegradeEnum = pgEnum("approval_auto_degrade", [
  "auto_approve_if_safe",
  "auto_reject",
  "hold",
  "fallback_to_dryrun",
  "fallback_to_preview",
]);

export const previewFormatEnum = pgEnum("approval_preview_format", [
  "text",
  "image",
  "video",
  "audio",
  "multi_asset",
  "diff",
]);

export const revocationWindowEnum = pgEnum("approval_revocation_window", [
  "none",
  "t1min",
  "t5min",
  "t1h",
]);

export const pendingApprovals = pgTable(
  "pending_approvals",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    actionType: text("action_type").notNull(), // ad.launched, social.post_published, etc.
    actionLabel: text("action_label").notNull(), // Human-readable: "Launch Facebook ad: Summer Sale"
    actionPayload: jsonb("action_payload").$type<Record<string, unknown>>().notNull(), // Full payload to execute if approved
    status: approvalStatusEnum("status").notNull().default("pending"),
    reviewedAt: timestamp("reviewed_at"),
    reviewNote: text("review_note"),
    expiresAt: timestamp("expires_at"), // Auto-expire after 72h if not reviewed
    createdAt: timestamp("created_at").notNull().defaultNow(),

    // Universal Approval Gateway v1 columns (backward compatible — all nullable)
    riskTier: riskTierEnum("risk_tier"),
    approverRole: approverRoleEnum("approver_role"),
    approverUserIds: jsonb("approver_user_ids").$type<string[]>(), // who can approve (resolves quorum)
    quorumRequired: integer("quorum_required").default(1), // N-of-M approvals needed
    deliverySurfaces: jsonb("delivery_surfaces").$type<string[]>(), // [in_app, email, sms, slack, discord, push, watch, voice, webhook]
    timeoutPolicy: timeoutPolicyEnum("timeout_policy"),
    autoDegrade: autoDegradeEnum("auto_degrade"),
    previewFormat: previewFormatEnum("preview_format"),
    previewUrl: text("preview_url"), // rendered artifact for review
    revocationWindow: revocationWindowEnum("revocation_window").default("none"), // undo-approve window
    parentApprovalId: uuid("parent_approval_id"), // chained approvals — self-ref FK added below
    bundleId: uuid("bundle_id"), // batch approve N items in 1 review
    costEstimateUsd: numeric("cost_estimate_usd", { precision: 12, scale: 4 }), // dollars at risk if approved
    riskSignals: jsonb("risk_signals").$type<Record<string, unknown>>(), // Brain prediction + evidence
    counterProposal: jsonb("counter_proposal").$type<Record<string, unknown>>(), // reviewer alternative
    signature: text("signature"), // cryptographic audit signature
    delegatedFrom: text("delegated_from"), // if approval power was delegated
    sentAt: jsonb("sent_at").$type<Record<string, string>>(), // per surface delivery timestamps
    approverDecisionLog: jsonb("approver_decision_log").$type<Array<Record<string, unknown>>>(), // per-approver vote in quorum case
    traceId: text("trace_id"), // signal-bus correlation id
    confidenceScore: integer("confidence_score"), // Brain's auto-approve confidence (0-100)
  },
  (table) => ({
    userIdx: index("pending_approvals_user_idx").on(table.userId),
    statusIdx: index("pending_approvals_status_idx").on(table.userId, table.status),
    bundleIdx: index("pending_approvals_bundle_idx").on(table.bundleId),
    parentIdx: index("pending_approvals_parent_idx").on(table.parentApprovalId),
    riskIdx: index("pending_approvals_risk_idx").on(table.riskTier, table.status),
  })
);

export const pendingApprovalsRelations = relations(pendingApprovals, ({ one }) => ({
  user: one(users, { fields: [pendingApprovals.userId], references: [users.id] }),
}));

/**
 * Universal Approval Action Catalog (50 types).
 * Every action that touches money / customers / brand / data / identity /
 * operational state plugs into this registry. The signal bus checks this
 * list before firing — if listed, the call routes through gate.intercept
 * before the original handler executes.
 *
 * Founder accounts bypass all approvals (audit-logged).
 *
 * Source: pipeline.txt §4.2 (universal approval pipeline target).
 */
export const REQUIRES_APPROVAL: string[] = [
  // ─── Outbound (Class B — customer contact) ───────────────────────
  "email.sent",
  "sms.sent",
  "whatsapp.sent",
  "discord.sent",
  "telegram.sent",
  "dm.sent",
  "comment.posted",
  "webhook.sent",
  "call.initiated",
  "post.published",
  "story.published",
  "reel.published",
  "ad.launched",
  "push.sent",

  // ─── Money (Class A — money-moving) ──────────────────────────────
  "stripe.charged",
  "credits.spent",
  "gpu.rented",
  "ad.budget_set",
  "invoice.sent",
  "refund.issued",
  "payout.sent",
  "plan.downgraded",
  "affiliate.payout",
  "agency.credits_allocated",

  // ─── Real-world artifacts (Class C — public brand) ───────────────
  "contract.sent",
  "contract.signed",
  "course.published",
  "ebook.published",
  "funnel.published",
  "page.published",
  "site.published",
  "video.published",
  "avatar.deployed",
  "lora.trained",
  "brand.locked",
  "character.bred",

  // ─── Data + identity (Class D — identity / Class E — data) ───────
  "consent.granted",
  "consent.revoked",
  "voice.cloned",
  "face.locked",
  "data.exported",
  "data.deleted",
  "biometric.processed",

  // ─── Operational (Class F — agent / Class G — integration) ───────
  "automation.armed",
  "cron.fired",
  "autopilot.scheduled",
  "agent.deployed",
  "swarm.launched",
  "manifest.signed",
  "training.kicked",
  "gpu.killed",
  "creation_os.lock_published",
  "creation_os.violation_resolved",
  "fitag.phase_advanced",
  "agency.client_added",

  // ─── Legacy aliases (kept for backward compatibility) ────────────
  "social.post_published", // alias of post.published
  "email.sequence_started",
  "voice.call_initiated",  // alias of call.initiated
  "automation.triggered",  // alias of automation.armed
];

/**
 * Default risk-tier policy matrix. Maps action_type → riskTier.
 * Used by gate.intercept when a caller doesn't specify riskTier explicitly.
 * Source: pipeline.txt §4.3.
 */
export const ACTION_RISK_DEFAULTS: Record<string, "trivial" | "low" | "medium" | "high" | "critical"> = {
  // Critical
  "stripe.charged": "critical",
  "ad.launched": "critical",
  "ad.budget_set": "critical",
  "contract.sent": "critical",
  "contract.signed": "critical",
  "data.deleted": "critical",
  "consent.revoked": "critical",
  "lora.trained": "critical",
  "gpu.rented": "critical",
  "payout.sent": "critical",

  // High
  "email.sent": "high",
  "sms.sent": "high",
  "call.initiated": "high",
  "post.published": "high",
  "story.published": "high",
  "reel.published": "high",
  "site.published": "high",
  "page.published": "high",
  "funnel.published": "high",
  "video.published": "high",
  "voice.cloned": "high",
  "face.locked": "high",
  "biometric.processed": "high",
  "swarm.launched": "high",
  "training.kicked": "high",
  "autopilot.scheduled": "high",
  "agency.credits_allocated": "high",
  "affiliate.payout": "high",
  "refund.issued": "high",
  "data.exported": "high",
  "course.published": "high",
  "ebook.published": "high",
  "avatar.deployed": "high",
  "character.bred": "high",
  "brand.locked": "high",

  // Medium
  "whatsapp.sent": "medium",
  "discord.sent": "medium",
  "telegram.sent": "medium",
  "dm.sent": "medium",
  "comment.posted": "medium",
  "webhook.sent": "medium",
  "push.sent": "medium",
  "credits.spent": "medium",
  "invoice.sent": "medium",
  "plan.downgraded": "medium",
  "automation.armed": "medium",
  "agent.deployed": "medium",
  "manifest.signed": "medium",
  "fitag.phase_advanced": "medium",
  "agency.client_added": "medium",
  "creation_os.lock_published": "medium",
  "creation_os.violation_resolved": "medium",

  // Low
  "consent.granted": "low",
  "cron.fired": "low",
  "gpu.killed": "low",

  // Legacy aliases
  "social.post_published": "high",
  "email.sequence_started": "high",
  "voice.call_initiated": "high",
  "automation.triggered": "medium",
};
