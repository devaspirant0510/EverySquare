const formRoomCreate = document.querySelector("#form-room-create");
const inputRoomName = document.querySelector("#input-room-name");
const textAreaRoomDescription = document.querySelector("#textarea-room-description");
const inputRoomMAx = document.querySelector("#input-room-max");
const inputRoomHashtag = document.querySelector("#input-room-hashtag");
const btnSubmitRoomCreate = document.querySelector("#btn-submit-room-create");

formRoomCreate.addEventListener("submit",async (evt)=>{
    try{
        evt.preventDefault();
        const result  = await axios.post("/room",{
            roomName:inputRoomName.value,
            roomDescription:textAreaRoomDescription.value,
            maxUser:parseInt(inputRoomMAx.value),
            hashtag:inputRoomHashtag.value,
            isPublic:true,
        });
        console.log(result.data.data)
        location.href = `/room/${result.data.data.roomKey}`;
    }catch (err){
        console.log(err)
        alert("오류발생!");
    }
})