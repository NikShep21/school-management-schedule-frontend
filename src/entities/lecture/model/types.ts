export type LectureTrack = "FRONTEND" | "BACKEND" | "ANALYTICS";

export type LectureMaterialType = "presentation" | "recording" | "feedback" | "material";

export interface LectureStream {
  id: number;
  name: string;
}

export interface LectureTeacher {
  id: number;
  firstName: string;
  lastName: string;
}

export interface LectureMaterial {
  id: number;
  type: LectureMaterialType;
  title: string;
  url: string;
}

export interface Lecture {
  id: number;
  stream: LectureStream;
  teacher: LectureTeacher;
  tracks: LectureTrack[];
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  konturTalkUrl: string;
  materials: LectureMaterial[];
}
