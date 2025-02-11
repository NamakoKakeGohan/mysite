# SteamGameRecs

### Steamの好きなゲームを紹介するサービスです

## 使い方

Steamのゲームをコメントとジャンルタグを添えて投稿できます。

その際に付け加えたジャンルタグを使用して、投稿されたゲームを検索したり、診断コンテンツの結果を表示します。

Steamのアカウントでログインできるようにして、自分の投稿とお気に入り(⭐︎)を付けた投稿を確認できます。

お気に入り(⭐︎)の数で人気の投稿を閲覧できます。

## 作成する機能と技術

言語はVue.jsを使用して作成。
SteamGridDB API を使用して**Steamアカウント**、**ゲームのデータ**、**ゲームのサムネイル**を取得。

アカウントデータを使って投稿とお気に入り(⭐︎)を管理。

ゲームタイトルはテキストで検索出来るようにし、タグで探す際はセレクトボックスを使用。

診断コンテンツはフローチャート型で一問一答形式にします。

レスポンシブデザインでSPでも閲覧できるようにします。

設計書のリンク(https://github.com/NamakoKakeGohan/mysite/blob/main/game-introduction/project-plan.jpg)

## Author

* 作成者
阿美律希
* E-mail
closure1215@outlook.com

## License

SteamGridDB/node-steamgriddb is under [MIT license]
(https://github.com/SteamGridDB/node-steamgriddb)
