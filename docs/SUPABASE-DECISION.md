# Supabase / Postgres Decision

No existing connected Supabase project is named for Creation OS. Existing projects are unrelated products, so this wave did not deploy Creation OS tables into iKickItz, MGR Elite Hub, Compliance Buddy or Gloom Archivist.

Creation OS now carries a private-schema Postgres/Supabase-ready migration at supabase/migrations/0001_creation_os_core.sql.

Security posture:
- creation_os schema is not public/Data-API exposed.
- trusted Creation OS servers/workers should use direct database connections.
- no service-role/secret key is exposed to browser code.
- if future tables are exposed through Data API, grants + RLS + allow/deny database tests become mandatory.
- Storage object mutations must go through Storage/S3 API, never by editing storage schema rows.

Current Supabase 2026 notes considered:
- new projects may not auto-expose tables to Data API.
- grants and RLS are separate controls.
- Supabase Storage is S3-compatible but does not support S3 bucket versioning; Creation OS therefore keeps its own immutable AssetVersion/UCT model.
- S3 access keys bypass RLS and are server-only; user session-token S3 access can enforce RLS.
