export interface EditorialClip {
  id: string;
  sourceRef: string;
  sourceInMs: number;
  durationMs: number;
  timelineStartMs: number;
  track: number;
  metadata?: Record<string, unknown>;
}

export interface EditorialTimeline {
  id: string;
  frameRate: number;
  clips: EditorialClip[];
  markers: Array<{ atMs: number; label: string; metadata?: Record<string, unknown> }>;
}

export interface OtioLikeTimeline {
  OTIO_SCHEMA: "Timeline.1";
  name: string;
  metadata: Record<string, unknown>;
  tracks: {
    OTIO_SCHEMA: "Stack.1";
    children: Array<{
      OTIO_SCHEMA: "Track.1";
      name: string;
      kind: "Video";
      children: Array<Record<string, unknown>>;
    }>;
  };
}

export function toOtioLike(timeline: EditorialTimeline): OtioLikeTimeline {
  if (timeline.frameRate <= 0) throw new Error("frameRate must be positive");
  const tracks = new Map<number, EditorialClip[]>();
  for (const clip of timeline.clips) {
    const bucket = tracks.get(clip.track) ?? [];
    bucket.push(clip);
    tracks.set(clip.track, bucket);
  }

  return {
    OTIO_SCHEMA: "Timeline.1",
    name: timeline.id,
    metadata: {
      mgrTimelineId: timeline.id,
      frameRate: timeline.frameRate,
      markers: timeline.markers,
    },
    tracks: {
      OTIO_SCHEMA: "Stack.1",
      children: [...tracks.entries()]
        .sort(([a], [b]) => a - b)
        .map(([track, clips]) => ({
          OTIO_SCHEMA: "Track.1" as const,
          name: `Video ${track}`,
          kind: "Video" as const,
          children: [...clips]
            .sort((a, b) => a.timelineStartMs - b.timelineStartMs)
            .map((clip) => ({
              OTIO_SCHEMA: "Clip.2",
              name: clip.id,
              metadata: {
                mgrSourceRef: clip.sourceRef,
                timelineStartMs: clip.timelineStartMs,
                ...(clip.metadata ?? {}),
              },
              source_range: {
                OTIO_SCHEMA: "TimeRange.1",
                start_time: { OTIO_SCHEMA: "RationalTime.1", value: msToFrames(clip.sourceInMs, timeline.frameRate), rate: timeline.frameRate },
                duration: { OTIO_SCHEMA: "RationalTime.1", value: msToFrames(clip.durationMs, timeline.frameRate), rate: timeline.frameRate },
              },
            })),
        })),
    },
  };
}

function msToFrames(ms: number, frameRate: number): number {
  return Math.round((ms / 1000) * frameRate);
}
