import getData from "./dom.js";
import { api } from "./dom.js";

 async function get() {
    try {
         let respons=await fetch(api)
        let data=await respons.json()
        getData(data)
    } catch (error) {
        console.error(error);
        
    }
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

async function rangUser(max) {
    try {
        let res=await axios.get(api)
        getData(res.data.filter(el=>el.productPrase <=max))
    } catch (error) {
        console.error(error);
        
    }
}

async function DeleteUser(id) {
  try {
    let res=await axios.delete(`${api}/${id}`)
    getData(res.data)
  } catch (error) {
    console.error(error);
    
  }
  
}

async function EditUser(updateUser,idx) {
    try {
        await fetch(`${api}/${idx}`,{
            method:"PUT",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(updateUser)
        })
        get()
    } catch (error) {
        
    }
}

async function checUser(newChec,id){
  try {
     await fetch(`${api}/${id}`,{
            method:"PUT",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(newChec)
        })
        get()
  } catch (error) {
    console.error(error);
    
  }
}


async function SelectUser(User) {
  if( User != "All") {
    try {
      let res = await fetch(`${api}?productStatus=${User=="Active"}`);
      let data = await res.json();
      getData(data);
    } catch (error) {
      console.error(error);
    }
  } else {
    get();
  }
}

export {get, SearchUser, selectUser ,rangUser,DeleteUser,EditUser,checUser,SelectUser}