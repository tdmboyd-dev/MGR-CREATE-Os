# MGR AGENTS — Complete Platform Brief
# © 2025-2026 Money Grind Religion Inc. All Rights Reserved.
# Created by Timebeunus Boyd | CEO, Money Grind Religion Inc.
#
# PURPOSE: Drop this file into ANY AI coding assistant (Copilot, Cursor, Claude, etc.)
# to give it COMPLETE understanding of the MGR Agents platform, architecture,
# capabilities, business model, and roadmap. This is the single source of truth.
#
# Last Updated: March 17, 2026

---

## WHAT IS MGR AGENTS?

MGR Agents is an **autonomous multi-agent business operating system** — a platform where 133 specialized AI agents work as a digital workforce for any business. Each agent has a name, role, personality, persistent memory, and the ability to collaborate with other agents. Users chat with agents, chain them into workflows, and let them handle real business tasks: writing emails, researching competitors, planning content, managing projects, analyzing data, and more.

**Think of it as:** Hiring a team of 133 AI employees who work 24/7, never sleep, remember everything, and cost $0-$199/month instead of $500K+/year in salaries.

**Production URL:** https://mgr-agents.vercel.app
**Owner:** Money Grind Religion Inc. (CEO: Timebeunus Boyd)

---

## TECH STACK

```
FRAMEWORK:    Next.js 16.1.6 + TypeScript strict + React 19
STYLING:      Tailwind CSS 4 + shadcn/ui + Framer Motion 12
AUTH:         Better Auth 1.4.19 (email/password, sessions, OAuth-ready)
DATABASE:     Neon PostgreSQL + Drizzle ORM 0.45
LLM ENGINE:   Mega Router v2 — 15 providers, 50+ models, 108K+ RPD, $0/month
PAYMENTS:     Stripe (checkout, webhooks, billing portal)
EMAIL:        Resend (3K/mo free — welcome, upgrade, warning emails)
RATE LIMIT:   Upstash Redis (persistent) + in-memory fallback
STATE:        Zustand 5 (installed, ready for use)
CHARTS:       Recharts 3.7
ANIMATIONS:   Framer Motion 12.34
3D (READY):   Three.js + React Three Fiber + drei + postprocessing
DEPLOY:       Vercel (auto-deploy from git)
COST:         $0/month (all free tiers)
```

---

## DATABASE SCHEMA (20+ tables)

### Core Tables
- **users** — id, name, email, plan (free/starter/professional/enterprise), agentRunsUsed, agentRunsLimit
- **sessions** — Better Auth session management (7-day TTL)
- **accounts** — OAuth provider accounts
- **verifications** — Email verification tokens

### Business Tables
- **companies** — id, userId, name, industry, brandVoice, brandColors, logoUrl
- **agents** — id, userId, name, slug, role, category, systemPrompt, modelTier, mcpTools[], collaboratesWith[], status, totalRuns, totalTokens
- **agent_runs** — id, agentId, userId, input, output, status, modelUsed, inputTokens, outputTokens, durationMs
- **conversations** — id, agentId, userId, title, messages[] (JSONB array of role/content/timestamp)
- **agent_memory** — id, agentId, type (fact/extracted/learned), content, metadata
- **agent_handoffs** — sourceAgentId, targetAgentId, reason, context, status, result
- **workflows** — id, userId, name, triggerType (manual/schedule/event), steps[] (JSONB DAG)
- **tool_executions** — id, runId, toolName, input, output, status, durationMs

### Commerce Tables
- **bundles** — id, name, slug, industry, agentSlugs[], monthlyPrice, features[]
- **user_agent_access** — userId, agentSlug, source (free/bundle), bundleId
- **questionnaire_responses** — userId, industry, teamSize, budget, painPoints[], goals[], recommendedAgentSlugs[]
- **agent_recommendations** — userId, agentSlug, reason, confidence, triggerType

### Scaffold Tables (ready for expansion)
- **offers** — companyId, name, price, features[]
- **audiences** — companyId, persona, demographics, painPoints[], goals[]
- **integrations** — companyId, platform, accessToken, config

---

## THE 133 AGENTS

### Categories (25+)
Social Media (8), Content Creation (11), Sales & Business (10), Productivity & Operations (7), Creative & Design (3), Strategy & Analysis (28), Legal (6), Finance & Accounting (5), Healthcare (5), Real Estate (5), Construction (4), Restaurant & Hospitality (4), Retail (4), Music & Entertainment (5), HR & People (4), Engineering (5), Logistics (3), Insurance (2), Nonprofit (3), Public Relations (3), Cross-Industry (5)

### How Agents Work
1. User sends message → API route `/api/agents/run`
2. Rate limit check (Upstash Redis, 30/min)
3. Plan limit check (monthly runs vs plan cap)
4. Usage counter incremented
5. Agent runner builds context: system prompt + company context + memories + tool descriptions + conversation history + user input
6. Mega LLM Router selects best free model (quality-aware: fast/standard/premium)
7. LLM generates response (streaming or non-streaming)
8. Facts extracted from conversation (regex patterns → agent_memory)
9. Handoff detection (JSON blocks in output trigger agent-to-agent delegation)
10. Run record saved with metrics (tokens, duration, model used)
11. Agent stats updated (totalRuns, totalTokens)

### Agent Collaboration
- Agents declare `collaboratesWith` array (slugs of partner agents)
- During response, an agent can output `{"handoff": {"target": "agent-slug", "reason": "...", "context": "..."}}`
- System automatically executes the handoff: runs the target agent with the context
- Handoff chain tracked in agent_handoffs table
- Collaboration graph API: `/api/agents/collaboration`

### Agent Memory System
- Per-agent-per-user conversation history (JSONB in conversations table)
- Fact extraction: regex patterns detect preferences, decisions, names, dates
- Up to 5 facts stored per interaction
- Company context injection: brand voice, colors, industry auto-included
- Full context builder: `buildFullContext(agentId, userId, companyId, conversationId)`

---

## MEGA LLM ROUTER v2

### Architecture
15 providers, 50+ model slots, ~108K+ RPD (requests per day), $0/month

### Active Providers (with API keys)
1. **Gemini** — 3 models (~46.5K RPD): flash-lite (fast), flash (standard), pro (premium)
2. **Groq** — 8 models (~57.6K RPD): llama-8b, gemma-9b, mixtral, llama-70b, qwen-32b, maverick, kimi-k2, gpt-oss
3. **OpenRouter** — 15+ free models (~4K RPD): gemma-4b, llama-70b, nemotron, mistral-small, phi-4, hermes-405b, deepseek-r1, qwen-235b-thinking

### Ready Providers (just add API key)
Cerebras, SambaNova, Together.ai, Mistral, DeepSeek, HuggingFace, xAI (Grok), Novita, Chutes, GLHF, Nebius, Lepton

### Smart Features
- **Rate-limit tracking**: Exponential backoff (15s → 30s → 60s → 2m → 5m max)
- **Round-robin load balancing**: Even distribution across slots
- **Quality-aware routing**: tier → quality preference → slot selection
  - `routing` → fast/standard models
  - `standard` → standard/premium/fast models
  - `premium` → premium/reasoning/standard models
- **Auto-failover**: 429 → instantly cycles to next slot — users never see rate limit errors
- **Stats export**: `getRouterStats()` for dashboard monitoring

---

## 10 REAL MCP TOOLS (All Functional)

Every tool executes REAL logic. No placeholders. No mocks.

| Tool | What It Does | Backend |
|------|-------------|---------|
| **web_search** | Searches the web for current info | Serper → Brave → DuckDuckGo → LLM fallback |
| **email_send** | Drafts + sends professional emails | Resend API (real delivery) + LLM copywriting |
| **image_generator** | Generates AI images | Together.ai FLUX.1 + prompt engineering fallback |
| **content_calendar** | Plans content schedules | LLM-powered with dates, platforms, post types |
| **social_analytics** | Analyzes social strategy | LLM-powered with benchmarks, platform-specific |
| **competitor_scraper** | Competitive intelligence | Web search + LLM deep analysis |
| **task_manager** | Project planning | LLM-powered with priorities, dependencies, timelines |
| **keyword_research** | SEO keyword research | Web search + LLM with volume estimates |
| **data_analyzer** | Data analysis & insights | LLM-powered pattern detection + recommendations |
| **trend_analyzer** | Trend tracking | Web search + LLM trend analysis |

Tools that need external APIs (Serper, Brave, Together.ai) gracefully fall back to LLM-powered alternatives when keys aren't set. The system ALWAYS works.

---

## PAYMENT SYSTEM (Stripe)

### Plans
| Plan | Price | Agents | Runs/Month |
|------|-------|--------|-----------|
| Free | $0 | 3 | 50 |
| Starter | $29/mo | 10 | 500 |
| Professional | $79/mo | 25 | 2,000 |
| Enterprise | $199/mo | Unlimited | 10,000 |

### 10 Industry Bundles
Music ($49), Legal ($69), Restaurant ($39), Dev ($49), Real Estate ($59), Healthcare ($79), Nonprofit ($29), HR ($39), Retail ($39), PR ($39)

### API Routes
- `POST /api/stripe/checkout` — Create checkout session (plan or bundle)
- `POST /api/stripe/webhook` — Handle Stripe events (auto-upgrade, auto-downgrade, bundle access)
- `POST /api/stripe/portal` — Open Stripe billing portal

### Enforcement
- Agent runs gated by monthly limit per plan
- 403 with upgrade prompt when limit reached
- Auto-increment usage counter on every run
- Webhook auto-upgrades plan + resets usage on payment
- Webhook auto-downgrades to free on subscription cancel

---

## EMAIL SYSTEM (Resend)

### Automated Emails
1. **Welcome Email** — Sent on registration. Branded HTML with 3-step onboarding guide.
2. **Plan Upgrade Email** — Sent when Stripe webhook confirms payment. Congratulations + new features.
3. **Usage Warning Email** — Sent when user hits 80%+ of monthly runs. Progress bar + upgrade CTA.

### Agent Email Tool
Any agent with `email_send` in their mcpTools can draft + send real emails through Resend.

---

## ALL PAGES & ROUTES

### Public Pages
| Path | Purpose |
|------|---------|
| `/` | Landing page — hero, features, categories, CTAs |
| `/login` | Email/password login |
| `/register` | Sign up (triggers welcome email) |

### Protected Dashboard Pages (require auth)
| Path | Purpose |
|------|---------|
| `/dashboard` | Stats, quick actions, live activity feed |
| `/agents` | Browse & filter 133 agents by category |
| `/agents/[slug]` | Agent detail + chat interface (streaming) |
| `/build-team` | 6-step questionnaire wizard → AI team recommendations |
| `/bundles` | Industry workforce bundles |
| `/pricing` | 4-tier plan comparison |
| `/companies` | Company management (brand voice, colors, industry) |
| `/workflows` | Workflow builder + execution |
| `/analytics` | Agent performance analytics |
| `/settings` | User settings, API keys |

### API Routes (18+)
```
/api/auth/[...all]          — Better Auth (login, register, session)
/api/agents                  — List agents (paginated, filtered)
/api/agents/[id]             — Get single agent
/api/agents/run              — Execute agent (streaming + non-streaming)
/api/agents/[id]/history     — Run history
/api/agents/[id]/memory      — Agent memories
/api/agents/handoff          — Multi-agent handoff
/api/agents/collaboration    — Collaboration graph
/api/bundles                 — List industry bundles
/api/questionnaire           — Process/get questionnaire
/api/recommendations         — Get/act on recommendations
/api/pricing                 — Plan limits + usage
/api/companies               — CRUD companies
/api/companies/[id]          — Company details
/api/workflows               — CRUD workflows
/api/workflows/run           — Execute workflow
/api/analytics               — User analytics
/api/activity                — Live activity feed
/api/tools                   — List MCP tools
/api/settings/keys           — Manage API keys
/api/stripe/checkout         — Create Stripe checkout
/api/stripe/webhook          — Handle Stripe events
/api/stripe/portal           — Open billing portal
/api/email/welcome           — Send welcome email
```

---

## WORKFLOW ENGINE

DAG-based workflow execution:
1. User defines steps (each step = one agent + input template)
2. Steps declare dependencies (`dependsOn` array)
3. Runner topologically sorts steps
4. Ready steps (all deps resolved) execute in parallel
5. Variable substitution: `{{stepId.output}}` → actual output from that step
6. Results collected, workflow.lastRunAt updated

---

## RECOMMENDATION ENGINE

Located at `src/lib/recommendations/engine.ts`

1. Collects industry-core agents based on user's industry
2. Adds pain-point-specific agents
3. Adds goal-specific agents
4. Determines plan from budget
5. Caps agents to plan limits
6. Finds matching bundle
7. Returns: agents[], bundleSlug, plan, estimatedPrice

Mappings:
- 14 industries → agent slugs
- 11 pain points → agent slugs
- 8 goals → agent slugs
- 10 industries → bundle slugs
- 5 budgets → plan names

---

## SECURITY

- `.env*` and `.vercel` gitignored — secrets never in git
- All API keys in Vercel env vars (encrypted at rest)
- Auth sessions: httpOnly secure cookies (7-day TTL)
- Proxy middleware (proxy.ts) protects all dashboard routes
- Rate limiting: 30 runs/min per user (Upstash Redis)
- Plan enforcement: monthly caps with 403 + upgrade prompt
- Error messages sanitized (no SQL leaks, no stack traces)
- Input validation via Zod on API endpoints
- Parameterized queries via Drizzle ORM (SQL injection safe)

---

## KEY FILE PATHS

```
src/app/page.tsx                          — Landing page
src/app/(auth)/login/page.tsx             — Login
src/app/(auth)/register/page.tsx          — Register
src/app/(dashboard)/layout.tsx            — Dashboard layout + sidebar
src/app/(dashboard)/dashboard/page.tsx    — Dashboard
src/app/(dashboard)/agents/page.tsx       — Agent catalog
src/app/(dashboard)/agents/[slug]/page.tsx — Agent chat
src/app/(dashboard)/build-team/page.tsx   — Questionnaire wizard
src/app/(dashboard)/bundles/page.tsx      — Industry bundles
src/app/(dashboard)/pricing/page.tsx      — Pricing plans
src/app/(dashboard)/companies/page.tsx    — Companies
src/app/(dashboard)/workflows/page.tsx    — Workflows
src/app/(dashboard)/analytics/page.tsx    — Analytics
src/app/(dashboard)/settings/page.tsx     — Settings

src/lib/llm/providers.ts                  — Mega LLM Router v2
src/lib/agents/runner.ts                  — Agent execution engine
src/lib/agents/workflow-runner.ts         — Workflow DAG executor
src/lib/memory/index.ts                   — Conversation + fact memory
src/lib/collaboration/handoff.ts          — Multi-agent handoffs
src/lib/tools/registry.ts                 — 10 MCP tools (all real)
src/lib/plans/config.ts                   — Plan limits
src/lib/recommendations/engine.ts         — Recommendation engine
src/lib/stripe/index.ts                   — Stripe payments
src/lib/email/index.ts                    — Resend emails
src/lib/rate-limit.ts                     — Upstash Redis rate limiter
src/lib/auth/index.ts                     — Better Auth config
src/lib/auth/client.ts                    — Client auth hooks
src/lib/db/index.ts                       — Neon PostgreSQL + Drizzle
src/lib/db/schema.ts                      — All 20+ table schemas

src/proxy.ts                              — Auth middleware (Next.js 16)
src/components/layouts/sidebar.tsx         — Navigation sidebar
src/components/command-palette.tsx         — Cmd+K search
src/components/providers.tsx               — Theme + Toast providers

scripts/seed-agents.ts                    — Seed 133 agents from definitions
scripts/seed-bundles.ts                   — Seed 10 industry bundles
```

---

## BUSINESS MODEL (Russell Brunson Value Ladder)

```
LEVEL 5: Enterprise $199/mo + Custom Agent Dev ($2K-$10K)
LEVEL 4: Professional $79/mo (25 agents, 2K runs)
LEVEL 3: Starter $29/mo (10 agents, 500 runs) + Bundle
LEVEL 2: Free Plan (3 agents, 50 runs)
LEVEL 1: Lead Magnet → "AI Business Audit" quiz
LEVEL 0: Content → Agents in action (blog, YouTube, TikTok)
```

---

## WHAT'S COMING NEXT

### Phase 2: Visual Identity + CRM Evolution
- AI-generated agent portraits (unique per agent)
- Framer Motion animated agent cards
- Agent personality system (distinct communication styles)
- CRM capabilities: contacts, deals, pipeline stages, activity tracking
- Agent-powered CRM automations (auto-follow-up, lead scoring, nurture sequences)

### Phase 3: 3D Agent World
- Three.js + React Three Fiber agent avatars
- 3D agent viewer on detail pages (idle animations, lip sync)
- Agent HQ — virtual office with all 133 agents
- Voice interaction (Web Speech API)

### Phase 4: Growth Engine
- Affiliate program (40% recurring commissions)
- Email drip sequences (Soap Opera + Seinfeld)
- Landing page funnel redesign (Hook-Story-Offer)
- Blog/SEO content system
- Public API for developers

---

## COMPETITIVE ADVANTAGES

| vs | MGR Agents Edge |
|-----|----------------|
| **Sintra AI** (12 agents, $15-39/mo) | 133 agents, industry bundles, multi-agent handoffs, workflows, $0 LLM cost |
| **ChatGPT/Claude** (general AI) | Pre-specialized agents, persistent memory, team collaboration, business tools |
| **Zapier/Make** (automation) | AI-native reasoning, not just triggers/actions |
| **Salesforce** ($25-300/user/mo) | AI-first CRM at 1/10th the cost |
| **HubSpot** ($20-1200/mo) | 133 agents that DO the work vs dashboards to look at |

---

## ENVIRONMENT VARIABLES

```env
# Database
DATABASE_URL=postgresql://...

# Auth
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=https://mgr-agents.vercel.app
NEXT_PUBLIC_APP_URL=https://mgr-agents.vercel.app

# LLM Providers (active)
GEMINI_API_KEY=...
GROQ_API_KEY=...
OPENROUTER_API_KEY=...

# Payments
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_PROFESSIONAL=price_...
STRIPE_PRICE_ENTERPRISE=price_...

# Email
RESEND_API_KEY=...
FROM_EMAIL=MGR Agents <agents@mgreligion.com>

# Rate Limiting
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...

# Tools (optional — LLM fallbacks work without)
SERPER_API_KEY=...
BRAVE_SEARCH_API_KEY=...
TOGETHER_API_KEY=...
```

---

## RULES FOR AI ASSISTANTS

1. All code belongs to **Money Grind Religion Inc.** — remove all other attribution
2. **PRODUCTION CODE ONLY** — no placeholders, no TODO stubs, no mocks
3. **$0 COST** — use free tiers, build our own before paying
4. **Next.js 16** uses `proxy.ts` (NOT middleware.ts)
5. **Drizzle ORM** — all DB queries parameterized
6. **Better Auth** — sessions via httpOnly cookies
7. **Lazy DB init** — Neon wrapped in Proxy for build-time safety
8. **Vercel env vars** — use `printf` not `echo` to avoid trailing newlines
9. **TypeScript strict** — no `any`, no implicit types
10. **Agent definitions** at `MGR_AGENT_DEFINITIONS.md` in parent directory

---

**MGR Agents — We Don't Build Apps. We Build Empires.**
**© 2025-2026 Money Grind Religion Inc.**
