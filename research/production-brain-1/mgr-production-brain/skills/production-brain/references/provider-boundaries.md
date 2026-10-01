# Provider boundaries

Research inspected 2026-10-01. Recheck capabilities at execution time; no model choice is a universal ranking.

| Candidate | Verified public interface | Use in this release | Unproven |
|---|---|---|---|
| Higgsfield | Official Streamable HTTP MCP endpoint https://mcp.higgsfield.ai/mcp; public skills and SDK | Optional connection; neutral handoff followed by actual tool discovery | Account access, returned schemas, credit cost, DCC workflows and rendered quality |
| YouArt | Official OAuth MCP at https://mcp.youart.ai/mcp; canvas/tutorial documentation | Optional connection; portable dependency/revision lessons | Authenticated graph round-trip, templates, actual tool compatibility and quality |
| MiniMax Design | Official desktop product description | Studied as a product; not bundled or cloned | Private desktop implementation and runtime behavior |
| MiniMax open skills | Separate official MiniMax-AI/skills repository, MIT | Selected files inspected; independently authored planner | Desktop Design source equivalence is not established |
| MiniMax H3 API | Official V2 generation and Context IR documentation | Text-only generation request drafts; documented constraints | Live endpoint execution, current account pricing and media probe |

H3 Context IR is a prompt-enhancement task, not video generation. Its implementation is described as closed source. It can be an optional provider pass after the MGR plan, with a semantic diff against locks; it must not own the canonical plan. Never send a project solely to discover what the model thinks the user meant.

The text-only compiler implements documented H3/H3-Max duration, ratio and resolution differences. First/last-frame inputs conflict with reference-media mode; concrete ratio requests in first/last-frame mode are ignored by the documented service. The engine reports this instead of claiming the requested ratio will be honored. Media requests remain blocked until type, dimensions, duration, codec, size, totals and accessible URL are independently inspected.

Inspect provider schema before mapping negative prompts, seeds, camera parameters, references or audio. Prompt advice such as short descriptions is not evidence of a universal hard token limit. Prose camera instructions remain probabilistic.

Operational follow-up: stable request identity; reconcile unknown outcomes before retrying paid POST; monotonic polling deadline; authenticated/reconciled callback status; bounded download; media hash/type checks; durable output storage; provenance; replayable trace with secrets redacted. These runtime components are not implemented here. Reading upstream tests does not mean those tests were executed.

Sources: [Higgsfield MCP](https://higgsfield.ai/mcp), [Higgsfield skills](https://github.com/higgsfield-ai/skills), [SDK](https://github.com/higgsfield-ai/higgsfield-client), [YouArt MCP](https://www.youart.ai/mcp), [YouArt workflow](https://www.youart.ai/tutorial/agent-and-workflow-guides), [MiniMax Design](https://design.minimax.io/), [MiniMax skills](https://github.com/MiniMax-AI/skills), [H3 API](https://platform.minimax.io/docs/api-reference/video-generation-v2-create), [H3 Context IR](https://platform.minimax.io/docs/api-reference/video-generation-v2-h3-context-ir).
