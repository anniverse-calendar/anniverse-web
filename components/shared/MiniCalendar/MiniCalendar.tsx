import { Grid, GridItem, Text } from '@chakra-ui/react';
import { WEEK_DAYS } from '../../../lib/date/constants';
import { useCalendar } from '../../../lib/date/useCalendar';
import { AnniversariesPropType } from '../../../lib/types/AnniversariesPropType';

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
          cursor="pointer"
          {...(day == null || anniversaries[month][day.date()]?.isEmpty
            ? {}
            : {
                bgColor: 'blue.500',
                color: 'white',
              })}
        >
          <Text fontSize="sm">{day?.date()}</Text>
        </GridItem>
      ))}
    </Grid>
  );
};
