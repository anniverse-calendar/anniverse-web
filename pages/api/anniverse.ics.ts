import type { NextApiRequest, NextApiResponse } from 'next';
import { createWeb3Client } from '../../lib/web3Client';
import ical from 'ical-generator';
import { fetchAllAnniversaries } from '../../lib/anniverse/fetchAllAnniversaries';
import dayjs from 'dayjs';
import { Anniversary } from '../../lib/types/AnniversariesPropType';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  const calendar = ical({ name: 'Anniverse' });
  const client = createWeb3Client();
  const anniversaries = await fetchAllAnniversaries(client);
  const createEvent = (
    year: number,
    month: number,
    day: number,
    anniversary: Anniversary
  ) => {
    if (anniversary.isEmpty) return;
    const date = dayjs(new Date(year, month - 1, day));
    calendar.createEvent({
      start: date.startOf('day').toDate(),
      end: date.endOf('day').toDate(),
      summary: anniversary.name,
      description: anniversary.description,
      url: `${
        process.env.NEXT_PUBLIC_HTTP_HOST ?? 'http://localhost:3000'
      }/day/${date.format('YYYYMMDD')}`,
    });
  };

  for (
    let year = dayjs().year();
    year <= dayjs().add(3, 'year').year();
    year++
  ) {
    Object.keys(anniversaries.calendar).map((month) => {
      Object.keys(anniversaries.calendar[Number(month)]).map((day) => {
        createEvent(
          year,
          Number(month),
          Number(day),
          anniversaries.calendar[Number(month)][Number(day)]
        );
      });
    });
  }

  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  calendar.serve(res);
}
