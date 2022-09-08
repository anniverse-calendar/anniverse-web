import { useCallback, useEffect, useState } from 'react';
import { useWeb3Context } from '../../shared/context/useWeb3Context';

export type Anniversary = {
  name: string;
  description: string;
};

export function useAnniversary(
  month: number,
  day: number,
  defaultValue?: Anniversary
): {
  value?: Anniversary;
  isMinted: boolean;
  canEdit: boolean;
  mint(): Promise<void>;
  update(data: Anniversary): Promise<void>;
} {
  const [anniversary, setAnniversary] = useState<Anniversary | undefined>(
    defaultValue
  );
  const { web3Client, startFetch, finishFetch } = useWeb3Context();
  const [isMinted, setIsMinted] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  useEffect(() => {
    if (web3Client == null) return;

    const tokenId = tokenIdFromMonthDay(month, day);
    web3Client.contract.on(web3Client.contract.filters.Transfer(), (e) => {
      finishFetch();
      console.log('transfer', e);
      web3Client.contract.hasMinted(month, day).then(setIsMinted);
      web3Client.contract.isMinter(month, day).then(setCanEdit);
    });
    web3Client.contract.on(
      web3Client.contract.filters.AnniversaryUpdated(),
      (e) => {
        finishFetch();
        console.log('anniversary updated', e);
        web3Client.contract.anniversary(tokenId).then(setAnniversary);
      }
    );
  }, [web3Client, month, day, setAnniversary, finishFetch]);

  return {
    value: anniversary,
    isMinted,
    canEdit,
    async mint() {
      if (web3Client == null) return;
      try {
        startFetch();
        await web3Client?.contract.mint(month, day);
      } catch (e) {
        console.warn(e);
      }
    },
    async update(data: Anniversary) {
      if (web3Client == null) return;
      startFetch();
      const tokenId = tokenIdFromMonthDay(month, day);
      web3Client?.contract.setAnniversary(tokenId, data.name, data.description);
    },
  };
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
  return month * 100 + day;
}
