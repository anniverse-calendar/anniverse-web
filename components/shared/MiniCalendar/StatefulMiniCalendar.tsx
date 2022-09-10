import { Box, ButtonGroup, Flex, IconButton, Text } from '@chakra-ui/react';
import { useCalendarDate } from './useCurrentDate';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { AnniversariesPropType } from '../../../lib/types/AnniversariesPropType';
import { MiniCalendar } from './MiniCalendar';

export const StatefulMiniCalendar: React.FC<{
  defaultYear: number;
  defaultMonth: number;
  anniversaries: AnniversariesPropType['calendar'];
}> = ({ defaultYear, defaultMonth, anniversaries }) => {
  const [current, dispatch] = useCalendarDate(defaultYear, defaultMonth);
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
      <MiniCalendar
        year={current.year}
        month={current.month}
        anniversaries={anniversaries}
      />
    </Box>
  );
};
