import { Flex, Text } from "@hh.ru/magritte-ui";

import { MonthDayCell } from "@/modules/schedule/components/scheduleCalendar/MonthDayCell";
import type { ScheduleCalendarProps } from "@/modules/schedule/components/scheduleCalendar/ScheduleCalendar";
import { getDateKey } from "@/modules/schedule/lib/calendar";

import styles from "./ScheduleCalendar.module.less";

const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"] as const;

export const MonthCalendar = ({ days, calendarDate }: ScheduleCalendarProps) => {
  return (
    <div className={styles.calendar}>
      {WEEKDAYS.map((weekday) => (
        <Flex
          key={weekday}
          p={7}
          align="center"
          justify="center"
          className={styles.weekday}
        >
          <Text typography="label-2-regular" style="secondary">
            {weekday}
          </Text>
        </Flex>
      ))}

      {days.map((day) => {
        const dateKey = getDateKey(day);

        return <MonthDayCell key={dateKey} day={day} calendarDate={calendarDate} />;
      })}
    </div>
  );
};
