import { Box, Select } from "@hh.ru/magritte-ui";

import { scheduleTexts } from "@/modules/schedule/constants/scheduleTexts";
import {
  TRACK_FILTER_OPTIONS,
  trackFilterDataProvider,
} from "@/modules/schedule/components/scheduleTrackFilter/constants";
import type { TrackFilterValue } from "@/modules/schedule/model/types";

interface ScheduleTrackFilterProps {
  value: TrackFilterValue;
  onChange: (value: TrackFilterValue) => void;
}

export const ScheduleTrackFilter = ({ value, onChange }: ScheduleTrackFilterProps) => {
  const selectedOption = TRACK_FILTER_OPTIONS.find((option) => option.value === value);

  return (
    <Box width={{ xs: "100%", s: 175 }} shrink={0}>
      <Select
        type="radio"
        value={selectedOption}
        onChange={(option) => onChange(option.value)}
        dataProvider={trackFilterDataProvider}
        triggerProps={{
          label: scheduleTexts.trackFilter.label,
          size: "small",
          maxWidth: 175,
        }}
      />
    </Box>
  );
};
