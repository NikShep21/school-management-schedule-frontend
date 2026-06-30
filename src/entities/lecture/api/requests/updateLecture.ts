import { useMutation } from "@tanstack/react-query";

import { endpoints } from "@/entities/lecture/api/endpoints";
import { mapUpdateLectureBodyToRequest } from "@/entities/lecture/api/mappers";
import type { UpdateLectureBody } from "@/entities/lecture/api/types";
import { api } from "@/shared/api/client";

type UpdateLectureParams = {
  lectureId: number;
  body: UpdateLectureBody;
};

export const updateLectureRequest = async ({
  lectureId,
  body,
}: UpdateLectureParams): Promise<void> => {
  await api.patch(endpoints.lectureById(lectureId), mapUpdateLectureBodyToRequest(body));
};

export const useUpdateLectureMutation = () => {
  return useMutation({
    mutationFn: updateLectureRequest,
  });
};
