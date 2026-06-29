import { Box, Flex, Text } from "@hh.ru/magritte-ui";
import classNames from "classnames";

import { ScheduleEventCard } from "@/modules/schedule/components/scheduleEventCard/ScheduleEventCard";
import type { ScheduleCalendarProps } from "@/modules/schedule/components/scheduleCalendar/ScheduleCalendar";
import { isToday } from "@/modules/schedule/lib/calendar";

import styles from "./ScheduleCalendar.module.less";
import { scheduleTexts } from "@/modules/schedule/constants/scheduleTexts";
import {
  formatWeekday,
  getScheduleDateKey,
} from "@/modules/schedule/lib/formatScheduleDate";

type WeekCalendarProps = Omit<
  ScheduleCalendarProps,
  "view" | "calendarDate" | "onMoreEventsClick"
>;

export const WeekCalendar = ({ days, eventsByDate, onEventClick }: WeekCalendarProps) => {
  return (
    <Flex direction="column" gap={12}>
      {days.map((day) => {
        const dateKey = getScheduleDateKey(day);
        const events = eventsByDate[dateKey] ?? [];
        const isCurrentDay = isToday(day);

        return (
          <Box
            key={dateKey}
            minHeight={96}
            p={16}
            className={classNames(styles.weekDay, isCurrentDay && styles.weekDayToday)}
          >
            <Flex direction="column" gap={8}>
              <Flex align="center" justify="space-between">
                <Flex align="center" gap={6}>
                  <Text
                    typography="label-2-regular"
                    style="secondary"
                    transform="capitalize"
                  >
                    {formatWeekday(day)}
                  </Text>
                  <Text typography="title-5-semibold">{day.getDate()}</Text>
                </Flex>
              </Flex>

              {events.length > 0 ? (
                <Flex direction={{ xs: "column", s: "row" }} wrap="wrap" gap={8}>
                  {events.map((event) => (
                    <Box key={event.id} basis={{ xs: "100%", s: "calc(50% - 4px)" }}>
                      <ScheduleEventCard event={event} onClick={onEventClick} />
                    </Box>
                  ))}
                </Flex>
              ) : (
                <Text typography="paragraph-3-regular" style="tertiary">
                  {scheduleTexts.calendar.noLessons}
                </Text>
              )}
            </Flex>
          </Box>
        );
      })}
    </Flex>
  );
};
