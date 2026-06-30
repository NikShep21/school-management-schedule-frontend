import { useDraggable } from "@dnd-kit/core";

import { ScheduleEventCard } from "@/modules/schedule/components/scheduleEventCard/ScheduleEventCard";
import type { ScheduleEvent } from "@/modules/schedule/model/types";

type DraggableScheduleEventCardProps = {
  event: ScheduleEvent;
  compact?: boolean;
  disabled?: boolean;
  onClick: (event: ScheduleEvent) => void;
};

export const DraggableScheduleEventCard = ({
  event,
  compact = false,
  disabled = false,
  onClick,
}: DraggableScheduleEventCardProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `schedule-event-${event.id}`,
    disabled,
    data: {
      type: "schedule-event",
      event,
    },
  });

  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
      <ScheduleEventCard event={event} compact={compact} onClick={onClick} />
    </div>
  );
};
