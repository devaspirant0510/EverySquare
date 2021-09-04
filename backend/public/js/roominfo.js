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

const chatPeople = {
    all:"전체",
}

const videoChatOptions = {
    video:true,
    audio:true,
    screenShare:false,
    isShowChat:false,
}
const ROOM_KEY = window.location.pathname.split("/")[2]
const socket = io.connect("http://127.0.0.1:8081/",{
    path:"/socket.io",
    transport:['websocket']
});
console.log(socket)
const peer = new Peer();
const peers = {};
console.log(peer)

const options = {
    video:true,
    audio:true,
}

//const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

// 내 로컬 비디오 연결
navigator.mediaDevices.getUserMedia(options).then(stream =>{
    console.log(stream);
    const video = document.createElement("video");
    addVideoStream(video,stream,true);
    peer.on("call",(call)=>{
        console.log("my video call")
        call.answer(stream);
        const video = document.createElement("video");
        call.on("stream",(userVideoStream)=>{
            console.log("my video stream")
            addVideoStream(video,userVideoStream);
        });
        call.on("close",()=>{
            console.log("my video close")
            video.remove();
        });
    });
    socket.emit("mesg","adfs");
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
})

peer.on("open",id=>{
    console.log("my video open peer on",id);
    console.log(ROOM_KEY,id,USER_INFO)
    socket.emit("join-room",ROOM_KEY,id,USER_INFO);
});

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
    videoGrid.append(video);
;
}
function addChatMessageUI(content,sender,receiver){
    const liTag = document.createElement("li");
    liTag.style.border = "1px solid black";
    liTag.textContent = `${sender} : ${content}`;

    listChat.append(liTag);



}
// 채팅 받았을때
socket.on("message",(content,roomKey,sender,receiver)=>{
    console.log(content)
    addChatMessageUI(content,sender,receiver);


});
// 채팅 전송
formChatSend.addEventListener("submit",async (evt)=>{
    evt.preventDefault();
    if (inputChat.value !==""){
        console.log("/room/"+ROOM_KEY+" 로 메시지 전송")
        socket.emit("message",inputChat.value,ROOM_KEY,USER_ID,chatPeople.all);

    }else{
        alert("메시지를 입력해줏에ㅛ");
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
}

