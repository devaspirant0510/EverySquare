const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

dotenv.config();

const path = require("path");
const https = require("https");
const http = require("http");
const fs = require("fs");

const {sequelize} = require("./models");
const IndexRouter = require("./router/IndexRouter");
const LoginRouter = require("./router/LoginRouter");
const ProfileRouter = require("./router/ProfileRouter");
const RoomRouter = require("./router/RoomRouter");
const RoomInfoRouter = require("./router/RoomInfoRouter");
const SettingRouter = require("./router/SettingRouter");

const app = express();

sequelize.sync({force:false}).then(()=>{
    console.log("연결성공");
}).catch(r=>{
    console.log("연결오류 "+r);
});

const httpsOptions = {
    key:fs.readFileSync(path.join(__dirname,"sslKey","private.pem")),
    cert:fs.readFileSync(path.join(__dirname,"sslKey","public.pem"))
}

app.set("PORT",process.env.PORT||8080);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan(process.env.MORGAN_SETTING||"dev"))
app.use(cookieParser(process.env.COOKIE_KEY))
const sessionMiddleware = expressSession({
    cookie:{secret:process.env.COOKIE_KEY,
        httpOnly:true
    },
    name:'connect.sid'
});
app.use(sessionMiddleware);
app.use(IndexRouter);
app.use(LoginRouter);
app.use(ProfileRouter);
app.use(RoomRouter);
app.use(RoomInfoRouter);
app.use(SettingRouter);


app.use((req,res,next)=>{
    res.json({message:"요청한 페이지를 찾을수 없습니다."});
});

app.use((err,req,res,next)=>{
    console.log(err);
    res.json({message:err.message});
});

const server = https.createServer(httpsOptions,app);
server.listen(app.get("PORT"),()=>{
    console.log("server is open ",app.get("PORT"));
});
const httpServer = http.createServer(app);
httpServer.listen(80,()=>{
    console.log("http server is open");
})
