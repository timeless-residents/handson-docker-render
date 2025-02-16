# Express.js Docker Application

このプロジェクトは、Node.js/Express.jsアプリケーションをDockerコンテナで実行し、Render.comにデプロイするためのサンプルプロジェクトです。グレースフルシャットダウンやコンテナ化のベストプラクティスを実装しています。

## 機能

- Express.jsウェブサーバー
- Dockerコンテナ化
- 環境変数による設定
- グレースフルシャットダウン対応
- Render.comデプロイ設定

## 技術スタック

- Node.js 18
- Express.js 4.21
- Docker
- Render.com (デプロイメント)

## 前提条件

- Docker Desktop
- Node.js 18以上
- npm 8以上
- Git

## ローカル開発環境のセットアップ

1. リポジトリのクローン:
```bash
git clone https://github.com/timeless-residents/handson-docker-render.git
cd handson-docker-render
```

2. 依存関係のインストール:
```bash
npm install
```

3. ローカルサーバーの起動:
```bash
npm start
```

## Dockerでの実行

1. Dockerイメージのビルド:
```bash
docker build -t handson-docker-render .
```

2. コンテナの起動:
```bash
docker run -p 3000:3000 handson-docker-render
```

## 環境変数

| 変数名 | 説明 | デフォルト値 |
|--------|------|--------------|
| PORT | アプリケーションポート | 3000 |
| NODE_ENV | 実行環境 | production |

## プロジェクト構造

```
handson-docker-render/
├── Dockerfile          # Dockerイメージ設定
├── index.js           # メインアプリケーション
├── package.json       # プロジェクト設定
├── package-lock.json  # 依存関係ロック
└── README.md          # プロジェクト説明
```

## コードの特徴

### グレースフルシャットダウン

アプリケーションは`SIGTERM`と`SIGINT`シグナルを適切に処理し、進行中のリクエストを完了してからシャットダウンします：

```javascript
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Performing graceful shutdown...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
```

### Dockerコンテナ最適化

- マルチステージビルド
- 最小限のベースイメージ（alpine）
- 適切なレイヤーキャッシュ
- 環境変数の設定

## Render.comへのデプロイ

1. Render.comダッシュボードで新しいWebサービスを作成

2. 以下の設定を行う:
   - Build Command: 不要（Dockerfile内で設定）
   - Start Command: 不要（Dockerfile内で設定）
   - Instance Type: Free
   - Region: Singapore（推奨）

3. 環境変数の設定:
   ```
   NODE_ENV=production
   PORT=3000
   ```

## トラブルシューティング

### 一般的な問題と解決策

1. ポートの競合:
   ```bash
   # 別のポートで実行
   docker run -p 3001:3000 handson-docker-render
   ```

2. コンテナログの確認:
   ```bash
   docker logs <container-id>
   ```

3. コンテナ内のシェルアクセス:
   ```bash
   docker exec -it <container-id> /bin/sh
   ```

## 開発ガイドライン

### コーディング規約

- ESLintとPrettierの設定に従う
- コミットメッセージは[Conventional Commits](https://www.conventionalcommits.org/)に準拠

### テスト

```bash
npm test
```

## パフォーマンス最適化

1. コンテナサイズの最適化:
   - .dockerignoreの適切な設定
   - 不要なファイルの除外

2. キャッシュの活用:
   - 依存関係のレイヤー分離
   - マルチステージビルドの活用

## セキュリティ

- 最新のnpm依存関係の使用
- 環境変数による機密情報の管理
- 最小限の実行権限

## ライセンス

このプロジェクトはISCライセンスの下で公開されています。

## 貢献

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチをプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## お問い合わせ

問題や提案がある場合は、GitHubのIssueを作成してください。