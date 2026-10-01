# Editorial assembly — researched implementation decision

1. Definition: assemble ordered cuts and gaps on an integer frame grid with an explicit rational frame rate; export a portable OTIO draft.
2. Use: convert selected takes and trims into an editable sequence without accumulating decimal-second rounding errors.
3. Standards: OTIO Timeline/Stack/Track/Clip/Gap and RationalTime/TimeRange. Intervals are start-inclusive, end-exclusive. Source position is distinct from record position.
4. Papers: no learned method needed. Integer arithmetic and interchange schema are the governing methods.
5. Implementations: read ASWF time-ranges documentation, generated schema field list, clip_example.otio fixture and Clip C++ serialization. The old fixture is Clip.1 while current serialization is Clip.2 with keyed media references. Export Clip.2 explicitly. This is independent code, not a fork of OTIO.
6. Models: none. This does not generate or interpret video.
7. Dataset: analytic 24 fps and 30000/1001 sequences; trims at exact available endpoints; missing media; one-frame gaps; invalid ranges and unsupported retimes.
8. License: repository LICENSE.txt inspected (Apache-2.0); no source or fixture copied into package. NLE plugins have separate runtime/format support.
9. APIs: JSON OTIO draft; no NLE or OTIO runtime available here. Round-trip import in an actual OTIO runtime remains an external integration acceptance gate.
10. Native choice: integer frames with rational rate metadata. Support cuts and gaps only; reject transitions and retimes rather than flattening their meaning silently. Use MissingReference when no media URL is supplied.
11. Runtime: Node CPU, bounded 10,000 items; safe integer cumulative frames. Rational rate numerator/denominator are positive integers bounded to 1,000,000.
12. Cost: linear compilation; no paid service.
13. Failure modes: confusion between source/record coordinates, fractional rounding, out-of-range trims, unknown media, unsupported transition handles and NLE-specific import behavior.
14. Evaluation: assert total duration and every boundary, preserve missing media, verify schema keys against inspected source. Do not report internal JSON checks as an NLE round trip.
15. Placement: plugin executable editorial module and CLI; Creation OS may consume the same source through an explicit project handoff.
16. Acceptance: deterministic sequence manifest and OTIO draft; invalid timing fails before output; unresolved media is visible. Render/export quality is not certified.

## Contract

Input `{id, rate:{numerator,denominator}, items:[{id,kind:"clip"|"gap",durationFrames,...}]}`. Clips require `sourceStartFrame`, `availableStartFrame`, `availableDurationFrames`; optional `mediaUrl` and `assetDigest`. Media ranges are declared input, not measured facts. Source and sequence share the declared frame rate. Reject mixed-rate input, retime or transition fields. No implicit frame-rate conversion. Output provides record start/end frames, total frames, exact duration numerator/denominator, dependency asset digests and a separate OTIO draft.

## Inspected primary sources (2026-10-01)

- [Time ranges](https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/main/docs/tutorials/time-ranges.md), blob `74bc63c753548fea06fcf9d419461495002d6652`.
- [Serialized fields](https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/main/docs/tutorials/otio-serialized-schema-only-fields.md), blob `8f07d4a1a71e06c08ca84934f865bcb36b0ae42d`.
- [Clip implementation](https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/dc8366533acd6730228a9802b7cc7a8b6439d2ef/src/opentimelineio/clip.cpp), lines 1–170, blob `a2e8acced4b0c2b20851018e8ca7a6ed338737bc`.
- [Interchange fixture](https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/dc8366533acd6730228a9802b7cc7a8b6439d2ef/tests/sample_data/clip_example.otio), blob `ca9589bf33bf3ee67b5a1268f5b7ec30f0bf8c91`.
- [Repository license](https://github.com/AcademySoftwareFoundation/OpenTimelineIO/blob/dc8366533acd6730228a9802b7cc7a8b6439d2ef/LICENSE.txt), blob `261eeb9e9f8b2b4b0d119366dda99c6fd7d35c64`.
