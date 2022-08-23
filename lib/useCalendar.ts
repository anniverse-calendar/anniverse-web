import { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import { allDaysOfMonth } from './functions/allDaysOfMonth';

export const useCalendar = (
  year: number,
  month: number
): {
  days: Array<Dayjs | undefined>;
} => {
  const days = useMemo(() => {
    const days = allDaysOfMonth(year, month);
    let firstDay = days[0];
    let results: Array<Dayjs | undefined> = days;
    for (let i = 0; i < 7; i++) {
      if (firstDay.day() === i) break;
      results.unshift(undefined);
    }
    for (let i = days.length; i < 42; i++) {
      results.push(undefined);
    }
    return results;
  }, [year, month]);

  return {
    days,
  };
};
