import type { AnniversariesPropType } from '../types/AnniversariesPropType';
import { Client } from '../web3Client/createWeb3Client';

export async function fetchAllAnniversaries(
  client: Client
): Promise<AnniversariesPropType> {
  const calendar: AnniversariesPropType['calendar'] = {};
  const anniversaries = await client.contract.anniversaries365();
  anniversaries.forEach((anniversary) => {
    const month = anniversary.month;
    const day = anniversary.day;
    if (calendar[month] == null) calendar[month] = {};
    calendar[month][day] = {
      name: anniversary.name,
      description: anniversary.description,
      author: anniversary.author,
      authorUrl: anniversary.authorUrl,
      isEmpty: anniversary.isEmpty,
    };
  });

  return { calendar };
}
