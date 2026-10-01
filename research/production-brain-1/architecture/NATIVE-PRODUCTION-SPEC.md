# Native production contract — MGR Production Brain 1

Status: implementation specification, not a claim of completed studio production.

The plugin uses Node 24's built-in SQLite, crypto and filesystem APIs. Standalone projects live in a user-selected SQLite file. CLI commands accept explicit JSON/file paths and return JSON receipts. They never upload files, spend money, or follow URLs implicitly.

## Project storage

`savePlan(plan, expectedRevision)` validates against the actual stored predecessor inside an immediate transaction. A new project requires expectedRevision 0 and revision 1. Each revision is immutable; stale writers fail. Asset admission requires an existing project, nonempty IDs, positive consecutive version, provenance and rights declarations, and known parent versions in that project. Store exact bytes and SHA-256 together in one transaction. Default maximum asset size is 32 MiB. Byte storage deduplicates globally; ownership/lineage remain project-scoped. Reads are detached values, exports rehash bytes before returning them. No claim of identity, rights verification or visual quality follows from a digest.

## Camera preflight

Scene schema: `units: "metres"`, `duration`, `coverage: "complete-static-proxies" | "partial"`, `camera: {focalLengthMm, sensorWidthMm, sensorHeightMm, near, far, clearance}`, `samples: [{time, position:[x,y,z], target:[x,y,z], up:[x,y,z]}]`, `colliders: [{id,min:[x,y,z],max:[x,y,z]}]`, `subjects` with the same bounds. Times strictly increase from zero through duration. At least two samples; maximum 1000 samples and 1000 total boxes. Finite coordinates within +/-1e6 metres. Projection uses a look-at basis and physical pinhole sensor dimensions. Collider intersection checks every finite linear segment against every expanded static box. Tangency is collision. Clearance expands all axes conservatively. Framing projects eight corners only at supplied sample times. A corner behind near or beyond far makes that sample unavailable. Reports always state the scope; partial geometry cannot yield a verified clear path. Reports bind to the whole input digest. No inferred mesh, occlusion, moving-object or continuous framing coverage.

## Evidence

Tests must cover restart, stale competing writers, stored locks, cross-project/missing lineage, version conflicts and recovery bytes; camera tests cover collisions between keyframes, parallel/tangent/inside cases, invalid physical values and near-plane uncertainty. External renderer/provider/DCC acceptance remains separate.
