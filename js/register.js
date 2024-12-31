let first = document.querySelector("#First-name")
let last= document.querySelector("#Last-name")
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let register_btn = document.querySelector(".submit")

register_btn.addEventListener ("click" , function (e){
    e.preventDefault()
    if (first.value==="" || email.value==="" || password.value ==="" || last.value===""){
        alert("please fill data")
    } else {
        localStorage.setItem("First-name" , first.value);
        localStorage.setItem("Last-name" , last.value);
        localStorage.setItem("email" , email.value);
        localStorage.setItem("password" , password.value); 
        setTimeout ( () => {
            window.location = "login.html"
        } , 1500)
    }
})