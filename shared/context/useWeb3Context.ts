import { useContext } from 'react';
import { Client } from '../functions/createWeb3Client';
import { Web3Context } from './context';

export function useWeb3Context(): { client: Client } {
  const client = useContext(Web3Context);
  return { client };
}
