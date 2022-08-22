import { Button, Flex, Grid, GridItem, Stack } from '@chakra-ui/react';
import { WEEK_DAYS } from '../../lib/constants';
import { useCalendar } from '../../lib/useCalendar';
import { useCalendarDate } from '../../lib/useCurrentDate';

type CalendarProps = {
  year: number;
  month: number;
};

export const MiniCalendar: React.FC<CalendarProps> = ({ year, month }) => {
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
          {weekDay}
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
        >
          {day?.date()}
        </GridItem>
      ))}
    </Grid>
  );
};

export const StatefulMiniCalendar: React.FC<CalendarProps> = ({
  year,
  month,
}) => {
  const [current, dispatch] = useCalendarDate(year, month);
  return (
    <Stack>
      <Flex>
        <Button onClick={() => dispatch({ type: 'addYear', payload: -1 })}>
          &lt;&lt;
        </Button>
        <Button onClick={() => dispatch({ type: 'addMonth', payload: -1 })}>
          &lt;
        </Button>
        {current.year}年{current.month}月
        <Button onClick={() => dispatch({ type: 'addMonth', payload: 1 })}>
          &gt;
        </Button>
        <Button onClick={() => dispatch({ type: 'addYear', payload: 1 })}>
          &gt;&gt;
        </Button>
      </Flex>
      <MiniCalendar year={current.year} month={current.month} />
    </Stack>
  );
};
