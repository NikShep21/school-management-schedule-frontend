import type {
  LectureMaterial,
  LectureMaterialDraft,
  LectureStream,
  LectureTrack,
} from "@/entities/lecture/model/types";

export interface LectureTeacherResponse {
  id: number;
  first_name: string;
  last_name: string;
}

export interface LectureResponse {
  id: number;
  stream: LectureStream;
  teacher: LectureTeacherResponse;
  tracks: LectureTrack[];
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  kontur_talk_url: string;
  materials: LectureMaterial[];
}

export interface CreateLectureBody {
  streamId: number;
  teacherId: number;
  tracks: LectureTrack[];
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  konturTalkUrl: string;
  materials: LectureMaterialDraft[];
}

export type UpdateLectureBody = Partial<CreateLectureBody>;

export interface CreateLectureRequest {
  stream_id: number;
  teacher_id: number;
  tracks: LectureTrack[];
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  kontur_talk_url: string;
  materials: LectureMaterialDraft[];
}

export type UpdateLectureRequest = Partial<CreateLectureRequest>;
