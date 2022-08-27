import { createWeb3Client } from '../functions/createWeb3Client';
import type { Client } from '../functions/createWeb3Client';
import { createContext } from 'react';

export const web3Client = createWeb3Client();
export const Web3Context = createContext<Client>(web3Client);
