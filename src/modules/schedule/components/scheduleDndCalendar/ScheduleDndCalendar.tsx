import { DndContext, DragOverlay, pointerWithin } from "@dnd-kit/core";

import {
  ScheduleCalendar,
  type ScheduleCalendarProps,
} from "@/modules/schedule/components/scheduleCalendar/ScheduleCalendar";
import { ScheduleEventCard } from "@/modules/schedule/components/scheduleEventCard/ScheduleEventCard";
import {
  useScheduleDnd,
  type ScheduleEventDropPayload,
} from "@/modules/schedule/hooks/useScheduleDnd";

import styles from "./ScheduleDndCalendar.module.less";

type ScheduleDndCalendarProps = ScheduleCalendarProps & {
  onEventDrop: (payload: ScheduleEventDropPayload) => void;
};

export const ScheduleDndCalendar = ({
  onEventDrop,
  ...calendarProps
}: ScheduleDndCalendarProps) => {
  const { activeEvent, sensors, handleDragStart, handleDragEnd, handleDragCancel } =
    useScheduleDnd({
      onEventDrop,
    });

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      autoScroll
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <ScheduleCalendar {...calendarProps} />

      <DragOverlay dropAnimation={null}>
        {activeEvent ? (
          <div className={styles.dragOverlay}>
            <ScheduleEventCard
              event={activeEvent}
              compact={calendarProps.view === "month"}
              onClick={() => undefined}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
