const btnGoToLoginPage = document.querySelector("#btn-go-to-login-page");
const navMenu = document.querySelector("#nav-menu");
const navDefaultMenu = document.querySelector("#nav-default-menu");

const navMenuProfile = document.querySelector("#nav-default-menu");
const navDefaultMenuProfile = document.querySelector("#nav-default-menu-profile");

const imgProfile = document.querySelector("#img-profile");
const imgDefaultProfile = document.querySelector("#img-default-profile");

const sectionProfileCard = document.querySelector("#section-profile-card");

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

});

navMenuProfile.addEventListener("click",(evt)=>{
    evt.preventDefault();
    console.log("onclick nav menu profile")
    location.href = "/profile";
});
navDefaultMenuProfile.addEventListener("click",(evt)=>{
    evt.preventDefault();
    console.log("onclick nav default menu profile")
    location.href = "/profile";
});

imgProfile.addEventListener("click",(evt)=>{
    evt.preventDefault();
    console.log("onclick img profile")
    location.href = "/profile";
});
imgDefaultProfile.addEventListener("click",(evt)=>{
    evt.preventDefault();
    console.log("onclick img default profile")
    location.href = "/profile";

});
sectionProfileCard.addEventListener("click",()=>{
    console.log("on click profile card")
    location.href = "/profile"
})