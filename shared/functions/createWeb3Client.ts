import { ethers } from 'ethers';
import AnniversaryTokenJSON from '../../generated/artifacts/AnniversaryToken.json';
import type { AnniversaryToken } from '../../generated/typechain-types/contracts/AnniversaryToken';
import Web3Modal from 'web3modal';

export type Client = {
  provider: ethers.providers.JsonRpcProvider | ethers.providers.Web3Provider;
  contract: AnniversaryToken;
};

const networkAddress =
  process.env.NEXT_PUBLIC_ANNIVERSARY_TOKEN_NETWORK_ADDRESS ??
  'http://localhost:8545';

export async function web3Provider(): Promise<ethers.providers.Web3Provider> {
  const web3Modal = new Web3Modal({
    network: 'localhost', // optional
    cacheProvider: true, // optional
    providerOptions: {}, // required
  });
  const instance = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(instance);
  return provider;
}

export function jsonRpcProvider(): ethers.providers.JsonRpcProvider {
  const provider = new ethers.providers.JsonRpcProvider(networkAddress);
  return provider;
}

export function createWeb3Client(
  provider: ethers.providers.JsonRpcProvider | ethers.providers.Web3Provider
): Client {
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
