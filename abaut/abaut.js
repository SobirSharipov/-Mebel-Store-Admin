let dialogcart = document.querySelector(".dialogcart");
let btnX = document.querySelector(".btnX");
let tablecart = document.querySelector(".tablecart");
let sheabag = document.querySelector(".sheabag");
let Options = document.querySelector(".Options");
let cartspan = document.querySelector(".cartspan");
let btnshooping = document.querySelector(".btnshooping");



let body = document.querySelector(".body");
let Black = document.querySelector(".Black");
let White = document.querySelector(".White");

let darcMode=localStorage.getItem("theme") || "white"
body.style.backgroundColor = darcMode
Black.onclick = () => {
  localStorage.setItem("theme", "black");
  let darcMode = localStorage.getItem("theme");
  body.style.backgroundColor = darcMode;
  body.style.color = "white";
  btnshooping.style.color = "white";
  searchbox.style.color = "white";
  
  Black.style.color = "white";
}
White.onclick = () => {
  localStorage.setItem("theme", "white");
  let darcMode = localStorage.getItem("theme");
  body.style.backgroundColor = darcMode;
  body.style.color = "black";
  searchbox.style.color = "black";
  btnshooping.style.color = "black";
 Black.style.color = "blue";
}



btnshooping.onclick=()=>{
  dialogcart.showModal()
  showCart();
}


btnX.onclick = () => {
  dialogcart.close();
}

let data = JSON.parse(localStorage.getItem("data")) || [];

function showCart() {
  tablecart.innerHTML = "";
  let data = JSON.parse(localStorage.getItem("data")) || [];
  if (data.length === 0) {
    tablecart.innerHTML = "<h1>Cart is empty</h1>";
    return;
  }

 let opshisuma=0
  
  data && data.forEach((el) => {
    let div = document.createElement("div");
    div.classList.add("divdialog")

   let divimg=document.createElement("div")
   divimg.classList.add("divimg")

    let pBrend=document.createElement("p")
        pBrend.innerHTML=el.productCategori
        pBrend.classList.add("Brend1")

    let img1 = document.createElement("img");
    img1.src = el.productImg;
    img1.classList.add("imgdialog")

    let tdName = document.createElement("h3");
    tdName.innerHTML = el.productName;
    tdName.classList.add("nameDialog")

    let tdPrice = document.createElement("h3");
    tdPrice.innerHTML = `$${el.productPrase*el.cnt}`;

   
    opshisuma+=el.productPrase*el.cnt
    sheabag.innerHTML=`Total Price: $${opshisuma}`

    let btnplus=document.createElement("button")
    btnplus.innerHTML="+"
    btnplus.classList.add("btnmax")
    btnplus.onclick=()=>{
       let index = data.findIndex((item) => item.id === el.id);
      if (index !== -1) {
        data[index].cnt += 1;
        localStorage.setItem("data", JSON.stringify(data));
        showCart();
        Cntoption()
      }
    }

    let btncnt= document.createElement("button");
    btncnt.innerHTML = el.cnt;
    btncnt.classList.add("BtnCnt")
    

     let btnmin=document.createElement("button")
    btnmin.innerHTML="-"
    btnmin.classList.add("btnmin")
    btnmin.onclick=()=>{
       let index = data.findIndex((item) => item.id === el.id);
      if (index !== -1 && data[index].cnt > 0) {
        data[index].cnt -= 1;
        localStorage.setItem("data", JSON.stringify(data));
        showCart();
        Cntoption()
      }
    }

    let btndelet=document.createElement("button");
    btndelet.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
`;
    btndelet.classList.add("Delet")
    btndelet.onclick = () => {
      Delete(el.id);
    };

    divimg.append(img1,div)
    div.append(tdName,pBrend, tdPrice, btndelet,btnplus, btncnt,btnmin,);
    tablecart.append(divimg);
  });
}

let cntcart = data.reduce((sum, el) => sum + (el.cnt || 1), 0);
cartspan.innerHTML = cntcart;


function addToCard(e) {
  let index = data.findIndex((item) => item.id === e.id);
  if (index !== -1) {
    data[index].cnt = data[index].cnt + 1;
  } else {
    let newItem = { ...e, cnt: 1 };
    data.push(newItem);
  }
  let totalCnt = data.reduce((sum, el) => sum + el.cnt, 0);
  cartspan.innerHTML = totalCnt;
  console.log(data);
  
  
  localStorage.setItem("data", JSON.stringify(data));
    // Cntoption()
}