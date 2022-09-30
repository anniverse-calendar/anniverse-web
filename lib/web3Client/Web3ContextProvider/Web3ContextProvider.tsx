import { chains, providers } from '@web3modal/ethereum';
import React, { ReactNode, FC } from 'react';
import { Web3ModalProvider } from '@web3modal/react';
import { useProviderState, Web3Context } from './useProviderState';

export const Web3ContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  console.log(process.env.NODE_ENV);
  const value = useProviderState();
  return (
    <Web3ModalProvider
      config={{
        projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
        ethereum: {
          appName: 'web3Modal',
          autoConnect: true,
          chains:
            process.env.NODE_ENV === 'production'
              ? [chains.mainnet]
              : [chains.goerli],
          // [chains.goerli],
          providers: [
            providers.walletConnectProvider({
              projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
            }),
          ],
        },
      }}
    >
      <Web3Context.Provider value={value}>{children}</Web3Context.Provider>{' '}
    </Web3ModalProvider>
  );
};
