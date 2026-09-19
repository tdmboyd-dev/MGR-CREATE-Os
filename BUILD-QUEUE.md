# MGR Creation OS — Master Build Queue

This file intentionally preserves the complete direction rather than reducing it to a short roadmap.

## Creation OS mission
Creation OS is the operating grammar that teaches the MGR ecosystem how to turn intent into a verified creation.

Core lifecycle:
TRIGGER → UCOS_READ → PLAN → BUILD → CONTINUITY_CHECK → APPROVAL → EXECUTE → VERIFY → AUDIT

TRIGGER may be a user request, order, schedule, CRM event, upload, trend, API call, agent request, performance event, or other signal.

UCOS_READ loads known world, style, character, camera, scene, simulation, content, project, training, approval, identity, brand, and continuity state before building.

PLAN decomposes intent into construction steps, dependencies, tools, models, agents, costs, approvals, verification, and rollback.

BUILD creates components through specialized models, agents, tools, and factories.

CONTINUITY_CHECK enforces face, body, voice, brand, animation, character identity, clothing, products, logos, environment, style, camera language, palette, proportion, canon, terminology, and future lock types.

APPROVAL separates creation from permission to spend, publish, sign, send, deploy, train, or perform other consequential actions.

EXECUTE performs approved generation, rendering, upload, build, export, publication, deployment, or delivery.

VERIFY inspects real outputs and uses bounded repair when concrete defects remain.

AUDIT records models, prompts, tools, assets, changes, costs, approvals, failures, repairs, outputs, and provenance.

## Existing legacy architecture to recover and verify
- Creation graph nodes and edges
- Character/world/franchise/ability/asset/scene/rule/lore/agent/project/season/episode models
- Lock state and metadata
- Continuity violations and resolution
- Crew simulation rooms
- CINEFORGE pipeline definitions and runs
- UCT / Universal Creation Token provenance
- Cost forecasting and actual cost
- Approval class, risk tier, reversibility, rollback
- Universal Approval Gateway integration
- Brand/face/voice/LoRA locks
- Smart training router integration
- Hybrid descriptor / universal grammar
- Signal/event integration if real
- Recover/reconcile the 60 sandboxes across 12 classes, 80 operators across 12 families, 24 patterns, 10 workflow shapes, and 9 edge kinds
- Verify all of the above end to end rather than assuming schema existence means working capability

## MGR Product Factory
Pipeline:
DISCOVER → VALIDATE → ARCHITECT → CREATE → DESIGN → VERIFY → PACKAGE → PRICE → MARKET → PUBLISH → MEASURE → IMPROVE

### Product intelligence
Research:
- demand
- buyer questions
- buyer pain
- audience segments
- search demand
- competing products
- marketplace saturation
- reviews and complaints
- product gaps
- pricing
- product formats
- differentiation
- seasonality
- keywords
- trends
- adjacent opportunities
- distribution channels
- evidence quality

The system should return multiple evidence-backed product opportunities before generation instead of blindly producing generic content.

### Multi-agent generation
Specialist roles should cover research, brief/architecture, writing, editing, fact checking, sourcing, design, continuity, formatting, offer creation, marketing, QA, publishing, analytics, and repair.

Use cheap/local models for repetitive low-risk work and stronger models for important reasoning, writing, architecture, and verification.

### Bounded quality loop
Generate → Judge → concrete defect list → causal repair → Judge again → fact check → design check → buyer-value check → similarity/originality check → real-output verification → final approval.

Must include convergence criteria, defect IDs, repair budgets, escalation, and stop conditions.

### Product types
eBooks, books, workbooks, planners, journals, checklists, templates, prompt packs, business kits, guides, mini-courses, full courses, training manuals, SOPs, worksheets, lead magnets, resource packs, Canva-style products, social packs, email courses, sales kits, bundles, whitepapers, reports, assessments, quizzes, answer keys, certification materials, audiobooks, proposals, customized client deliverables, document templates, interactive websites, micro-apps, AI tools, and future physical-product support.

### Automatic business assets
Main product, workbook, checklist, templates, resources, product naming, brand treatment, cover, mockups, thumbnails, descriptions, keywords, categories, pricing research, sales page, FAQ, objection handling, upsells, bundles, social posts, hooks, video scripts, email sequence, launch campaign, ad concepts, delivery package.

### Export Engine
PDF, DOCX, EPUB, Markdown, HTML, Google Docs where connected, MP3/audio chapters, structured JSON, ZIP bundles, images/mockups, and extensible future exporters.

### Post-launch intelligence
Track views, clicks, conversion, sales, refunds where applicable, traffic source, reviews, support questions, engagement, and product usage. Detect weak cover/copy/price/content, propose controlled variants, add requested worksheets/modules, create alternate formats, and preserve experiment/provenance history.

## Working workflow families to research and rebuild natively
1. Multi-Agent Book Factory — brief → writer → designer/content → cover → metadata → HTML/PDF/archive; extend with editing, fact checking, translation, EPUB/DOCX/Markdown, branding, and provenance.
2. Structured eBook Factory — topic/outline → chapters → TOC → detailed sections → formatted document → delivery.
3. PDF Production Engine — Markdown/content → professional document → PDF → archive/distribution, including local/open PDF paths.
4. Market Research Factory — intake → trends/search/competitors → sourced synthesis → professional report.
5. Deep Research Factory — research questions → multi-source research → evidence ledger → sourced report.
6. Course Factory — long content/product → lessons/micro-learning → examples → knowledge checks.
7. Assessment Factory — source material → open-ended/MCQ assessments → answer keys → grading/certification artifacts.
8. Audiobook Factory — book/document → chapter detection → chunking → TTS → organized audio chapters.
9. Template Factory — inspect templates → determine fields → dynamic population → finished artifacts.
10. Proposal/Productized-Service Factory — customer/business input → problems → strategy → ROI/business case → customized proposal.

Each outside workflow is a university, not a copy target. Research architecture, licensing, dependencies, prompts/contracts where public, costs, maintenance, failure modes, verification, and reusable lessons.

## Factory family
- Product Factory
- Media Factory
- Web Factory
- Campaign Factory
- Course Factory
- Brand Factory
- Research Factory
- Document Factory
- Audio Factory
- Automation Factory
- App/Tool Factory
- Data/Analytics Factory

Factories share Creation OS grammar, locks, approvals, provenance, verification, routing, research doctrine, and BEAST rather than becoming isolated brains.

## Zoom-way-out operating model
Request: “I want to build a business teaching people how to become tax preparers.”

Creation OS recognizes it is not one generation request.
→ Product Factory
→ Product Intelligence and Research Factory
→ market problems, competitors, demand, gaps, evidence
→ offer architecture
→ Book Factory creates guide
→ Workbook/Template Factory creates exercises/checklists/resources
→ Assessment Factory creates tests/answers
→ Course Factory creates lessons/training
→ Audio Factory creates audiobook/narration
→ Media Factory creates visuals/promotional assets
→ Create Loco provides high-quality visual/web composition through a clean integration
→ media/video systems create promotional media
→ Campaign Factory creates launch/marketing
→ Web Factory creates the sales experience
→ Automation Factory creates fulfillment/operations
→ external CRM/business systems handle customers through integrations
→ Creation OS verifies real outputs
→ Universal Approval Gateway gates consequential actions
→ after launch: MEASURE → LEARN → IMPROVE

## Standalone architecture
Creation OS must be its own product and source of truth.
MGR Agents, Create Loco, and future MGR products consume it through stable interfaces.
Research and choose the right combination of REST, SDK, events, webhooks, and MCP.
MCP is a candidate adapter/interface, not assumed to be the entire core.
Keep Creation OS domain logic independent of any single host product.
Do not delete the MGR Agents implementation until compatibility and migration are proven.

## Universal BEAST requirement
Audit our own repo end to end before guessing; research outside systems as universities; extract capability lessons instead of blindly importing; verify license/security/maintenance/cost; build stronger native contracts; deliberately break them; repair causes; verify real environments and real outputs; separate RESEARCHED from IMPLEMENTED and PASS from product-complete; use evidence, defect ledgers, convergence criteria, bounded repair loops, large end-to-end waves, locked decisions, provenance, and proof before completion claims.

## Immediate work queue
- Inventory every Creation OS-related file, schema, migration, route, service, UI, test, document, signal, approval action, training hook, brand lock, hybrid descriptor, and dependency in MGR Agents.
- Inventory Create Loco BEAST-related doctrine and recover any missing skill implementation from history/prior work if available.
- Verify what legacy Creation OS features are merely schemas/placeholders versus actual executing systems.
- Recover/reconcile UCOS/CINEFORGE/sandboxes/operators/patterns/workflow-shapes/edge architecture.
- Identify MGR Agents host coupling and extract clean domain boundaries.
- Define canonical standalone schemas.
- Define public API/SDK/event/webhook/MCP contracts.
- Build tests that prove Creation OS independently of MGR Agents.
- Add migration/adapters so MGR Agents can consume standalone Creation OS.
- Build Product Factory research registry and implementation plan.
- Research stronger working/open workflow examples for each factory.
- Maintain status: QUEUED / RESEARCHED / SPECIFIED / IMPLEMENTED / TESTED / VERIFIED.
- Maintain scorecard: before, current, evidence, blockers, next steps to 100%.
