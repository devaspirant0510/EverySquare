const socketIO = require("socket.io");

module.exports = (server,app)=>{
    const io = socketIO(server,{
        origin:"*:*",

    });
    io.on("connection",(socket)=>{
        console.log("연결됨")
        console.log(socket.id)
        io.emit("join","접속함");
        socket.on("message",(msg)=>{
            console.log(msg)
        });
    });

}