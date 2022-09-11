import {
  Link,
  Avatar,
  Badge,
  Box,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { ReactNode, useMemo } from 'react';
import { WEEK_DAYS } from '../../../lib/date/constants';
import { formatWareki } from '../../../lib/date/formatWareki';

export const Day: React.FC<{
  year: number;
  month: number;
  day: number;
  anniversary?: {
    name: string;
    description: string;
    author: string;
    authorUrl: string;
    isEmpty: boolean;
  };
  footer?: ReactNode;
}> = ({ year, month, day, anniversary, footer }) => {
  const weekday = useMemo(() => {
    const date = dayjs(new Date(year, month, day));
    return WEEK_DAYS[date.day()];
  }, [year, month, day]);
  const wareki = useMemo(
    () => formatWareki(new Date(year, month - 1, 1)),
    [year, month]
  );
  return (
    <Stack
      w="full"
      padding="5"
      justifyContent="center"
      alignItems="center"
      gap="3"
    >
      <Flex justifyContent="space-between" w="full" maxW="500px">
        <Text padding="5" fontSize="4xl">
          {year}年
        </Text>
        <Text padding="5" fontSize="4xl">
          {month}月
        </Text>
        <Text padding="5" fontSize="4xl">
          {wareki}
        </Text>
      </Flex>
      <Heading fontSize="300px">{day}</Heading>
      <Box maxW="500px" w="full">
        <Flex justifyContent="space-between" w="full">
          <Badge
            padding="5"
            fontSize="4xl"
            fontWeight="bold"
            borderRadius="full"
            display="flex"
            alignItems="center"
          >
            {weekday}曜日
          </Badge>
          <Text padding="5" fontSize="4xl">
            {anniversary?.name}
          </Text>
        </Flex>
        <Stack padding="5">
          <Text>{anniversary?.description}</Text>
          <Flex justifyContent="flex-end" alignItems="center" gap="2">
            {anniversary?.author && (
              <Link
                href={anniversary.authorUrl || '#'}
                target="_blank"
                rel="noreferrer"
                display="inline-flex"
                alignItems="center"
                gap="2"
              >
                <Text>{anniversary.author}</Text>
                <Avatar size="sm" />
              </Link>
            )}
          </Flex>
          <Flex justifyContent="flex-end" alignItems="center" gap="2">
            {footer}
          </Flex>
        </Stack>
      </Box>
    </Stack>
  );
};
