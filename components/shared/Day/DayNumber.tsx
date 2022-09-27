import {
  Link,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ComponentProps, forwardRef } from 'react';
import { Day } from './Day';

export const DayNumber = forwardRef<{}, ComponentProps<typeof Day>>(
  function Component(props, ref) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <>
        <Link
          w="7"
          h="7"
          borderRadius="full"
          display="flex"
          justifyContent="center"
          alignItems="center"
          {...(props.anniversary == null || props.anniversary?.isEmpty
            ? {}
            : {
                bgColor: 'red.600',
                color: 'white',
              })}
          onClick={onOpen}
        >
          <Text fontSize="sm">{props.day}</Text>
        </Link>

        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <Day {...props} />
          </ModalContent>
        </Modal>
      </>
    );
  }
);
