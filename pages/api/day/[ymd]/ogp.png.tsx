import type { NextApiRequest, NextApiResponse } from 'next';
import ReactDOM from 'react-dom/server';
import * as playwright from 'playwright';
import { parseYYYYMMDD } from '../../../../lib/date/parseYYYYMMDD';
import { createWeb3Client } from '../../../../lib/web3Client';
import { DayHorizontal } from '../../../../components/shared/Day';
import '@fontsource/rocknroll-one/400.css';
import { ScreenshotTemplate } from '../../../../components/shared/ScreenshotTemplate';

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
  console.log({ anniversary });

  const viewport = { width: 1200, height: 630 };

  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport });

  const markup = ReactDOM.renderToStaticMarkup(
    <ScreenshotTemplate>
      <DayHorizontal
        year={year}
        month={month}
        day={day}
        anniversary={anniversary}
      />
    </ScreenshotTemplate>
  );
  const html = `<!doctype html>${markup}`;

  await page.setContent(html, { waitUntil: 'networkidle' });
  const image = await page.screenshot({ type: 'png' });
  await browser.close();

  res.setHeader('Cache-Control', 's-maxage=31536000, stale-while-revalidate');
  res.setHeader('Content-Type', 'image/png');
  res.end(image);
}

/**
 * PRIVATE
 */
