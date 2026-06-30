import { Box, Button, Flex, Loader } from "@hh.ru/magritte-ui";
import {
  ChevronLeftOutlinedSize24,
  ChevronRightOutlinedSize24,
} from "@hh.ru/magritte-ui/icon";

import { scheduleTexts } from "@/modules/schedule/constants/scheduleTexts";
import { SchedulePeriodPicker } from "@/modules/schedule/components/schedulePeriodPicker/SchedulePeriodPicker";
import { ScheduleTrackFilter } from "@/modules/schedule/components/scheduleTrackFilter/ScheduleTrackFilter";
import {
  getNextPeriodDate,
  getPreviousPeriodDate,
  type CalendarView,
} from "@/modules/schedule/lib/calendar";
import type { TrackFilterValue } from "@/modules/schedule/model/types";

type ScheduleToolbarProps = {
  calendarDate: Date;
  view: CalendarView;
  isMobile: boolean;
  isEditable: boolean;
  isFetching: boolean;
  trackFilter: TrackFilterValue;
  onDateChange: (date: Date) => void;
  onTrackFilterChange: (value: TrackFilterValue) => void;
  onCreateLectureClick: () => void;
};

export const ScheduleToolbar = ({
  calendarDate,
  view,
  isMobile,
  isEditable,
  isFetching,
  trackFilter,
  onDateChange,
  onTrackFilterChange,
  onCreateLectureClick,
}: ScheduleToolbarProps) => {
  const handlePreviousClick = () => {
    onDateChange(getPreviousPeriodDate(calendarDate, view));
  };

  const handleNextClick = () => {
    onDateChange(getNextPeriodDate(calendarDate, view));
  };

  const handleTodayClick = () => {
    onDateChange(new Date());
  };

  return (
    <Flex
      direction={{ xs: "column", s: "row" }}
      align={{ xs: "stretch", s: "center" }}
      justify="space-between"
      gap={16}
      mb={24}
    >
      <Flex align="center" gap={12} wrap="wrap">
        <Flex align="center" gap={8}>
          <Button
            type="button"
            mode="secondary"
            style="accent"
            size="small"
            onClick={handleTodayClick}
          >
            {scheduleTexts.toolbar.today}
          </Button>

          <ChevronLeftOutlinedSize24
            initialColor="primary"
            highlightedColor="accent"
            onClick={handlePreviousClick}
          />

          <ChevronRightOutlinedSize24
            initialColor="primary"
            highlightedColor="accent"
            onClick={handleNextClick}
          />
        </Flex>

        <SchedulePeriodPicker
          value={calendarDate}
          isMobile={isMobile}
          onChange={onDateChange}
        />

        {isFetching && <Loader size={24} />}
      </Flex>

      <Flex
        direction={{ xs: "column", s: "row" }}
        align={{ xs: "stretch", s: "center" }}
        gap={20}
      >
        <ScheduleTrackFilter value={trackFilter} onChange={onTrackFilterChange} />

        {isEditable && (
          <Box>
            <Button
              type="button"
              mode="primary"
              style="accent"
              stretched
              onClick={onCreateLectureClick}
            >
              {scheduleTexts.toolbar.createLecture}
            </Button>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};
