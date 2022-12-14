import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="preload"
          as="font"
          crossOrigin="anonymous"
          href="/fonts/IBMPlexSans-Bold.ttf"
        ></link>
        <link
          rel="preload"
          as="font"
          crossOrigin="anonymous"
          href="/fonts/IBMPlexSans-Regular.ttf"
        ></link>
        <link
          rel="preload"
          as="font"
          crossOrigin="anonymous"
          href="/fonts/IBMPlexSans-SemiBold.ttf"
        ></link>
      </Head>
      <body>
        <Main></Main>
        <NextScript></NextScript>
      </body>
    </Html>
  );
}
