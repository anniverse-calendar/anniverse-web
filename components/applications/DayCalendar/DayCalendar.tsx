import { LinkIcon } from '@chakra-ui/icons';
import {
  Link,
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { ReactNode, useMemo } from 'react';
import { WEEK_DAYS } from '../../../lib/date/constants';
import { useWeb3Context } from '../../../lib/web3Client/useWeb3Context';
import { formatWareki } from '../../../lib/date/formatWareki';
import { AnniversaryFormModal } from './AnniversaryForm';
import { useAnniversary } from './useAnniversary';

const Day: React.FC<{
  year: number;
  month: number;
  day: number;
  anniversary?: {
    name: string;
    description: string;
    author: string;
    authorUrl: string;
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
    <Stack w="full" h="100vh" justifyContent="center" alignItems="center">
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

export const DayCalendar: React.FC<{
  year: number;
  month: number;
  day: number;
  anniversary: {
    name: string;
    description: string;
    author: string;
    authorUrl: string;
  };
}> = ({ year, month, day, anniversary }) => {
  const { web3Client, connect } = useWeb3Context();
  const { value, update, mint, isMinted, canEdit } = useAnniversary(
    month,
    day,
    anniversary
  );

  return (
    <Day
      year={year}
      month={month}
      day={day}
      anniversary={value}
      footer={
        web3Client == null ? (
          <Button
            onClick={(e) => {
              e.preventDefault();
              connect();
            }}
            leftIcon={<LinkIcon />}
          >
            ログイン
          </Button>
        ) : !isMinted ? (
          <Button
            onClick={(e) => {
              e.preventDefault();
              mint();
            }}
            leftIcon={<LinkIcon />}
          >
            ミント
          </Button>
        ) : (
          <AnniversaryFormModal
            disabled={!canEdit}
            defaultValues={value}
            onSubmit={update}
          />
        )
      }
    />
  );
};
