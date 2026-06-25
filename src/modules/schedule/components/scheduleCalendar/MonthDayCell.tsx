import { Box, Text } from "@hh.ru/magritte-ui";
import classNames from "classnames";

import { isSameMonth, isToday } from "@/modules/schedule/lib/calendar";

import styles from "./ScheduleCalendar.module.less";

type MonthDayCellProps = {
  day: Date;
  calendarDate: Date;
};

export const MonthDayCell = ({ day, calendarDate }: MonthDayCellProps) => {
  const isOutsideMonth = !isSameMonth(day, calendarDate);
  const isCurrentDay = isToday(day);

  return (
    <Box
      minHeight={120}
      px={12}
      py={10}
      className={classNames(styles.dayCell, isCurrentDay && styles.dayCellToday)}
    >
      <Text
        typography="label-2-regular"
        style={isCurrentDay ? "accent" : isOutsideMonth ? "tertiary" : "primary"}
      >
        {day.getDate()}
      </Text>
    </Box>
  );
};
