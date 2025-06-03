import get from "./api.js";
import { SearchUser, selectUser, rangeUser } from "./api.js";

let box = document.querySelector(".box");
let search = document.querySelector(".search");
let Selectsearch = document.querySelector(".Selectsearch");
let range = document.querySelector(".range");
let rangeValue = document.querySelector(".rangeValue");
let dialogcart = document.querySelector(".dialogcart");
let tablecart = document.querySelector(".tablecart");
let btnshooping = document.querySelector(".btnshooping");
let btnX = document.querySelector(".btnX");
let cartspan = document.querySelector(".cartspan");
let sheabag = document.querySelector(".sheabag");
let page = document.querySelector(".page");
let searchbox = document.querySelector(".searchbox");

let body = document.querySelector(".body");
let Black = document.querySelector(".Black");
let White = document.querySelector(".White");

let btncheckout = document.querySelector(".btncheckout");

btncheckout.onclick = () => {
  let data = JSON.parse(localStorage.getItem("data")) || [];
  if (data.length === 0) {
    alert("Your cart is empty");
    return;
  }
  
  let totalPrice = data.reduce((sum, el) => sum + (el.productPrase * el.cnt), 0);
  
  alert(`Your total price is $${totalPrice}. Thank you for shopping!`);
  
  localStorage.removeItem("data");
  showCart();
  window.location.reload();
};

let darcMode = localStorage.getItem("theme") || "white";
body.style.backgroundColor = darcMode;
Black.onclick = () => {
  localStorage.setItem("theme", "black");
  let darcMode = localStorage.getItem("theme");
  body.style.backgroundColor = darcMode;
  body.style.color = "white";
  btnshooping.style.color = "white";
  searchbox.style.color = "white";

  Black.style.color = "white";
};
White.onclick = () => {
  localStorage.setItem("theme", "white");
  let darcMode = localStorage.getItem("theme");
  body.style.backgroundColor = darcMode;
  body.style.color = "black";
  searchbox.style.color = "black";
  btnshooping.style.color = "black";
  Black.style.color = "blue";
};

range.oninput = async () => {
  let maxPrice = parseInt(range.value);
  rangeValue.textContent = maxPrice;
  rangeUser(maxPrice);
};

btnX.onclick = () => {
  dialogcart.close();
   window.location.reload()
};

btnshooping.onclick = () => {
  dialogcart.showModal();
  showCart();
};

search.oninput = async () => {
  SearchUser(search.value);
};

Selectsearch.onchange = async () => {
  selectUser(Selectsearch.value);
};

let data = JSON.parse(localStorage.getItem("data")) || [];

export default function getData(data) {
  box.innerHTML = "";
  data.forEach((el) => {
    let div = document.createElement("div");
    div.classList.add("card");

    let img = document.createElement("img");
    img.src = el.productImg;
    img.classList.add("imgcard");

    let h1name = document.createElement("h3");
    h1name.innerHTML = el.productName;
    h1name.classList.add("name");

    let pStatus = document.createElement("p");
    pStatus.innerHTML = el.productStatus ? "Available" : "Not Available";
    pStatus.style.color = el.productStatus ? "green" : "red";

    let h3Prase = document.createElement("h3");
    h3Prase.innerHTML = `$${el.productPrase}`;

    let btnTocart = document.createElement("button");
    btnTocart.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>
`;
    btnTocart.classList.add("btnTocart");
    btnTocart.onclick = () => {
      addToCard(el);
    };

    let btnInfo = document.createElement("button");
    btnInfo.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
`;
    btnInfo.classList.add("btnInfo");
    btnInfo.onclick = () => {
      localStorage.setItem("product", JSON.stringify(el));
      window.location = "../info/info.html";
    };

    div.append(img, h1name, pStatus, h3Prase, btnInfo, btnTocart);
    box.append(div);
  });
}

// function addToCard(el) {
//   let data = JSON.parse(localStorage.getItem("data")) || [];
//   data.push(el);
//   localStorage.setItem("data", JSON.stringify(data));
//   cartspan.textContent = data.length;
// }


function showCart() {
  tablecart.innerHTML = "";
  let data = JSON.parse(localStorage.getItem("data")) || [];
  if (data.length === 0) {
    tablecart.innerHTML = "<h1>Cart is empty</h1>";
     tablecart.style.marginTop = "100px";
    sheabag.innerHTML = "Total Price: $0";
    cartspan.innerHTML=0
    return;
  }
  function Delete(id) {
  data = data.filter((el) => el.id !== id);
  localStorage.setItem("data", JSON.stringify(data));
  showCart()
 
}

  let opshisuma = 0;
  data.forEach((el) => {
    let div = document.createElement("div");
    div.classList.add("divdialog");

    let tdName = document.createElement("h3");
    tdName.textContent = el.productName;

    let tdPrice = document.createElement("h3");
    tdPrice.textContent = `$${el.productPrase * el.cnt}`;

    let divimg = document.createElement("div");
    divimg.classList.add("divimg");

    let pBrend = document.createElement("p");
    pBrend.innerHTML = el.productCategori;
    pBrend.classList.add("Brend1");

    let img = document.createElement("img");
    img.src = el.productImg;
    img.classList.add("imgdialog");

    let btndelet = document.createElement("button");
    btndelet.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
`;
    btndelet.classList.add("Delet");
    btndelet.onclick = () => {
      Delete(el.id);
    };

    opshisuma += el.productPrase * el.cnt;
    sheabag.innerHTML = `Total Price: $${opshisuma}`;

    let btnplus = document.createElement("button");
    btnplus.innerHTML = "+";
    btnplus.classList.add("btnmax");
    btnplus.onclick = () => {
      let index = data.findIndex((item) => item.id === el.id);
      if (index !== -1) {
        data[index].cnt += 1;
        localStorage.setItem("data", JSON.stringify(data));
        showCart();
        Cntoption();
      }
    };

    let btncnt = document.createElement("button");
    btncnt.innerHTML = el.cnt;
    btncnt.classList.add("BtnCnt");

    let btnmin = document.createElement("button");
    btnmin.innerHTML = "-";
    btnmin.classList.add("btnmin");
    btnmin.onclick = () => {
      let index = data.findIndex((item) => item.id === el.id);
      if (index !== -1 && data[index].cnt > 0) {
        data[index].cnt -= 1;
        localStorage.setItem("data", JSON.stringify(data));
        showCart();
      }
    };

    divimg.append(img, div);
    div.append(tdName, pBrend, tdPrice, btndelet, btnplus, btncnt, btnmin);
    tablecart.appendChild(divimg);
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
