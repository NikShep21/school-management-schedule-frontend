import { useMemo, useState } from "react";
import { Box, Flex, Loader, useBreakpoint } from "@hh.ru/magritte-ui";

import { useScheduleQuery } from "@/modules/schedule/api/requests/getSchedule";
import { DayEventsModal } from "@/modules/schedule/components/dayEventsModal/DayEventsModal";
import { ScheduleCalendar } from "@/modules/schedule/components/scheduleCalendar/ScheduleCalendar";
import { ScheduleDndCalendar } from "@/modules/schedule/components/scheduleDndCalendar/ScheduleDndCalendar";
import { ScheduleToolbar } from "@/modules/schedule/components/scheduleToolbar/ScheduleToolbar";
import {
  getCalendarDays,
  getScheduleRange,
  type CalendarView,
} from "@/modules/schedule/lib/calendar";
import { getEventsByDate } from "@/modules/schedule/lib/getEventsByDate";
import type {
  ScheduleEvent,
  ScheduleMode,
  TrackFilterValue,
} from "@/modules/schedule/model/types";

import { useMoveLectureMutation } from "@/modules/schedule/api/requests/moveLecture";
import { getScheduleDateKey } from "@/modules/schedule/lib/formatScheduleDate";

interface ScheduleProps {
  mode: ScheduleMode;
}

export const Schedule = ({ mode }: ScheduleProps) => {
  const { isMobile } = useBreakpoint();

  const [calendarDate, setCalendarDate] = useState(() => new Date());
  const [trackFilter, setTrackFilter] = useState<TrackFilterValue>("ALL");
  const [selectedEventsDate, setSelectedEventsDate] = useState<string | null>(null);
  const [isDayEventsModalVisible, setIsDayEventsModalVisible] = useState(false);

  const view: CalendarView = isMobile ? "week" : "month";
  const isEditable = mode === "editable";
  const isDndEnabled = isEditable && view === "month";

  const scheduleParams = {
    ...getScheduleRange(calendarDate, view),
    track: trackFilter === "ALL" ? undefined : trackFilter,
  };

  const {
    data: scheduleDays = [],
    isPending,
    isFetching,
  } = useScheduleQuery(scheduleParams);

  const { mutate: moveLectureInSchedule } = useMoveLectureMutation();
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

  const handleCreateLectureClick = () => {};

  const handleCreateEventClick = (date: string) => {
    void date;
  };

  const handleEventDrop = ({
    event,
    targetDateKey,
  }: {
    event: ScheduleEvent;
    targetDateKey: string;
  }) => {
    const currentDateKey = getScheduleDateKey(new Date(event.startTime));
    if (currentDateKey === targetDateKey) return;

    moveLectureInSchedule({
      event,
      targetDateKey,
      scheduleParams,
    });
  };

  const calendarProps = {
    days,
    calendarDate,
    view,
    isEditable,
    eventsByDate,
    onEventClick: handleEventClick,
    onCreateEventClick: isEditable ? handleCreateEventClick : undefined,
    onMoreEventsClick: handleMoreEventsClick,
  };

  return (
    <Box Element="section">
      <ScheduleToolbar
        calendarDate={calendarDate}
        view={view}
        isMobile={isMobile}
        isEditable={isEditable}
        isFetching={isFetching && !isPending}
        trackFilter={trackFilter}
        onDateChange={setCalendarDate}
        onTrackFilterChange={setTrackFilter}
        onCreateLectureClick={handleCreateLectureClick}
      />

      {isPending ? (
        <Flex pt="18vh" align="center" justify="center">
          <Loader size={48} />
        </Flex>
      ) : isDndEnabled ? (
        <ScheduleDndCalendar {...calendarProps} onEventDrop={handleEventDrop} />
      ) : (
        <ScheduleCalendar {...calendarProps} />
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
