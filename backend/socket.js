const socketIO = require("socket.io");

module.exports = (server,app)=>{
    const io = socketIO(server,{
        path:"/socket.io"
    });
    const room = io.of("/room");
    io.on("connection",async (socket)=>{
        console.log("접속")
        socket.on("join-room",(roomKey,peerId,userInfo)=>{
            console.log("socket on join-room")
            console.log(userInfo.nickname)
            console.log("join-room",roomKey,peerId,userInfo);
            socket.join(roomKey);
            socket.to(roomKey).broadcast.emit("user-connect",userInfo.nickname,peerId);

            socket.on("disconnect",()=>{
                console.log("socket disconnected");
                console.log(userInfo.nickname)
                socket.to(roomKey).broadcast.emit("user-disconnect",userInfo.id);
            });
        })
    });

}