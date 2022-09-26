import type { NextApiRequest, NextApiResponse } from 'next';
import ReactDOM from 'react-dom/server';
import * as playwright from 'playwright';
import { FC, ReactNode } from 'react';
import { parseYYYYMMDD } from '../../../../lib/date/parseYYYYMMDD';
import { createWeb3Client } from '../../../../lib/web3Client';
import { DayHorizontal } from '../../../../components/shared/Day';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/rocknroll-one/400.css';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  if (req.query?.ymd == null) {
    return {
      notFound: true,
    };
  }

  const { ymd } = req.query;
  const { year, month, day } = parseYYYYMMDD(ymd);
  const tokenId = month * 100 + day;
  const client = createWeb3Client();
  const anniversary = await client.contract.anniversary(tokenId);

  const viewport = { width: 1200, height: 630 };

  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport });

  const markup = ReactDOM.renderToStaticMarkup(
    <Content>
      <DayHorizontal
        year={year}
        month={month}
        day={day}
        anniversary={anniversary}
      />
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
      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </head>
    <body>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </body>
  </html>
);
