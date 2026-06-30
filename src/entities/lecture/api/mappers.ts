import type {
  UpdateLectureBody,
  UpdateLectureRequest,
} from "@/entities/lecture/api/types";

export const mapUpdateLectureBodyToRequest = (
  body: UpdateLectureBody,
): UpdateLectureRequest => {
  return {
    stream_id: body.streamId,
    teacher_id: body.teacherId,
    tracks: body.tracks,
    title: body.title,
    description: body.description,
    start_time: body.startTime,
    end_time: body.endTime,
    kontur_talk_url: body.konturTalkUrl,
    materials: body.materials,
  };
};
