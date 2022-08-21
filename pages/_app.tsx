import '../styles/globals.css';
import '../styles/calendar.css';
import type { AppProps } from 'next/app';
import { Avatar, Button, ChakraProvider, Flex, Stack } from '@chakra-ui/react';
import { StatefulMiniCalendar } from '../components/Calendar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Flex alignItems="stretch" height="100vh">
        <Stack borderRight="1px" height="full">
          <StatefulMiniCalendar year={2022} month={8} />
          <Button>Year</Button>
          <Button>Month</Button>

          <Avatar name="Oshigaki Kisame" src="https://bit.ly/broken-link" />
        </Stack>
        <Stack>
          <Component {...pageProps} />
        </Stack>
      </Flex>
    </ChakraProvider>
  );
}

export default MyApp;
