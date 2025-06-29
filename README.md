# shiritori
しりとりアプリ

このWebアプリは、日本語の「しりとり」ゲームをブラウザ上でできるシンプルなアプリケーションです。

ユーザーは単語を入力し、前の単語の末尾の文字から始まる語を繋げていきます。  
間違った単語（末尾が「ん」、過去に使用した単語）を入力した場合は、ゲームが終了します。


## 実装した機能

### 機能一覧
- 直前の単語を、表示できるようにする
- 任意の単語を、入力できるようにする
- 直前の単語の末尾と、入力した単語の先頭を比較して、同じ場合だけ単語を更新する。違う場合は、エラーを表示する
- 末尾が「ん」で終わる単語が入力されたら、ゲームを終了する
- 過去に使用した単語が入力されたら、ゲームを終了する
- ゲーム中や終了後に、最初からやり直せるリセット機能をつける
-  単語の履歴表示機能

---


##  動作確認方法

### 公開URL

以下のURLを開いて、アプリの動作確認ができます:
https://tatanttoto-deno-shirit-64.deno.dev/

### ローカルで実行する方法

1. Deno をインストール
2. このリポジトリをクローン：
   ```bash
   git clone https://github.com/tatanttoto/deno-shiritori.git

3. ディレクトリに移動:
   cd deno-shiritori

4. サーバーを起動：
    deno run --allow-net --allow-read server.js

5. ブラウザでアクセス：
    http://localhost:8000

単語を入力してしりとり開始

間違えたらゲームオーバーになり、入力formが削除される。

## ChatGPTの使用場面
- fetchによるエラー処理や、DOMの書き換え等のコーディング補助
- 「Uncaught TypeError: Cannot read properties of null」等のエラー解消支援
- JavaScriptにおける 重複単語の履歴処理（赤く表示） のロジック考案
- READMEの構成作成


## 参考にしたサイト
- Githubのpushについて→https://qiita.com/A__Matsuda/items/f71a935612a55d6e674e
- javascriptの基本について→https://qiita.com/Miyate2/items/28352f370913d79a4580
- リロードの仕方→https://www.sejuku.net/blog/25316

