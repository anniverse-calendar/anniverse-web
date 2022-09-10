import {
  ArrowBackIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { Flex, Link, Stack } from '@chakra-ui/react';
import NextLink from 'next/link';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { DayCalendar } from '../../components/applications/DayCalendar';
import type { Anniversable } from '../../generated/typechain-types';
import {
  createWeb3Client,
  jsonRpcProvider,
} from '../../lib/web3Client/createWeb3Client';
import { parseYYYYMMDD } from '../../lib/date/parseYYYYMMDD';
import dayjs from 'dayjs';
import { useMemo } from 'react';

const Day: NextPage<{
  year: number;
  month: number;
  day: number;
  anniversary: Anniversable.AnniversaryStructOutput;
}> = (params) => {
  const prevDay = useMemo(
    () =>
      dayjs(new Date(params.year, params.month - 1, params.day))
        .subtract(1, 'day')
        .format('YYYYMMDD'),
    [params.year, params.month, params.day]
  );
  const nextDay = useMemo(
    () =>
      dayjs(new Date(params.year, params.month - 1, params.day))
        .add(1, 'day')
        .format('YYYYMMDD'),
    [params.year, params.month, params.day]
  );
  return (
    <>
      <Head>
        <title>
          {params.year}月{params.month}月{params.day}日{' '}
          {params.anniversary.name}
        </title>
        <meta
          name="description"
          content={`${params.anniversary.name} ${params.anniversary.description}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack>
        <Flex position="sticky" top="0" alignItems="center" gap="5">
          <NextLink href="/month">
            <Link display="inline-flex" alignItems="center" gap="1">
              <ArrowBackIcon /> 月カレンダー
            </Link>
          </NextLink>
          <NextLink href={`/day/${prevDay}`}>
            <Link display="inline-flex" alignItems="center" gap="1">
              <ChevronLeftIcon /> 前日
            </Link>
          </NextLink>
          <NextLink href={`/day/${nextDay}`}>
            <Link display="inline-flex" alignItems="center" gap="1">
              翌日 <ChevronRightIcon />
            </Link>
          </NextLink>
        </Flex>
        <DayCalendar {...params} />
      </Stack>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (query?.ymd == null) {
    return {
      notFound: true,
    };
  }

  const { ymd } = query;
  const { year, month, day } = parseYYYYMMDD(ymd);
  const tokenId = month * 100 + day;
  const client = createWeb3Client(jsonRpcProvider());
  const anniversary = await client.contract.anniversary(tokenId);
  return {
    props: {
      year,
      month,
      day,
      anniversary: {
        name: anniversary.name,
        description: anniversary.description,
        isEmpty: anniversary.isEmpty,
      },
    },
  };
};

export default Day;
