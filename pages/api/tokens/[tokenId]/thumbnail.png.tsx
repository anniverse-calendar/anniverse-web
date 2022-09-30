import type { NextApiRequest, NextApiResponse } from 'next';
import ReactDOM from 'react-dom/server';
import * as playwright from 'playwright';
import { createWeb3Client } from '../../../../lib/web3Client';
import '@fontsource/rocknroll-one/400.css';
import { Anniversary } from '../../../../components/applications/ERC721MetaImage/Anniversary';
import { ScreenshotTemplate } from '../../../../components/shared/ScreenshotTemplate';

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
  console.log({ anniversary });

  const viewport = { width: 350, height: 350 };

  // console.log('launching...');
  const browser = await playwright.chromium.launch({ headless: true });
  // console.log('page creating...');
  const page = await browser.newPage({ viewport });

  const markup = ReactDOM.renderToStaticMarkup(
    <ScreenshotTemplate>
      <Anniversary anniversary={anniversary} />
    </ScreenshotTemplate>
  );
  const html = `<!doctype html>${markup}`;

  // console.log('set content...');
  await page.setContent(html, { waitUntil: 'networkidle' });
  // console.log('get screenshot...');
  const image = await page.screenshot({ type: 'png' });
  // console.log('browser closing...');
  await browser.close();

  // console.log('finished...');
  res.setHeader('Cache-Control', 's-maxage=31536000, stale-while-revalidate');
  res.setHeader('Content-Type', 'image/png');
  res.end(image);
}

/**
 * PRIVATE
 */
