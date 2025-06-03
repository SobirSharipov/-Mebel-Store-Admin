// let apiPasvord="http://localhost:3000/admin"
// let box =document.querySelector(".box")
// let loginName=document.querySelector(".loginName")
// let loginEmail=document.querySelector(".loginEmail")
// let loginpasvord=document.querySelector(".loginpasvord")
// let login=document.querySelector(".login")

// async function get() {
//     try {
//          let res=await fetch(apiPasvord)
//         let data=await res.json()
//         getData(data)
//     } catch (error) {
//         console.error(error);
        
//     }
// }

// function getData(data) {
//     let Pasvord=data.find(User=>{
//         User.name===loginName.value &&
//         User.Email===loginEmail.value &&
//         User.pasword===loginpasvord.value
//     })
//     if(Pasvord){
//         localStorage.setItem("pasword",Pasvord.name)
//         window.location="http://127.0.0.1:5500/admin/admin.html"
//     }
//     else{
//         alert("You are not Admin!!!")
        
//     }
// }


// login.onclick=async()=>{
//     if(!loginName.value || !loginEmail.value || !loginpasvord.value){
//         return alert("Пажалуйста, заполните все поля.....")
//     }
//     try {
//         let res=await fetch(apiPasvord)
//         let data=await res.json()
//         getData(data)
//     } catch (error) {
//         console.error(error);
        
//     }
// }
// get()



let apiPasvord = "http://localhost:3000/admin"
let loginName = document.querySelector(".loginName")
let loginEmail = document.querySelector(".loginEmail")
let loginpasvord = document.querySelector(".loginpasvord")
let login = document.querySelector(".login")

let dataAdmin = localStorage.getItem("pasword")
if (dataAdmin) {
    window.location = "http://127.0.0.1:5500/admin/admin.html"
}   

function getData(data) {
    let Pasvord = data.find(User =>
        User.name === loginName.value &&
        User.Email === loginEmail.value &&
        User.pasword === loginpasvord.value
    )

    if (Pasvord) {
        localStorage.setItem("pasword", Pasvord.name)
        window.location = "http://127.0.0.1:5500/admin/admin.html"
    } else {
        alert("You are not Admin!!!")
    }
}

login.onclick = async () => {
    if (!loginName.value || !loginEmail.value || !loginpasvord.value) {
        return alert("Пожалуйста, заполните все поля.....")
    }

    try {
        let res = await fetch(apiPasvord)
        let data = await res.json()
        getData(data)
    } catch (error) {
        console.error(error)
    }
}
