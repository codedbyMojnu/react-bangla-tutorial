import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="bn">
      <Head>
        <meta httpEquiv="content-language" content="bn" />
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <meta name="color-scheme" content="light dark" />
        <link
          rel="preconnect"
          href="https://www.google-analytics.com"
          crossOrigin=""
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
