const express = require("express");
const {v4:uuidV4} = require("uuid");

const {Room} = require("../models");
const util = require("../util/common");

const router = express.Router();

router.get("/room",async (req,res,next)=>{
    try {
        console.log(req.cookies)
        console.log(req.signedCookies)
        const userInfo = util.getSessionValue(req,"user");
        console.log(userInfo)
        if(userInfo){
            res.render("room",{userInfo});
            // res.json(util.convertToJson(res.statusCode,"ok",result));
        }else{
            console.log("no login")
            res.redirect("/")
            // res.json(util.convertToJson(400,"please login"))
        }
    }catch (err){
        next(err);
    }
});

router.post("/room",async (req,res,next)=>{
    try{
        let {roomName,roomDescription,maxUser,hashtag,isPublic,UserId} =req.body;
        // UserId 를 프론트에서 못넘길경우 현재 로그인한 세션에서 UserId 가져옴
        if(!UserId){
            UserId = util.getSessionValue(req,"user").id;
        }
        // 방 url 은 중복되면 안되기때문에 uuid v4 로 생성
        const roomKey = uuidV4();
        const result = await Room.create({
            roomKey,
            roomName,
            roomDescription,
            maxUser,
            hashtag,
            isPublic,
            UserId
        });
        console.log(result);
        res.json(util.convertToJson(201,"ok",result));
    }catch (err){
        next(err);
    }
});

module.exports = router;
