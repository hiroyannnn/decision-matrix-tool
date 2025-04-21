import { Head, Html, Main, NextScript } from "next/document";

/**
 * カスタムDocumentコンポーネント - HTMLドキュメント全体の構造をカスタマイズ
 * @returns {React.JSX.Element} ドキュメントコンポーネント
 */
export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="選択に迷った時の意思決定をサポートするツール"
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
