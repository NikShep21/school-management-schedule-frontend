import { createStaticDataProvider } from "@hh.ru/magritte-common-data-provider";

import { scheduleTexts } from "@/modules/schedule/constants/scheduleTexts";
import type { TrackFilterValue } from "@/modules/schedule/model/types";

interface TrackFilterOption {
  text: string;
  value: TrackFilterValue;
}

export const TRACK_FILTER_OPTIONS: TrackFilterOption[] = [
  {
    text: scheduleTexts.trackFilter.all,
    value: "ALL",
  },
  {
    text: scheduleTexts.tracks.frontend,
    value: "FRONTEND",
  },
  {
    text: scheduleTexts.tracks.backend,
    value: "BACKEND",
  },
  {
    text: scheduleTexts.tracks.analytics,
    value: "ANALYTICS",
  },
];

export const trackFilterDataProvider = createStaticDataProvider(TRACK_FILTER_OPTIONS);
