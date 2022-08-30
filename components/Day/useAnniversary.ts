import { useEffect, useState } from 'react';
import { useWeb3Context } from '../../shared/context/useWeb3Context';

export type Anniversary = {
  name: string;
  description: string;
};

export function useAnniversary(month: number, day: number): Anniversary {
  const [anniversary, setAnniversary] = useState<Anniversary>({
    name: '',
    description: '',
  });
  const { client } = useWeb3Context();
  useEffect(() => {
    const tokenId = tokenIdFromMonthDay(month, day);
    client.contract.anniversary(tokenId).then(setAnniversary);
  }, [client, month, day]);

  return anniversary;
}

/**
 * PRIVATE
 */

/**
 *
 * @param month
 * @param day
 * @returns tokenId (mdd)
 */
function tokenIdFromMonthDay(month: number, day: number): number {
  return Number(`${month}${day.toString().padStart(2, '0')}`);
}
