import { Html, Head, Main, NextScript, DocumentProps } from 'next/document';
import Router from 'next/router';

export default function Document(props: DocumentProps) {
  const description = `カレンダーの365日のうち1日をNFTとして購入できます。ホルダーはその1日を世界でひとつの特別な祝日に制定できます。購入した祝日は二次販売サイトで売却可能です。`;
  const ogImageUrl = `${
    process.env.NEXT_PUBLIC_HTTP_HOST ?? 'http://localhost:3000'
  }/images/ogp.png`;
  return (
    <Html>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
        <link rel="manifest" href="/images/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/images/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <meta name="description" content={description} />
        <meta property="og:image" content={ogImageUrl} />
        <meta
          key="meta-twitter:card"
          name="twitter:card"
          content="summary_large_image"
        />
        <meta
          key="meta-twitter:site"
          name="twitter:site"
          content={process.env.NEXT_PUBLIC_HTTP_HOST ?? 'http://localhost:3000'}
        />
        <meta
          key="meta-twitter:image"
          name="twitter:image"
          content={ogImageUrl}
        />
        <meta
          key="meta-og:description"
          property="og:description"
          content={description}
        />
        <meta key="meta-og:image" property="og:image" content={ogImageUrl} />
        <meta
          key="meta-og:image:alt"
          property="og:image:alt"
          content="NFT祝日カレンダー"
        />
        <meta
          key="meta-og:title"
          property="og:title"
          content="Anniverse: NFT祝日カレンダー"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
