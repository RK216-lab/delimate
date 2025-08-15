

let item;
let date;
let list;
let point;
var i = 0
var all = ["商品名--期限"]

function Submit(){
    item = document.getElementById("item-name").value
    date = document.getElementById("kigen").value
    recipe = document.getElementById("recipe").value
    image = JSON.parse(localStorage.getItem("JAN"))
     if (!item || !date) {
        alert("商品名と期限の両方を入力してください。");
        return;
    }
    if (!image){
        Judge = {img : "none", name : item, date : date, recipe : recipe}
    }else{
        Judge = {img : image, name : item, date : date, recipe : recipe}
    }
    let inserted = false;
    all = JSON.parse(localStorage.getItem("list"));
    if (!all){
        all = [Judge];
        localStorage.setItem("list",JSON.stringify(all));
        location.href="index.html"
        return;
    }else{
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
Point(1,"商品を登録した！")
}
console.log(all)
localStorage.setItem("list",JSON.stringify(all));
location.href="index.html"
}
function Point(n,m){
    point = JSON.parse(localStorage.getItem("point")) + n;
    localStorage.setItem("point",JSON.stringify(point))
    if (n > 0){
        alert(`${m}${n}ポイントゲット★現在${point}ポイント！`)
    } else {
        alert(`${m}${-n}ポイントを失った...現在${point}ポイント`)
    }
}
function HandWriting(){
    localStorage.removeItem("JAN")
}
function Delete(n){
    all = JSON.parse(localStorage.getItem("list"));
    if (confirm("削除しますか？")){
        all.splice(n,1)
        localStorage.setItem("list",JSON.stringify(all));
        ReWrite()
        location.reload()
    }
}
function Use(n){
    all = JSON.parse(localStorage.getItem("list"));
    if (confirm("消費しましたか？")){
        away = all[n].name
        all.splice(n,1)
        localStorage.setItem("list",JSON.stringify(all));
        ReWrite()
        Point(3,away + "を消費(/・ω・)/!!")
        location.reload()
    }
}
function Trash(n){
    all = JSON.parse(localStorage.getItem("list"));
    if (confirm("廃棄しますか？")){
        away = all[n].name
        all.splice(n,1)
        localStorage.setItem("list",JSON.stringify(all));
        ReWrite()
        Point(-5,"ばいばい" + away + "...(´；ω；`)ｳｯ")
        location.reload()
    }
    
}
function SOS(){
    var expired = [];
    var thisday = [];
    var threeDays = [];
    today = new Date()
    all = JSON.parse(localStorage.getItem("list"));
    if (all === null){
        all = []
    }
    list = document.getElementById("list");

    // 仕分ける
    for (let n = 0; n < all.length; n++) {
        console.log(all[n].date)
        console.log(new Date (all[n].date) - today)
        if (new Date (all[n].date) - today < (-1000 * 60 * 60 * 24 * 1)){ 
            expired.push({img : all[n].img, name :all[n].name, date :all[n].date, recipe : all[n].recipe})
        } else if (new Date (all[n].date) - today < 0){
            thisday.push({img : all[n].img, name :all[n].name, date :all[n].date, recipe : all[n].recipe})
        } else if (new Date (all[n].date) - today < 1000 * 60 * 60 * 24 * 3){
            threeDays.push({img : all[n].img, name :all[n].name, date :all[n].date, recipe : all[n].recipe})
        } else {
            break;
        }
    }
    //期限切れ
    if (expired.length > 0){
        list.innerHTML = `
        <h2>期限が切れています</h2><br>
        <table border="1" cellspacing="0" cellpadding="5">
            <tr>
                <th>画像</th>
                <th>商品名</th>
                <th>期限</th>
            </tr>
    `;
    for (n = 0; n < expired.length; n++){
        list.innerHTML += `
            <tr style = background-color:"#ff9e9e">
                <td><img src="https://image.jancodelookup.com/${expired[n].img}.jpg" width="100"></td>
                <td>${expired[n].name}</td>
                <td>${expired[n].date}</td>
                <td><button id = "button" onclick="Delete(${n})">削除</button></td>
                <td><button id = "button" onclick="Use(${n})">消費</button></td>
                <td><button id = "button" onclick="Trash(${n})">廃棄</button></td>
            </tr>`
        
    }
    // テーブルを閉じる
    list.innerHTML += `</table>`;
    }
    //今日
    if (thisday.length > 0){
        list.innerHTML += `
        <h2>今日が期限です</h2><br>
        <table border="1" cellspacing="0" cellpadding="5">
            <tr>
                <th>画像</th>
                <th>商品名</th>
                <th>期限</th>
            </tr>
    `;
    for (n = 0; n < thisday.length; n++){
        list.innerHTML += `
            <tr style = background-color:"#ff9ecbff">
                <td><img src="https://image.jancodelookup.com/${thisday[n].img}.jpg" width="100"></td>
                <td>${thisday[n].name}</td>
                <td>${thisday[n].date}</td>
                <td><button id = "button" onclick="Delete(${n})">削除</button></td>
                <td><button id = "button" onclick="Use(${n})">消費</button></td>
                <td><button id = "button" onclick="Trash(${n})">廃棄</button></td>
            </tr>`
        
    }
    // テーブルを閉じる
    list.innerHTML += `</table>`;
    }
    //3日以内
    if (threeDays.length > 0){
        list.innerHTML += `
        <h2>期限が迫っています</h2><br>
        <table border="1" cellspacing="0" cellpadding="5">
            <tr>
                <th>画像</th>
                <th>商品名</th>
                <th>期限</th>
            </tr>
    `;
    for (n = 0; n < threeDays.length; n++){
        list.innerHTML += `
            <tr style = background-color:"#ffce9e">
                <td><img src="https://image.jancodelookup.com/${threeDays[n].img}.jpg" width="100"></td>
                <td>${threeDays[n].name}</td>
                <td>${threeDays[n].date}</td>
                <td><button id = "button" onclick="Delete(${n})">削除</button></td>
                <td><button id = "button" onclick="Use(${n})">消費</button></td>
                <td><button id = "button" onclick="Trash(${n})">廃棄</button></td>
            </tr>`
        
    }
    // テーブルを閉じる
    list.innerHTML += `</table>`;
    }
    let recipelist = "https://cse.google.com/cse?cx=30817d1f4b9a34c3f#gsc.tab=0&gsc.q=";
    if (thisday.length === 0){
        document.getElementById("recipe").innerHTML = `<a id = "button" href = ${recipelist}>レシピを検索する</a>`
    } else {
        for (n = 0; n < thisday.length; n++){
        recipelist += thisday[n].recipe
        recipelist += "%E3%80%80"
        recipelist += "&gsc.sort="
        document.getElementById("recipe").innerHTML = `<a id = "button" href = ${recipelist}>レシピを見る</a>`
    }
}
}
function ReWrite(){
    today = new Date()
    all = JSON.parse(localStorage.getItem("list"));
    list = document.getElementById("list");
    if (all.length !== 0){
    list.innerHTML = `
        <table border="1" cellspacing="0" cellpadding="5">
            <tr>
                <th>画像</th>
                <th>商品名</th>
                <th>期限</th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
    `;

    // データ行を追加
    for (let n = 0; n < all.length; n++) {
        console.log(all[n].date)
        console.log(new Date (all[n].date) - today)
        if (new Date (all[n].date) - today < (-1000 * 60 * 60 * 24 * 1)){
            color = "#ff9e9e";
        } else if (new Date (all[n].date) - today < 0){
            color = "#ff9ecbff";
        } else if (new Date (all[n].date) - today < 1000 * 60 * 60 * 24 * 3){
            color = "#ffce9e";
        }else if (new Date (all[n].date) - today < 1000 * 60 * 60 * 24 * 7){
            color = "#ffff9e";
        } else {
            color = "#ceff9e"
        }
        list.innerHTML += `
            <tr style = background-color:${color}>
                <td><img src="https://image.jancodelookup.com/${all[n].img}.jpg" width="100"></td>
                <td>${all[n].name}</td>
                <td>${all[n].date}</td>
                <td><button id = "button" onclick="Delete(${n})">削除</button></td>
                <td><button id = "button" onclick="Use(${n})">消費</button></td>
                <td><button id = "button" onclick="Trash(${n})">廃棄</button></td>
            </tr>
        `;
    }

    // テーブルを閉じる
    list.innerHTML += `</table>`;
}else{
    list.innerHTML = `<h2>登録されている商品がありません。<br><a id="button" href="scan.html" style = "display: inline-block; margin-top: 50px;">食品登録</a>`
}
}
// バーコードリーダー（QuaggaJS）関連
function QuaggaJS() {
    localStorage.setItem("code","readResult")
    document.getElementById("disappear").style.display = "none"//ボタン邪魔
    if (Quagga.initialized) {
        Quagga.stop();
        Quagga.initialized = false; // フラグをリセット
        document.querySelector('#container').innerHTML = ''; 
    }

    //初期化
    Quagga.init({
            inputStream: {
                type: "LiveStream", // cameraを使用
                target: document.querySelector('#container'), // 映す
                constraints: {
                    facingMode: "environment", // 背面カメラ
                }
            },
            decoder: {
                readers: [ "ean_reader" ] // 日本の基本的なバーコード
            }
        },
        function(err) {
            if (err) {
                alert("カメラの起動に失敗しました。カメラへのアクセスを許可しているか、別のアプリで使用中でないか確認してください。")
                document.querySelector('#container').style.display = 'none'; // エラー時は映像コンテナを非表示に
                return;
            }
            console.log("スキャン準備完了");
            Quagga.start(); 
            Quagga.initialized = true; // 初期化できてますよ
        });
    // 見つかったら
    Quagga.onDetected(function(result) {
        const detectedCode = result.codeResult.code;
        let codeReader = confirm (`認識コードは${detectedCode}で正しいですか？`)
        if (codeReader){
            Quagga.initialized = false; 
            document.querySelector('#container').innerHTML = ''; 
            document.querySelector('#container').style.display = 'none'; // 非表示に
            Quagga.stop()
            fetch(`https://api.jancodelookup.com/?appId=6807825cfc344aa8a9f9dfe96e3ae809&query=${detectedCode}&type=[code]`)
            .then(res => res.json())
            .then(json => {
                if (json.product && json.product.length > 0){
                    const product = json.product[0];
                    const readResult = product.itemName;
                    alert(readResult)
                    localStorage.setItem("readResult",JSON.stringify(readResult))
                    localStorage.setItem("JAN",detectedCode)
                    location.href = "fill.html"
                    return;
                    //alert(localStorage.getItem("readResult"))
                } else {
                    alert("商品が見つからなかったようです")
                }
            })
            .catch(err => alert("エラーが発生しました"))
            return;
        } else {
            location.reload();
            return;
        }
    });
}