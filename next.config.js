/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // 環境変数を公開する場合はここに設定
  // env: {
  //   NEXT_PUBLIC_APP_NAME: 'Decision Matrix Tool',
  // },
};

module.exports = nextConfig;
