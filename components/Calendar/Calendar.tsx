import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react';
import { WEEK_DAYS } from '../../shared/constants';
import { useCalendar } from '../../shared/useCalendar';
import { useCalendarDate } from '../../shared/useCurrentDate';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

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
        >
          <Text fontSize="sm">{day?.date()}</Text>
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
    <Box padding="2">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        paddingLeft="2"
        paddingBottom="2"
      >
        <Text whiteSpace="nowrap" fontSize="md">
          {current.year}年{current.month}月
        </Text>
        <ButtonGroup>
          <IconButton
            colorScheme="white"
            color="GrayText"
            icon={<ChevronLeftIcon />}
            aria-label="前月"
            onClick={() => dispatch({ type: 'addMonth', payload: -1 })}
          />
          <IconButton
            colorScheme="white"
            color="GrayText"
            icon={<ChevronRightIcon />}
            aria-label="前月"
            onClick={() => dispatch({ type: 'addMonth', payload: 1 })}
          />
        </ButtonGroup>
      </Flex>
      <MiniCalendar year={current.year} month={current.month} />
    </Box>
  );
};
