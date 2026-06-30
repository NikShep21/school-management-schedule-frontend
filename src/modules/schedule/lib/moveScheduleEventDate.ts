import type { ScheduleDay, ScheduleEvent } from "@/modules/schedule/model/types";

type MovedScheduleEventTime = {
  startTime: string;
  endTime: string;
};

export const getMovedScheduleEventTime = (
  event: ScheduleEvent,
  targetDateKey: string,
): MovedScheduleEventTime => {
  const currentStart = new Date(event.startTime);
  const currentEnd = new Date(event.endTime);

  const durationMs = currentEnd.getTime() - currentStart.getTime();

  const [year, month, day] = targetDateKey.split("-").map(Number);

  const nextStart = new Date(
    year,
    month - 1,
    day,
    currentStart.getHours(),
    currentStart.getMinutes(),
    currentStart.getSeconds(),
    currentStart.getMilliseconds(),
  );

  const nextEnd = new Date(nextStart.getTime() + durationMs);

  return {
    startTime: nextStart.toISOString(),
    endTime: nextEnd.toISOString(),
  };
};

export const updateScheduleEventTimeInDays = (
  scheduleDays: ScheduleDay[],
  eventId: number,
  time: MovedScheduleEventTime,
): ScheduleDay[] => {
  return scheduleDays.map((scheduleDay) => ({
    ...scheduleDay,
    events: scheduleDay.events.map((event) => {
      if (event.id !== eventId) {
        return event;
      }

      return {
        ...event,
        startTime: time.startTime,
        endTime: time.endTime,
      };
    }),
  }));
};
