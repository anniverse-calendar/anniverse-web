import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/rocknroll-one/400.css';
import { extendTheme } from '@chakra-ui/react';
import { Web3ContextProvider } from '../lib/web3Client/Web3ContextProvider';
import { Loading } from '../components/shared/Loading';
import { Suspense } from 'react';

const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'RocknRoll One', sans-serif`,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Web3ContextProvider>
        <Loading />
        <Suspense fallback={`Loading...`}>
          <Component {...pageProps} />
        </Suspense>
      </Web3ContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
