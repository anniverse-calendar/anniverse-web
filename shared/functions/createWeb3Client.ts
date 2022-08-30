import { ethers } from 'ethers';
import AnniversaryTokenJSON from '../../generated/artifacts/AnniversaryToken.json';
import type { AnniversaryToken } from '../../generated/typechain-types/contracts/AnniversaryToken';

export type Client = {
  provider: ethers.providers.JsonRpcProvider;
  contract: AnniversaryToken;
};

export function createWeb3Client(): Client {
  const provider = getProvider();
  const { abi } = AnniversaryTokenJSON;
  const contract = new ethers.Contract(
    getTokenAddress(),
    abi,
    provider.getSigner()
  ) as AnniversaryToken;

  return {
    provider,
    contract,
  };
}

/**
 * PRIVATE
 */

function getTokenAddress(): string {
  return process.env.NEXT_PUBLIC_ANNIVERSARY_TOKEN_ADDRESS!;
}

function getProvider() {
  return new ethers.providers.JsonRpcProvider('http://localhost:8545');
  // if (process.env.NEXT_PUBLIC_ANNIVERSARY_TOKEN_ADDRESS === 'localhost') {
  //   return new ethers.providers.JsonRpcProvider();
  // } else {
  //   return new ethers.providers.AlchemyProvider(
  //     process.env.NEXT_PUBLIC_ANNIVERSARY_TOKEN_ADDRESS
  //   );
  // }
}
