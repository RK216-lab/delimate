let item;
let date;
let list;

    var i = 0
var all = ["商品名--期限"]
function Submit(){
    item = document.getElementById("item-name").value
    date = document.getElementById("kigen").value
    const Judge = {name : item, date : date}
    let inserted = false;
    for (let i = 0; i < all.length; i++) {
        if (new Date(date) < new Date(all[i].date)) {
            all.splice(i, 0, Judge);
            inserted = true;
            break;
        }
    }
    if (!inserted) {
        all.push(Judge);
        
}
console.log(all)
ReWrite()
}

function Delete(){
    var e = e || window.event;
    var elem = e.target || e.srcElement;
    var elemID = elem.id;
    if (confirm("削除しますか？")){
        all.splice(elemID,1)
        ReWrite()
    }
}
function ReWrite(){
    list = document.getElementById("list");
    list.innerHTML = ["商品名--期限"]
       for (var n = 1; n <= all.length -1 ;n++){ 
        console.log(n) 
        list.innerHTML += "<br>" + `${all[n].name}` +"--" +`${all[n].date}` +"<button id='" + n + "' onclick='Delete()'>削除</button>"; 
    }
}
// ページ読み込み時に初期化
// バーコードリーダーを初期化・起動する関数
function QuaggaJS() {
    // 既にQuaggaが動作している場合は、一度停止してから再初期化する
    if (Quagga.initialized) {
        Quagga.stop();
        Quagga.initialized = false; // フラグをリセット
        document.querySelector('#container').innerHTML = ''; // コンテナをクリア
    }

    // Quaggaの初期化
    Quagga.init({
            inputStream: {
                type: "LiveStream", // ライブストリーム（カメラ）を使用
                target: document.querySelector('#container'), // カメラ映像を表示する要素
                constraints: {
                    facingMode: "environment", // 背面カメラを使用
                }
            },
            decoder: {
                readers: [ "ean_reader" ] // EAN (GTIN) バーコードを読み取る設定
            }
        },
        function(err) {
            if (err) {
                console.error(err);
                document.querySelector('#process').textContent = "エラー: カメラの起動に失敗しました。カメラへのアクセスを許可しているか、別のアプリで使用中でないか確認してください。";
                document.querySelector('#container').style.display = 'none'; // エラー時は映像コンテナを非表示に
                return;
            }
            console.log("QuaggaJSの初期化が完了しました。スキャン準備完了。");
            document.querySelector('#process').textContent = "バーコードをスキャンする準備ができました。カメラが起動しています...";
            document.querySelector('#container').style.display = 'block'; // 起動時は映像コンテナを表示
            Quagga.start(); // QuaggaJSの処理を開始
            Quagga.initialized = true; // 初期化済みフラグを設定
        });

    // 処理中の映像に描画するイベントハンドラ
    Quagga.onProcessed(function(result) {
        var drawingCtx = Quagga.canvas.ctx.overlay;
        var drawingCanvas = Quagga.canvas.dom.overlay;

        drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.width), parseInt(drawingCanvas.height));

        if (result) {
            if (result.box) {
                // バーコードの位置に青い枠を描画
                Quagga.ImageDebug.drawPath(result.box, {
                    x: 0,
                    y: 1
                }, drawingCtx, {
                    color: 'blue',
                    lineWidth: 2
                });
            }
        }
    });

    // バーコードを検出した際のイベントハンドラ
    Quagga.onDetected(function(result) {
        const detectedCode = result.codeResult.code;
        document.querySelector('#result').textContent = "検出されたバーコード: " + detectedCode;
        document.querySelector('#process').textContent = "バーコードが検出されました！コード: " + detectedCode;
        alert("バーコードを検出しました: " + detectedCode);

        Quagga.stop(); // バーコード検出後、カメラを停止
        Quagga.initialized = false; // フラグをリセット
        document.querySelector('#container').innerHTML = ''; // コンテナをクリア
        document.querySelector('#container').style.display = 'none'; // 映像コンテナを非表示に

        // ここで検出したバーコード（detectedCode）を使って、
        // 商品情報の検索や登録フォームへの自動入力などの次の処理を行います。
        // 例: fetch('/api/product/' + detectedCode).then(...)
    });
}


// 現在はコメントアウトされている登録ボタンの処理（必要に応じて実装）
// function Submit() {
//     const itemName = document.getElementById('item-name').value;
//     const kigen = document.getElementById('kigen').value;
//     if (itemName && kigen) {
//         const listItem = document.createElement('li');
//         listItem.textContent = `${itemName} -- ${kigen}`;
//         document.getElementById('add').appendChild(listItem);
//         // フォームをクリア
//         document.getElementById('item-name').value = '';
//         document.getElementById('kigen').value = '';
//     } else {
//         alert('商品名と期限を入力してください。');
//     }
// }


// ボタン押したらスタート
/*  function QuaggaReset() {
  Quagga.init({
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: document.querySelector('#canvas'),
      constraints: {
        facingMode: "environment"
      },
      area: {
        top: "40%", right: "10%", left: "10%", bottom: "40%"
      }
    },
    decoder: {
      readers: ["ean_reader", "ean_8_reader"]
    }
  }, function(err) {
    if (err) {
      alert("カメラを開けませんでした: " + err);
      return;
    }
    Quagga.start();
    console.log(" Quagga started!");

    // 検出イベントはinitの中で1回だけ設定
    Quagga.onDetected(function(result) {
      const code = result.codeResult.code;
      alert("読み取ったコード: " + code);
      document.getElementById("item-name").value = code;
      Quagga.stop();
    });
  });
}

function QuaggaJS() {
  QuaggaReset(); // ← initもstartも含めて実行
} */