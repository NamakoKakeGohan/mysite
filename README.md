# SteamGameRecs

**_Steam の好きなゲームを紹介するサービスです_**

## 起動方法

1. ターミナルで `mysite/game-introduction` フォルダに移動
   ```
   cd mysite/game-introduction
   ```
2. 下記コマンドで開発サーバーを起動
   ```
   npm run serve
   ```
3. ブラウザで [http://localhost:8080/](http://localhost:8080/) を開く

## 使い方

- Steam のゲームをコメントとジャンルタグを添えて投稿

  - ジャンルタグを使用する仕様
    - 投稿されたゲームを検索
    - 診断コンテンツの結果を表示

- Steam のアカウントでログインできるようにする
  - 自分の投稿とお気に入り(⭐︎)を付けた投稿を確認
  - お気に入り(⭐︎)の数で人気の投稿を閲覧

## 使用技術

- 使用する言語
  - _HTML_
  - _CSS_
  - _JavaScript_
  - _Vue.js_
- SteamGridDB API を使用
  - **Steam アカウント**
  - **ゲームのデータ**
  - **ゲームのサムネイル**

## 機能一覧

- アカウントデータを使って投稿とお気に入り(⭐︎)を管理。
- ゲームタイトルはテキストで検索出来るようにし、タグで探す際はセレクトボックスを使用。
- 診断コンテンツはフローチャート型で一問一答形式にします。
- レスポンシブデザインで スマートフォン でも閲覧できるようにします。

![SteamGameRecs-plan](https://github.com/user-attachments/assets/e4be5701-6ecb-4ab4-ad7f-ca74a9531359)

## 連絡先

- 作成者
  - 阿美律希
- E-mail
  - closure1215@outlook.com

## ライセンス

[SteamGridDB/node-steamgriddb is under MIT license](https://github.com/SteamGridDB/node-steamgriddb)
