import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { createWeb3Client } from '../lib/web3Client/createWeb3Client';
import { fetchAllAnniversaries } from '../lib/anniverse/fetchAllAnniversaries';
import type { AnniversariesPropType } from '../lib/types/AnniversariesPropType';
import dynamic from 'next/dynamic';

const MonthCalendar = dynamic<AnniversariesPropType>(
  () =>
    import('../components/applications/MonthCalendar').then(
      (mod) => mod.MonthCalendar
    ),
  { ssr: false }
);

type Props = AnniversariesPropType;
const Month: NextPage<Props> = ({ calendar }) => {
  return (
    <>
      <Head>
        <title>Anniverse: 月カレンダー</title>
        <meta
          key="meta-og:title"
          property="og:title"
          content="Anniverse: 月カレンダー"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MonthCalendar calendar={calendar} />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const client = createWeb3Client();
  const anniversaries = await fetchAllAnniversaries(client);
  return {
    props: {
      ...anniversaries,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default Month;
