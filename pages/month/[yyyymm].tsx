import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Text,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
  IconButton,
} from '@chakra-ui/react';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { WEEK_DAYS } from '../../shared/constants';
import { useCalendar } from '../../shared/useCalendar';
import { useCalendarRouter } from '../../shared/useCalendarRouter';

const Month: NextPage = () => {
  const { params, goNextMonth, goPrevMonth } = useCalendarRouter();
  const { days } = useCalendar(params.year, params.month);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
            justifyContent="center"
            alignItems="flex-start"
            padding="3"
            borderLeft="1px"
            borderBottom="1px"
            borderColor="gray.100"
          >
            {day?.date()}
          </GridItem>
        ))}
      </Grid>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};

export default Month;