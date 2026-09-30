# RiVAL REAPER — Rival Day III team draw prototype

Status: IMPLEMENTED prototype. Not yet TESTED/VERIFIED in repository CI.

## What exists

- `src/rival-reaper/engine.ts`: deterministic constraints + random tie-break draw engine.
- `test/rival-reaper.test.ts`: balance, uniqueness and support-exclusion tests.
- `examples/rival-reaper/index.html`: zero-build interactive demo with fake names.
- `research/RIVAL-REAPER-MOTIONSITES-2026-09-29.md`: MotionSites implementation notes.

## Locked event rules represented

- Five competing teams: Blood Bloom, Pressure Gang, High Society, Heat Mob, Pink Venom.
- Blackout Krew/support crew is outside the draw entirely.
- Team capacity must equal competitor count.
- Household separation is preferred and relaxes only when unavoidable.
- Gender count and team size are balancing constraints before random tie-breaking.
- Every draw produces an auditable record of eligible/excluded teams and the random unit used.

Do not put the real family roster in this public repository. Production roster data belongs in a private/local data source.

## Demo

Open `examples/rival-reaper/index.html` in a browser. The demo intentionally uses fake names.

Flow:
1. YANK THAT SHIT — selects a fake player and an eligible team.
2. YANK TICKET — three-stage hidden-ink reveal.
3. LOCK FATE — commits the assignment and updates the board.
4. Repeat until the five 9-person demo teams are full.

## Production architecture

Recommended split:
- Core: `engine.ts` or server equivalent, seeded CSPRNG, append-only audit receipts.
- Host Control Room: private authenticated phone/tablet UI.
- Arena Screen: read-only projector/TV display.
- Transport: local LAN/WebSocket or hosted realtime channel.
- Persistence: private database/local encrypted event store.
- Visual shell: CSS/WebGL/Three.js; optional MotionSites-derived interaction references.
- Audio/haptics: browser-triggered effects after host interaction.
- Recovery: reload from locked receipts; never reroll silently.

## Next gates

- Execute typecheck + unit tests.
- Add seeded/verifiable randomness and cryptographic receipt hashes.
- Add persistence and crash/reload recovery.
- Add private roster import and validation.
- Add host/public two-screen synchronization.
- Replace demo typography/art with approved Rival Day assets.
- Run fake-roster rehearsal, inspect actual rendered output, then production rehearsal.
