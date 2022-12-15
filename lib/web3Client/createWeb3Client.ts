import { ethers } from 'ethers';
import AnniversaryTokenJSON from '../../generated/artifacts/AnniversaryToken.json';
import type { AnniversaryToken } from '../../generated/typechain-types/contracts/AnniversaryToken';

export type Client = {
  contract: AnniversaryToken;
};

export function createWeb3Client(): Client {
  const { abi } = AnniversaryTokenJSON;
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_ANNIVERSARY_TOKEN_ADDRESS!,
    abi,
    getProvider()
  ) as AnniversaryToken;

  return {
    contract,
  };
}

/**
 * PRIVATE
 */

function getProvider(): ethers.providers.BaseProvider {
  const network =
    process.env.NEXT_PUBLIC_WEB3_NETWORK ?? 'http://localhost:8545';
  // const provider = ethers.providers.getDefaultProvider(network, {
  //   alchemy: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  // });
  // const provider = new ethers.providers.JsonRpcProvider('goerli');
  const provider = new ethers.providers.AlchemyProvider(
    network,
    process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!
  );
  // console.log({ provider, key: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY });
  return provider;
}
