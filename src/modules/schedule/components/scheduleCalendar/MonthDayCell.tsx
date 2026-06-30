import { Box, Flex, Link, Text } from "@hh.ru/magritte-ui";
import { PlusOutlinedSize24 } from "@hh.ru/magritte-ui/icon";
import classNames from "classnames";

import { isSameMonth, isToday } from "@/modules/schedule/lib/calendar";
import type { ScheduleEvent } from "@/modules/schedule/model/types";

import styles from "./ScheduleCalendar.module.less";
import { scheduleTexts } from "@/modules/schedule/constants/scheduleTexts";
import { getScheduleDateKey } from "@/modules/schedule/lib/formatScheduleDate";
import { DraggableScheduleEventCard } from "@/modules/schedule/components/draggableScheduleEventCard/DraggableScheduleEventCard";
import { useDroppable } from "@dnd-kit/core";

const MONTH_EVENTS_LIMIT = 2;

type MonthDayCellProps = {
  day: Date;
  calendarDate: Date;
  isEditable: boolean;
  events: ScheduleEvent[];
  onEventClick: (event: ScheduleEvent) => void;
  onCreateEventClick?: (date: string) => void;
  onMoreEventsClick?: (date: string) => void;
};

export const MonthDayCell = ({
  day,
  calendarDate,
  isEditable,
  events,
  onEventClick,
  onCreateEventClick,
  onMoreEventsClick,
}: MonthDayCellProps) => {
  const dateKey = getScheduleDateKey(day);
  const { setNodeRef, isOver } = useDroppable({
    id: `schedule-day-${dateKey}`,
    disabled: !isEditable,
    data: {
      type: "schedule-day",
      dateKey,
    },
  });
  const isOutsideMonth = !isSameMonth(day, calendarDate);
  const isCurrentDay = isToday(day);

  const visibleEvents = events.slice(0, MONTH_EVENTS_LIMIT);
  const hiddenEventsCount = events.length - visibleEvents.length;

  return (
    <Box
      minHeight={185}
      px={12}
      py={10}
      ref={setNodeRef}
      className={classNames(
        styles.dayCell,
        isCurrentDay && styles.dayCellToday,
        isOver && styles.dayCellOver,
      )}
    >
      <Flex align="center" justify="space-between" gap={4}>
        <Text
          typography="label-2-regular"
          style={isCurrentDay ? "accent" : isOutsideMonth ? "tertiary" : "primary"}
        >
          {day.getDate()}
        </Text>

        {isEditable && (
          <span className={styles.createButton}>
            <PlusOutlinedSize24
              initialColor="tertiary"
              highlightedColor="accent"
              onClick={() => onCreateEventClick?.(dateKey)}
            />
          </span>
        )}
      </Flex>

      {visibleEvents.length > 0 && (
        <Flex direction="column" gap={6} mt={4}>
          {visibleEvents.map((event) => (
            <DraggableScheduleEventCard
              key={event.id}
              event={event}
              compact
              disabled={!isEditable}
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
