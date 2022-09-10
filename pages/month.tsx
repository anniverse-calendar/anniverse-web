import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import {
  createWeb3Client,
  jsonRpcProvider,
} from '../lib/web3Client/createWeb3Client';
import { fetchAllAnniversaries } from '../lib/anniverse/fetchAllAnniversaries';
import type { AnniversariesPropType } from '../lib/types/AnniversariesPropType';
import dynamic from 'next/dynamic';

const MonthCalendar = dynamic(
  () =>
    import('../components/applications/MonthCalendar').then(
      (c) => c.MonthCalendar
    ),
  { ssr: false }
);

type Props = AnniversariesPropType;
const Month: NextPage<Props> = ({ calendar }) => {
  return (
    <>
      <Head>
        <title>月カレンダー</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MonthCalendar calendar={calendar} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const client = createWeb3Client(jsonRpcProvider());
  const anniversaries = await fetchAllAnniversaries(client);
  return {
    props: {
      ...anniversaries,
    },
  };
};

export default Month;
