import { ImageResponse } from '@vercel/og';
import type { NextRequest, NextResponse } from 'next/server';
import ReactDOM from 'react-dom/server';
import * as playwright from 'playwright';
import { createWeb3Client } from '../../../lib/web3Client';
import '@fontsource/rocknroll-one/400.css';
import { Anniversary } from '../../../components/applications/ERC721MetaImage/Anniversary';
import { ScreenshotTemplate } from '../../../components/shared/ScreenshotTemplate';

export const config = {
  runtime: 'experimental-edge',
};

export default async function handler(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  if (!searchParams.has('tokenId')) {
    return new Response('Not found', {
      status: 404,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  const tokenId = searchParams.get('tokenId');

  if (Array.isArray(tokenId) || tokenId == null) {
    return new Response('Bad request', {
      status: 400,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  console.log({
    tokenId,
    env: process.env.NEXT_PUBLIC_WEB3_NETWORK,
    env2: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  });

  const client = createWeb3Client();
  const anniversary = await client.contract.anniversary(tokenId);
  console.log({ anniversary });

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
        }}
      >
        Hello, World!
      </div>
    )
  );

  // const viewport = { width: 350, height: 350 };

  // // console.log('launching...');
  // const browser = await playwright.chromium.launch({ headless: true });
  // // console.log('page creating...');
  // const page = await browser.newPage({ viewport });

  // const markup = ReactDOM.renderToStaticMarkup(
  //   <ScreenshotTemplate>
  //     <Anniversary anniversary={anniversary} />
  //   </ScreenshotTemplate>
  // );
  // const html = `<!doctype html>${markup}`;

  // // console.log('set content...');
  // await page.setContent(html, { waitUntil: 'networkidle' });
  // // console.log('get screenshot...');
  // const image = await page.screenshot({ type: 'png' });
  // // console.log('browser closing...');
  // await browser.close();

  // // console.log('finished...');
  // res.setHeader('Cache-Control', 's-maxage=31536000, stale-while-revalidate');
  // res.setHeader('Content-Type', 'image/png');
  // res.end(image);
}

/**
 * PRIVATE
 */
