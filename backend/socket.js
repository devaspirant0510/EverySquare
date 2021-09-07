const socketIO = require("socket.io");
const {User, Room} = require("./models");

module.exports = (server, app) => {
    const io = socketIO(server, {
        path: "/socket.io"
    });
    const userList = {};
    const socketList = {}
    const peers = {};
    let currentUserList;
    const room = io.of("/room");
    room.on("connection", async (socket) => {
        console.log("접속")
        // peerjs 서버 join room
        socket.on("join-room", async (roomKey, peerId, userInfo) => {
            console.log("socket on join-room")
            console.log("join-room", roomKey, peerId, userInfo);
            console.log(userList)
            /*

            */
            /*
            */
            socket.join(roomKey);
            socket.to(roomKey).broadcast.emit("user-connect", userInfo.nickname, peerId);
            // 참가한 방의 접속자 목록 가져옴
            const dbUser = await Room.findOne({
                attributes:['joinUser'],
                where:{
                    roomKey
                }
            });
            if(!dbUser.joinUser){
                currentUserList = {};
            }else{
                currentUserList = dbUser.joinUser;
            }
            // db 업데이트
            await Room.update({masterId:userInfo.id},{where:{
                    roomKey
                }});

            // 채팅 전송
            socket.on("message", (content, roomId, sender, receiver, isPublic) => {
                console.log(`content : ${content}`);
                console.log(`roomId : ${roomId}`);
                console.log(`sender : ${sender}`);
                console.log(`receiver :${receiver}`)
                console.log(`isPublic : ${isPublic}`);
                // 전체 보내기를 했을때
                if (isPublic) {
                    // 해당 룸으로 전송
                    console.log(roomId)
                    room.to(roomId).emit("message", content, roomId, sender, receiver, true);
                }
                // 개인챗으로 보낼때
                else {
                    console.log(socketList)
                    console.log(socketList[receiver]);
                    // 상대한테 개인메시지 보내기
                    room.to(socketList[receiver]).emit("message", content, roomId, sender, receiver, false);
                    // 나 자신한테도 보냄 ( 자신이 무슨 내용을 보냈는지 알려주기 위해)
                    room.to(socket.id).emit("message", content, roomId, sender, receiver, false);

                }
            });

            socket.on("disconnect", async () => {
                console.log("socket disconnected");
                console.log(peerId)
                delete userList[userInfo.id];
                await Room.update({joinUser: userList}, {
                    where: {
                        roomKey:roomKey
                    }
                });
                socket.to(roomKey).broadcast.emit("user-disconnect", peerId);
                // 방에 아무도 없을때 방 지움
                await User.update({"joinRoomId":null},{where:{
                    id:userInfo.id
                    }})
                if(Object.entries(userInfo).length===0){
                    await Room.delete({where:{
                        roomKey:roomKey
                        }});

                }
            });
        })
        // 유저가 방에 참가할때마다 userLIst 객체에 추가
        socket.on("add-list", async (roomId, userId, userName) => {
            console.log("socket on add-list", userId, userName)
            userList[userId] = userName;
            console.log(`update db joinUser=${userList} where roomKey=${roomId}`)
            await Room.update({joinUser: userList}, {
                where: {
                    roomKey:roomId
                }
            });
            // 유저가 참가중인 방의 항목 업데이트
            await User.update({"joinRoomId":roomId},{where:{
                id:userId
                }});
            socketList[userId] = socket.id;
            console.log("socket to", roomId, "emit user-list", userList);
            room.to(roomId).emit("user-list", userList);
        });
    });

}