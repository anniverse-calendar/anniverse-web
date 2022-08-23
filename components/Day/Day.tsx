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
import { WEEK_DAYS } from '../../lib/constants';

type DayProps = {
  year: number;
  month: number;
  day: number;
};

export const Day: React.FC<DayProps> = ({ year, month, day }) => {
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
      <Box maxW="500px">
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
            〇〇記念日
          </Text>
        </Flex>
        <Stack padding="5">
          <Text>
            Christがキリスト、masはミサ（礼拝）という意味です。
            クリスマスとは「キリストのミサ」という意味であり、世界のキリスト教国ではキリストの降誕をお祝いする日です。
            現在では「クリスマス」という言葉自体が降誕祭を表す名詞になっていることは世界共通。
            クリスマスの決まった挨拶といえば「Merry Christmas!」
          </Text>
          <Flex justifyContent="flex-end" alignItems="center" gap="2">
            <Text>10ETH</Text>
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
