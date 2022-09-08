import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  Flex,
  Progress,
} from '@chakra-ui/react';
import { FC, useRef } from 'react';
import { useWeb3Context } from '../../shared/context/useWeb3Context';
import { EthereumIcon } from '../icons/EthereumIcon';

export const Loading: FC = () => {
  const { fetching } = useWeb3Context();
  const cancelRef = useRef(null);
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={() => {}}
      isOpen={fetching}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogBody>
          <Progress size="xs" isIndeterminate />
          <Flex justifyContent="center" paddingY="10">
            <EthereumIcon />
          </Flex>
        </AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  );
};
