const myLocalVideo = document.querySelector("#my-video");
const videoGrid = document.querySelector("#root-video-grid");
const btnHandleCam = document.querySelector("#btn-handle-cam");
const btnHandleMic = document.querySelector("#btn-handle-mic");
const btnHandlePresent = document.querySelector("#btn-handle-present");
const btnHandleMessage = document.querySelector("#btn-handle-message");
const sectionChat = document.querySelector("#section-chat");
const formChatSend = document.querySelector("#form-chat-send");
const inputChat = document.querySelector("#input-send-chat");
const listChat = document.querySelector("#list-chat");
const selectSendChatUser = document.querySelector("#select-send-chat-user");
const btnExit = document.querySelector("#btn-exit");

const chatPeople = {
    all:"전체",
}

const videoChatOptions = {
    video:true,
    audio:true,
    screenShare:false,
    isShowChat:false,
}
const socket = io.connect("http://127.0.0.1:8081/room",{
    path:"/socket.io",
    transport:['websocket']
});
console.log(socket)
const peer = new Peer();
const peers = {};
let currentPeer = null;
console.log(peer)

const options = {
    video:true,
    audio:true,
}

//const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
let myPeerId = "";
let myStream = "";
let userList = "";
let video = "";

// 내 로컬 비디오 연결
navigator.mediaDevices.getUserMedia(options).then(stream =>{
    console.log("local video connect");
    console.log("socket emit add-list ",USER_ID,USER_NAME);
    myStream = stream;
    video = document.createElement("video");
    addVideoStream(video,stream,true);
    peer.on("call",(call)=>{
        console.log("user video call")
        call.answer(stream);
        const video = document.createElement("video");
        call.on("stream",(userVideoStream)=>{
            console.log("my video stream")
            addVideoStream(video,userVideoStream);
        });
        call.on("close",()=>{
            console.log("my video close")
            video.remove();
        });currentPeer = call;
    });
    console.log("socket on join 대기");
    socket.on("message",(msg)=>{
        console.log(msg)
    });
    // 유저 입장할때마다 peerId 넘겨줘서 stream 연결후 video 화면에 추가
    socket.on("user-connect",(nickname,peerId)=>{
        console.log("socket on join",nickname,peerId)
        connectUser(peerId,stream);
    });
    handleVideoConfigure(stream);
}).catch(err=>{
    console.log(err);
});

socket.on("user-disconnect",(id)=>{
    console.log("disconnect",id);
    if(peers[id]){
        console.log(peers[id]);
        peers[id].close();
    }
});


peer.on("open",async (id)=>{
    console.log("peer on open")
    console.log("my video open peer on",id);
    myPeerId = id;

    console.log(myStream,id)
    // room 연결 (서버쪽에서 socket.join() 으로 룸가입
    socket.emit("join-room",ROOM_KEY,id,USER_INFO);
    console.log("socket emit add list")

    socket.emit("add-list",ROOM_KEY,USER_ID,USER_NAME)

/*
    // 방에 참가한 유저 정보를 넘김
    await axios.patch(`/room/${ROOM_KEY}`,{
        count:Object.entries(userList).length,
        userId:USER_ID
    });
*/

});

// 참가중인 유저리스트
socket.on("user-list",(userList)=>{
    this.userList = userList;
    Object.entries(userList).map(val=>{
        addSelectOption(val[0],val[1]);
    });

    console.log(userList);
})
function addSelectOption(userId,userName){
    // 드롭다운 아이템에 자기자긴은 제외
    if (userId!==USER_ID){
        const option = document.createElement("option");
        option.className = userId;
        option.textContent = userName;
        selectSendChatUser.append(option);
    }
}
// 유저가 입장할때 peerjs 를통해 유저 스티림을 가져옴
function connectUser(peerId,stream){
    const call = peer.call(peerId,stream);
    console.log(`connect to user ${call}`);
    const video = document.createElement("video");
    call.on("stream",(userVideoStream)=>{
        console.log("user stream")
        addVideoStream(video,userVideoStream,false);
    });
    call.on("close",()=>{
        console.log("user close")
        video.remove();
    });
    console.log(peerId,call)
    peers[peerId] = call;
}

// 스트림객체를 넘겨 화면에 비디오를 띄워줌
function addVideoStream(video,stream,isMe){
    video.srcObject = stream;
    video.addEventListener("loadedmetadata",()=>{
        video.play();
    });
    video.autoplay = true;
    videoGrid.append(video);
}
function addChatMessageUI(content,sender,receiver,isPublic,profileURL){
    const liTag = document.createElement("li");
    liTag.style.border = "1px solid black";
    if(isPublic){
        // 내가 보낸메시지일때
        if(sender===USER_ID){
            const myChat = document.createElement("div");
            myChat.classList.add("my-chat");
            const myNameDiv = document.createElement("div");
            myNameDiv.textContent = "나";
            const myContent = document.createElement("div");
            myContent.textContent = content;
            myChat.append(myNameDiv,myContent);
            listChat.append(myChat);
        }else{
            const otherChat = document.createElement("div");
            otherChat.classList.add("other-chat");
            const otherImg = document.createElement("img");
            otherImg.src = profileURL;
            const otherName = document.createElement("span");
            otherName.textContent = this.userList[sender];
            const otherChatContent = document.createElement("div");
            otherChatContent.textContent = content;
            otherChat.append(otherImg,otherName,otherChatContent)
            listChat.append(otherChat);
        }
    }else{

        // 내가 보낸메시지일때
        if(sender===USER_ID){
            const myChat = document.createElement("div");
            myChat.classList.add("my-chat");
            const myNameDiv = document.createElement("div");
            console.log(userList)
            console.log(receiver)
            myNameDiv.textContent = this.userList[receiver]+" 에게보낸 개인 메시지";
            const myContent = document.createElement("div");
            myContent.textContent = content;
            myChat.append(myNameDiv,myContent);
            listChat.append(myChat);
        }else{
            const otherChat = document.createElement("div");
            otherChat.classList.add("other-chat");
            const otherImg = document.createElement("img");
            otherImg.src = profileURL;
            const otherName = document.createElement("span");
            otherName.textContent = this.userList[sender]+" 에게 받은 메시지";
            const otherChatContent = document.createElement("div");
            otherChatContent.textContent = content;
            otherChat.append(otherImg,otherName,otherChatContent)
            listChat.append(otherChat);
        }
        liTag.textContent = `${this.userList[sender]}의 개인메시지 : ${content}`;

    }
}
// 채팅 받았을때
socket.on("message",(content,roomKey,sender,receiver,isPublic,profileURL)=>{
    console.log(content)
    addChatMessageUI(content,sender,receiver,isPublic,profileURL);


});
// 채팅 전송
formChatSend.addEventListener("submit",async (evt)=>{
    evt.preventDefault();
    if (inputChat.value !==""){
        console.log("/room/"+ROOM_KEY+" 로 메시지 전송")
        if(selectSendChatUser.value==="전체"){
            socket.emit("message",inputChat.value,ROOM_KEY,USER_ID,chatPeople.all,true,USER_PROFILE_URL);
        }else{
            console.log(userList)
            const optionList = selectSendChatUser.options;
            const selectIdx = selectSendChatUser.selectedIndex;
            const recId = optionList[selectIdx].className;
            console.log(recId)
            socket.emit("message",inputChat.value,ROOM_KEY,USER_ID,recId,false,USER_PROFILE_URL);
        }
        inputChat.value = "";

    }else{
        alert("메시지를 입력해주세요");
    }
});
function handleVideoConfigure(stream){
    // 카메라 끄기, 켜기 버튼을 눌렀을때
    btnHandleCam.addEventListener("click",(evt)=>{
        const btnCamOn = btnHandleCam.children[0];
        const btnCamOff = btnHandleCam.children[1];
        // 카메라가 켜진상태라면
        console.log(evt.currentTarget.value)
        if(videoChatOptions.video){
            // 옵션에서 카메라를 꺼진 상태로 만들고
            videoChatOptions.video = false;
            // stream 객체에서 enabled 를 false
            stream.getVideoTracks()[0].enabled = false;
            btnCamOn.style.display = "none";
            btnCamOff.style.display = "block";
        }else{
            videoChatOptions.video = true;
            stream.getVideoTracks()[0].enabled = true;
            btnCamOn.style.display = "block";
            btnCamOff.style.display = "none";
        }
    });
    btnHandleMic.addEventListener("click",(evt)=>{
        const btnMicOn = btnHandleMic.children[0];
        const btnMicOff = btnHandleMic.children[1];
        if(videoChatOptions.audio){
            videoChatOptions.audio = false;
            stream.getAudioTracks()[0].enabled = false;
            btnMicOn.style.display = "none";
            btnMicOff.style.display = "block";
        }else{
            videoChatOptions.audio = true;
            stream.getAudioTracks()[0].enabled = true;
            btnMicOn.style.display = "block";
            btnMicOff.style.display = "none";
        }
    });
    btnHandleMessage.addEventListener("click",(evt)=>{
        if(videoChatOptions.isShowChat){
            videoChatOptions.isShowChat = false;
            sectionChat.style.display = "block";
        }
        else{
            videoChatOptions.isShowChat = true;
            sectionChat.style.display = "none";
        }
    });
    btnHandlePresent.addEventListener("click",async (evt)=>{
        const btnPresentOn = btnHandlePresent.children[0];
        const btnPresentOff = btnHandlePresent.children[0];
        console.log("onclick screen share")
        if(!videoChatOptions.screenShare){
            navigator.mediaDevices.getDisplayMedia({
                audio: true,
                video: true
            }).then(function(_stream){
                //success
                video.srcObject = _stream;
                video.addEventListener("loadedmetadata",()=>{
                    video.play();
                });
                video.autoplay = true;
                console.log(stream.getVideoTracks()[0])
                console.log(peer)
            }).catch(function(e){
                //error;
            });
        }
        else{

        }


    });
}

btnExit.addEventListener("click",()=>{
    location.href = "/search";
})
