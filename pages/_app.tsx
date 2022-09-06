import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
  Avatar,
  Text,
  ChakraProvider,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Box,
} from '@chakra-ui/react';
import { StatefulMiniCalendar } from '../components/Calendar';
import '@fontsource/rocknroll-one/400.css';
import { extendTheme } from '@chakra-ui/react';
import { useRouter } from 'next/router';
// import { Web3Provider } from '../shared/context/Web3Provider';

const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'RocknRoll One', sans-serif`,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <ChakraProvider theme={theme}>
      {/* <Web3Provider> */}
      <Flex alignItems="stretch">
        <Stack
          borderRight="1px"
          borderColor="gray.100"
          paddingX="3"
          height="100vh"
          position="sticky"
          top="0"
        >
          <StatefulMiniCalendar year={2022} month={8} />

          <Box paddingX="3">
            <RadioGroup
              defaultValue={(router.pathname = ~/\/month/ ? '/month' : '/year')}
              onChange={(path) => {
                router.replace(`${path}/${router.query.yyyymm}`);
              }}
            >
              <Stack spacing={5} direction="row">
                <Text fontSize="sm">表示</Text>
                <Radio colorScheme="red" value="/year">
                  年
                </Radio>
                <Radio colorScheme="green" value="/month">
                  月
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>

          <Avatar name="Oshigaki Kisame" src="https://bit.ly/broken-link" />
        </Stack>
        <Stack w="full">
          <Component {...pageProps} />
        </Stack>
      </Flex>
      {/* </Web3Provider> */}
    </ChakraProvider>
  );
}

export default MyApp;
