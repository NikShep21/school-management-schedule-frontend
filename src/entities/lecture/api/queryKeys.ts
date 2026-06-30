export const lectureQueryKeys = {
  all: ["lectures"] as const,
  details: () => [...lectureQueryKeys.all, "details"] as const,
  detail: (lectureId: number) => [...lectureQueryKeys.details(), lectureId] as const,
};
