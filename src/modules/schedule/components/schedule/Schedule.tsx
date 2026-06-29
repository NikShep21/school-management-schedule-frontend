import { useMemo, useState } from "react";
import { Box, Flex, Loader, useBreakpoint } from "@hh.ru/magritte-ui";

import { useScheduleQuery } from "@/modules/schedule/api/requests/getSchedule";
import { DayEventsModal } from "@/modules/schedule/components/dayEventsModal/DayEventsModal";
import { ScheduleCalendar } from "@/modules/schedule/components/scheduleCalendar/ScheduleCalendar";
import { ScheduleToolbar } from "@/modules/schedule/components/scheduleToolbar/ScheduleToolbar";

import {
  getCalendarDays,
  getScheduleRange,
  type CalendarView,
} from "@/modules/schedule/lib/calendar";
import { getEventsByDate } from "@/modules/schedule/lib/getEventsByDate";
import type { ScheduleEvent, TrackFilterValue } from "@/modules/schedule/model/types";

export const Schedule = () => {
  const { isMobile } = useBreakpoint();

  const [calendarDate, setCalendarDate] = useState(() => new Date());
  const [trackFilter, setTrackFilter] = useState<TrackFilterValue>("ALL");
  const [selectedEventsDate, setSelectedEventsDate] = useState<string | null>(null);
  const [isDayEventsModalVisible, setIsDayEventsModalVisible] = useState(false);

  const view: CalendarView = isMobile ? "week" : "month";

  const scheduleParams = {
    ...getScheduleRange(calendarDate, view),
    track: trackFilter === "ALL" ? undefined : trackFilter,
  };

  const {
    data: scheduleDays = [],
    isPending,
    isFetching,
  } = useScheduleQuery(scheduleParams);

  const days = getCalendarDays(calendarDate, view);

  const eventsByDate = useMemo(() => {
    return getEventsByDate(scheduleDays);
  }, [scheduleDays]);

  const handleMoreEventsClick = (date: string) => {
    setSelectedEventsDate(date);
    setIsDayEventsModalVisible(true);
  };

  const handleCloseDayEventsModal = () => {
    setIsDayEventsModalVisible(false);
  };

  const handleDayEventsModalAfterExit = () => {
    setSelectedEventsDate(null);
  };

  const handleEventClick = (event: ScheduleEvent) => {
    void event;
  };

  return (
    <Box Element="section">
      <ScheduleToolbar
        calendarDate={calendarDate}
        view={view}
        isMobile={isMobile}
        isFetching={isFetching && !isPending}
        trackFilter={trackFilter}
        onDateChange={setCalendarDate}
        onTrackFilterChange={setTrackFilter}
      />

      {isPending ? (
        <Flex pt="18vh" align="center" justify="center">
          <Loader size={48} />
        </Flex>
      ) : (
        <ScheduleCalendar
          days={days}
          calendarDate={calendarDate}
          view={view}
          eventsByDate={eventsByDate}
          onEventClick={handleEventClick}
          onMoreEventsClick={handleMoreEventsClick}
        />
      )}

      {selectedEventsDate && (
        <DayEventsModal
          visible={isDayEventsModalVisible}
          date={selectedEventsDate}
          events={eventsByDate[selectedEventsDate] ?? []}
          onClose={handleCloseDayEventsModal}
          onAfterExit={handleDayEventsModalAfterExit}
          onEventClick={handleEventClick}
        />
      )}
    </Box>
  );
};
