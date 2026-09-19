# multitenancy workspaces — RESEARCHED

Standalone product must serve MGR Agents and others safely. Study SaaS tenant isolation, PostgreSQL RLS patterns, workspace/org/project hierarchy. Native Tenant→Workspace→Project scopes; resource ownership, roles, service identities, quotas, encryption/secret boundaries. Verify cross-tenant ID guessing, search leakage, cache leakage, background-job tenant context.

BEAST disposition: ADAPT. This dossier defines architecture lessons and verification; it does not mark implementation complete.
