# Motion website compiler — bounded native implementation

1. Definition: compile agent-authored structured site content into a self-contained responsive HTML page with real links, disclosures and optional reveal motion.
2. Use: a natural-language request becomes content/design decisions in the host agent, then a reproducible browser artifact. This is a single-page content-site path, not arbitrary application synthesis.
3. Standards: semantic HTML headings/navigation/details, CSS responsive layout and prefers-reduced-motion; W3C interaction-animation guidance.
4. Papers: no learned model implemented. Rendering/accessibility are governed by web standards; host language interpretation is an existing platform capability.
5. Implementations: compare native HTML/CSS with a React application and animation library. Native output has no package install or external runtime dependency and remains readable without JavaScript. More complex apps should use installed Sites/build capabilities and retain these interaction requirements.
6. Models: host agent generates the validated spec, not this deterministic compiler. No assertion that templates understand a request unaided.
7. Dataset: editorial campaign, service page and hostile-content fixtures; long text, narrow width, no-script, reduced-motion and keyboard cases.
8. License: independently authored compiler/styles. User content and media retain their rights. No competitor design/code/assets copied.
9. APIs: document/querySelectorAll, matchMedia and Element.animate for brief entry animation; native anchor/details functionality. No backend/contact form is implied by a decorative control.
10. Native design: fixed safe vocabulary of sections, cards, FAQs and anchor/HTTPS/email actions; escape every content field; reject unknown action schemes. Static content stays visible if animation is unsupported.
11. Runtime: browser, zero network dependency unless user clicks an external link. Maximum 30 sections and 50 cards/section; bounded text and final artifact size.
12. Cost: no API spend or hosting implied. Browser/hosting performance must be measured for real assets and deployment.
13. Failures: unsafe URLs, injected markup, fake forms, unreachable anchors, long-word overflow, animation overriding preferences and arbitrary website claims from one supported layout family.
14. Evaluation: input rejection, escaping, links and deterministic artifact generation in local tests; actual browser keyboard/mobile/performance checks are separate and must not be claimed without execution.
15. Placement: plugin native `site-build` returns an HTML file; arbitrary application builds use a separate verified implementation workflow. Creation OS can reuse the compiler and spec.
16. Acceptance: useful real content page with working native links/disclosures and no unsupported actions; no claim of visual superiority or verified accessibility from code inspection alone.

## Contract

`{title,description,eyebrow,hero,theme:"dark"|"light",accent:"copper"|"lime"|"blue",cta:{label,href},sections:[{id,title,body,cards?:[{title,body}],faqs?:[{question,answer}]}]}`. IDs are unique ASCII identifiers. Fragment actions must resolve to a declared section. External actions allow HTTPS or a simple mailto address, with no credentials. Content fields contain plain text. Unsupported layouts/backends require a separate implementation, not silent approximation.

## Sources read 2026-10-01

- [WHATWG details element](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-details-element): native disclosure semantics and summary placement; don't misuse details as tabs/menu.
- [W3C animation from interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html): nonessential interaction motion must be disableable for this AAA criterion. This compiler's use of preferences does not constitute whole-site WCAG certification.
- [MDN reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion): platform preference detection. Native animation is optional; static content is the baseline.

Implementation depth: direct browser primitives are independently authored, not reconstructed private motionsites.ai logic. Exact motionsites.ai backend/model behavior remains unverified.
