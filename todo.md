# 決断マトリックスツール - TODOリスト

## Vercelデプロイタスク

- [ ] Vercelアカウントの設定（まだ持っていない場合）
- [ ] GitHubリポジトリとVercelの連携
- [ ] デプロイ設定の構成
  - [ ] ビルドコマンド確認（`npm run build`または`pnpm build`）
  - [ ] 出力ディレクトリ設定（`build`）
  - [ ] 環境変数の設定（必要な場合）
- [ ] 初回デプロイの実行とテスト
- [ ] カスタムドメイン設定（オプション）

## アプリケーション改善タスク

- [ ] styles.cssのインポート問題の修正（`import "../index.css"`に変更済み）
- [ ] モバイル対応の改善
- [ ] ダークモードの追加
- [ ] エクスポート/インポート機能の追加
- [ ] マトリックス共有機能の検討

## その他

- [x] GitHub Pagesデプロイ設定の無効化（Vercelに移行後）
  - [x] `gh-pages`ブランチを削除
  - [x] GitHub Actionsのデプロイワークフローを無効化
  - [ ] GitHubリポジトリの設定でGitHub Pagesを無効化（手動作業）
- [ ] READMEの更新（Vercelデプロイ情報を追加）
- [ ] ライセンス情報の確認

---

## Vercelデプロイの手順メモ

1. [Vercel](https://vercel.com/)にアクセスしてログイン
2. 「New Project」を選択
3. GitHubリポジトリ「decision-matrix-tool」をインポート
4. 設定を確認（Framework Presetが「Create React App」になっていることを確認）
5. デプロイボタンをクリック
6. デプロイが完了したらURLをメモ：`https://decision-matrix-tool.vercel.app/`（予定）
