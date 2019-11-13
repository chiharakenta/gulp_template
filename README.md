# 開発環境
- Node.js 10.15.3
- Gulp CLI 2.0.1
- Gulp local 4.0.0

  
# セットアップ手順
```
$ git clone https://github.com/team-giver/roomic-lp.git
$ cd roomic-lp
$ npm install
$ gulp
```

# 使い方
```
$ gulp  
```
上記コマンドを実行して、srcフォルダー内のファイルを編集する

コマンド実行中はsrcフォルダー内のファイルを、自動で以下の処理を行いdistフォルダーに反映
- sassファイルに更新があった場合、cssにコンパイルして圧縮
- jsファイルに更新があった場合、自動で圧縮
- imgフォルダー内に更新があった場合、画像を自動で圧縮

# Windows開発環境構築
- https://nodejs.org/ja/ から Node.js 10.15.3 をインストール
- ターミナルで以下のコードを実行
    ```
    $ node --version
    $ npm --version
    $ npm install -g gulp
    $ gulp --version
    ```
