import React, { ReactNode, FC } from 'react';
import { useProviderState, GlobalContext } from './useProviderState';

export const GlobalContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const value = useProviderState();
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
