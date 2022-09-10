import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { parseYYYYMMDD } from './parseYYYYMMDD';

export function useParamsYMD(): {
  year: number;
  month: number;
  day: number;
} {
  const router = useRouter();
  const { ym, ymd } = router.query;
  const param =
    ym != null ? `${ym}01` : ymd != null ? ymd : dayjs().format('YYYYMMDD');
  return parseYYYYMMDD(param);
}
