import { useContext } from 'react';
import { Context, Web3Context } from './context';

export function useWeb3Context(): Context {
  const context = useContext(Web3Context);
  return context;
}
