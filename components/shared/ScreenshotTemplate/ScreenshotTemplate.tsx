import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

const styles = `
* {
  font-family: 'RocknRoll One', sans-serif;
}
`;

const theme = extendTheme({
  fonts: {
    heading: `'RocknRoll One', sans-serif`,
    body: `'RocknRoll One', sans-serif`,
  },
});

export const ScreenshotTemplate: FC<{ children: ReactNode }> = ({
  children,
}) => (
  <html>
    {/* eslint-disable-next-line @next/next/no-head-element */}
    <head>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-display */}
      <link
        rel="preload"
        href="https://fonts.googleapis.com/css2?family=RocknRoll+One&display=block"
        as="style"
      />
      {/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-display */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=RocknRoll+One&display=block"
      />
      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </head>
    <body>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </body>
  </html>
);
