const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const nunjucks = require("nunjucks");
const {ExpressPeerServer} = require("peer");

dotenv.config();
console.log(process.env.SERVER_ENV)
const host = process.env.SERVER_ENV==="local"?"http://127.0.0.1":"https://www.every-square.shop";
console.log(host)
const path = require("path");
const https = require("https");
const http = require("http");
const fs = require("fs");

const {sequelize} = require("./models");
const socketServer = require("./socket");
const util = require("./util/common");

const IndexRouter = require("./router/IndexRouter");
const LoginRouter = require("./router/LoginRouter");
const ProfileRouter = require("./router/ProfileRouter");
const RoomRouter = require("./router/RoomRouter");
const RoomInfoRouter = require("./router/RoomInfoRouter");
const SettingRouter = require("./router/SettingRouter");
const SearchRouter = require("./router/SearchRouter");

const app = express();

sequelize.sync({force: false}).then(() => {
    console.log("연결성공");
}).catch(r => {
    console.log("연결오류 " + r);
});

// 포트 설정
app.set("PORT", process.env.PORT || 8080);
// 템플릿 엔진 설정
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});
// post 요청 처리
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// 요청 로그 콘솔창에 띄워주는 라이브러리
app.use(morgan(process.env.MORGAN_SETTING || "dev"))
// 쿠키 파서
app.use(cookieParser(process.env.COOKIE_KEY))
// 세션
const sessionMiddleware = expressSession({
    secret: process.env.COOKIE_KEY,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'connect.sid'
});
app.use(sessionMiddleware);
// cors 세팅
/*
const corsConfig = cors({
    origin: true,
    credentials: true,
})
app.use(corsConfig);
app.options("*", corsConfig);
*/
// 멀티파트 데이터 저장할 경로
const IMAGE_PATH = path.join(__dirname,"public","img","profile");
try{
    fs.readdirSync(IMAGE_PATH);
}catch (err){
    console.log(IMAGE_PATH+" 에 폴더 생성");
    fs.mkdirSync(IMAGE_PATH)
}
// 정적파일 로드
app.use(express.static(path.join(__dirname,"public","css")));
app.use(express.static(path.join(__dirname,"public","js")));
app.use(express.static(path.join(__dirname,"public","img")));
app.use("/user/file",express.static(path.join(__dirname,"public","img","profile")));

// 라우터
app.use(IndexRouter);
app.use(LoginRouter);
app.use(ProfileRouter);
app.use(RoomRouter);
app.use(RoomInfoRouter);
app.use(SettingRouter);
app.use(SearchRouter);


//404 NotFound 처리 미들웨어
app.use((req, res, next) => {
    res.json(util.convertToJson(404, "Not Found", "요청한 페이지를 찾을수 없습니다."));
});

// 오류처리 미들웨어
app.use((err, req, res, next) => {
    console.log(err);
    res.json(util.convertToJson(400, "Error", err.message));
});

/*
const server = https.createServer(httpsOptions,app);
server.listen(app.get("PORT"),()=>{
    console.log("server is open ",app.get("PORT"));
});
*/
// 서버 listen aws nginx letscript 옵션으로 배포시 https
const server = http.createServer(app);
server.listen(process.env.HTTP_PORT, () => {
    console.log("http server is open");
});
// peer 서버
const peerServer = ExpressPeerServer(server, {
    debug: true,
});
app.use("/peerjs", peerServer);
// 소켓 서버
socketServer(server, app);

