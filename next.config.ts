/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // ビルド出力ディレクトリ
  distDir: '.next',
  poweredByHeader: false,
  // 本番環境でのベースパス（必要な場合）
  // basePath: '/decision-matrix-tool',
  // 環境変数を公開する場合はここに設定
  // env: {
  //   NEXT_PUBLIC_APP_NAME: 'Decision Matrix Tool',
  // },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    };
    return config;
  },
};

module.exports = nextConfig;
