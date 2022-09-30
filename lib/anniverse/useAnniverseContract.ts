import { useContract } from '@web3modal/react';
import { Signer } from 'ethers';
import AnniversaryTokenJSON from '../../generated/artifacts/AnniversaryToken.json';
import { AnniversaryToken } from '../../generated/typechain-types';
import { useRetry } from '../useRetry';

const { abi } = AnniversaryTokenJSON;
const options = (signer: Signer | null) => ({
  addressOrName: process.env.NEXT_PUBLIC_ANNIVERSARY_TOKEN_ADDRESS!,
  contractInterface: abi,
  signerOrProvider: signer,
});

export const useAnniverseContract = (
  signer: Signer | null
): {
  contract: AnniversaryToken | null;
} => {
  const { contract, refetch, error } = useContract(options(signer));
  useRetry(
    () =>
      new Promise((resolve) => {
        resolve(refetch(options(signer)));
      }),
    signer == null || contract != null || error != null
  );

  if (error) {
    console.error(error);
  }

  if (signer == null || contract == null || error)
    return {
      contract: null,
    };

  return {
    contract: contract as AnniversaryToken,
  };
};
