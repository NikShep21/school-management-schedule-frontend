export type {
  Lecture,
  LectureTrack,
  LectureMaterial,
  LectureMaterialType,
  LectureStream,
  LectureTeacher,
} from "./model/types";

export {
  useUpdateLectureMutation,
  updateLectureRequest,
} from "./api/requests/updateLecture";
