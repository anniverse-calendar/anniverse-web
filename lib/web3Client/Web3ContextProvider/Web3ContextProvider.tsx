import React, { ReactNode, FC, useMemo } from 'react';
import { useProviderState, Web3Context } from './useProviderState';

export const Web3ContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const value = useProviderState();
  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};
