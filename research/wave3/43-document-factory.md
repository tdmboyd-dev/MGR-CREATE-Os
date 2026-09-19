# 43 Document Factory — BEAST RESEARCH WAVE 3
Universities: Pandoc universal document conversion; Quarto books/publishing/reference DOCX; document AST/template systems; professional PDF workflows.
Architecture: SemanticDocument AST→Template/Theme→Renderer adapters→PDF/DOCX/EPUB/HTML/Markdown→validator→package/version.
Required: semantic roles, citations, figures/tables, crossrefs, TOC, metadata, accessibility, localization, reusable blocks, page rules, reference templates.
Failure: overflow, broken fonts/images/links, malformed EPUB, style drift, inaccessible structure, citations detached from claims.
Verification: parse/open/render every target format; link/citation/TOC/style/package validators.
