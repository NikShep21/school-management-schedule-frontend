import {
  DAYS_IN_WEEK,
  MONDAY_DAY_INDEX,
  SCHEDULE_RANGE_PADDING_DAYS,
  SUNDAY_DAY_INDEX,
} from "@/modules/schedule/constants/scheduleCalendar";
import { getScheduleDateKey } from "@/modules/schedule/lib/formatScheduleDate";

export type CalendarView = "month" | "week";

interface CalendarRange {
  startDate: string;
  endDate: string;
}

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

const addDays = (date: Date, daysCount: number): Date => {
  const nextDate = new Date(date);
  nextDate.setDate(date.getDate() + daysCount);

  return nextDate;
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
export const getScheduleRange = (date: Date, view: CalendarView): CalendarRange => {
  const days = getCalendarDays(date, view);
  const startDate = days[0];
  const endDate = days[days.length - 1];
  return {
    startDate: getScheduleDateKey(addDays(startDate, -SCHEDULE_RANGE_PADDING_DAYS)),
    endDate: getScheduleDateKey(addDays(endDate, SCHEDULE_RANGE_PADDING_DAYS)),
  };
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
  return getScheduleDateKey(firstDate) === getScheduleDateKey(secondDate);
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
