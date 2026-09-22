-- Creation OS production schema baseline (Postgres/Supabase-ready)
create schema if not exists creation_os;

create table if not exists creation_os.creation_runs (
 id text primary key, schema_version integer not null, tenant_id text not null, workspace_id text not null,
 pipeline_id text not null, pipeline_version text not null, status text not null, trace_id text not null,
 current_stage_id text, created_at timestamptz not null default now()
);
create table if not exists creation_os.stage_runs (
 id text primary key, creation_run_id text not null references creation_os.creation_runs(id) on delete cascade,
 stage_key text not null, attempt integer not null default 0, status text not null,
 input_refs jsonb not null default '[]', output_refs jsonb not null default '[]',
 unique(creation_run_id,stage_key,attempt)
);
create table if not exists creation_os.event_outbox (
 id text primary key, source text not null, type text not null, tenant_id text not null, workspace_id text not null,
 trace_id text not null, idempotency_key text unique, payload jsonb not null, created_at timestamptz not null default now(),
 published_at timestamptz, attempts integer not null default 0
);
create table if not exists creation_os.asset_versions (
 id text primary key, asset_id text not null, tenant_id text not null, workspace_id text not null,
 version integer not null, digest text not null, blob_ref text not null, mime text not null,
 parent_version_ids jsonb not null default '[]', created_at timestamptz not null default now(),
 unique(tenant_id,workspace_id,asset_id,version)
);
create table if not exists creation_os.uct_records (
 id text primary key, tenant_id text not null, workspace_id text not null, artifact_version_id text not null,
 artifact_digest text not null, creation_run_id text not null, stage_run_id text not null,
 record_json jsonb not null, created_at timestamptz not null default now()
);
create table if not exists creation_os.evidence_records (
 id text primary key, tenant_id text not null, workspace_id text not null, criterion text not null,
 passed boolean not null, record_json jsonb not null, created_at timestamptz not null default now()
);
create index if not exists creation_runs_scope_idx on creation_os.creation_runs(tenant_id,workspace_id);
create index if not exists stage_runs_run_idx on creation_os.stage_runs(creation_run_id);
create index if not exists assets_scope_idx on creation_os.asset_versions(tenant_id,workspace_id,asset_id);
create index if not exists uct_scope_idx on creation_os.uct_records(tenant_id,workspace_id,artifact_version_id);
create index if not exists evidence_scope_idx on creation_os.evidence_records(tenant_id,workspace_id,criterion);

-- schema is intentionally private/non-exposed; application servers/workers use direct trusted DB connections.
revoke all on schema creation_os from public;
