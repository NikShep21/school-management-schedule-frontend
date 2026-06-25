export type CalendarView = "month" | "week";

interface CalendarRange {
  startDate: string;
  endDate: string;
}

const MONDAY_DAY_INDEX = 1;
const SUNDAY_DAY_INDEX = 7;
const DAYS_IN_WEEK = 7;

const getWeekdayIndex = (date: Date): number => {
  const weekdayIndex = date.getDay();

  return weekdayIndex === 0 ? SUNDAY_DAY_INDEX : weekdayIndex;
};

const getMonthStart = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

const getMonthEnd = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

const getWeekStart = (date: Date): Date => {
  const weekdayIndex = getWeekdayIndex(date);
  const weekStart = new Date(date);

  weekStart.setDate(date.getDate() - weekdayIndex + MONDAY_DAY_INDEX);

  return weekStart;
};
const getWeekEnd = (date: Date): Date => {
  const weekStart = getWeekStart(date);
  const weekEnd = new Date(weekStart);

  weekEnd.setDate(weekStart.getDate() + DAYS_IN_WEEK - 1);

  return weekEnd;
};

export const getDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getScheduleRange = (date: Date, view: CalendarView): CalendarRange => {
  const startDate = view === "month" ? getMonthStart(date) : getWeekStart(date);
  const endDate = view === "month" ? getMonthEnd(date) : getWeekEnd(date);

  return {
    startDate: getDateKey(startDate),
    endDate: getDateKey(endDate),
  };
};

const getMonthCalendarDays = (date: Date): Date[] => {
  const monthStart = getMonthStart(date);
  const monthEnd = getMonthEnd(date);

  const startDay = getWeekdayIndex(monthStart);
  const endDay = getWeekdayIndex(monthEnd);

  const gridStart = new Date(monthStart);
  gridStart.setDate(monthStart.getDate() - startDay + MONDAY_DAY_INDEX);

  const gridEnd = new Date(monthEnd);
  gridEnd.setDate(monthEnd.getDate() + (SUNDAY_DAY_INDEX - endDay));

  const days: Date[] = [];
  const currentDate = new Date(gridStart);

  while (currentDate <= gridEnd) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
};

const getWeekCalendarDays = (date: Date): Date[] => {
  const weekStart = getWeekStart(date);

  return Array.from({ length: DAYS_IN_WEEK }, (_, index) => {
    const day = new Date(weekStart);

    day.setDate(weekStart.getDate() + index);

    return day;
  });
};

export const getCalendarDays = (date: Date, view: CalendarView): Date[] => {
  return view === "month" ? getMonthCalendarDays(date) : getWeekCalendarDays(date);
};

export const getNextPeriodDate = (date: Date, view: CalendarView): Date => {
  if (view === "month") {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
  }

  const nextWeekDate = new Date(date);
  nextWeekDate.setDate(date.getDate() + DAYS_IN_WEEK);

  return nextWeekDate;
};

export const getPreviousPeriodDate = (date: Date, view: CalendarView): Date => {
  if (view === "month") {
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
  }

  const previousWeekDate = new Date(date);
  previousWeekDate.setDate(date.getDate() - DAYS_IN_WEEK);

  return previousWeekDate;
};

const isSameDay = (firstDate: Date, secondDate: Date): boolean => {
  return getDateKey(firstDate) === getDateKey(secondDate);
};

export const isSameMonth = (firstDate: Date, secondDate: Date): boolean => {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth()
  );
};

export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};
