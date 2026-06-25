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
