# Gulp Template
sassを使うための設定テンプレ

### 開発環境
- Node.js 10.15.3
- Gulp CLI 2.0.1
- Gulp local 4.0.0

### セットアップ手順
```
$ git clone https://github.com/chiharakenta/gulp_template.git
$ cd gulp_template
$ npm install
$ gulp
```

### 使い方
gulpコマンドを起動中  
- sassを自動でコンパイル  
- cssにプレフィックス付与、圧縮  
- jsを自動で圧縮  

```
$gulp imagemin
```
↑
このコマンドで
- "img/base" フォルダ内の画像を "img" に圧縮
