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
function QuaggaJS(){
    document.addEventListener("DOMContentLoaded",function(){
        Quagga.init({
            inputStream :{
                type:"LiveStream",
                target: document.querySelector('#canvas'), //表示場所
                constraints:{
                    facingMode: "environment" //背面カメラ
                }
            },
            decoder:{
                readers:["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "qr_reader"]
                //バーコード種類
            }
        },function(err){
            if (err) {
                console.error(err);
                return;
        }
        console.log("Quagga初期化完了");
        Quagga.start();
    });
    //検出時
    Quagga.onDetected(function(result){
        var code = result.codeResult.code;
        console.log(code)
        alert(code)
        Quagga.stop();
    })
})}