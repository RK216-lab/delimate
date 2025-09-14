
let stored = localStorage.getItem("point");
if (!stored || stored === "undefined") {
  localStorage.setItem("point", JSON.stringify(0));
  stored = "0";
}
let item;
let date;
let list;
let point;
var i = 0
var all = ["商品名--期限"]
function report(kind, m,posi) {
  const data = JSON.parse(localStorage.getItem(kind)) || [];
  const now = new Date();
  const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000); // 5日
  const recentItems = data.filter(entry => {
    const entryDate = new Date(entry.time);
    return entryDate >= fiveDaysAgo;
  });
  const listHTML = recentItems.map(entry => {
    const date = new Date(entry.time);
    const formatted = date.toLocaleString('ja-JP', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    });//日付表示直す
    return`<tr>
        <td>${entry.name}</td>
        <td>${formatted}</td>
    </tr>`;}).join('');
  document.getElementById(posi).innerHTML += `
    <div class="report-box">
    <h2>${m}:${data.length}個</h2>
    <h2>(直近5日で${recentItems.length}個↓)</h2>
      <table class="report-table">
        <thead>
          <tr>
            <th>商品名</th>
            <th>日時</th>
          </tr>
        </thead>
        <tbody>
          ${listHTML || "<tr><td colspan='2'>直近5日では該当なし</td></tr>"}
        </tbody>
      </table>
    </div>
  `;
}
function giveLoginBonus() {
  const today = new Date().toDateString();

  // pointの安全取得
  let point = JSON.parse(localStorage.getItem("point") || "0");

  let lastLogin = localStorage.getItem("lastLogin");
  if (!lastLogin || lastLogin === "undefined" || lastLogin !== today) {
    point += 1; // ボーナス加算
    localStorage.setItem("point", JSON.stringify(point));
    localStorage.setItem("lastLogin", today);

    Point(1, "ログインボーナス!!今日もDelimateを使ってくれてありがとう🌟");
    location.reload()
  }
}

function record(item,kind) {
    rectime = new Date()
    rectime = rectime.toString()
    his = JSON.parse(localStorage.getItem(kind)) || []
        if (!Array.isArray(his)) {
            his = [];
        }
        his.push({
            name: item,
            time: rectime  // ミリ秒
        });
    localStorage.setItem(kind, JSON.stringify(his));
}
function customAlert(message,a) {
  return new Promise((resolve) => {
    // オーバーレイ
    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
      position: "fixed",
      top: "0", left: "0",
      width: "100%", height: "100%",
      background: "rgba(255,255,255,0.4)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "9999"
    });

    // ダイアログボックス
    const box = document.createElement("div");
    Object.assign(box.style, {
      backdropFilter: "blur(14px)",
      background: "rgba(255, 255, 255, 0.6)",
      border: "1px solid rgba(255, 255, 255, 0.8)",
      borderRadius: "16px",
      padding: "30px",
      minWidth: "280px",
      textAlign: "center",
      boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
      color: "#333",
      fontFamily: "sans-serif"
    });

    // アイコン
    const icon = document.createElement("div");
    icon.textContent = a;
    icon.style.fontSize = "32px";
    icon.style.marginBottom = "10px";

    // メッセージ
    const msg = document.createElement("p");
    msg.textContent = message;
    msg.style.marginBottom = "20px";
    msg.style.fontSize = "16px";

    // OKボタン
    const okBtn = document.createElement("button");
    okBtn.textContent = "OK";
    Object.assign(okBtn.style, {
      padding: "10px 20px",
      border: "none",
      borderRadius: "8px",
      background: "#3498db",
      color: "#fff",
      cursor: "pointer"
    });

    okBtn.onclick = () => {
      document.body.removeChild(overlay);
      resolve(); // 待機おわり
    };

    // 組み立て
    box.appendChild(icon);
    box.appendChild(msg);
    box.appendChild(okBtn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  });
}
function customConfirm(message) {
    //きほんcustomAlertみたいなかんじ
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    Object.assign(overlay.style, {
      position: "fixed",
      top: "0", left: "0",
      width: "100%", height: "100%",
      background: "rgba(255,255,255,0.4)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "9999"
    });

    const box = document.createElement("div");
    Object.assign(box.style, {
      backdropFilter: "blur(14px)",
      background: "rgba(255, 255, 255, 0.6)",
      border: "1px solid rgba(255, 255, 255, 0.8)",
      borderRadius: "16px",
      padding: "30px",
      minWidth: "280px",
      textAlign: "center",
      boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
      color: "#333",
      fontFamily: "sans-serif"
    });

    const icon = document.createElement("div");
    icon.textContent = "❓";
    icon.style.fontSize = "32px";
    icon.style.marginBottom = "10px";

    const msg = document.createElement("p");
    msg.textContent = message;
    msg.style.marginBottom = "20px";
    msg.style.fontSize = "16px";

    const btnArea = document.createElement("div");

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "キャンセル";
    Object.assign(cancelBtn.style, {
      padding: "10px 20px",
      marginRight: "10px",
      border: "none",
      borderRadius: "8px",
      background: "#eee",
      color: "#333",
      cursor: "pointer"
    });

    const okBtn = document.createElement("button");
    okBtn.textContent = "OK";
    Object.assign(okBtn.style, {
      padding: "10px 20px",
      border: "none",
      borderRadius: "8px",
      background: "#4CAF50",
      color: "#fff",
      cursor: "pointer"
    });

    cancelBtn.onclick = () => {
      document.body.removeChild(overlay);
      resolve(false);
    };

    okBtn.onclick = () => {
      document.body.removeChild(overlay);
      resolve(true);
    };

    btnArea.appendChild(cancelBtn);
    btnArea.appendChild(okBtn);
    box.appendChild(icon);
    box.appendChild(msg);
    box.appendChild(btnArea);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  });
}
async function Submit(){
    item = document.getElementById("item-name").value
    date = document.getElementById("kigen").value
    recipe = document.getElementById("recipe").value
    image = JSON.parse(localStorage.getItem("JAN"))
     if (!item || !date ) {
        customAlert("商品名と期限を入力してください。","⚠️");
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
}
localStorage.setItem("list",JSON.stringify(all));
await Point(1,"商品を登録した！"); 
location.href = "index.html"; // OK押した後に遷移
}
async function Point(n, m) {
  point = JSON.parse(localStorage.getItem("point")) + n;
  if (point < 0){
    await customAlert(`${m}${-n}ポイント失うはずだったけど、マイナスになっちゃうから0ポイントにしておいたよ！`,"🍀");
    point = 0;
  } else if (n > 0) {
    await customAlert(`${m}${n}ポイントゲット★現在${point}ポイント！`,"🌟");
  } else {
    await customAlert(`${m}${-n}ポイントを失った...現在${point}ポイント`,"🌀");
  }
  localStorage.setItem("point", JSON.stringify(point));
}
function HandWriting(){
    localStorage.removeItem("JAN")
}
async function Delete(n) {
  all = JSON.parse(localStorage.getItem("list"));
  const result = await customConfirm("本当に削除しますか？");
  if (result) {
    all.splice(n, 1);
    localStorage.setItem("list", JSON.stringify(all));
    ReWrite();
    location.reload();
  }
}
async function Use(n) {
  all = JSON.parse(localStorage.getItem("list"));
  const result = await customConfirm("消費しましたか？");
  if (result) {
    const away = all[n].name;
    record(away,"used") 
    today = new Date()
    ReWrite();
    if (new Date (all[n].date) - today < (-1000 * 60 * 60 * 24 * 1)){ 
        record(away,"ex-used")  
        await Point(3, away + "を消費(/・ω・)/期限切れちゃったけど捨てないでくれてありがとう💕"); // OK押すまで待機
    } else if (new Date (all[n].date) - today < 0){
        record(away,"td-used") 
        await Point(3, away + "を消費(/・ω・)/今日が期限だったね！セーフ～"); // OK押すまで待機
    } else {
        record(away,"af-used")     
        await Point(3, away + "を消費(/・ω・)/!!余裕もって消費できたね☆"); // OK押すまで待機
    }
    all.splice(n, 1);
    localStorage.setItem("list", JSON.stringify(all));
    location.reload();
  }
}
async function Trash(n) {
  all = JSON.parse(localStorage.getItem("list"));
  const result = await customConfirm("廃棄しますか？");
  if (result) {
    const away = all[n].name;
    record(away,"trash") 
    today = new Date()
    ReWrite();
    if (new Date (all[n].date) - today < (-1000 * 60 * 60 * 24 * 1)){ 
        record(away,"ex-trash") 
        await Point(-5, away + "の期限切れちゃってたね...これからは期限をしっかり確認しよう！"); // OK押すまで待機
    } else {
        record(away,"af-trash") 
        await Point(-5,  away + "捨てちゃったの...期限切れてないよ(´；ω；`)"); // OK押すまで待機
    }
    all.splice(n, 1);
    localStorage.setItem("list", JSON.stringify(all));
    location.reload();
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
        <h2>期限が切れています！！！</h2><br>
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
        <h2>今日が期限です！！</h2><br>
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
        <h2>期限が迫っています！</h2><br>
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
    if (thisday.length !== 0){
        for (n = 0; n < thisday.length; n++){
        recipelist += thisday[n].recipe
        recipelist += "%E3%80%80"
        }
        document.getElementById("recipe").innerHTML += `<a id = "button" href = ${recipelist}>今日が期限の食品のレシピを見る</a>`
    }
    if (threeDays.length !== 0){
        for (n = 0; n < threeDays.length; n++){
        recipelist += threeDays[n].recipe
        recipelist += "%E3%80%80"
        }
        document.getElementById("recipe").innerHTML += `<br><br><a id = "button" href = ${recipelist}>3日以内が期限の食品のレシピを見る</a>`
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

    // 増やす
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
                customAlert("カメラの起動に失敗しました。カメラへのアクセスを許可しているか、別のアプリで使用中でないか確認してください。","📷")
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
                    localStorage.setItem("readResult",JSON.stringify(readResult))
                    localStorage.setItem("JAN",detectedCode)
                    location.href = "fill.html"
                    return;
                    //customAlert(localStorage.getItem("readResult"))
                } else {
                    customAlert("商品が見つからなかったようです","🍽️")
                }
            })
            .catch(err => customAlert("エラーが発生しました","💥"))
            return;
        } else {
            location.reload();
            return;
        }
    });
}