import { useAccount, useSigner } from '@web3modal/react';
import { useConnectModal } from '@web3modal/react';
import { FC, ReactNode } from 'react';
import { Button, Spinner, Text } from '@chakra-ui/react';
import { LinkIcon } from '@chakra-ui/icons';
import { Signer } from 'ethers';
import { useRetry } from '../../../lib/useRetry';

export const RequireWallet: FC<{
  children(signer: Signer): ReactNode;
}> = ({ children }) => {
  return (
    <RequireAccount>
      <RequireSigner>{(signer) => children(signer)}</RequireSigner>
    </RequireAccount>
  );
};

/**
 * PRIVATE
 */
const RequireSigner: FC<{
  children(signer: Signer): ReactNode;
}> = ({ children }) => {
  const { signer, refetch, isLoading, error } = useSigner();
  const { retrying } = useRetry(
    () => refetch({}),
    isLoading || signer != null || error != null
  );

  if (isLoading || retrying) return <Spinner />;
  if (error) return <Text>{JSON.stringify(error)}</Text>;

  if (signer == null) {
    return (
      <Button
        onClick={(e) => {
          e.preventDefault();
          refetch({});
        }}
        leftIcon={<LinkIcon />}
      >
        ログイン状態を再取得
      </Button>
    );
  }

  return <>{children(signer)}</>;
};

const RequireAccount: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { open } = useConnectModal();
  const { address } = useAccount();

  if (!address) {
    return (
      <Button
        onClick={(e) => {
          e.preventDefault();
          open();
        }}
        leftIcon={<LinkIcon />}
      >
        ログインして祝日を購入
      </Button>
    );
  }

  return <>{children}</>;
};
