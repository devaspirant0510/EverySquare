const socketIO = require("socket.io");

module.exports = (server,app)=>{
    const io = socketIO(server,{
        path:"/socket.io"
    })

}