import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { assertAndParseInt } from './functions/assertAndParseInt';

export function useYearMonthQuery(): {
  year: number;
  month: number;
} {
  const router = useRouter();
  const q = router.query;

  return useMemo(
    () => ({
      year: q.year ? assertAndParseInt(q.year) : dayjs().year(),
      month: q.month ? assertAndParseInt(q.month) : dayjs().month() + 1,
    }),
    [q]
  );
}
