import { useState } from "react";
import { Box } from "@hh.ru/magritte-ui";

import { ScheduleCalendar } from "@/modules/schedule/components/scheduleCalendar/ScheduleCalendar";
import { ScheduleToolbar } from "@/modules/schedule/components/scheduleToolbar/ScheduleToolbar";
import { getCalendarDays, type CalendarView } from "@/modules/schedule/lib/calendar";

export const Schedule = () => {
  const [calendarDate, setCalendarDate] = useState(() => new Date());

  const view: CalendarView = "month";
  const days = getCalendarDays(calendarDate, view);

  return (
    <Box Element="section">
      <ScheduleToolbar
        calendarDate={calendarDate}
        view={view}
        onDateChange={setCalendarDate}
      />

      <ScheduleCalendar days={days} calendarDate={calendarDate} />
    </Box>
  );
};
