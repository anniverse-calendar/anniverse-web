import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../lib/GlobalContext';
import { useToast } from '@chakra-ui/react';
import { useAnniverseContract } from '../../../lib/anniverse/useAnniverseContract';
import { Signer } from 'ethers';

export type Anniversary = {
  name: string;
  description: string;
  author: string;
  authorUrl: string;
  isEmpty: boolean;
};

export type UseAnniversaryResult = {
  value?: Anniversary;
  isLoaded: boolean;
  isMinted: boolean;
  canEdit: boolean;
  mint(): Promise<void>;
  update(data: Anniversary): Promise<void>;
};

export function useAnniversary(
  month: number,
  day: number,
  signer: Signer | null,
  defaultValue?: Anniversary
): UseAnniversaryResult {
  const toast = useToast();
  const [anniversary, setAnniversary] = useState<Anniversary | undefined>(
    defaultValue
  );
  const { contract } = useAnniverseContract(signer);
  const { startMutate, finishMutate } = useGlobalContext();
  const [isMinted, setIsMinted] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (contract == null || signer == null) return;

    const tokenId = tokenIdFromMonthDay(month, day);
    contract.on(contract.filters.Transfer(), (e) => {
      if (finishMutate()) {
        toast({
          title: 'ミントしました！',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      }
      finishMutate();
      // console.log('transfer', e);
      contract.hasMinted(month, day).then(setIsMinted);
      contract.isMinter(month, day).then(setCanEdit);
    });
    contract.on(contract.filters.AnniversaryUpdated(), (e) => {
      if (finishMutate()) {
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
      contract.anniversary(tokenId).then(setAnniversary);
      contract.hasMinted(month, day).then(setIsMinted);
      contract.isMinter(month, day).then(setCanEdit);
    });

    // contract.ownerOf(month * 100 + day).then((res) => {
    //   console.log({ signer });
    //   console.log('ownerOf', res);
    // });
    Promise.all([
      contract.hasMinted(month, day).then(setIsMinted),
      contract.isMinter(month, day).then(setCanEdit),
    ]).then(() => {
      setIsLoaded(true);
    });
  }, [
    signer,
    month,
    day,
    setAnniversary,
    finishMutate,
    toast,
    contract,
    setIsLoaded,
  ]);

  return {
    value: anniversary,
    isLoaded,
    isMinted,
    canEdit,
    async mint() {
      if (contract == null || signer == null) return;
      try {
        startMutate();
        await contract.mint(month, day);
      } catch (e) {
        finishMutate();
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
      if (contract == null || signer == null) return;
      startMutate();
      const tokenId = tokenIdFromMonthDay(month, day);
      try {
        await contract.setAnniversary(
          tokenId,
          data.name,
          data.description,
          data.author,
          data.authorUrl
        );
      } catch (e) {
        finishMutate();
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
