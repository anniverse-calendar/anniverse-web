import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Text,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Button,
} from '@chakra-ui/react';
import { FC } from 'react';
import { AppLayout } from '../../shared/AppLayout';
import { WEEK_DAYS } from '../../../lib/date/constants';
import type {
  AnniversariesPropType,
  Anniversary,
} from '../../../lib/types/AnniversariesPropType';
import { useCalendar } from '../../../lib/date/useCalendar';
import { useCalendarRouter } from '../../../lib/date/useCalendarRouter';
import NextLink from 'next/link';
import type { Dayjs } from 'dayjs';
import { DayNumber } from '../../shared/Day/DayNumber';
import { ShareButtons } from '../../shared/ShareButtons';

export const MonthCalendar: FC<AnniversariesPropType> = ({ calendar }) => {
  const { params, goNextMonth, goPrevMonth } = useCalendarRouter();
  const { days } = useCalendar(params.year, params.month);
  const getAnniversary = useAnniversary(calendar, params.month);
  return (
    <AppLayout calendar={calendar}>
      <Grid
        templateColumns="repeat(7, 1fr)"
        templateRows="40px 60px repeat(6, 1fr)"
        w="full"
        h="full"
      >
        <GridItem
          colSpan={7}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Flex
            borderBottom="1px"
            borderColor="gray.100"
            alignItems="center"
            w="full"
          >
            <ButtonGroup>
              <IconButton
                colorScheme="white"
                color="GrayText"
                icon={<ChevronLeftIcon />}
                aria-label="前月"
                onClick={goPrevMonth}
              />
              <IconButton
                colorScheme="white"
                color="GrayText"
                icon={<ChevronRightIcon />}
                aria-label="前月"
                onClick={goNextMonth}
              />
            </ButtonGroup>
            <Text fontSize="2xl">
              {params.year}年{params.month}月
            </Text>
          </Flex>
        </GridItem>
        {WEEK_DAYS.map((weekDay) => (
          <GridItem
            key={weekDay}
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderLeft="1px"
            borderColor="gray.100"
          >
            <Text fontSize="sm">{weekDay}</Text>
          </GridItem>
        ))}
        {days.map((day, i) => (
          <GridItem
            key={i}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            borderLeft="1px"
            borderBottom="1px"
            borderColor="gray.100"
            padding="3"
          >
            {day != null && (
              <DayNumber
                year={params.year}
                month={params.month}
                day={day.date()}
                anniversary={getAnniversary(day)}
                footer={
                  <Flex justifyContent="space-between" w="full">
                    <NextLink href={`/day/${day.format('YYYYMMDD')}`}>
                      <Button>全画面で開く</Button>
                    </NextLink>
                    <ShareButtons
                      title={
                        getAnniversary(day)?.name ??
                        'Anniverse: NFT祝日カレンダー'
                      }
                      url={generateUrl(`/day/${day.format('YYYYMMDD')}`)}
                    />
                  </Flex>
                }
              />
            )}
            <Text>{getAnniversary(day)?.name}</Text>
          </GridItem>
        ))}
      </Grid>
    </AppLayout>
  );
};

/**
 * PRIVATE
 */
const useAnniversary =
  (anniversaries: AnniversariesPropType['calendar'], month: number) =>
  (day: Dayjs | undefined): Anniversary | undefined => {
    if (day == null) return;
    if (anniversaries[month][day.date()].isEmpty) return;
    return anniversaries[month][day.date()];
  };

const generateUrl = (path: string): string => {
  return `https://${location.host}${path}`;
};
