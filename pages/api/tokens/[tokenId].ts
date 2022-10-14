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
    image: `https://${req.headers.host}/api/tokens/${tokenId}/thumbnail.png`,
    external_url: `https://${req.headers.host}/day/${
      dayjs().year() * 10000 + Number(tokenId)
    }`,
    description: anniversary.description || 'No description. please set to NFT',
    name:
      anniversary.name ||
      `${anniversary.month}月${anniversary.day}日 Anniverse`,
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
