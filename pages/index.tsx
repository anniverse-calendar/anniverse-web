import { Box, Flex, Img, Link } from '@chakra-ui/react';
import dayjs from 'dayjs';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Landing } from '../components/applications/Landing';
import { Day } from '../components/shared/Day';
import { Anniversable } from '../generated/typechain-types';
import { parseYYYYMMDD } from '../lib/date/parseYYYYMMDD';
import { createWeb3Client } from '../lib/web3Client';
import NextLink from 'next/link';

const Home: NextPage<{
  ymd: string;
  year: number;
  month: number;
  day: number;
  anniversary: Anniversable.AnniversaryStructOutput;
}> = (props) => {
  return (
    <>
      <Head>
        <title>Anniverse: NFT祝日カレンダー</title>
        <meta name="description" content="世界でひとつの特別な祝日を作ろう" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Landing />
      <Box bgColor="salmon">
        <Day
          {...props}
          size="sm"
          footer={<NextLink href={`/day/${props.ymd}`}>開く</NextLink>}
        />
        <Flex justifyContent="flex-end" padding="2" gap="2">
          <Link href="https://github.com/anniverse-calendar">
            <Img src="/images/GitHub-Mark-64px.png" alt="GitHub" w="30px" />
          </Link>
        </Flex>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const ymd = dayjs().format('YYYYMMDD');
  const { year, month, day } = parseYYYYMMDD(ymd);
  const tokenId = month * 100 + day;
  const client = createWeb3Client();
  const anniversary = await client.contract.anniversary(tokenId);
  return {
    props: {
      ymd,
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
  };
};

export default Home;
