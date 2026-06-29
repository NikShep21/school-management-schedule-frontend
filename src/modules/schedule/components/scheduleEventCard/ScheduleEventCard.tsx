import { Card, Flex, Text } from "@hh.ru/magritte-ui";
import type { ScheduleEvent } from "@/modules/schedule/model/types";

import { formatScheduleEventTimeRange } from "@/modules/schedule/lib/formatScheduleDate";
import {
  getTrackView,
  TRACK_CONFIG,
} from "@/modules/schedule/components/scheduleEventCard/constants";

type ScheduleEventCardProps = {
  event: ScheduleEvent;
  compact?: boolean;
  onClick: (event: ScheduleEvent) => void;
};

export const ScheduleEventCard = ({
  event,
  compact = false,
  onClick,
}: ScheduleEventCardProps) => {
  const trackView = getTrackView(event.tracks);
  const trackConfig = TRACK_CONFIG[trackView];

  return (
    <Card
      style={trackConfig.cardStyle}
      borderStyle="neutral"
      borderWidth="default"
      borderRadius={12}
      padding={compact ? 8 : 10}
      onClick={() => onClick(event)}
      stretched
      pressEnabled
      increaseShadow
    >
      <Flex direction="column" gap={compact ? 4 : 6}>
        <Flex align="flex-start" justify="space-between" gap={6}>
          <Text typography="label-5-regular" style="dense">
            {formatScheduleEventTimeRange(event.startTime, event.endTime)}
          </Text>

          <Text typography="label-5-regular" style={trackConfig.textStyle}>
            {trackConfig.label}
          </Text>
        </Flex>

        <Text
          typography={compact ? "label-4-regular" : "label-3-regular"}
          style="primary"
          ellipsis={compact}
          maxLines={compact ? undefined : 2}
        >
          {event.title}
        </Text>

        {!compact && (
          <Text typography="label-4-regular" style="secondary">
            {event.teacher.firstName} {event.teacher.lastName}
          </Text>
        )}
      </Flex>
    </Card>
  );
};
