# Unified Research Wave 1 — Evidence Synthesis

Date: 2026-09-19

This is the first cross-factory synthesis. It is not a claim that research can never discover more; it establishes enough evidence and categories to begin architecture/build work without losing the research program.

## Brand Factory
Canva's current brand system treats logos, colors, fonts, imagery, guidelines, templates, controls and approvers as a governed source of truth used directly by AI generation. Adobe Firefly Design Intelligence similarly trains/captures campaign-level visual/layout rules into Style IDs.

Creation OS consequence: Brand is a versioned machine-readable context package with locked/variable fields, templates, approvers and drift detection—not a PDF style guide.

Sources:
https://www.canva.com/pro/brand-kit/
https://www.canva.com/solutions/brand-management-tools/
https://helpx.adobe.com/firefly/web/firefly-design-intelligence/firefly-design-intelligence-overview.html

## Audio Factory
Voicebox demonstrates a useful provider-neutral pattern: multiple TTS engines behind one common backend protocol, including Qwen3-TTS, Chatterbox and Kokoro families, with engine-specific voice prompt representations hidden behind the interface.

Creation OS consequence: define a Voice/TTS capability contract and route engines through adapters. Voice identity/consent, prompt caching, device selection and model lifecycle belong below the factory contract.

Source:
https://github.com/jamiepine/voicebox/blob/main/docs/content/docs/developer/tts-generation.mdx

## Document Factory
Quarto is built on Pandoc and adds project-level publishing, cross references, figures/layout, citations and multi-document outputs such as books/websites.

Creation OS consequence: keep canonical semantic content separate from output format; render multiple formats from a shared document/product graph.

Source:
https://github.com/quarto-dev/quarto-cli

## Data / Analytics Factory
PostHog + Metabase documentation reinforces separation between high-volume raw product events and durable aggregate/entity data used for BI. PostHog's product model includes events, funnels, replay, flags and experiments.

Creation OS consequence: keep raw event telemetry/event store separate from semantic metrics/aggregates; attach UCT/workflow/run identifiers so product and creation performance can be traced to exact versions.

Source:
https://www.metabase.com/integrations/posthog

## App / Tool Factory
Current open-source coding-agent research repeatedly surfaces Cline, OpenHands, Aider, Continue/OpenCode and related systems, with different strengths in governance, autonomy, context and cost.

Creation OS consequence: coding should be a routed capability, not one hard-coded agent. Repo mapping, isolated workspaces, acceptance criteria, tests, browser verification, migrations, deployment and evidence are more important than allegiance to one coding model.

Sources:
https://github.com/cline/cline
https://github.com/OpenHands/OpenHands

## Media Factory
ComfyUI's node graph/workflow model remains a strong university for composable media generation. The broader Hugging Face/Diffusers ecosystem reinforces provider/model interchange rather than one fixed generator.

Creation OS consequence: use a media graph and capability registry; persist exact model/adapter/settings/provenance; allow subgraphs, checkpoints and partial reruns.

Sources:
https://github.com/Comfy-Org/ComfyUI
https://huggingface.co/docs/diffusers/main/index

## Cross-factory conclusion
The repeated architecture pattern across strong systems is:
canonical domain model → reusable graph/workflow → provider adapters → persisted execution state → human governance → versioned artifacts → real verification → analytics/feedback.

Creation OS should make that pattern native across every Factory.
