import {
  Link,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ComponentProps, FC } from 'react';
import { Day } from './Day';

export const DayNumber: FC<ComponentProps<typeof Day>> = (props) => {
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
              bgColor: 'blue.500',
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
};
