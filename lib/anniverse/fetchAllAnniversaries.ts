import type { AnniversariesPropType } from '../types/AnniversariesPropType';
import { Client } from '../web3Client/createWeb3Client';

export async function fetchAllAnniversaries(
  client: Client
): Promise<AnniversariesPropType> {
  const calendar: AnniversariesPropType['calendar'] = {};
  const promises: Promise<void>[] = [];
  for (let month = 1; month <= 12; month++) {
    calendar[month] = {};
    for (let day = 1; day <= 31; day++) {
      const tokenId = month * 100 + day;
      promises.push(
        client.contract.anniversary(tokenId).then((anniversary) => {
          calendar[month][day] = {
            name: anniversary.name,
            description: anniversary.name,
            author: anniversary.author,
            authorUrl: anniversary.authorUrl,
            isEmpty: anniversary.isEmpty,
          };
        })
      );
    }
  }
  await Promise.all(promises);

  return { calendar };
}
