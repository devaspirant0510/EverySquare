const formRoomCreate = document.querySelector("#form-room-create");
const inputRoomName = document.querySelector("#input-room-name");
const textAreaRoomDescription = document.querySelector("#textarea-room-description");
const inputRoomMax = document.querySelector("#input-room-max");
const inputRoomHashtag = document.querySelector("#input-room-hashtag");
const radioBtnPublic = document.querySelector("#radio-room-public")
const radioBtnPrivate = document.querySelector("#radio-room-private");

const btnSubmitRoomCreate = document.querySelector("#btn-submit-room-create");

formRoomCreate.addEventListener("submit",async (evt)=>{
    try{
        evt.preventDefault();
        console.log(radioBtnPublic.checked);
        console.log(radioBtnPrivate.checked);
        const maxCount = parseInt(inputRoomMax.value);
        if(maxCount<=1 && maxCount>=6){
            alert("최대 2명에서 6명까지만 가능합니다. <:(");
            return;
        }
        const result  = await axios.post("/room",{
            roomName:inputRoomName.value,
            roomDescription:textAreaRoomDescription.value,
            maxUser:parseInt(inputRoomMax.value),
            hashtag:inputRoomHashtag.value,
            isPublic:radioBtnPublic.checked?true:false,
        });
        console.log(result.data.data)
        location.href = `/room/${result.data.data.roomKey}`;
    }catch (err){
        console.log(err)
        alert("오류발생!");
    }
})