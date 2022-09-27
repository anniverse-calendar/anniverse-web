import { Flex } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  HatenaShareButton,
  HatenaIcon,
  LineShareButton,
  LineIcon,
} from 'react-share';

export const ShareButtons: FC<{ url?: string; title?: string }> = (props) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  useEffect(() => {
    setUrl(props.url ?? location.href);
    setTitle(props.title ?? document.title);
  }, [props]);
  return (
    <Flex justifyContent="center" gap="3">
      <TwitterShareButton title={title} url={url}>
        <TwitterIcon size="35" round />
      </TwitterShareButton>
      <FacebookShareButton url={url}>
        <FacebookIcon size="35" round />
      </FacebookShareButton>
      <LineShareButton title={title} url={url}>
        <LineIcon size="35" round />
      </LineShareButton>
      <HatenaShareButton title={title} url={url}>
        <HatenaIcon size="35" round />
      </HatenaShareButton>
    </Flex>
  );
};
