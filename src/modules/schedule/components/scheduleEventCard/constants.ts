import type { LectureTrack } from "@/entities/lecture";
import { scheduleTexts } from "@/modules/schedule/constants/scheduleTexts";

type LectureTrackView = LectureTrack | "COMMON";

export const TRACK_CONFIG = {
  FRONTEND: {
    label: scheduleTexts.tracks.frontend,
    cardStyle: "accent-secondary",
    textStyle: "accent",
  },
  BACKEND: {
    label: scheduleTexts.tracks.backend,
    cardStyle: "positive-secondary",
    textStyle: "positive",
  },
  ANALYTICS: {
    label: scheduleTexts.tracks.analytics,
    cardStyle: "special-secondary",
    textStyle: "special",
  },
  COMMON: {
    label: scheduleTexts.tracks.common,
    cardStyle: "vivid-secondary",
    textStyle: "warning",
  },
} as const;

export const getTrackView = (tracks: LectureTrack[]): LectureTrackView => {
  const hasFrontend = tracks.includes("FRONTEND");
  const hasBackend = tracks.includes("BACKEND");

  if (hasFrontend && hasBackend) return "COMMON";
  if (hasFrontend) return "FRONTEND";
  if (hasBackend) return "BACKEND";

  return "ANALYTICS";
};
