import { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import { allDaysOfMonth } from './functions/allDaysOfMonth';
import { weekDays } from './functions/weekDays';

export const useCalendar = (
  year: number,
  month: number
): {
  days: Array<Dayjs | undefined>;
  weekDays: string[];
} => {
  const days = useMemo(() => {
    const days = allDaysOfMonth(year, month);
    let firstDay = days[0];
    let results: Array<Dayjs | undefined> = days;
    for (let i = 0; i < 7; i++) {
      if (firstDay.day() === i) break;
      results.unshift(undefined);
    }
    return results;
  }, [year, month]);

  const _weekDays = useMemo(weekDays, []);

  return {
    days,
    weekDays: _weekDays,
  };
};
