import type { ScheduleDay, ScheduleEvent } from "@/modules/schedule/model/types";

export const getEventsByDate = (
  scheduleDays: ScheduleDay[],
): Record<string, ScheduleEvent[]> => {
  return scheduleDays.reduce<Record<string, ScheduleEvent[]>>((acc, scheduleDay) => {
    acc[scheduleDay.date] = scheduleDay.events;

    return acc;
  }, {});
};
