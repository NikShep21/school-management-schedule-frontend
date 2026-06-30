import { getScheduleDateKey } from "@/modules/schedule/lib/formatScheduleDate";
import type { ScheduleDay, ScheduleEvent } from "@/modules/schedule/model/types";

type EventsByDate = Record<string, ScheduleEvent[]>;

const compareEventsByStartTime = (
  firstEvent: ScheduleEvent,
  secondEvent: ScheduleEvent,
): number => {
  return (
    new Date(firstEvent.startTime).getTime() - new Date(secondEvent.startTime).getTime()
  );
};

export const getEventsByDate = (scheduleDays: ScheduleDay[]): EventsByDate => {
  const eventsByDate = scheduleDays.reduce<EventsByDate>((acc, scheduleDay) => {
    scheduleDay.events.forEach((event) => {
      const dateKey = getScheduleDateKey(new Date(event.startTime));

      acc[dateKey] = [...(acc[dateKey] ?? []), event];
    });

    return acc;
  }, {});

  return Object.fromEntries(
    Object.entries(eventsByDate).map(([dateKey, events]) => [
      dateKey,
      [...events].sort(compareEventsByStartTime),
    ]),
  );
};
