let email = document.querySelector("#email")
let password = document.querySelector("#password")
let loginBtn = document.querySelector(".log-submit")

let getUser = localStorage.getItem("email")
let getPassword = localStorage.getItem("password")

loginBtn.addEventListener ("click" , function(e){
    e.preventDefault()
    if (email.value==="" || password.value===""){
        alert("please fill data ")
    } else {
        if ( (getUser && getUser.trim() === email.value.trim() && getPassword && getPassword === password.value )  )
        {
            setTimeout ( () => {
                window.location = "cartsproducts.html"
            } , 1400)
        } else {
         alert("username or password is wrong ")
        }
    }
})