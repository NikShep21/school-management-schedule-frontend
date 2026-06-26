import { Flex, Modal, Text } from "@hh.ru/magritte-ui";
import { CrossOutlinedSize24 } from "@hh.ru/magritte-ui/icon";

import { scheduleTexts } from "@/modules/schedule/constants/scheduleTexts";
import { ScheduleEventCard } from "@/modules/schedule/components/scheduleEventCard/ScheduleEventCard";
import type { ScheduleEvent } from "@/modules/schedule/model/types";
import { formatScheduleDayTitle } from "@/modules/schedule/lib/formatScheduleDate";

type DayEventsModalProps = {
  visible: boolean;
  date: string;
  events: ScheduleEvent[];
  onClose: () => void;
  onAfterExit?: () => void;
  onEventClick: (event: ScheduleEvent) => void;
};

export const DayEventsModal = ({
  visible,
  date,
  events,
  onClose,
  onAfterExit,
  onEventClick,
}: DayEventsModalProps) => {
  return (
    <Modal
      visible={visible}
      title={formatScheduleDayTitle(date)}
      size="small"
      onClose={onClose}
      onAfterExit={onAfterExit}
      actions={[
        <CrossOutlinedSize24
          key="close"
          initialColor="secondary"
          highlightedColor="accent"
          onClick={onClose}
        />,
      ]}
    >
      <Flex direction="column" gap={12}>
        {events.length > 0 ? (
          events.map((event) => (
            <ScheduleEventCard
              key={event.id}
              event={event}
              onClick={(clickedEvent) => {
                onEventClick(clickedEvent);
                onClose();
              }}
            />
          ))
        ) : (
          <Text typography="paragraph-2-regular" style="tertiary">
            {scheduleTexts.calendar.noLessons}
          </Text>
        )}
      </Flex>
    </Modal>
  );
};
