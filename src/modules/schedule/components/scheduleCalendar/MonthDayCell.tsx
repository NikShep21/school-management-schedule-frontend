import { Box, Flex, Link, Text } from "@hh.ru/magritte-ui";
import classNames from "classnames";

import { ScheduleEventCard } from "@/modules/schedule/components/scheduleEventCard/ScheduleEventCard";
import { isSameMonth, isToday } from "@/modules/schedule/lib/calendar";
import type { ScheduleEvent } from "@/modules/schedule/model/types";

import styles from "./ScheduleCalendar.module.less";
import { scheduleTexts } from "@/modules/schedule/constants/scheduleTexts";
import { getScheduleDateKey } from "@/modules/schedule/lib/formatScheduleDate";

const MONTH_EVENTS_LIMIT = 2;

type MonthDayCellProps = {
  day: Date;
  calendarDate: Date;
  events: ScheduleEvent[];
  onEventClick: (event: ScheduleEvent) => void;
  onMoreEventsClick?: (date: string) => void;
};

export const MonthDayCell = ({
  day,
  calendarDate,
  events,
  onEventClick,
  onMoreEventsClick,
}: MonthDayCellProps) => {
  const dateKey = getScheduleDateKey(day);
  const isOutsideMonth = !isSameMonth(day, calendarDate);
  const isCurrentDay = isToday(day);

  const visibleEvents = events.slice(0, MONTH_EVENTS_LIMIT);
  const hiddenEventsCount = events.length - visibleEvents.length;

  return (
    <Box
      minHeight={185}
      px={12}
      py={10}
      className={classNames(styles.dayCell, isCurrentDay && styles.dayCellToday)}
    >
      <Flex align="center" justify="space-between" gap={4}>
        <Text
          typography="label-2-regular"
          style={isCurrentDay ? "accent" : isOutsideMonth ? "tertiary" : "primary"}
        >
          {day.getDate()}
        </Text>
      </Flex>

      {visibleEvents.length > 0 && (
        <Flex direction="column" gap={6} mt={4}>
          {visibleEvents.map((event) => (
            <ScheduleEventCard
              key={event.id}
              event={event}
              compact
              onClick={onEventClick}
            />
          ))}

          {hiddenEventsCount > 0 &&
            (onMoreEventsClick ? (
              <Link
                Element="button"
                mode="secondary"
                style="neutral"
                typography="label-4-regular"
                onClick={() => onMoreEventsClick(dateKey)}
              >
                {scheduleTexts.calendar.moreEvents(hiddenEventsCount)}
              </Link>
            ) : (
              <Text typography="label-4-regular" style="tertiary">
                {scheduleTexts.calendar.moreEvents(hiddenEventsCount)}
              </Text>
            ))}
        </Flex>
      )}
    </Box>
  );
};
