import { createContext, useState } from 'react';

type State = {
  processing: boolean;
};

const initialState: State = {
  processing: false,
};

export type Provider = State & {
  startMutate(): boolean;
  finishMutate(): boolean;
};

export const useProviderState = (): Provider => {
  const [state, setState] = useState<State>(initialState);

  return {
    ...state,
    startMutate() {
      const hasFetched = state.processing;
      setState((old) => ({ ...old, processing: true }));
      return hasFetched;
    },
    finishMutate() {
      const hasFetched = state.processing;
      setState((old) => ({ ...old, processing: false }));
      return hasFetched;
    },
  };
};

export const GlobalContext = createContext<Provider>({
  ...initialState,
  startMutate() {
    return false;
  },
  finishMutate() {
    return false;
  },
});
