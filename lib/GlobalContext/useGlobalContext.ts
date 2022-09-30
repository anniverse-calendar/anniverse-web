import { useContext } from 'react';
import { Provider, GlobalContext } from './useProviderState';

export function useGlobalContext(): Provider {
  const context = useContext(GlobalContext);
  return context;
}
