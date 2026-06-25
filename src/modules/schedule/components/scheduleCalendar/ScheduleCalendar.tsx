import { MonthCalendar } from "@/modules/schedule/components/scheduleCalendar/MonthCalendar";

export type ScheduleCalendarProps = {
  days: Date[];
  calendarDate: Date;
};

export const ScheduleCalendar = (props: ScheduleCalendarProps) => {
  return <MonthCalendar {...props} />;
};
