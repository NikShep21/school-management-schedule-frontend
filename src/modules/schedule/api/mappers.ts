import type {
  ScheduleDayResponse,
  ScheduleEventResponse,
} from "@/modules/schedule/api/types";
import type { ScheduleDay, ScheduleEvent } from "@/modules/schedule/model/types";

const mapScheduleEventResponse = (event: ScheduleEventResponse): ScheduleEvent => {
  return {
    type: event.type,
    id: event.id,
    title: event.title,
    startTime: event.start_time,
    endTime: event.end_time,
    tracks: event.tracks,
    teacher: {
      id: event.teacher.id,
      firstName: event.teacher.first_name,
      lastName: event.teacher.last_name,
    },
  };
};

export const mapScheduleDayResponse = (scheduleDay: ScheduleDayResponse): ScheduleDay => {
  return {
    date: scheduleDay.date,
    events: scheduleDay.events.map(mapScheduleEventResponse),
  };
};
