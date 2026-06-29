import { MonthCalendar } from "@/modules/schedule/components/scheduleCalendar/MonthCalendar";
import { WeekCalendar } from "@/modules/schedule/components/scheduleCalendar/WeekCalendar";
import type { CalendarView } from "@/modules/schedule/lib/calendar";
import type { ScheduleEvent } from "@/modules/schedule/model/types";

export type ScheduleCalendarProps = {
  days: Date[];
  calendarDate: Date;
  view: CalendarView;
  eventsByDate: Record<string, ScheduleEvent[]>;
  onEventClick: (event: ScheduleEvent) => void;
  onMoreEventsClick?: (date: string) => void;
};

export const ScheduleCalendar = (props: ScheduleCalendarProps) => {
  if (props.view === "week") {
    return <WeekCalendar {...props} />;
  }

  return <MonthCalendar {...props} />;
};
