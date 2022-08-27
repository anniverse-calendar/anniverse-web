import React, { ReactNode, FC } from 'react';
import { web3Client, Web3Context } from './context';

export const Web3Provider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Web3Context.Provider value={web3Client}>{children}</Web3Context.Provider>
  );
};
