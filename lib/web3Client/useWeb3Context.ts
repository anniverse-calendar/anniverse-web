import { useContext } from 'react';
import { Provider, Web3Context } from './Web3ContextProvider/useProviderState';

export function useWeb3Context(): Provider {
  const context = useContext(Web3Context);
  return context;
}
