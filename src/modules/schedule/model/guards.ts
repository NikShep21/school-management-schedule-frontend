import type { ScheduleEvent } from "@/modules/schedule/model/types";

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

export const isScheduleEvent = (value: unknown): value is ScheduleEvent => {
  if (!isObject(value)) {
    return false;
  }

  return (
    typeof value.id === "number" &&
    typeof value.title === "string" &&
    typeof value.startTime === "string" &&
    typeof value.endTime === "string" &&
    Array.isArray(value.tracks) &&
    isObject(value.teacher) &&
    typeof value.teacher.id === "number" &&
    typeof value.teacher.firstName === "string" &&
    typeof value.teacher.lastName === "string"
  );
};
