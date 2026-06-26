import { scheduleEndpoints } from "@/modules/schedule/api/endpoints";
import { mapScheduleDayResponse } from "@/modules/schedule/api/mappers";
import { scheduleQueryKeys } from "@/modules/schedule/api/queryKeys";

import type { ScheduleParams, ScheduleDayResponse } from "@/modules/schedule/api/types";
import type { ScheduleDay } from "@/modules/schedule/model/types";
import { api } from "@/shared/api/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const scheduleRequest = async ({
  startDate,
  endDate,
  streamId,
  track,
}: ScheduleParams): Promise<ScheduleDay[]> => {
  const { data } = await api.get<ScheduleDayResponse[]>(scheduleEndpoints.schedule, {
    params: {
      start_date: startDate,
      end_date: endDate,
      stream_id: streamId,
      track,
    },
  });

  return data.map(mapScheduleDayResponse);
};
export const useScheduleQuery = (params: ScheduleParams) => {
  return useQuery({
    queryKey: scheduleQueryKeys.schedule(params),
    queryFn: () => scheduleRequest(params),
    placeholderData: keepPreviousData,
  });
};
