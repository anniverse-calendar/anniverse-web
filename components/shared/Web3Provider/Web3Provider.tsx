import { chains, providers } from '@web3modal/ethereum';
import React, { ReactNode, FC } from 'react';
import { Web3ModalProvider } from '@web3modal/react';

export const Web3Provider: FC<{ children: ReactNode }> = ({ children }) => {
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
          providers: [
            providers.walletConnectProvider({
              projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
            }),
          ],
        },
      }}
    >
      {children}
    </Web3ModalProvider>
  );
};
