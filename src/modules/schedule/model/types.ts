import type { LectureTrack, LectureTeacher } from "@/entities/lecture";

export type ScheduleMode = "readonly" | "editable";

export type ScheduleEvent = {
  type: "LECTURE";
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
