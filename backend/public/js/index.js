const btnGoToLoginPage = document.querySelector("#btn-go-to-login-page");
const navMenu = document.querySelector("#nav-menu");
const navDefaultMenu = document.querySelector("#nav-default-menu");

console.log("afsd")
console.log(btnGoToLoginPage)
if(btnGoToLoginPage){
    btnGoToLoginPage.addEventListener("click",async (evt)=>{
        location.href = "/login";
    });
}


navDefaultMenu.addEventListener("mouseenter",()=>{
    console.log("mouse over")
    navDefaultMenu.style.display = "none"
    navMenu.style.display = "flex"
});

navMenu.addEventListener("mouseleave",()=>{
    navDefaultMenu.style.display = "flex"
    navMenu.style.display = "none"

})