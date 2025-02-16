# Node.js アプリケーション用Dockerfile
FROM node:18-alpine

WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係のインストール
RUN npm install

# アプリケーションのソースをコピー
COPY . .

# ビルド（必要な場合）
# RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]