export const getScheduleDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatSchedulePeriodTitle = (date: Date): string => {
  return new Intl.DateTimeFormat("ru-RU", {
    month: "long",
    year: "numeric",
  }).format(date);
};

export const formatScheduleDayTitle = (date: string): string => {
  const [year, month, day] = date.split("-").map(Number);

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    weekday: "long",
  }).format(new Date(year, month - 1, day));
};

export const formatScheduleEventTime = (date: string): string => {
  return new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

export const formatScheduleEventTimeRange = (
  startTime: string,
  endTime: string,
): string => {
  return `${formatScheduleEventTime(startTime)}–${formatScheduleEventTime(endTime)}`;
};
