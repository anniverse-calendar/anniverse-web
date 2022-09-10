import { Grid, GridItem, Text } from '@chakra-ui/react';
import { WEEK_DAYS } from '../../../lib/date/constants';
import { useCalendar } from '../../../lib/date/useCalendar';
import {
  AnniversariesPropType,
  Anniversary,
} from '../../../lib/types/AnniversariesPropType';
import { Tooltip } from '@chakra-ui/react';
import type { Dayjs } from 'dayjs';
import Router from 'next/router';

type CalendarProps = {
  year: number;
  month: number;
  anniversaries: AnniversariesPropType['calendar'];
};

export const MiniCalendar: React.FC<CalendarProps> = ({
  year,
  month,
  anniversaries,
}) => {
  const { days } = useCalendar(year, month);
  const getAnniversary = useAnniversary(anniversaries, month);
  return (
    <Grid templateColumns="repeat(7, 1fr)" gap={1}>
      {WEEK_DAYS.map((weekDay) => (
        <GridItem
          key={weekDay}
          w="7"
          h="7"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="xs">{weekDay}</Text>
        </GridItem>
      ))}
      {days.map((day, i) => (
        <GridItem
          key={i}
          w="7"
          h="7"
          display="flex"
          justifyContent="center"
          alignItems="center"
          _hover={{ bgColor: 'gray.200' }}
          borderRadius="full"
          onDoubleClick={() => {
            Router.push(`/day/${day?.format('YYYYMMDD')}`);
          }}
          cursor="pointer"
          {...(getAnniversary(day)
            ? {
                bgColor: 'blue.500',
                color: 'white',
              }
            : {})}
        >
          <Tooltip hasArrow label={getAnniversary(day)?.name ?? undefined}>
            <Text fontSize="sm">{day?.date()}</Text>
          </Tooltip>
        </GridItem>
      ))}
    </Grid>
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
