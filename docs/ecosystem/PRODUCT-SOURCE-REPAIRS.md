# Product-source repair handoff — 2026-10-27

Read all150 TypeScript product source files in src. This is product-source reading, not a claim that every historical document, test or binary was read. Exact hashes and remaining unread files are recorded centrally in wave2/MGR-CREATE-Os-reading-ledger.json.

Fixed four deterministic defects: approved actions now reject expiry at consumption; expired work queue leases cannot commit; NaN/infinite usage cannot poison cost totals; future-dated model snapshots cannot masquerade as fresh observations.

Eleven generic content factories previously fabricated successful artifact identifiers from a digest. Their input validation is preserved as planning logic, but execute now returns BLOCKED until a real production adapter exists. ResearchFactory performs actual in-memory evidence relationship validation and makes no produced artifact claim. The separate authenticated native document.markdown service actually renders and persists bytes and remains operational. This correction deliberately invalidates two tests that asserted fabricated campaign/product output; updated tests now require the honest blocked state. Full current suite124/124 and TypeScript check pass.

Remaining product limitations: generic data stores/approval/queues are in-memory library components, not automatically durable services. HTTP research reader is not exposed by the new service and still needs DNS-aware egress enforcement and bounded body handling before arbitrary external URLs are admitted. Publish helper needs durable unknown-outcome reconciliation before use for real publishing. Validators checking PDF/ZIP signatures do not prove full format validity. Default AI decision provider is not provider-verified in this run. None of those capabilities is exposed as a working Tevin action.


## October 28 restart/producer continuation

Reproduced and repaired stale renderer success/failure overriding a newer accepted document after service restart. Persistent producer tokens now fence publication and failure settlement. TypeScript and126/126 full tests pass; both new adverse cases were red before repair. See evidence/completion-2026-10-28/RESULTS.md. All11 generic factories remain honestly blocked; broader factory/worker/provider work remains unfinished. No UI/3D/paid/production work.
