import type { LectureTrack } from "@/entities/lecture";

export interface TeacherInfoResponse {
  id: number;
  first_name: string;
  last_name: string;
}

export type ScheduleEventResponse = {
  id: number;
  title: string;
  start_time: string;
  end_time: string;
  teacher: TeacherInfoResponse;
  tracks: LectureTrack[];
};

export type ScheduleDayResponse = {
  date: string;
  events: ScheduleEventResponse[];
};

export interface ScheduleParams {
  startDate: string;
  endDate: string;
  streamId?: number;
  track?: LectureTrack;
}
