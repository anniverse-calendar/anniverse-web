import { Img, Link, LinkProps } from '@chakra-ui/react';
import { FC } from 'react';

export const OpenSeaLink: FC<LinkProps> = (props) => {
  return (
    <Link
      href={`https://${
        process.env.NEXT_PUBLIC_WEB3_NETWORK === 'goerli' ? 'testnets.' : ''
      }opensea.io/account`}
      target="_blank"
      rel="noreferrer"
      display="inline-flex"
      alignItems="center"
      gap={2}
      {...props}
    >
      <Img src="/images/Opensea-Logomark-Blue.png" alt="Etherscan" w="30px" />{' '}
      購入したNFTをOpenSeaで確認する
    </Link>
  );
};
