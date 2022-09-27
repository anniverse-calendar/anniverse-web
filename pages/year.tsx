import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import type { AnniversariesPropType } from '../lib/types/AnniversariesPropType';
import { createWeb3Client } from '../lib/web3Client/createWeb3Client';
import { fetchAllAnniversaries } from '../lib/anniverse/fetchAllAnniversaries';
import dynamic from 'next/dynamic';

const YearCalendar = dynamic<AnniversariesPropType>(
  () =>
    import('../components/applications/YearCalendar').then(
      (c) => c.YearCalendar
    ),
  { ssr: false }
);

type Props = AnniversariesPropType;
const Year: NextPage<Props> = ({ calendar }) => {
  return (
    <>
      <Head>
        <title>Anniverse: 年カレンダー</title>
        <meta
          key="meta-og:title"
          property="og:title"
          content="Anniverse: 年カレンダー"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <YearCalendar calendar={calendar} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const client = createWeb3Client();
  const anniversaries = await fetchAllAnniversaries(client);
  return {
    props: {
      ...anniversaries,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default Year;
