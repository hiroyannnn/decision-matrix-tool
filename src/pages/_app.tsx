import "../styles/globals.css";

/**
 * カスタムAppコンポーネント - すべてのページで共有されるレイアウトやプロバイダーを管理
 * @param {Object} props - コンポーネントのプロパティ
 * @param {React.ComponentType} props.Component - 現在のページコンポーネント
 * @param {Object} props.pageProps - ページに渡されるプロパティ
 * @returns {React.JSX.Element} アプリケーションのルートコンポーネント
 */
function MyApp({ Component, pageProps }) {

  return (
    <>
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">決断マトリックスツール</h1>
        <p className="text-sm">選択に迷ったときの意思決定をサポート</p>
      </header>
  <Component {...pageProps} />;
  <footer className="bg-gray-800 text-white p-4 text-center">
    <p>&copy; 2025 決断マトリックスツール</p>
  </footer>
  </>
  )
}

export default MyApp;
