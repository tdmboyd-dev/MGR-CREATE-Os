# Portable plan contract v1

The complete example is the syntax reference. Use JSON, UTF-8, no credentials.

| Field | Contract |
|---|---|
| schemaVersion | Exactly 1 |
| id, revision | Stable project ID; positive integer; revisions increment by one |
| rawRequest | User's request retained verbatim |
| assumptions, requirements | String arrays; requirements nonempty |
| context | Shared world, identity, palette, time, design and delivery facts |
| locks | Array of {path: JSON pointer, value: exact locked JSON value}; prior revision retains authority |
| assets | {id, type, version, provenance, rights}; type image/video/audio/model/document; metadata is declared, not independently verified |
| nodes | Unique IDs shared with assets; shot fields shown in example |
| dependsOn | IDs of existing assets/nodes; no cycles |
| references | {assetId, role}; role interpretation is provider-specific |
| requiredControls | Controls that MUST be available structurally; prose cannot satisfy these |
| beats | Ordered {from,to,action}, seconds, within shot duration |
| acceptance | Nonempty observable criteria, not adjectives alone |
| site | Optional structured website brief; goal/audience/visualDirection/mobile/performanceBudget/routes/controls/motion/assetIds/acceptance |

Neutral compiler preserves all shot intent and site requirements. MiniMax text-only compilation requires integer duration, supported ratio and resolution; only duration/ratio/resolution structural controls have a mapping. A seed, exact trajectory or negative-prompt field requested as mandatory fails rather than disappearing. Reference mode rules are checked but all media submission remains blocked pending independent inspection.

Revisions: copy the plan to a new filename, increment revision and apply the requested changes. Run validation with both files. `impact` propagates asset and shot changes through references and dependencies. Context, requirements, assumptions or lock changes invalidate every shot. Changes to site assets invalidate the site. Do not regenerate unaffected work automatically.

Budget quote shape: `{quoteId,source,handoffDigest,currency,amountMinor,expiresAt}`. Budget shape: `{currency,limitMinor}`. Both amounts are safe nonnegative integers in the currency's minor units. The checker validates arithmetic and the quote's binding to the exact handoff, not who issued it. Do not supply a made-up quote as authorization.

Digest is SHA-256 over recursively key-sorted JSON, specific to this package; it is not a signature or RFC 8785 interoperability claim. The compiler does not maintain trusted storage, perform authentication, probe media or attest to rights. Integrate those capabilities through Creation OS before unattended execution.
