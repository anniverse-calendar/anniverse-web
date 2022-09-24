import {
  ArrowBackIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { Flex, Link, Stack } from '@chakra-ui/react';
import NextLink from 'next/link';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { DayCalendar } from '../../components/applications/DayCalendar';
import type { Anniversable } from '../../generated/typechain-types';
import { createWeb3Client } from '../../lib/web3Client/createWeb3Client';
import { parseYYYYMMDD } from '../../lib/date/parseYYYYMMDD';
import dayjs from 'dayjs';
import { useMemo } from 'react';

const Day: NextPage<{
  year: number;
  month: number;
  day: number;
  anniversary: Anniversable.AnniversaryStructOutput;
}> = (params) => {
  const today = useMemo(
    () =>
      dayjs(new Date(params.year, params.month - 1, params.day)).format(
        'YYYYMMDD'
      ),
    [params.year, params.month, params.day]
  );
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
  const title = `${params.year}月${params.month}月${params.day}日${params.anniversary.name}`;
  const description = `${params.anniversary.name} ${params.anniversary.description}`;
  const ogImageUrl = `${
    process.env.NEXT_PUBLIC_HTTP_HOST ?? 'http://localhost:3000'
  }/api/day/${today}/ogp.png`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:image" content={ogImageUrl} />
        <meta
          key="meta-twitter:card"
          name="twitter:card"
          content="summary_large_image"
        />
        <meta
          key="meta-twitter:site"
          name="twitter:site"
          content={process.env.NEXT_PUBLIC_HTTP_HOST ?? 'http://localhost:3000'}
        />
        <meta
          key="meta-twitter:image"
          name="twitter:image"
          content={ogImageUrl}
        />
        <meta key="meta-og:title" property="og:title" content={title} />
        <meta
          key="meta-og:description"
          property="og:description"
          content={description}
        />
        <meta key="meta-og:image" property="og:image" content={ogImageUrl} />
        <meta key="meta-og:image:alt" property="og:image:alt" content={title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack>
        <Flex position="sticky" top="0" alignItems="center" gap="5">
          <NextLink
            href={`/month?ym=${(params.year * 100 + params.month).toString()}`}
          >
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
        <DayCalendar key={today} {...params} />
      </Stack>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.params?.ymd == null) {
    return {
      notFound: true,
    };
  }

  const { ymd } = context.params;
  const { year, month, day } = parseYYYYMMDD(ymd);
  const tokenId = month * 100 + day;
  const client = createWeb3Client();
  const anniversary = await client.contract.anniversary(tokenId);
  console.log(anniversary);
  return {
    props: {
      year,
      month,
      day,
      anniversary: {
        name: anniversary.name,
        description: anniversary.description,
        author: anniversary.author,
        authorUrl: anniversary.authorUrl,
        isEmpty: anniversary.isEmpty,
      },
    },
    revalidate: 60 * 60 * 24,
  };
};

export default Day;
