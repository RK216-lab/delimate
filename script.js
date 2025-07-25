let item;
let date;

    var i = 0
var all = ["商品名--期限"]
function Submit(){
    item = document.getElementById("item-name").value
    date = document.getElementById("kigen").value
    output = document.getElementById("list");
    all.push(item + "--" + date);
    const list = document.getElementById("list");
    i++
    list.innerHTML += all[i] + "<button id='" + i + "' onclick='Delete()'>削除</button><br>";
}

function Delete(){
    var e = e || window.event;
    var elem = e.target || e.srcElement;
    var elemID = elem.id;
    if (confirm("削除しますか？")){
        all.splice(elemID,1)
        console.log(all)
        console.log(elemID)
        i = all.length
    }
}