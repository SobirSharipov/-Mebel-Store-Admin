let api = "http://localhost:3000/product";
import getData from "./dom.js";

async function get() {
  try {
    let res = await axios.get(api);
    getData(res.data);
  } catch (error) {}
}

async function SearchUser(params) {
  try {
    let res = await fetch(`${api}?productName=${params}`);
    let data = await res.json();
    getData(data);
  } catch (error) {}
}

async function selectUser(brend) {
  if (brend != "All") {
    try {
      let res = await fetch(`${api}?productCategori=${brend}`);
      let data = await res.json();
      getData(data);
    } catch (error) {
      console.error(error);
    }
  } else {
    get();
  }
}

async function rangeUser(max) {
  try {
    let res = await fetch(api);
    let data = await res.json();
    getData(data.filter((el) => el.productPrase <= max));
  } catch (error) {
    console.error(error);
  }
}

export default get;
export { SearchUser, selectUser, rangeUser };
