import { ethers } from 'ethers';
import AnniversaryTokenJSON from '../../generated/artifacts/AnniversaryToken.json';
import type { AnniversaryToken } from '../../generated/typechain-types/contracts/AnniversaryToken';
import Web3Modal from 'web3modal';

export type Client = {
  contract: AnniversaryToken;
};

export async function web3Modal(): Promise<ethers.Signer> {
  const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions: {}, // required
  });
  const instance = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(instance);
  return provider.getSigner();
}

export function getProvider(): ethers.providers.BaseProvider {
  const network =
    process.env.NEXT_PUBLIC_WEB3_NETWORK ?? 'http://localhost:8545';
  const provider = ethers.providers.getDefaultProvider(network, {
    alchemy: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  });
  return provider;
}

export function createWeb3Client(
  providerOrSigner?:
    | ethers.providers.JsonRpcProvider
    | ethers.providers.Web3Provider
    | ethers.Signer
): Client {
  const { abi } = AnniversaryTokenJSON;
  const contract = new ethers.Contract(
    getTokenAddress(),
    abi,
    providerOrSigner ?? getProvider()
  ) as AnniversaryToken;

  return {
    contract,
  };
}

/**
 * PRIVATE
 */

function getTokenAddress(): string {
  return process.env.NEXT_PUBLIC_ANNIVERSARY_TOKEN_ADDRESS!;
}
