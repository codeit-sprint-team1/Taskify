import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <title>Taskify</title>
        <link rel="icon" href="icons/favicon.ico" />
      </Head>
      <body>
        <Main />
        <div id="portal" />
        <NextScript />
      </body>
    </Html>
  );
}
