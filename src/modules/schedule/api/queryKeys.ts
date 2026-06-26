import type { ScheduleParams } from "@/modules/schedule/api/types";

export const scheduleQueryKeys = {
  all: ["schedule"] as const,

  list: () => [...scheduleQueryKeys.all, "list"] as const,

  schedule: ({ startDate, endDate, streamId, track }: ScheduleParams) =>
    [
      ...scheduleQueryKeys.list(),
      startDate,
      endDate,
      streamId ?? null,
      track ?? null,
    ] as const,
};
