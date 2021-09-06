const navMenu = document.querySelector("#nav-menu");
const navDefaultMenu = document.querySelector("#nav-default-menu");


navDefaultMenu.addEventListener("mouseenter",()=>{
    console.log("mouse over")
    navDefaultMenu.style.display = "none"
    navMenu.style.display = "flex"
});

navMenu.addEventListener("mouseleave",()=>{
    navDefaultMenu.style.display = "flex"
    navMenu.style.display = "none"

})
