# MGR Creation OS

MGR Creation OS is the standalone operating system for turning intent into verified creation.

It sits above models, agents, tools, workflows, media generators, builders, and automation systems. It is not a single model and it is not a thin wrapper around MGR Agents. It is the source of truth for how MGR creation work is researched, planned, built, governed, verified, audited, and improved.

## Core lifecycle

TRIGGER → UCOS_READ → PLAN → BUILD → CONTINUITY_CHECK → APPROVAL → EXECUTE → VERIFY → AUDIT

## Product direction

Creation OS is becoming its own product. MGR Agents, Create Loco, and future MGR products should consume it through stable interfaces such as SDK/API/events/webhooks/MCP where appropriate.

## Repository truth rules

- Existing MGR Agents code copied here under `legacy/` is preserved evidence, not automatically trusted production code.
- A file existing in legacy code does not mean the feature is fully implemented or verified.
- RESEARCHED != IMPLEMENTED.
- IMPLEMENTED != TESTED.
- TESTED != VERIFIED.
- LOCAL PASS != PRODUCT COMPLETE.
- We do not remove legacy behavior from MGR Agents until standalone compatibility is proven.

## Universal BEAST

This repository uses Universal BEAST as the mandatory research/build/repair methodology. See `BEAST-UNIVERSAL.md`.

## Factories

Creation OS governs specialized factories including Product, Media, Web, Campaign, Course, Brand, Research, Document, Audio, Automation, App/Tool, and Data/Analytics factories.

## Master queue

See `BUILD-QUEUE.md` for the full non-summary build queue, including MGR Product Factory, workflow research targets, interoperability, verification, and migration work.
