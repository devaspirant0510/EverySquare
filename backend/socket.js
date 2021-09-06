const socketIO = require("socket.io");

module.exports = (server,app)=>{
    const io = socketIO(server,{
        path:"/socket.io"
    });
    const userList = {

    };
    const room = io.of("/room");
    io.on("connection",async (socket)=>{
        console.log("접속")
        // peerjs 서버 join room
        socket.on("join-room",(roomKey,peerId,userInfo)=>{
            console.log("socket on join-room")
            console.log(userInfo.nickname)
            console.log("join-room",roomKey,peerId,userInfo);
            userList[userInfo.id] = userInfo.nickname;
            console.log(userList)
            socket.join(roomKey);
            socket.to(roomKey).broadcast.emit("user-connect",userInfo.nickname,peerId);

            // 채팅 전송
            socket.on("message",(content,roomId,sender,receiver)=>{
                console.log(`content : ${content}`);
                console.log(`roomId : ${roomId}`);
                console.log(`sender : ${sender}`);
                console.log(`receiver :${receiver}`)
                // 전체 보내기를 했을때
                if(receiver==="전체"){
                    // 해당 룸으로 전송
                    console.log(roomId)
                    socket.to(roomId).emit("message",content,roomId,sender,receiver);
                    socket.emit("message",content,roomId,sender,receiver);
                }
                // 개인챗으로 보낼때
                else{
                    socket.to(receiver).emit("message",content,roomId,sender,receiver);
                }




            })

            socket.on("disconnect",()=>{
                console.log("socket disconnected");
                console.log(peerId)

                socket.to(roomKey).broadcast.emit("user-disconnect",peerId);
            });
        })
    });

}