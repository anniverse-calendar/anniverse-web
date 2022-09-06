import { web3Provider, createWeb3Client } from '../functions/createWeb3Client';
import type { Client } from '../functions/createWeb3Client';
import { createContext } from 'react';

export type Context = {
  connect(): Promise<void>;
  isConnected(): boolean;
  web3Client(): Promise<Client>;
};

let web3Client: Client | undefined = undefined;

export const defaultContext: Context = {
  isConnected() {
    return web3Client != null;
  },
  async connect() {
    if (web3Client === undefined) {
      web3Client = createWeb3Client(await web3Provider());
    }
  },
  async web3Client() {
    if (web3Client === undefined) {
      web3Client = createWeb3Client(await web3Provider());
    }
    return web3Client;
  },
};
export const Web3Context = createContext<Context>(defaultContext);
