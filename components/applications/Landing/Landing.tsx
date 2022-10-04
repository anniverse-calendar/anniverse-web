import { ComponentProps, FC, ReactNode } from 'react';
import {
  Box,
  Heading,
  Container,
  Text,
  Stack,
  Flex,
  Img,
  Link,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { CalendarUrl } from '../../shared/CalendarUrl';
import { CalendarIcon } from '../../icons/CalendarIcon';
import { CalendarLinkButton } from './CalendarLinkButton';
import { ShareButtons } from '../../shared/ShareButtons';
import { Pricing } from './Pricing';

export const Landing: FC<ComponentProps<typeof Pricing>> = ({
  ...pricingProps
}) => {
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
        <Pricing {...pricingProps} />
        <Stack
          direction={'column'}
          align={'center'}
          alignSelf={'center'}
          gap="150px"
        >
          <CalendarLinkButton />
          <Box>
            <Link href="/#contract">
              <Heading fontSize="2xl" marginBottom="5" id="contract">
                Anniverse NFTの仕様
              </Heading>
            </Link>
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
            <Link href="/#site">
              <Heading fontSize="2xl" marginBottom="5" id="site">
                このサイトでできること
              </Heading>
            </Link>
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

          <Box w="full">
            <Link href="/#help">
              <Heading fontSize="2xl" marginBottom="5" id="help">
                よくある質問
              </Heading>
            </Link>
            <Accordion defaultIndex={[0]} allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      このカレンダーに祝日を登録してどんな意味があるの?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  現時点では「このサイトに祝日が登録される」以上の意味はありません。このカレンダーが広まり、多くの人が参照するほどに祝日にも価値が生まれる。そんなカレンダーです。
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h3>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      どうやるの?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h3>
                <AccordionPanel pb={4}>
                  <Link
                    href="https://alu.co.jp/marimo"
                    target="_blank"
                    rel="noreferrer"
                  >
                    別のNFTですが、こちらのページがわかりやすいです。https://alu.co.jp/marimo
                  </Link>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      祝日は売買できるの?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  NFTなので
                  <Link
                    href="https://opensea.io/collection/marimo-life"
                    target="_blank"
                    rel="noreferrer"
                  >
                    OpenSea
                  </Link>
                  などで売買できます。
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      値上がりは期待できるの?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  カレンダーが有名になれば値上がりするかもしれませんが、まったくわかりません。まずはこのカレンダーを紹介してみてください。
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      収益は何に使われるの?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  ブロックチェーンプロジェクトや開発にかかわる活動に使おうと思っています。
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>

          <Stack justifyContent="center" gap="20">
            <CalendarLinkButton />
            <Box>
              <Link href="/#share">
                <Heading fontSize="2xl" marginBottom="5" id="share">
                  SHARE
                </Heading>
              </Link>
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
