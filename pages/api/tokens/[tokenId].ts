import dayjs from 'dayjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createWeb3Client } from '../../../lib/web3Client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(400).send('Bad request');
  }

  const tokenId = req.query.tokenId;
  if (Array.isArray(tokenId) || tokenId == null) {
    return res.status(400).send('Bad request');
  }

  const client = createWeb3Client();
  const anniversary = await client.contract.anniversary(tokenId);

  return res.json({
    description: anniversary.description,
    external_url: `https://${req.headers.host}/day/${
      dayjs().year() * 10000 + Number(tokenId)
    }`,
    image: `https://${req.headers.host}/api/tokens/${tokenId}/thumbnail.png`,
    name: anniversary.name || 'Anniverse',
    attributes: [
      {
        trait_type: 'Month',
        value: anniversary.month,
      },
      {
        trait_type: 'Day',
        value: anniversary.day,
      },
    ],
  });
}
