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
function QuaggaReset(){
    document.addEventListener("DOMContentLoaded", function () {
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
    });
    
    Quagga.onDetected(function (result) {
        var code = result.codeResult.code;
        console.log(code);
        alert(code);
        document.createElement = "<h1>code</h1>"
        Quagga.stop();
    });
});}

// ボタン押したらスタート
function QuaggaJS() {
    Quagga.onProcessed(function(result){
        var ctx = Quagga.canvas.ctx.overlay;
        var canvas = Quagga.canvas.dom.overlay;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (result && result.boxes) {
            result.boxes.forEach(function(box){
                Quagga.ImageDebug.drawPath(box, {x:0, y:1}, ctx, {color: 'green', lineWidth: 2});
            });
    Quagga.start();
}})}