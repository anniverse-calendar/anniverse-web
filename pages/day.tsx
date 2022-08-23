import dayjs from 'dayjs';
import type { NextPage, GetServerSideProps } from 'next';

const Day: NextPage = () => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: `/day/${dayjs().format('YYYYMMDD')}`,
      permanent: false,
    },
  };
};

export default Day;
