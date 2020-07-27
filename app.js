let name = document.getElementById("name")
let number = document.getElementById("number")
let btn = document.getElementById("save")
document.addEventListener("DOMContentLoaded", fetchData)
btn.addEventListener("click", e => {
    e.preventDefault()
    let contact = {
        name: name.value,
        number: number.value
    }
    name.value = ""
    number.value = ""
    //submitting to local Storage
    if (localStorage.getItem("contacts") == null)
        contacts = []
    else
        contacts = JSON.parse(localStorage.getItem("contacts"));
    contacts.push(contact)
  
    localStorage.setItem("contacts", JSON.stringify(contacts))
    fetchData()
    location.reload()
})
function fetchData() {
    contacts = JSON.parse(localStorage.getItem("contacts"))
    contacts.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    contacts.forEach(contact => {
        let name = contact.name
        let number = contact.number
        let collection = document.getElementsByTagName("h5")
        for (let i = 0; i < collection.length; i++) {
            let first = name[0].toUpperCase()
            if (collection[i].innerHTML == first) {
                collection[i].parentElement.nextElementSibling.innerHTML += `<div class="search"><p>${name}</p>
    <p>${number}</p>
    <button class="btn btn-primary delete" id=${Math.random()} onclick=${'del(this.id)'}>delete</button>
    </div>`
            }
        }
    })
    
}
function del(id){
    let element=document.getElementById(id)
    let name=element.parentElement.firstChild
    let number=name.nextElementSibling
    name=name.innerText
    number=number.innerText
    element.parentElement.remove()
contacts=JSON.parse(localStorage.getItem("contacts"))
if(contacts==null)
contacts=[]
else{
    contacts.forEach((contact,index)=>{
    if(contact.name===name&&contact.number===number)
    contacts.splice(index,1)
    })
}
localStorage.setItem("contacts",JSON.stringify(contacts))

}
let filterInput=document.getElementById("filterInput")
filterInput.addEventListener("input",function(){
    let value=filterInput.value
    let search=document.getElementsByClassName("search")
for(let i=0;i<search.length;i++){
    let first=search[i].firstChild.innerText
    if(!first.includes(value)){
        search[i].style.display="none"
    }else{
        search[i].style.display="block"
    }
}
})


