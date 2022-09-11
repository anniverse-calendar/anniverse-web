import {
  Link,
  Avatar,
  Badge,
  Box,
  Flex,
  Heading,
  Text,
  Stack,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { WEEK_DAYS } from '../../../lib/date/constants';
import { formatWareki } from '../../../lib/date/formatWareki';
import { MiniCalendar } from '../MiniCalendar';

export const DayHorizontal: React.FC<{
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
}> = ({ year, month, day, anniversary }) => {
  const weekday = useMemo(() => {
    const date = dayjs(new Date(year, month, day));
    return WEEK_DAYS[date.day()];
  }, [year, month, day]);
  const wareki = useMemo(
    () => formatWareki(new Date(year, month - 1, 1)),
    [year, month]
  );
  return (
    <Flex
      w="full"
      h="100vh"
      justifyContent="center"
      alignItems="center"
      gap="3"
      borderWidth={3}
      borderColor="red.300"
    >
      <Box flex={3}>
        <Flex justifyContent="center" w="full" gap="5">
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
        <Heading fontSize="300px" w="full" textAlign="center">
          {day}
        </Heading>
        <Flex justifyContent="center" w="full" gap="5">
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
      </Box>
      <Stack
        flex={1}
        alignSelf="stretch"
        alignItems="flex-end"
        justifyContent="space-between"
        marginX="20"
        marginY="14"
      >
        <Stack alignItems="flex-end">
          <Text marginRight="2">
            {year}年{month}月
          </Text>
          <MiniCalendar
            year={year}
            month={month}
            anniversaries={
              anniversary != null ? { [month]: { [day]: anniversary } } : {}
            }
          />
        </Stack>
        <Stack alignItems="flex-end">
          <Text>{anniversary?.description}</Text>
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
        </Stack>
      </Stack>
    </Flex>
  );
};
