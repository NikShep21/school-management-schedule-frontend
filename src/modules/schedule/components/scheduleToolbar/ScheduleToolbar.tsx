import { Button, Flex } from "@hh.ru/magritte-ui";
import {
  ChevronLeftOutlinedSize24,
  ChevronRightOutlinedSize24,
} from "@hh.ru/magritte-ui/icon";

import {
  getNextPeriodDate,
  getPreviousPeriodDate,
  type CalendarView,
} from "@/modules/schedule/lib/calendar";
import { formatSchedulePeriodTitle } from "@/modules/schedule/lib/formatScheduleDate";

type ScheduleToolbarProps = {
  calendarDate: Date;
  view: CalendarView;
  onDateChange: (date: Date) => void;
};

export const ScheduleToolbar = ({
  calendarDate,
  view,
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
      <Flex align="center" gap={8}>
        <Button
          type="button"
          mode="secondary"
          style="accent"
          size="small"
          onClick={handleTodayClick}
        >
          Сегодня
        </Button>

        <ChevronLeftOutlinedSize24
          aria-label="Предыдущий период"
          initialColor="primary"
          highlightedColor="accent"
          onClick={handlePreviousClick}
        />

        <ChevronRightOutlinedSize24
          aria-label="Следующий период"
          initialColor="primary"
          highlightedColor="accent"
          onClick={handleNextClick}
        />
      </Flex>

      <div>{formatSchedulePeriodTitle(calendarDate)}</div>
    </Flex>
  );
};
