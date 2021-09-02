const express = require("express");

const {User} = require("../models");
const util = require("../util/common");

const router = express.Router();

router.get("/login",async (req,res,next)=>{
    try{
        console.log(req.session);
        console.log(req.signedCookies)
        const sessionKey = req.signedCookies['user'];
        const userInfo = req.session[sessionKey]
        if(userInfo){
            res.redirect("/")
            // res.json(util.convertToJson(res.statusCode,"ok",userInfo));
        }else{
            res.render("login");
            // res.json(util.convertToJson(res.statusCode,"please login"));
        }
    }catch (err){
        next(err);
    }
});
router.get("/login_callback_kakao",async (req,res,next)=>{

})

router.post("/login", async (req, res, next) => {
    try {
        const {id, nickname, email, profileURL} = req.body;
        let sessionData;
        console.log("user id : ", id);
        console.log("user nickname : ", nickname);
        console.log("user email : ", email);
        console.log("user profileURL : ", profileURL);
        // 회원 정보가 db에 있는지 확인
        let isRegister = await User.findOne({
            where: {
                id: id
            }
        });
        console.log(isRegister)
        // DB 에 회원정보가 없을경우 신구회원이기 때문에 정보를 그대로 저장
        if (!isRegister) {
            let result = await User.create({
                id,
                nickname,
                email,
                profileURL
            });
            result = result.dataValues;
            const expiresDate = new Date(Date.now()+60 * 60 * 1000 * 24 * 365); // 24시간(1일) * 365
            const cookieKey = new Date().getTime();
            result['user'] = cookieKey;
            sessionData = result;


            res.cookie("user",cookieKey,{
                httpOnly:true,
                secure:false,
                signed:true,
                expires:expiresDate
            });
            req.session[cookieKey] =sessionData;
            console.log(req.session)
            console.log("signed cookie",req.signedCookies)
            console.log("cookie",req.cookies)
            console.log(req.cookies)

            res.json(util.convertToJson(res.statusCode,"ok",result));
        } else {
            sessionData = isRegister;
            const expiresDate = new Date(Date.now()+60 * 60 * 1000 * 24 * 365); // 24시간(1일) * 365
            const cookieKey = new Date().getTime();

            res.cookie("user",cookieKey,{
                httpOnly:true,
                secure:false,
                signed:true,
                expires:expiresDate
            });
            req.session[cookieKey] =sessionData.dataValues;
            console.log(req.session)
            console.log("signed cookie",req.signedCookies)
            console.log("cookie",req.cookies)
            isRegister = isRegister.dataValues;
            isRegister['user'] = cookieKey;
            res.json(util.convertToJson(res.statusCode,"you are everySquare member",isRegister))
        }

    } catch (err) {
        next(err);
    }
});

router.post("/logout",async (req,res,next)=>{
    try{
        req.session = null;
        res.clearCookie("user");
        res.json(util.convertToJson(201,"logout"));
    }catch (err){
        next(err);
    }

});

module.exports = router;
