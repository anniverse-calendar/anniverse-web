import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  useClipboard,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';

export const CalendarUrl: FC = () => {
  const [value, setValue] = useState('');
  const { hasCopied, onCopy } = useClipboard(value);
  useEffect(() => {
    setValue(`${location.origin}/api/anniverse.ics`);
  }, []);

  return (
    <FormControl>
      <FormLabel>カレンダーのURL</FormLabel>
      <Flex w="full">
        <Input value={value} isReadOnly placeholder="Welcome" />
        <Button onClick={onCopy} ml={2}>
          {hasCopied ? 'しました' : 'コピー'}
        </Button>
      </Flex>
      <FormHelperText>Googleカレンダーなどにインポートできます</FormHelperText>
    </FormControl>
  );
};
