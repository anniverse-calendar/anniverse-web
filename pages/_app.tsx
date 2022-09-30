import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/rocknroll-one/400.css';
import { extendTheme } from '@chakra-ui/react';
import { GlobalContextProvider } from '../lib/GlobalContext';
import { Loading } from '../components/shared/Loading';
import { Suspense } from 'react';
import { Web3Provider } from '../components/shared/Web3Provider';

const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'RocknRoll One', sans-serif`,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Web3Provider>
        <GlobalContextProvider>
          <Loading />
          <Suspense fallback={`Loading...`}>
            <Component {...pageProps} />
          </Suspense>
        </GlobalContextProvider>
      </Web3Provider>
    </ChakraProvider>
  );
}

export default MyApp;
