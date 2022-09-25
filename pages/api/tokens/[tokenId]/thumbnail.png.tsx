import type { NextApiRequest, NextApiResponse } from 'next';
import ReactDOM from 'react-dom/server';
import * as playwright from 'playwright';
import { FC, ReactNode } from 'react';
import { createWeb3Client } from '../../../../lib/web3Client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/rocknroll-one/400.css';
import { Anniversary } from '../../../../components/shared/Anniversary';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  if (req.query?.tokenId == null) {
    return {
      notFound: true,
    };
  }

  const { tokenId } = req.query;

  if (Array.isArray(tokenId) || tokenId == null) {
    return res.status(400).send('Bad request');
  }

  const client = createWeb3Client();
  const anniversary = await client.contract.anniversary(tokenId);

  const viewport = { width: 350, height: 350 };

  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport });

  const markup = ReactDOM.renderToStaticMarkup(
    <Content>
      <Anniversary anniversary={anniversary} />
    </Content>
  );
  const html = `<!doctype html>${markup}`;

  await page.setContent(html, { waitUntil: 'load' });
  const image = await page.screenshot({ type: 'png' });
  await browser.close();

  res.setHeader('Cache-Control', 's-maxage=31536000, stale-while-revalidate');
  res.setHeader('Content-Type', 'image/png');
  res.end(image);
}

/**
 * PRIVATE
 */

const styles = `
@import url('https://fonts.googleapis.com/css2?family=RocknRoll+One&display=block');

* {
  font-family: 'RocknRoll One', sans-serif;
}
`;

const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'RocknRoll One', sans-serif`,
  },
});

const Content: FC<{ children: ReactNode }> = ({ children }) => (
  <html>
    {/* eslint-disable-next-line @next/next/no-head-element */}
    <head>
      <style>{styles}</style>
    </head>
    <body>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </body>
  </html>
);
