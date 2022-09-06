import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Box, ButtonGroup, Flex, IconButton, Text } from '@chakra-ui/react';
import { MiniCalendar } from '../../components/Calendar';
import { MONTHS } from '../../shared/constants';
import { useCalendarRouter } from '../../shared/useCalendarRouter';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Year: NextPage = () => {
  const { params, goPrevYear, goNextYear } = useCalendarRouter();
  return (
    <>
      <Head>
        <title>カレンダー - {params.year}年</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
            <MiniCalendar year={params.year} month={month} />
          </Box>
        ))}
      </Flex>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};

export default Year;