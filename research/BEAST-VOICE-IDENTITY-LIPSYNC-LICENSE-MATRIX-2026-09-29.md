# BEAST Voice / Identity / Lip-Sync License Matrix — 2026-09-29

License status must be tracked at code, model-weight, dataset, dependency and provider-service levels separately.

## Current findings
| Candidate | Code | Weights / dependency reality | MGR disposition |
|---|---|---|---|
| MuseTalk | MIT | Project says its trained model may be used commercially; bundled/related open models keep their own licenses; test data is research-only | ADAPT / commercial candidate after dependency lockfile review |
| LatentSync | Apache-2.0 source | Exact checkpoint/dependency chain still needs version-pinned audit | ADAPT / candidate, not automatically cleared |
| F5-TTS | MIT source | Official pretrained weights are CC-BY-NC because of Emilia training data | RESEARCH only for published upstream weights; do not route commercial output through those weights |
| InstantID | Apache-2.0 source | Official released checkpoints are research-only and InsightFace face models are non-commercial unless separately licensed | RESEARCH only unless commercially licensed replacement dependencies/checkpoints are supplied |
| PhotoMaker | Apache-2.0 source | V2 uses InsightFace; commercial deployment therefore requires dependency/model clearance | RESEARCH / separate-license path |
| IP-Adapter | Apache-2.0 source | Base adapter can differ from FaceID variants; exact checkpoint/encoder/dependency licenses must be pinned | REVIEW per exact artifact; do not treat the family name as one license |
| InsightFace | MIT code | Public pretrained models are non-commercial research; commercial model licensing is separate | Never use public weights as “free commercial face lock” |
| Real-ESRGAN | BSD-3-Clause project license | Verify exact model files/dependencies used in deployment | ADAPT after artifact-level manifest |
| GFPGAN | Apache-2.0 project license except listed third-party components | Verify model/dependency manifest | ADAPT after artifact-level manifest |
| MeloTTS | MIT library; project states commercial/non-commercial allowed | Exact packaged checkpoints/dependencies still need manifest | promising cost-efficient TTS candidate |
| Chatterbox | MIT project/model family publicly positioned for production | Pin exact Resemble AI release, weights and dependency terms before deployment | promising TTS/voice candidate |
| Edge TTS wrappers | wrapper code varies | Calls Microsoft Edge's online speech service; not an offline model and not an MGR-owned service entitlement | STUDY/FALLBACK only until service/terms/privacy are explicitly cleared |

## Canonical rule
A router receives an exact artifact identity, never only a family label like "IP-Adapter" or "F5-TTS". Required fields include source/revision, code license, weights license, dataset restrictions, dependency licenses, commercialUse, biometric/voice consent requirements, provider terms, privacy and evidence date.

## Identity/voice rights
Technical model licensing is separate from a person's rights. Voice clone/face/body generation also requires MGR ConsentRecord with purpose, tenant, allowed channels, expiry/revocation and source evidence.

## Production gate
Commercial routes fail closed unless commercial use is explicitly ALLOWED. UNKNOWN and SEPARATE_LICENSE_REQUIRED are not silently treated as allowed.
