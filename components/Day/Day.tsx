import { EditIcon } from '@chakra-ui/icons';
import {
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
import { useMemo } from 'react';
import { WEEK_DAYS } from '../../shared/constants';
import { useAnniversary } from './useAnniversary';

const DayTemplate: React.FC<{
  year: number;
  month: number;
  day: number;
  anniversary: {
    name: string;
    description: string;
  };
}> = ({ year, month, day, anniversary }) => {
  const weekday = useMemo(() => {
    const date = dayjs(new Date(year, month, day));
    return WEEK_DAYS[date.day()];
  }, [year, month, day]);
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
          令和1年
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
          >
            {weekday}曜日
          </Badge>
          <Text padding="5" fontSize="4xl">
            {anniversary.name}
          </Text>
        </Flex>
        <Stack padding="5">
          <Text>{anniversary.description}</Text>
          <Flex justifyContent="flex-end" alignItems="center" gap="2">
            <Text>@hoge</Text>
            <Avatar size="sm" />
          </Flex>
          <Flex justifyContent="flex-end" alignItems="center" gap="2">
            <Button leftIcon={<EditIcon />}>記念日を登録する</Button>
          </Flex>
        </Stack>
      </Box>
    </Stack>
  );
};

export const Day: React.FC<{
  year: number;
  month: number;
  day: number;
}> = ({ year, month, day }) => {
  const anniversary = useAnniversary(month, day);

  return (
    <DayTemplate
      year={year}
      month={month}
      day={day}
      anniversary={anniversary}
    />
  );
};
