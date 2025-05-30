let box=document.querySelector(".box")
let product = JSON.parse(localStorage.getItem("data")) || [];




function AddtoCart(data) {
    box.innerHTML=""
    data.forEach(el=>{
        let div=document.createElement("div")

        let h1name=document.createElement("h1")
        h1name.innerHTML=el.productName
        h1name.classList.add("h1name")

        let img=document.createElement("img")
        img.src=el.productImg

        let h3Prase=document.createElement("h3")
        h3Prase.innerHTML=el.productPrase

        div.append(img,h1name,h3Prase)
        box.append(div)
    })
}
AddtoCart(product)