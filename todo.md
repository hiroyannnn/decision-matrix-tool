# 決断マトリックスツール - TODOリスト

## Next.js移行タスク（既存プロジェクト内）

- [x] Next.jsへの移行準備
  - [x] Create React App（CRA）の依存関係を削除
  - [x] Next.js関連パッケージをインストール
  - [x] ディレクトリ構造の調整
- [x] 設定ファイルの追加
  - [x] `next.config.js`の作成
  - [x] `jsconfig.json`またはTypeScriptの場合は`tsconfig.json`の更新
- [x] ルーティング構造の設定
  - [x] `pages`ディレクトリの作成
  - [x] インデックスページの実装
- [x] コンポーネントの調整
  - [x] グローバルCSSのインポート問題の修正
  - [x] manifest.jsonからのリソース参照修正
  - [x] Tailwind CSSの設定更新
    - [x] `tailwind.config.js`のcontentパス更新
    - [x] `postcss.config.js`の作成
    - [x] グローバルCSSファイルの移動と更新
- [ ] ビルドとローカルテスト

## Vercelデプロイタスク

- [ ] Vercelアカウントの設定（まだ持っていない場合）
- [ ] GitHubリポジトリとVercelの連携
- [ ] デプロイ設定の構成
  - [ ] ビルドコマンド確認（`next build`）
  - [ ] 出力ディレクトリ設定（`.next`）
  - [ ] 環境変数の設定（必要な場合）
- [ ] 初回デプロイの実行とテスト
- [ ] カスタムドメイン設定（オプション）

## アプリケーション改善タスク

- [x] styles.cssのインポート問題の修正（グローバルCSSは_app.jsでのみインポート）
- [ ] モバイル対応の改善
- [ ] ダークモードの追加
- [ ] エクスポート/インポート機能の追加
- [ ] マトリックス共有機能の検討

## その他

- [x] GitHub Pagesデプロイ設定の無効化（Vercelに移行後）
  - [x] `gh-pages`ブランチを削除
  - [x] GitHub Actionsのデプロイワークフローを無効化
  - [x] GitHubリポジトリの設定でGitHub Pagesを無効化（手動作業）
- [ ] READMEの更新（Vercelデプロイ情報を追加）
- [ ] ライセンス情報の確認

---

## 既存プロジェクトをNext.jsに移行する手順

1. React Scriptsと関連パッケージを削除:

   ```bash
   npm uninstall react-scripts
   # または
   pnpm remove react-scripts
   ```

2. Next.jsとその関連パッケージをインストール:

   ```bash
   npm install next@latest
   # または
   pnpm add next@latest
   ```

3. package.jsonのスクリプトを更新:

   ```json
   "scripts": {
     "dev": "next dev",
     "build": "next build",
     "start": "next start",
     "lint": "next lint"
   }
   ```

4. 必要なディレクトリ構造を作成:

   ```bash
   mkdir -p pages
   # または App Routerを使用する場合
   mkdir -p app
   ```

5. `next.config.js`ファイルを作成:

   ```js
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     reactStrictMode: true,
   }
   module.exports = nextConfig
   ```

6. メインページの移行:
   - srcからのコンポーネントを適切に配置
   - `pages/index.js`または`app/page.js`を作成

7. スタイリングの調整:
   - グローバルCSSを`styles/global.css`または`app/globals.css`に配置
   - 必要に応じてTailwind CSSの設定を更新

## Vercelデプロイの手順メモ

1. [Vercel](https://vercel.com/)にアクセスしてログイン
2. 「New Project」を選択
3. GitHubリポジトリを連携
4. 設定を確認（Framework Presetが「Next.js」になっていることを確認）
5. デプロイボタンをクリック
6. デプロイが完了したらURLをメモ：`https://decision-matrix-tool.vercel.app/`（予定）
