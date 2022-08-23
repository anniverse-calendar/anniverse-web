import dayjs from 'dayjs';
import type { NextPage, GetServerSideProps } from 'next';

const Month: NextPage = () => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: `/month/${dayjs().format('YYYYMM')}`,
      permanent: false,
    },
  };
};

export default Month;
