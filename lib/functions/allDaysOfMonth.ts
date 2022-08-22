import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

export const allDaysOfMonth = (year: number, month: number): Dayjs[] => {
  const startDate = dayjs(new Date(year, month - 1, 1));
  let days: Dayjs[] = [];
  let date = startDate;
  while (date.isBefore(startDate.endOf('month'))) {
    days.push(date);
    date = date.add(1, 'day');
  }

  return days;
};
