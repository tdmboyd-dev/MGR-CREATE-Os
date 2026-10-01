# Executable native tools

Run from a host with Node 24.21+ and filesystem access. These are packaged modules and CLI commands, not newly connected remote MCP tools. All commands return JSON, failures exit nonzero. Existing files are not overwritten by exports/site builds. JSON is UTF-8; examples are fictional and must be replaced with user content.

Use `node <skill-root>/scripts/production.mjs` followed by:

| Command | Inputs | Actual result |
|---|---|---|
| `save-plan` | DB, PLAN.json, EXPECTED_REVISION | Atomic immutable revision, validated against stored history; 0 for first save |
| `get-plan` | DB, PROJECT | Latest stored plan |
| `admit-asset` | DB, PROJECT, METADATA.json, FILE | Exact bytes stored, SHA-256 receipt, scoped inspection |
| `get-asset` | DB, PROJECT, ASSET, VERSION | Detached receipt and lineage |
| `export-asset` | DB, PROJECT, ASSET, VERSION, NEW_FILE | Rehashed original bytes, exclusive new file |
| `inspect-media` | FILE | Supported PNG/WAVE structure or explicit unsupported/uninspected status |
| `camera-check` | SCENE.json | Digest-bound linear-path collision and sampled-framing report |
| `timeline` | EDIT.json | Exact frame boundaries and a separate `otio` draft object |
| `site-build` | SITE.json, NEW.html | Working single-page HTML content site |

Asset metadata requires `id`, consecutive positive integer `version`, `provenance`, `rights`; optional `parents:[{id,version}]` must already exist in that project. Declared rights are not verified rights. 32 MiB per asset maximum; unknown formats remain uninspected. DB files are local project state, not shared cloud permission systems. Export database files only after closing the store.

Camera input example: [example-camera.json](../assets/example-camera.json). It intentionally intersects a wall so preflight can expose the problem. `CLEAR_DECLARED_PROXIES` only covers the declared static AABBs and linear camera path. No mesh visibility, animation, occlusion or generated-video proof is implied. Maximum 100,000 sample/box pairs.

Editorial example: [example-timeline.json](../assets/example-timeline.json). Missing media stays missing. Save `result.otio`, not the entire wrapper, into an `.otio` file. The wrapper retains exact rational duration and limitations. No actual OTIO/NLE round trip has been performed in this environment.

Website example: [example-site.json](../assets/example-site.json). It supports content sections, cards, FAQs and real links. It contains no imaginary checkout, form submission, authentication or hosted backend. Page code remains readable with JavaScript disabled; reveal motion honors reduced-motion preferences. Browser verification is a separate step.

Read [native-foundations.md](native-foundations.md), [editorial-native.md](editorial-native.md) and [motion-site-native.md](motion-site-native.md) for research, alternatives, failure modes and acceptance contracts. The broader research catalog does not become complete when one bounded native function passes its tests.
