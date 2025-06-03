let box = document.querySelector(".box");
let dialogcart = document.querySelector(".dialogcart");
let tablecart = document.querySelector(".tablecart");
let btnshooping = document.querySelector(".btnshooping");
let cartspan = document.querySelector(".cartspan");
let btnX = document.querySelector(".btnX");
let Options = document.querySelector(".Options");
let sheabag = document.querySelector(".sheabag");

let product = JSON.parse(localStorage.getItem("product")) || [];
console.log(product);

let data = JSON.parse(localStorage.getItem("data")) || [];

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

let body = document.querySelector(".body");
let Black = document.querySelector(".Black");
let White = document.querySelector(".White");

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

function getInfo(el) {
  box.innerHTML = "";
  let div = document.createElement("div");

  let h1name = document.createElement("h1");
  h1name.innerHTML = el.productName;
  h1name.classList.add("h1name");

  let pBrend = document.createElement("p");
  pBrend.innerHTML = el.productCategori;
  pBrend.classList.add("Brend");

  let divImg = document.createElement("div");
  let img = document.createElement("img");
  img.src = el.productImg;
  img.classList.add("img");

  let productLorem = document.createElement("p");
  productLorem.innerHTML = el.productDescription;
  productLorem.classList.add("lorem");

  let divcolor = document.createElement("div");
  divcolor.classList.add("Divcolr");
  
  
  let divcol = document.createElement("div");
  divcol.style.display = "flex";
  divcol.style.gap = "10px";
  el.productColor.forEach((el) => {
    let productcolor = document.createElement("div");
    productcolor.innerHTML = "";
    productcolor.style.backgroundColor = el;
    productcolor.classList.add("productColor");
    divcol.append(productcolor);
  });

  let h3Prase = document.createElement("h3");
  h3Prase.innerHTML = `$${el.productPrase}`;
  h3Prase.classList.add("Prase");

  let btnAddtocart = document.createElement("button");
  btnAddtocart.innerHTML = "ADD TO CART";
  btnAddtocart.classList.add("addtucart");
  btnAddtocart.onclick = () => {
    addToCard(el);
  };

  divcolor.append(h3Prase, divcol);
  divImg.append(img);
  div.append(h1name, pBrend, divcolor, productLorem, btnAddtocart);
  box.append(divImg, div);
}
getInfo(product);

btnshooping.onclick = () => {
  dialogcart.showModal();
  showCart();
};

btnX.onclick = () => {
  dialogcart.close();
   window.location.reload()
};

function showCart() {
  tablecart.innerHTML = "";
  let data = JSON.parse(localStorage.getItem("data")) || [];
  if (data.length === 0) {
    tablecart.innerHTML = "<h1>Cart is empty</h1>";
     tablecart.style.marginTop = "100px";
    sheabag.innerHTML = "Total Price: $0";
    Options.style.display = "none";
    return;
  }

  function Delete(id) {
    data = data.filter((el) => el.id !== id);
    localStorage.setItem("data", JSON.stringify(data));
    showCart();
    
  }
  let opshisuma = 0;

  data &&
    data.forEach((el) => {
      let div = document.createElement("div");
      div.classList.add("divdialog");

      let divimg = document.createElement("div");
      divimg.classList.add("divimg");

      let pBrend = document.createElement("p");
      pBrend.innerHTML = el.productCategori;
      pBrend.classList.add("Brend1");

      let img1 = document.createElement("img");
      img1.src = el.productImg;
      img1.classList.add("imgdialog");

      let tdName = document.createElement("h3");
      tdName.innerHTML = el.productName;
      tdName.classList.add("nameDialog");

      let tdPrice = document.createElement("h3");
      tdPrice.innerHTML = `$${el.productPrase * el.cnt}`;

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
          Cntoption();
        }
      };

      let btndelet = document.createElement("button");
      btndelet.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
`;
      btndelet.classList.add("Delet");
      btndelet.onclick = () => {
        Delete(el.id);
      };

      divimg.append(img1, div);
      div.append(tdName, pBrend, tdPrice, btndelet, btnplus, btncnt, btnmin);
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
