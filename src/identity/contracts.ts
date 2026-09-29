export interface IdentityLock {
  id: string;
  subjectId: string;
  modality: "FACE" | "BODY" | "WARDROBE" | "VOICE" | "MOVEMENT" | "BRAND" | "CANON";
  referenceRefs: string[];
  allowedVariation: Record<string, unknown>;
  rightsRefs: string[];
  consentRefs?: string[];
  verificationThreshold?: number;
}

export interface VoiceIdentity {
  id: string;
  subjectId: string;
  referenceAudioRefs: string[];
  language?: string;
  consentRefs: string[];
  rightsRefs: string[];
  allowedPurposes: string[];
  revokedAt?: string;
}

export function validateIdentityLock(lock: IdentityLock): string[] {
  const blockers: string[] = [];
  if (!lock.referenceRefs.length) blockers.push("identity lock requires references");
  if (!lock.rightsRefs.length) blockers.push("identity lock requires rights evidence");
  if (lock.verificationThreshold !== undefined && (lock.verificationThreshold < 0 || lock.verificationThreshold > 1)) {
    blockers.push("identity verification threshold must be 0..1");
  }
  return blockers;
}

export function canUseVoiceIdentity(voice: VoiceIdentity, purpose: string): boolean {
  return (
    !voice.revokedAt &&
    voice.referenceAudioRefs.length > 0 &&
    voice.consentRefs.length > 0 &&
    voice.rightsRefs.length > 0 &&
    voice.allowedPurposes.includes(purpose)
  );
}
