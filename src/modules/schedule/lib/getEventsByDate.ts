import { getScheduleDateKey } from "@/modules/schedule/lib/formatScheduleDate";
import type { ScheduleDay, ScheduleEvent } from "@/modules/schedule/model/types";

export const getEventsByDate = (
  scheduleDays: ScheduleDay[],
): Record<string, ScheduleEvent[]> => {
  return scheduleDays.reduce<Record<string, ScheduleEvent[]>>((acc, scheduleDay) => {
    scheduleDay.events.forEach((event) => {
      const dateKey = getScheduleDateKey(new Date(event.startTime));

      acc[dateKey] ??= [];
      acc[dateKey].push(event);
    });

    return acc;
  }, {});
};
