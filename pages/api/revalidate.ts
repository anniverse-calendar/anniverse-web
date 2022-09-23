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
  try {
    const body = JSON.parse(req.body);
    const month = Number(body.month);
    const day = Number(body.day);

    console.log('revalidate: month calendar');
    await res.revalidate('/month');
    console.log('revalidate: year calendar');
    await res.revalidate('/year');
    console.log('revalidate: calendar');
    await res.revalidate('/api/calendar.ics');

    for (
      let year = dayjs().subtract(10, 'year').year();
      year <= dayjs().add(10, 'year').year();
      year++
    ) {
      try {
        const yyyymmdd = dayjs(new Date(year, month - 1, day)).format(
          'YYYYMMDD'
        );
        console.log('revalidate: day calendar', yyyymmdd);
        await res.revalidate(`/day/${yyyymmdd}`);
        console.log('revalidate: ogp', yyyymmdd);
        await res.revalidate(`/api/day/${yyyymmdd}/ogp.png`);
      } catch (e) {
        console.warn('revalidate error', e);
      }
    }

    console.log('revalidate: success');

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}
