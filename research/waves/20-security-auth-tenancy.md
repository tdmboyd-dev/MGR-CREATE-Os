# security auth tenancy — RESEARCHED

Redesign founder/user coupling into identity + tenant/workspace + roles + capability permissions + connector scopes + approval authority. Study OAuth/OIDC, MCP auth, least privilege, workload identity, secret stores. Never embed secrets in workflows/artifacts; use secret references/short-lived credentials. Test cross-tenant access, scope escalation, token audience, revoked credentials and secret leakage.

BEAST disposition: ADAPT. Implementation remains separate from research status.
