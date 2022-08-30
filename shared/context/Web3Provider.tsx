import React, { ReactNode, FC, useMemo } from 'react';
import { web3Client, Web3Context } from './context';

export const Web3Provider: FC<{ children: ReactNode }> = ({ children }) => {
  const client = useMemo(() => web3Client, []);
  return <Web3Context.Provider value={client}>{children}</Web3Context.Provider>;
};
