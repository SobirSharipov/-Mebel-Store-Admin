import {
  SearchUser,
  selectUser,
  rangUser,
  DeleteUser,
  EditUser,
} from "./api.js";
let api = "http://localhost:3000/product";
let box = document.querySelector(".box");
let search = document.querySelector(".search");
let Selectsearch = document.querySelector(".Selectsearch");
let range = document.querySelector(".range");
let rangeValue = document.querySelector(".rangeValue");
let AddnewProduct = document.querySelector(".AddnewProduct");
let Adddialog = document.querySelector(".Adddialog");
let Addform = document.querySelector(".Addform");


let Editdialog = document.querySelector(".Editdialog");
let Editform = document.querySelector(".Editform");
let idx = null;

AddnewProduct.onclick = () => {
  Adddialog.showModal();
};

range.oninput = async () => {
  let maxPrace = Number(range.value);
  rangeValue.textContent = maxPrace;
  rangUser(maxPrace);
};

search.oninput = async () => {
  SearchUser(search.value);
};

Selectsearch.onchange = async () => {
  selectUser(Selectsearch.value);
};

Addform.onsubmit = async (event) => {
  event.preventDefault()
  let newUser = {
    productName: event.target["AddName"].value,
    productCategori: event.target["AddBrend"].value,
    productDescription: event.target["Addlorem"].value,
    productImg: event.target["Addimg"].value,
    productPrase: event.target["AddPrace"].value,
    productColor: event.target["AddColor"].value,
    productStatus: event.target["AddSelect"].value == "Active"
        ? "Available"
        : "Not Available",
  };
  try {
    let res = await axios.post(api, newUser);
    getData(res.data);
  } catch (error) {}
};

Editform.onsubmit = async (event) => {
  event.preventDefault();
  let EditnewUser = {
    productName: event.target["EditName"].value,
    productCategori: event.target["EditBrend"].value,
    productDescription: event.target["Editlorem"].value,
    productImg: event.target["Editimg"].value,
    productPrase: event.target["EditPrace"].value,
    productColor: event.target["EditColor"].value,
    productStatus: event.target["EditSelect"].value == "Active"
        ? "Available"
        : "Not Available",
  };
  EditUser(EditnewUser,idx)
};

export default function getData(data) {
  box.innerHTML = "";
  data.forEach((el) => {
    let div = document.createElement("div");

    let h2name = document.createElement("h2");
    h2name.innerHTML = el.productName;

    let pBrend = document.createElement("p");
    pBrend.innerHTML = el.productCategori;
    pBrend.classList.add("Brend");

    let pStatus = document.createElement("p");
    pStatus.innerHTML = el.productStatus ? "Available" : "Not Available";
    pStatus.style.color = el.productStatus ? "green" : "red";

    let h4Prase = document.createElement("h2");
    h4Prase.innerHTML = `$${el.productPrase}`;

    let imgproduct = document.createElement("img");
    imgproduct.src = el.productImg;
    imgproduct.classList.add("imgadmin");

    let btnDelet = document.createElement("button");
    btnDelet.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
`;
    btnDelet.onclick = () => {
      DeleteUser(el.id);
    };

    let btnEdit = document.createElement("button");
    btnEdit.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
`;
    btnEdit.onclick = () => {
      Editdialog.showModal();
      Editform["EditName"].value = el.productName;
      Editform["EditBrend"].value = el.productCategori;
      Editform["Editlorem"].value = el.productDescription;
      Editform["Editimg"].value = el.productImg;
      Editform["EditPrace"].value = el.productPrase;
      Editform["EditColor"].value = el.productColor;
      Editform["EditSelect"].value = el.productStatus ? "Active" : "Inactive";
      idx = el.id;
    };

    div.append(imgproduct, h2name, pBrend, pStatus, h4Prase, btnDelet, btnEdit);
    box.append(div);
  });
}

export { api };
