import { Card, Flex, Text } from "@hh.ru/magritte-ui";
import type { ScheduleEvent } from "@/modules/schedule/model/types";
import type { LectureTrack } from "@/entities/lecture";
import { formatScheduleEventTime } from "@/modules/schedule/lib/formatScheduleDate";

type ScheduleEventCardProps = {
  event: ScheduleEvent;
  compact?: boolean;
  onClick: (event: ScheduleEvent) => void;
};

type LectureTrackView = LectureTrack | "COMMON";

const TRACK_CONFIG = {
  FRONTEND: {
    label: "Frontend",
    cardStyle: "accent-secondary",
    textStyle: "accent",
  },
  BACKEND: {
    label: "Backend",
    cardStyle: "positive-secondary",
    textStyle: "positive",
  },
  ANALYTICS: {
    label: "Analytics",
    cardStyle: "special-secondary",
    textStyle: "special",
  },
  COMMON: {
    label: "Общая",
    cardStyle: "vivid-secondary",
    textStyle: "warning",
  },
} as const;

const getTrackView = (tracks: LectureTrack[]): LectureTrackView => {
  const hasFrontend = tracks.includes("FRONTEND");
  const hasBackend = tracks.includes("BACKEND");

  if (hasFrontend && hasBackend) return "COMMON";
  if (hasFrontend) return "FRONTEND";
  if (hasBackend) return "BACKEND";

  return "ANALYTICS";
};

export const ScheduleEventCard = ({
  event,
  compact = false,
  onClick,
}: ScheduleEventCardProps) => {
  const trackView = getTrackView(event.tracks);
  const trackConfig = TRACK_CONFIG[trackView];

  const time = `${formatScheduleEventTime(event.startTime)}–${formatScheduleEventTime(event.endTime)}`;

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
            {time}
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
