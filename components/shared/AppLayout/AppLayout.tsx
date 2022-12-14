import { FC, ReactNode } from 'react';
import { Text, Flex, Radio, RadioGroup, Stack, Box } from '@chakra-ui/react';
import { StatefulMiniCalendar } from '../MiniCalendar';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { useParamsYMD } from '../../../lib/date/useParamsYMD';
import { AnniversariesPropType } from '../../../lib/types/AnniversariesPropType';
import { CalendarUrl } from '../CalendarUrl';
import { ShareButtons } from '../ShareButtons';
import { OpenSeaLink } from '../OpenSeaLink';

export const AppLayout: FC<{ children: ReactNode } & AnniversariesPropType> = ({
  children,
  calendar,
}) => {
  const router = useRouter();
  const { year, month } = useParamsYMD();
  return (
    <Flex alignItems="stretch">
      <Stack
        borderRight="1px"
        borderColor="gray.100"
        paddingX="3"
        height="100vh"
        position="sticky"
        top="0"
      >
        <StatefulMiniCalendar
          defaultYear={year}
          defaultMonth={month}
          anniversaries={calendar}
        />

        <Box paddingX="3">
          <RadioGroup
            defaultValue={router.pathname === '/month' ? '/month' : '/year'}
            onChange={(path) => {
              router.replace(
                `${path}?ym=${dayjs(new Date(year, month - 1, 1)).format(
                  'YYYYMM'
                )}`
              );
            }}
          >
            <Stack spacing={5} direction="row">
              <Text fontSize="sm">表示</Text>
              <Radio colorScheme="red" value="/year">
                年
              </Radio>
              <Radio colorScheme="red" value="/month">
                月
              </Radio>
            </Stack>
          </RadioGroup>
        </Box>

        <Box paddingTop="10">
          <CalendarUrl />
        </Box>
        <Box paddingTop="10">
          <Text marginBottom="3">SHARE</Text>
          <ShareButtons />
        </Box>
        <OpenSeaLink paddingTop="5" />
      </Stack>
      <Stack w="full">{children}</Stack>
    </Flex>
  );
};
