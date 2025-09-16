
let point = localStorage.getItem("point");
if (!point || point === "undefined") {
  localStorage.setItem("point", JSON.stringify(0));
  point = "0";
}
let item;
let date;
let list;
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
function NantoZero(key) {
    const num = Number(localStorage.getItem(key));
    return isNaN(num) ? 0 : num;
}
function updateSubReports() {
    const afUsed = NantoZero("afused");
    const tdUsed = NantoZero("tdused");
    const exUsed = NantoZero("exused");
    const afTrash = NantoZero("aftrash");
    const exTrash = NantoZero("extrash");
    document.getElementById("left-sub").innerHTML = `
        <div>余裕あり: ${afUsed}</div>
        <div>当日: ${tdUsed}</div>
        <div>期限切後: ${exUsed}</div>
    `;

    document.getElementById("right-sub").innerHTML = `
        <div>余裕あり: ${afTrash}</div>
        <div>期限切後: ${exTrash}</div>
    `;
}

async function giveLoginBonus() {
  const today = new Date().toDateString();
  let lastLogin = localStorage.getItem("lastLogin");
  if (!lastLogin || lastLogin === "undefined" || lastLogin !== today) {
    localStorage.setItem("lastLogin", today);
    await Point(1, "ログインボーナス!!今日もDelimateを使ってくれてありがとう🌟");
    location.reload();
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
function customAlert(message, a) {
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
      zIndex: "9999",
      opacity: "0",
      transition: "opacity 0.3s ease"
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
      fontFamily: "sans-serif",
      transform: "scale(0.8)",
      transition: "transform 0.3s ease"
    });

    const icon = document.createElement("div");
    icon.textContent = a;
    icon.style.fontSize = "32px";
    icon.style.marginBottom = "10px";

    const msg = document.createElement("p");
    msg.textContent = message;
    msg.style.marginBottom = "20px";
    msg.style.fontSize = "16px";

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
      // アニメーション
      overlay.style.opacity = "0";
      box.style.transform = "scale(0.8)";
      setTimeout(() => {
        document.body.removeChild(overlay);
        resolve();
      }, 300); // transition時間
    };

    box.appendChild(icon);
    box.appendChild(msg);
    box.appendChild(okBtn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    // 登場
    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
      box.style.transform = "scale(1)";
    });
  });
}

function customConfirm(message) {
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
      zIndex: "9999",
      opacity: "0",
      transition: "opacity 0.3s ease"
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
      fontFamily: "sans-serif",
      transform: "scale(0.8)",
      transition: "transform 0.3s ease"
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

    // 消える
    const closeWithAnimation = (result) => {
      overlay.style.opacity = "0";
      box.style.transform = "scale(0.8)";
      setTimeout(() => {
        document.body.removeChild(overlay);
        resolve(result);
      }, 300);
    };

    cancelBtn.onclick = () => closeWithAnimation(false);
    okBtn.onclick = () => closeWithAnimation(true);

    btnArea.appendChild(cancelBtn);
    btnArea.appendChild(okBtn);
    box.appendChild(icon);
    box.appendChild(msg);
    box.appendChild(btnArea);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    // 登場
    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
      box.style.transform = "scale(1)";
    });
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
  point = JSON.parse(localStorage.getItem("point") || 0);
  point = point + n;
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
        localStorage.exused = (Number(localStorage.exused) || 0)+1;
        await Point(3, away + "を消費(/・ω・)/期限切れちゃったけど捨てないでくれてありがとう💕"); // OK押すまで待機
    } else if (new Date (all[n].date) - today < 0){
        localStorage.tdused = (Number(localStorage.tdused) || 0)+1;
        await Point(3, away + "を消費(/・ω・)/今日が期限だったね！セーフ～"); // OK押すまで待機
    } else {
        localStorage.afused = (Number(localStorage.afused) || 0)+1;
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
        localStorage.extrash = (Number(localStorage.extrash) || 0)+1;
        await Point(-5, away + "の期限切れちゃってたね...これからは期限をしっかり確認しよう！"); // OK押すまで待機
    } else {
        localStorage.extrash = (Number(localStorage.extrash) || 0)+1;
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
                <td><img id = "itemimg" src="https://image.jancodelookup.com/${expired[n].img}.jpg" width="100"></td>
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
                <td><img id = "itemimg" src="https://image.jancodelookup.com/${thisday[n].img}.jpg" width="100"></td>
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
                <td><img id = "itemimg" src="https://image.jancodelookup.com/${threeDays[n].img}.jpg" width="100"></td>
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
                <td><img id = "itemimg" src="https://image.jancodelookup.com/${all[n].img}.jpg" width="100"></td>
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
    list.innerHTML = `<h2>登録されている商品がありません。<br><a id="button" href="scan.html" style = "display: inline-block; margin-top: 50px;"><i class="fas fa-utensils"></i> 食品登録</a>`
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

    const codeReader = confirm(`認識コードは${detectedCode}で正しいですか？`);
    if (!codeReader) {
        location.reload()
    }

    (async () => {
        Quagga.initialized = false; 
        document.querySelector('#container').innerHTML = ''; 
        document.querySelector('#container').style.display = 'none';
        Quagga.stop();

        try {
            const res = await fetch(`https://api.jancodelookup.com/?appId=6807825cfc344aa8a9f9dfe96e3ae809&query=${detectedCode}&type=[code]`);
            const json = await res.json();

            if (json.product && json.product.length > 0) {
                const product = json.product[0];
                const readResult = product.itemName;
                localStorage.setItem("readResult", JSON.stringify(readResult));
                localStorage.setItem("JAN", detectedCode);
                location.href = "fill.html";
            } else {
                await customAlert("商品が見つからなかったようです", "🍽️");
                location.href = "fill.html"
            }
        } catch(err) {
            await customAlert("エラーが発生しました", "💥");
            location.reload()
        }
    })();
});
}

//ゲーム
let stage = Number(localStorage.getItem("stage") || 1);
let progress = Number(localStorage.getItem("progress") || 0);

function updateDisplay() {
    document.getElementById("vege-img").src = `vege/${localStorage.getItem("plant")}/${stage}.png`;
    document.getElementById("progress-bar").style.width = progress + "%";
    document.getElementById("progress-text").textContent = `${progress} / 100`;
    if (localStorage.getItem("point") === null) {
      localStorage.setItem("point", JSON.stringify(0));
    }
    document.getElementById("point").innerHTML = `現在${localStorage.getItem("point")}ポイントです`;
}
async function Water() {
    if(point < 10){
        await customAlert("ポイントが足りません","⚡");
        return;
    }
    point -= 10;
    progress += Math.floor(25/(stage*0.7));
    await customAlert("10ポイント消費して水やりをしました！","🚿");
    rainAnimation()
    if(progress >= 100){
        progress = 0;
        stage++;
        if(stage < 6){
            await customAlert(`ステージアップ！ステージ${stage}へ`,"🌱");
            document.getElementById("grow-btn").innerHTML = `<a style="padding:10px 20px; font-size:16px;" onclick="Water()"><i class="fa fa-shower"></i> 水をあげる (-10ポイント)</a>`
        } else {
            stage = 6;
            progress = 100;
            Confetti()
            await customAlert(`収穫！完成`,"🥕");
            document.getElementById("grow-btn").innerHTML = `<a style="padding:10px 20px; font-size:16px;" onclick="Select()"><i class="fa fa-shower"></i> 育てる植物を選ぶ</button>`  
            const plantData = {
                id: Date.now(),
                type: localStorage.getItem("plant"),
                harvestedAt: new Date().toISOString().split('T')[0],
            };
  Collection(plantData);
        }
    }
    localStorage.setItem("stage", stage);
    localStorage.setItem("progress", progress);
    localStorage.setItem("point", point);
    updateDisplay()
}
function rainAnimation() {
  const container = document.getElementById('game-container');
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  for (let i = 0; i < 50; i++) {
    const drop = document.createElement('i');
    drop.className = 'fas fa-tint rain-drop';

    // ランダムな位置・サイズ・遅延
    drop.style.left = Math.random() * containerWidth + 'px';
    drop.style.top = -30 + 'px'; // 上からスタート
    drop.style.fontSize = (Math.random() * 10 + 10) + 'px';
    drop.style.animationDelay = (Math.random()) + 's';

    container.appendChild(drop);
  }
}
async function Select() {
    // 植物選択用のHTMLを表示
    await customAlert("育てたい植物を選んでください","🌱");
    document.getElementById("game-container").innerHTML = `
        <div style="display:flex; gap:20px; justify-content:center; margin-top:20px;">
            <div onclick="choosePlant('carrot')" style="cursor:pointer; text-align:center;">
                <img id="vege-img" src="vege/carrot/6.png" style="width:100px;">
                <div>ニンジン</div>
            </div>
            <div onclick="choosePlant('pumpkin')" style="cursor:pointer; text-align:center;">
                <img id="vege-img" src="vege/pumpkin/6.png" style="width:100px;">
                <div>カボチャ</div>
            </div>
        </div>
    `;
}

// 選んだ植物で初期化
async function choosePlant(plant) {
  const result = await customConfirm("確定しますか？","❓")
      if (!result){
        return;
      }
    localStorage.setItem("plant", plant); // どの植物か保持
    stage = 1;
    progress = 0;
    localStorage.setItem("stage", stage);
    localStorage.setItem("progress", progress);
    document.getElementById("game-container").innerHTML=`
                <img id="vege-img" src="vege/${localStorage.getItem("plant")}/${stage}.png" alt="${plant}" style="width:150px;">
                <div id="progress-container" style="width:200px; background:#ddd; border-radius:12px; margin:10px auto;">
                <div id="progress-bar" style="height:20px; width:0%; background:linear-gradient(135deg,#ffb347,#ffcc33); border-radius:12px;"></div></div>
            <p id="progress-text">0 / 100</p>
            <div id = "button"><div id = "grow-btn"></div></div>
            <p id="point-display"></p>
    `
    // 水やりボタンを復活
    document.getElementById("grow-btn").innerHTML = `<a style="padding:10px 20px; font-size:16px;" onclick="Water()"><i class="fa fa-shower"></i> 水をあげる (-10ポイント)</a>`
}

const colors = [
  '#ff1744', 
  '#f50057', 
  '#d500f9', 
  '#651fff', 
  '#00e5ff', 
  '#1de9b6', 
  '#76ff03', 
  '#ffea00', 
  '#ff9100',
  '#ff3d00'
];
const icons = [
  'fa-star', 'fa-circle', 'fa-snowflake', 'fa-heart', 'fa-sparkles'
];
function Confetti() {
  const container = document.getElementById('game-container');

  for (let i = 0; i < 60; i++) {
    const sparkle = document.createElement('i');

    const icon = icons[Math.floor(Math.random() * icons.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];

    sparkle.className = `fas ${icon} confetti`;
    sparkle.style.left = Math.random() * container.offsetWidth + 'px';
    sparkle.style.top = Math.random() * 50 + 'px';
    sparkle.style.fontSize = (Math.random() * 12 + 14) + 'px';
    sparkle.style.color = color;

    container.appendChild(sparkle);
  }

  setTimeout(() => {
    container.querySelectorAll('.confetti').forEach(el => el.remove());
  }, 3000);
}
function Collection(data) {
  const collection = JSON.parse(localStorage.getItem("myPlants")) || [];
  collection.push(data);
  localStorage.setItem("myPlants", JSON.stringify(collection));
}
function renderMyPage() {
  const container = document.getElementById("mypage");
  container.innerHTML = "";

  const collection = JSON.parse(localStorage.getItem("myPlants")) || [];

  collection.forEach(plant => {
    const card = document.createElement("div");
    card.className = "plant-card";
    card.innerHTML = `
      <img src="vege/${plant.type}/6.png" style="width:150px;">
      <p>収穫日: ${plant.harvestedAt}</p>
    `;
    container.appendChild(card);
  });
}
