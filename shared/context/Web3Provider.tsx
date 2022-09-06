import React, { ReactNode, FC, useMemo } from 'react';
import { defaultContext, Web3Context } from './context';

export const Web3Provider: FC<{ children: ReactNode }> = ({ children }) => {
  const client = useMemo(() => defaultContext, []);
  return <Web3Context.Provider value={client}>{children}</Web3Context.Provider>;
};
