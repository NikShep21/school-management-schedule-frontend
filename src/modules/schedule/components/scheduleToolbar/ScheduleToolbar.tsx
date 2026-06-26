import { Button, Flex, Loader, Text } from "@hh.ru/magritte-ui";
import {
  ChevronLeftOutlinedSize24,
  ChevronRightOutlinedSize24,
} from "@hh.ru/magritte-ui/icon";

import { scheduleTexts } from "@/modules/schedule/constants/scheduleTexts";

import {
  getNextPeriodDate,
  getPreviousPeriodDate,
  type CalendarView,
} from "@/modules/schedule/lib/calendar";
import { formatSchedulePeriodTitle } from "@/modules/schedule/lib/formatScheduleDate";

type ScheduleToolbarProps = {
  calendarDate: Date;
  view: CalendarView;
  isFetching: boolean;
  onDateChange: (date: Date) => void;
};

export const ScheduleToolbar = ({
  calendarDate,
  view,
  isFetching,
  onDateChange,
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
    <Flex align="center" justify="space-between" gap={16} mb={24}>
      <Flex align="center" gap={12}>
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
          aria-label={scheduleTexts.toolbar.previousPeriod}
          initialColor="primary"
          highlightedColor="accent"
          onClick={handlePreviousClick}
        />

        <ChevronRightOutlinedSize24
          aria-label={scheduleTexts.toolbar.nextPeriod}
          initialColor="primary"
          highlightedColor="accent"
          onClick={handleNextClick}
        />
        <Text>{formatSchedulePeriodTitle(calendarDate)}</Text>
        {isFetching && <Loader size={24} />}
      </Flex>
    </Flex>
  );
};
