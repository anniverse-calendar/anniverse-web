import { FC } from 'react';
import { Box, ButtonGroup, Flex, IconButton, Text } from '@chakra-ui/react';
import { MiniCalendar } from '../../shared/MiniCalendar';
import { MONTHS } from '../../../lib/date/constants';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { AppLayout } from '../../shared/AppLayout';
import type { AnniversariesPropType } from '../../../lib/types/AnniversariesPropType';
import { useCalendarRouter } from '../../../lib/date/useCalendarRouter';

export const YearCalendar: FC<AnniversariesPropType> = ({ calendar }) => {
  const { params, goPrevYear, goNextYear } = useCalendarRouter();
  return (
    <AppLayout calendar={calendar}>
      <Flex
        borderBottom="1px"
        borderColor="gray.100"
        alignItems="center"
        position="sticky"
        top="0"
        bgColor="white"
      >
        <ButtonGroup>
          <IconButton
            colorScheme="white"
            color="GrayText"
            icon={<ChevronLeftIcon />}
            aria-label="前月"
            onClick={goPrevYear}
          />
          <IconButton
            colorScheme="white"
            color="GrayText"
            icon={<ChevronRightIcon />}
            aria-label="前月"
            onClick={goNextYear}
          />
        </ButtonGroup>
        <Text fontSize="2xl">{params.year}</Text>
      </Flex>
      <Flex w="full" flexWrap="wrap" columnGap="20" rowGap="5" paddingLeft="5">
        {MONTHS.map((month) => (
          <Box key={month} padding="2">
            <Flex
              justifyContent="space-between"
              alignItems="center"
              paddingLeft="2"
              paddingBottom="2"
            >
              <Text fontSize="sm">{month}月</Text>
            </Flex>
            <MiniCalendar
              year={params.year}
              month={month}
              anniversaries={calendar}
            />
          </Box>
        ))}
      </Flex>
    </AppLayout>
  );
};
