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

  if (anniversary.isEmpty) {
    return res.status(404).send('Not found');
  }

  return res.json({
    description: anniversary.description,
    external_url: `https://${req.headers.host}/${
      dayjs().year() * 10000 + tokenId
    }`,
    image: `https://${req.headers.host}/api/tokens/${tokenId}/thumbnail.png`,
    name: anniversary.name,
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
