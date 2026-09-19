# Product Acceptance Test Catalog

AT-001 clean install/build.
AT-002 migrations from zero and repeat-safe migration check.
AT-003 CINEFORGE happy path.
AT-004 crash worker after side effect; resume no duplicate.
AT-005 approval pauses; payload mutation invalidates approval; exact digest resumes once.
AT-006 UCOS hard-lock conflict blocks build and reports sources.
AT-007 continuity seeded identity/brand/canon violations detected with evidence.
AT-008 repair loop fixes targeted defect and terminates; no-progress loop escalates.
AT-009 UCT digest validates; mutation fails; lineage reconstructs.
AT-010 model router respects capability/license/privacy/budget and failover.
AT-011 connector expired/revoked credential fails safely and reconciles partial result.
AT-012 budget threshold warns/approval/denies as configured.
AT-013 compensation executes once; failed compensation surfaces.
AT-014 duplicate/out-of-order events do not duplicate side effects.
AT-015 lease expiry/fencing prevents two workers committing same work.
AT-016 checkpoint replay does not repeat external side effects; branch creates new lineage.
AT-017 agent delegation cycle/max-depth blocked.
AT-018 trace reconstructs objective→artifact→verification.
AT-019 cross-tenant DB/search/cache/storage/job access denied.
AT-020 rights/consent expiry blocks restricted publication.
AT-021 research citation mismatch/stale source/contradiction surfaced.
AT-022 template malicious permission/dependency blocked; upgrade/migration tested.
AT-023 review approval remains bound to exact artifact version.
AT-024 training candidate cannot promote without eval/policy; rollback preserves history.
AT-025 real image/video/audio/document/web artifact inspected by appropriate validators.
AT-026 factory contract integration: Research→Document→Product.
AT-027 external MGR Agents adapter calls standalone Creation OS.
AT-028 Create Loco capability adapter participates in CreationRun.
AT-029 cross-factory objective produces all declared outcomes or reports unresolved blockers.
AT-030 cost ledger reconciles sampled provider usage.

Every test produces EvidenceRecord and is referenced before VERIFIED status.
