import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  Flex,
  Progress,
  Text,
} from '@chakra-ui/react';
import { FC, useRef } from 'react';
import { useGlobalContext } from '../../../lib/GlobalContext';
import { EthereumIcon } from '../../icons/EthereumIcon';

export const Loading: FC = () => {
  const { processing } = useGlobalContext();
  const cancelRef = useRef(null);
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={() => {}}
      isOpen={processing}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogBody>
          <Progress size="xs" isIndeterminate />
          <Flex justifyContent="center" paddingY="10">
            <EthereumIcon />
          </Flex>
          <Text marginBottom="3">
            トランザクションを実行してください。その後、しばらくお待ち下さい
          </Text>
        </AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  );
};
