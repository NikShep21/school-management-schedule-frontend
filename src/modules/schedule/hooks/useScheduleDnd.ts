import { useState } from "react";
import {
  MouseSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";

import { isScheduleEvent } from "@/modules/schedule/model/guards";
import type { ScheduleEvent } from "@/modules/schedule/model/types";

export interface ScheduleEventDropPayload {
  event: ScheduleEvent;
  targetDateKey: string;
}

interface UseScheduleDndParams {
  onEventDrop: (payload: ScheduleEventDropPayload) => void;
}

const getScheduleEventFromDragData = (
  data: Record<string, unknown> | undefined,
): ScheduleEvent | null => {
  const event = data?.event;
  return isScheduleEvent(event) ? event : null;
};

const getDateKeyFromDropData = (
  data: Record<string, unknown> | undefined,
): string | null => {
  const dateKey = data?.dateKey;

  return typeof dateKey === "string" ? dateKey : null;
};

export const useScheduleDnd = ({ onEventDrop }: UseScheduleDndParams) => {
  const [activeEvent, setActiveEvent] = useState<ScheduleEvent | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    const event = getScheduleEventFromDragData(active.data.current);

    if (!event) {
      return;
    }

    setActiveEvent(event);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveEvent(null);

    const event = getScheduleEventFromDragData(active.data.current);
    const targetDateKey = getDateKeyFromDropData(over?.data.current);

    if (!event || !targetDateKey) {
      return;
    }

    onEventDrop({
      event,
      targetDateKey,
    });
  };

  const handleDragCancel = () => {
    setActiveEvent(null);
  };

  return {
    activeEvent,
    sensors,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
};
