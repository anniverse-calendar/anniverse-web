import {
  web3Provider,
  createWeb3Client,
} from '../../functions/createWeb3Client';
import type { Client } from '../../functions/createWeb3Client';
import { createContext, useState } from 'react';

type State = {
  fetching: boolean;
  web3Client: Client | undefined;
};

const initialState: State = {
  fetching: false,
  web3Client: undefined,
};

export type Provider = State & {
  connect(): Promise<void>;
  startFetch(): void;
  finishFetch(): void;
};

export const useProviderState = (): Provider => {
  const [state, setState] = useState<State>(initialState);

  return {
    ...state,
    async connect() {
      if (state.web3Client === undefined) {
        const web3Client = createWeb3Client(await web3Provider());
        setState((old) => ({
          ...old,
          web3Client,
        }));
      }
    },
    startFetch() {
      setState((old) => ({ ...old, fetching: true }));
    },
    finishFetch() {
      setState((old) => ({ ...old, fetching: false }));
    },
  };
};

export const Web3Context = createContext<Provider>({
  ...initialState,
  async connect() {},
  startFetch() {},
  finishFetch() {},
});
