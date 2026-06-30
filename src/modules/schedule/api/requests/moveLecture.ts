import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateLectureRequest } from "@/entities/lecture/api/requests/updateLecture";
import { scheduleQueryKeys } from "@/modules/schedule/api/queryKeys";
import type { ScheduleParams } from "@/modules/schedule/api/types";
import {
  getMovedScheduleEventTime,
  updateScheduleEventTimeInDays,
} from "@/modules/schedule/lib/moveScheduleEventDate";
import type { ScheduleDay, ScheduleEvent } from "@/modules/schedule/model/types";

type MoveLectureParams = {
  event: ScheduleEvent;
  targetDateKey: string;
  scheduleParams: ScheduleParams;
};

type MoveLectureContext = {
  previousScheduleDays?: ScheduleDay[];
  scheduleParams: ScheduleParams;
};

export const useMoveLectureMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, MoveLectureParams, MoveLectureContext>({
    mutationFn: ({ event, targetDateKey }) => {
      const movedTime = getMovedScheduleEventTime(event, targetDateKey);

      return updateLectureRequest({
        lectureId: event.id,
        body: movedTime,
      });
    },

    onMutate: async ({ event, targetDateKey, scheduleParams }) => {
      const queryKey = scheduleQueryKeys.schedule(scheduleParams);

      await queryClient.cancelQueries({ queryKey });

      const previousScheduleDays = queryClient.getQueryData<ScheduleDay[]>(queryKey);

      const movedTime = getMovedScheduleEventTime(event, targetDateKey);

      queryClient.setQueryData<ScheduleDay[]>(queryKey, (scheduleDays) => {
        if (!scheduleDays) {
          return scheduleDays;
        }

        return updateScheduleEventTimeInDays(scheduleDays, event.id, movedTime);
      });

      return {
        previousScheduleDays,
        scheduleParams,
      };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousScheduleDays) {
        queryClient.setQueryData(
          scheduleQueryKeys.schedule(context.scheduleParams),
          context.previousScheduleDays,
        );
      }
    },

    onSettled: (_data, _error, variables) => {
      void queryClient.invalidateQueries({
        queryKey: scheduleQueryKeys.schedule(variables.scheduleParams),
      });
    },
  });
};
