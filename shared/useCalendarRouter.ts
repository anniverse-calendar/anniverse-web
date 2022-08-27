import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { parseYYYYMMDD } from './functions/parseYYYYMMDD';

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
  const { yyyymm, yyyymmdd } = router.query;
  const param = yyyymm ? `${yyyymm}01` : yyyymmdd;

  return useMemo(() => {
    const { year, month, day } = parseYYYYMMDD(param);
    return {
      params: {
        year,
        month,
        day,
      },
      goNextYear() {
        router.push(
          `/year/${date(year, month, day).add(1, 'year').format('YYYYMM')}`
        );
      },
      goPrevYear() {
        router.push(
          `/year/${date(year, month, day).add(-1, 'year').format('YYYYMM')}`
        );
      },
      goNextMonth() {
        router.push(
          `/month/${date(year, month, day).add(1, 'month').format('YYYYMM')}`
        );
      },
      goPrevMonth() {
        router.push(
          `/month/${date(year, month, day).add(-1, 'month').format('YYYYMM')}`
        );
      },
    };
  }, [param, router]);
}
