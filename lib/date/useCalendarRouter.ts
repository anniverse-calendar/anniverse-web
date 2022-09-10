import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useParamsYMD } from '../date/useParamsYMD';

function date(year: number, month: number, day: number) {
  return dayjs(new Date(year, month - 1, day));
}

export function useCalendarRouter(): {
  params: {
    year: number;
    month: number;
    day: number;
  };
  goNextYear(): void;
  goPrevYear(): void;
  goNextMonth(): void;
  goPrevMonth(): void;
} {
  const router = useRouter();
  const { year, month, day } = useParamsYMD();

  return useMemo(() => {
    return {
      params: {
        year,
        month,
        day,
      },
      goNextYear() {
        router.push(
          `/year?ym=${date(year, month, day).add(1, 'year').format('YYYYMM')}`
        );
      },
      goPrevYear() {
        router.push(
          `/year?ym=${date(year, month, day).add(-1, 'year').format('YYYYMM')}`
        );
      },
      goNextMonth() {
        router.push(
          `/month?ym=${date(year, month, day).add(1, 'month').format('YYYYMM')}`
        );
      },
      goPrevMonth() {
        router.push(
          `/month?ym=${date(year, month, day)
            .add(-1, 'month')
            .format('YYYYMM')}`
        );
      },
    };
  }, [year, month, day, router]);
}
