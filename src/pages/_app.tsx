import "../styles/custom.css";

/**
 * カスタムAppコンポーネント - すべてのページで共有されるレイアウトやプロバイダーを管理
 * @param {Object} props - コンポーネントのプロパティ
 * @param {React.ComponentType} props.Component - 現在のページコンポーネント
 * @param {Object} props.pageProps - ページに渡されるプロパティ
 * @returns {React.JSX.Element} アプリケーションのルートコンポーネント
 */
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
