// server.js
import { serveDir } from "jsr:@std/http/file-server";

//直前の単語を保持しておく
let previousWord = "しりとり";//let:変数を宣言。値を再代入できる。
let wordHistories = [previousWord];

// localhostにDenoのHTTPサーバーを展開
Deno.serve(async (_req) => {
    //パス名を取得する
    //http://localhost:8000/hogeに接続した場合"/hoge"が取得できる
    const pathname = new URL(_req.url).pathname//const:定数を宣言。値を再代入できない。
    console.log('pathname: ${pathname}');

    //GET /shiritori: 直前の単語を返す
    if (_req.method === "GET" && pathname === "/shiritori"){
        return new Response(previousWord);
    }

    //POST /shiritori: 次の単語を受け取って保持する
    if (_req.method === "POST" && pathname === "/shiritori"){
        //リクエストのペイロードを取得
        const requestJson = await _req.json();
        //JSONの中からnextWordを取得
        const nextWord = requestJson["nextWord"];

        //previousWordの末尾とnextWordの先頭が同一か確認
        if (previousWord.slice(-1) === nextWord.slice(0, 1)){

             // 末尾が「ん」になっている場合
             // ifの中に入力された単語の末尾が「ん」になっていることを確認する条件式を追加
             if (nextWord.slice(-1) === "ん") {
                 // エラーを返す処理を追加
                 return new Response(
                    JSON.stringify({
                        "errorMessage": "ゲーム終了：入力された単語の末尾が「ん」になっています。",
                        "errorCode": "10002"
                    }),
                    {
                        status: 400,
                        headers: { "Content-Type": "application/json; charset=utf-8" },
                    }

                    //window.location.href = "/gameover.html"
                );
                 // errorCodeを固有のものにして、末尾が「ん」の時に発生したエラーだとWeb側に通知できるようにする
             }

             if (wordHistories.includes(nextWord)) {
                // エラーを返す処理を追加
                return new Response(
                   JSON.stringify({
                       "errorMessage": "この単語はすでに使われています。",
                       "errorCode": "10003"
                   }),
                   {
                       status: 400,
                       headers: { "Content-Type": "application/json; charset=utf-8" },
                   }

                   //window.location.href = "/gameover.html"
               );
                // errorCodeを固有のものにして、末尾が「ん」の時に発生したエラーだとWeb側に通知できるようにする
            }

            //同一であれば、previousWordを更新
            previousWord = nextWord;
            wordHistories.push(nextWord);
        }

        // 同一でない単語の入力時に、エラーを返す
        else {
                 return new Response(
                     JSON.stringify({
                         "errorMessage": "前の単語に続いていません",
                         "errorCode": "10001"
                     }),
                     {
                         status: 400,
                         headers: { "Content-Type": "application/json; charset=utf-8" },
                     }
                 );
             }

        //現在の単語を返す
        return new Response(previousWord);
    }

    //POST /reset: リセットする
    // _req.methodとpathnameを確認
    if (_req.method === "POST" && pathname === "/reset"){
        // 既存の単語の履歴を初期化する
        let previousWord = "しりとり";//let:変数を宣言。値を再代入できる。
        let wordHistories = [previousWord];
        // 初期化した単語を返す
        return new Response("リセットしました");
    }
    // ./public以下のファイルを公開
    return serveDir(
        _req,
        {
            /*
            - fsRoot: 公開するフォルダを指定
            - urlRoot: フォルダを展開するURLを指定。今回はlocalhost:8000/に直に展開する
            - enableCors: CORSの設定を付加するか
            */
            fsRoot: "./public/",
            urlRoot: "",
            enableCors: true,
        }
    );
});


//console.log("Hello World!");

//Deno.serve((_req) => new Response("Hello Deno!"));

// // server.js
// // アクセス数を保持する変数をグローバル領域に定義
// let count = 0;


// // localhostにDenoのHTTPサーバーを展開
// Deno.serve((_req) => {
//     count++;
//     return new Response(`Hello World! ${count}`);
// });
