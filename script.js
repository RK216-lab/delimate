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
function QuaggaReset() {
    Quagga.init({
        inputStream: {
            type: "LiveStream",
            target: document.querySelector("#canvas"),
            constraints: {
                facingMode: "environment"
            }
        },
        decoder: {
            readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader"]
        }
    }, function (err) {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Quagga初期化完了");
        Quagga.start();
    });

    // 読み取り時
    Quagga.onDetected(function (result) {
        var code = result.codeResult.code;
        console.log(code);
        alert(code);
        document.getElementById("item-name").value = code;
        Quagga.stop();
    });
}


// ボタン押したらスタート
function QuaggaJS() {
    Quagga.start();
}*/
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