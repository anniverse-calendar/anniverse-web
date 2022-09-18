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
  size?: 'lg' | 'sm';
}> = ({ year, month, day, anniversary, footer, size = 'lg' }) => {
  const weekday = useMemo(() => {
    const date = dayjs(new Date(year, month, day));
    return WEEK_DAYS[date.day()];
  }, [year, month, day]);
  const wareki = useMemo(
    () => formatWareki(new Date(year, month - 1, 1)),
    [year, month]
  );
  const sizes =
    size === 'lg'
      ? { text: '4xl', containerW: '500px', dayFontSize: '300px' }
      : { text: 'xl', containerW: '400px', dayFontSize: '180px' };
  return (
    <Stack
      w="full"
      padding="5"
      justifyContent="center"
      alignItems="center"
      gap="3"
    >
      <Box maxW={sizes.containerW} w="full">
        <Flex justifyContent="space-between" w="full">
          <Text padding="5" fontSize={sizes.text}>
            {year}年
          </Text>
          <Text padding="5" fontSize={sizes.text}>
            {month}月
          </Text>
          <Text padding="5" fontSize={sizes.text}>
            {wareki}
          </Text>
        </Flex>
        <Heading fontSize={sizes.dayFontSize} w="full" textAlign="center">
          {day}
        </Heading>
      </Box>
      <Box maxW={sizes.containerW} w="full">
        <Flex justifyContent="space-between" w="full">
          <Badge
            padding="5"
            fontSize={sizes.text}
            fontWeight="bold"
            borderRadius="full"
            display="flex"
            alignItems="center"
          >
            {weekday}曜日
          </Badge>
          <Text padding="5" fontSize={sizes.text}>
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
