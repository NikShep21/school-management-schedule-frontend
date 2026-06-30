import { Flex, Text } from "@hh.ru/magritte-ui";

import { MonthDayCell } from "@/modules/schedule/components/scheduleCalendar/MonthDayCell";
import type { ScheduleCalendarProps } from "@/modules/schedule/components/scheduleCalendar/ScheduleCalendar";

import styles from "./ScheduleCalendar.module.less";
import { getScheduleDateKey } from "@/modules/schedule/lib/formatScheduleDate";
import { WEEKDAYS } from "@/modules/schedule/constants/scheduleCalendar";

type MonthCalendarProps = Omit<ScheduleCalendarProps, "view">;

export const MonthCalendar = ({
  days,
  calendarDate,
  isEditable,
  eventsByDate,
  onEventClick,
  onCreateEventClick,
  onMoreEventsClick,
}: MonthCalendarProps) => {
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
        const dateKey = getScheduleDateKey(day);

        return (
          <MonthDayCell
            key={dateKey}
            day={day}
            calendarDate={calendarDate}
            isEditable={isEditable}
            events={eventsByDate[dateKey] ?? []}
            onEventClick={onEventClick}
            onCreateEventClick={onCreateEventClick}
            onMoreEventsClick={onMoreEventsClick}
          />
        );
      })}
    </div>
  );
};
