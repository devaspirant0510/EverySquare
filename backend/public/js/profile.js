const btnChangeProfile = document.querySelector("#btn-change-profile");
const btnDefaultImage = document.querySelector("#btn-default-image");
const btnProfileNameChange = document.querySelector("#btn-profile-name-change");

btnProfileNameChange.addEventListener("click",async()=>{
    const userName = prompt("변경할 닉네임을 입력해주세요");
    if(userName!==""){
        const result = await axios.patch("/profile",{
            userName
        });
        console.log(result);
        location.reload();
    }else{
        alert("입력을 해주세요")
    }
});

btnChangeProfile.addEventListener("click",async (evt)=>{

});

btnDefaultImage.addEventListener("click",async (evt)=>{
    const result = await axios.patch("/profile/default");
    location.reload();

});