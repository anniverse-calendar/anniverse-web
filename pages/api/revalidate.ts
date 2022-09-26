import dayjs from 'dayjs';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('start revalidate', req.query, req.body);
  if (req.method !== 'POST') {
    return res.status(400).send('Bad request');
  }
  const revalidate = async (path: string) => {
    try {
      await res.revalidate(path);
    } catch (e) {
      console.warn('revalidate error', e);
    }
  };
  try {
    const body = JSON.parse(req.body);
    const month = Number(body.month);
    const day = Number(body.day);

    console.log('revalidate: month calendar');
    await revalidate('/month');
    console.log('revalidate: year calendar');
    await revalidate('/year');
    console.log('revalidate: calendar');
    await revalidate('/api/calendar.ics');

    for (
      let year = dayjs().subtract(10, 'year').year();
      year <= dayjs().add(10, 'year').year();
      year++
    ) {
      const yyyymmdd = dayjs(new Date(year, month - 1, day)).format('YYYYMMDD');
      console.log('revalidate: day calendar', yyyymmdd);
      await revalidate(`/day/${yyyymmdd}`);
      console.log('revalidate: ogp', yyyymmdd);
      await revalidate(`/api/day/${yyyymmdd}/ogp.png`);
    }

    console.log('revalidate: success');

    return res.json({ revalidated: true });
  } catch (err) {
    console.error(err);
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}
