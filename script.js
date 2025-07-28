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
        let codeReader = confirm (`認識コードは${detectedCode}で正しいですか？`)
        if (codeReader){
            Quagga.initialized = false; 
            document.querySelector('#container').innerHTML = ''; // コンテナをクリア
            document.querySelector('#container').style.display = 'none'; // 映像コンテナを非表示に
            Quagga.stop()
            fetch(`https://api.jancodelookup.com/?appId=6807825cfc344aa8a9f9dfe96e3ae809&query=${detectedCode}&type=[code]`)
            .then(res => res.json())
            .then(json => {
                if (json.product && json.product.length > 0){
                    const product = json.product[0];
                    alert(product.ItemName);
                    alert(product.makerName);
                } else {
                    alert("商品が見つからなかったようです")
                }
            })
            .catch(err => alert("エラーが発生しました"))
        } else {
            alert("再読み込みします。")
            location.reload();
        }

        // ここで検出したバーコード（detectedCode）を使って、
        // 商品情報の検索や登録フォームへの自動入力などの次の処理を行います。
        // 例: fetch('/api/product/' + detectedCode).then(...)
    });
}
