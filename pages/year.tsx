import dayjs from 'dayjs';
import type { NextPage, GetServerSideProps } from 'next';

const Year: NextPage = () => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: `/year/${dayjs().format('YYYYMM')}`,
      permanent: false,
    },
  };
};

export default Year;
