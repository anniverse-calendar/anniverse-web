import { useEffect, useState } from 'react';
import { useWeb3Context } from '../../../lib/web3Client';
import { useToast } from '@chakra-ui/react';

export type Anniversary = {
  name: string;
  description: string;
  author: string;
  authorUrl: string;
  isEmpty: boolean;
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
  const toast = useToast();
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
      if (finishFetch()) {
        toast({
          title: 'ミントしました！',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      }
      finishFetch();
      // console.log('transfer', e);
      web3Client.contract.hasMinted(month, day).then(setIsMinted);
      web3Client.contract.isMinter(month, day).then(setCanEdit);
    });
    web3Client.contract.on(
      web3Client.contract.filters.AnniversaryUpdated(),
      (e) => {
        if (finishFetch()) {
          toast({
            title: '更新しました！',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
          fetch(`/api/revalidate`, {
            method: 'POST',
            body: JSON.stringify({
              month,
              day,
            }),
          });
        }
        // console.log('anniversary updated', e);
        web3Client.contract.anniversary(tokenId).then(setAnniversary);
        web3Client.contract.hasMinted(month, day).then(setIsMinted);
        web3Client.contract.isMinter(month, day).then(setCanEdit);
      }
    );
  }, [web3Client, month, day, setAnniversary, finishFetch, toast]);

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
        finishFetch();
        toast({
          title: 'ミントに失敗しました',
          status: 'warning',
          duration: 9000,
          isClosable: true,
        });
        console.warn(e);
      }
    },
    async update(data: Anniversary) {
      if (web3Client == null) return;
      startFetch();
      const tokenId = tokenIdFromMonthDay(month, day);
      try {
        await web3Client?.contract.setAnniversary(
          tokenId,
          data.name,
          data.description,
          data.author,
          data.authorUrl
        );
      } catch (e) {
        finishFetch();
        toast({
          title: '更新に失敗しました',
          status: 'warning',
          duration: 9000,
          isClosable: true,
        });
        console.warn(e);
      }
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
