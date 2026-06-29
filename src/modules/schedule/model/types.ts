import type { LectureTrack, LectureTeacher } from "@/entities/lecture";

export type ScheduleMode = "readonly" | "editable";

export type TrackFilterValue = LectureTrack | "ALL";

export type ScheduleEvent = {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  teacher: LectureTeacher;
  tracks: LectureTrack[];
};

export type ScheduleDay = {
  date: string;
  events: ScheduleEvent[];
};
