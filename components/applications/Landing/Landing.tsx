import { FC } from 'react';
import {
  Box,
  Heading,
  Container,
  Text,
  Stack,
  Flex,
  Img,
  Link,
} from '@chakra-ui/react';
import { CalendarUrl } from '../../shared/CalendarUrl';
import { CalendarIcon } from '../../icons/CalendarIcon';
import { CalendarLinkButton } from './CalendarLinkButton';
import { ShareButtons } from '../../shared/ShareButtons';

export const Landing: FC = () => {
  return (
    <Container maxW={'3xl'}>
      <Stack
        as={Box}
        textAlign={'center'}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '4xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
          color="red.400"
        >
          <CalendarIcon marginLeft="-50px" color="red.600" /> Anniverse
          <br />
          <Text color="gray.700" fontSize={{ base: '3xl' }}>
            NFT祝日カレンダー
          </Text>
        </Heading>
        <Text color={'gray.500'}>
          カレンダーの365日のうち1日をNFTとして購入できます。
          <br />
          ホルダーはその1日を世界でひとつの特別な祝日に制定できます。
          <br />
          購入した祝日は二次販売サイトで売却可能です。
        </Text>
        <Stack
          direction={'column'}
          align={'center'}
          alignSelf={'center'}
          gap="150px"
        >
          <CalendarLinkButton />
          <Box>
            <Heading fontSize="2xl" marginBottom="5">
              Anniverse NFTの仕様
            </Heading>
            <Flex gap="10">
              <Box width="200px" height="200px">
                <Img src="/images/mint.png" />
                <Text>祝日NFTを購入します</Text>
              </Box>
              <Box width="200px" height="200px">
                <Img src="/images/form.png" padding="30" />
                <Text>祝日を制定します</Text>
              </Box>
              <Box width="200px" height="200px">
                <Img src="/images/ethereum.png" padding="30" />
                <Text>
                  <Link
                    href="https://opensea.io/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    OpenSea
                  </Link>
                  などで売買できます
                </Text>
              </Box>
            </Flex>
          </Box>
          <Box>
            <Heading fontSize="2xl" marginBottom="5">
              このサイトでできること
            </Heading>
            <Stack gap="10">
              <Flex alignItems="center" gap="3">
                <Img src="/images/buy-form.png" width="80px" />
                <Text>NFTの購入と祝日の制定を行えます。</Text>
              </Flex>
              <Flex alignItems="center" gap="3">
                <Img src="/images/schedule.png" width="80px" />
                <Text>
                  Google
                  カレンダーなどのカレンダーに祝日カレンダーとしてインポートできます。
                </Text>
              </Flex>
              <CalendarUrl />
            </Stack>
          </Box>

          <Stack justifyContent="center" gap="20">
            <CalendarLinkButton />
            <Box>
              <Heading fontSize="2xl" marginBottom="5">
                SHARE
              </Heading>
              <ShareButtons />
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

/**
 * PRIVATE
 */
