# RiVAL REAPER — Rival Day III team draw prototype

Status: IMPLEMENTED local vertical slice. Tests are authored; runtime/typecheck execution is still required before TESTED/VERIFIED.

## What exists

- `src/rival-reaper/engine.ts`: constraint-first draw engine with random tie-breaking.
- `src/rival-reaper/session.ts`: CSPRNG-backed draw session and snapshot/restore.
- `src/rival-reaper/receipts.ts`: tamper-evident chained draw receipts.
- `src/rival-reaper/persistence.ts`: AES-256-GCM encrypted local snapshot store with atomic replacement.
- `src/rival-reaper/roster.ts`: private roster validation, Blackout exclusion and five-team capacity calculation.
- `src/rival-reaper/server.ts`: local HTTP API + Server-Sent Events for host/projector synchronization.
- `src/rival-reaper/cli.ts`: local launcher.
- `examples/rival-reaper/host.html`: authenticated phone/tablet host screen.
- `examples/rival-reaper/arena.html`: read-only projector/TV screen.
- `examples/rival-reaper/index.html`: standalone fake-name interaction prototype.
- tests covering balance, exclusion, receipts, encryption and restore.
- MotionSites and 21st.dev/Codex research dossiers.

## Privacy boundary

Do **not** commit the real family roster. Production roster data is loaded from a private local JSON file supplied through `RIVAL_REAPER_ROSTER`. Blackout entries are returned separately and never enter the five-team engine.

## Local run

Create a private roster file outside the repository using `roster.sample.json` as the schema.

Set:
- `RIVAL_REAPER_ROSTER=/absolute/path/to/private-roster.json`
- `RIVAL_REAPER_HOST_TOKEN=<private host token>`
- `RIVAL_REAPER_SECRET=<long encryption secret, 16+ chars>`
- optional `RIVAL_REAPER_DATA=/private/path/session.enc.json`
- optional `PORT=8787`

Then run:
`npm run rival-reaper`

Open:
- `/host` on the host phone/tablet.
- `/arena` on the projector/TV.
- `/` for the earlier self-contained fake-name ticket prototype.

Devices on the same LAN can use the computer's LAN address once the server is bound/exposed appropriately. Do not expose the host endpoint publicly without TLS, stronger auth and deployment hardening.

## Draw truth

The production session locks the assignment when the authenticated host draw endpoint succeeds. The later ticket-yank/name-reveal animation is presentation only; it cannot reroll the already-locked fate.

Each locked draw records the eligible teams, excluded teams/reasons, random unit, previous receipt hash, timestamp, nonce and receipt hash. The chain detects later mutation.

## Current gates

Implemented:
- five-team balancing and household separation preference
- CSPRNG source
- chained receipt hashes
- encrypted local persistence
- snapshot/restore contract
- private roster import/validation
- authenticated host API
- read-only public state/API
- realtime host/projector updates via SSE
- separate host and arena screens

Still open:
- execute typecheck/tests and fix any runtime defects found
- browser-level crash/reload rehearsal with fake 45-player roster
- bind server for safe LAN use and document firewall/TLS options
- stronger host session/auth if deployed beyond trusted LAN
- authoritative staged reveal protocol (team badge -> yanks -> name) synchronized across screens
- approved team badge/media assets and 21st.dev/MotionSites visual skin
- audio/haptics and reduced-motion mode
- projector/mobile visual verification
- final private-roster rehearsal and audit export
