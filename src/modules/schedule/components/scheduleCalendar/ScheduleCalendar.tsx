import { MonthCalendar } from "@/modules/schedule/components/scheduleCalendar/MonthCalendar";

import type { ScheduleEvent } from "@/modules/schedule/model/types";

export type ScheduleCalendarProps = {
  days: Date[];
  calendarDate: Date;

  eventsByDate: Record<string, ScheduleEvent[]>;
  onEventClick: (event: ScheduleEvent) => void;

  onMoreEventsClick?: (date: string) => void;
};

export const ScheduleCalendar = (props: ScheduleCalendarProps) => {
  return <MonthCalendar {...props} />;
};
