const express = require("express");
const {v4:uuidV4} = require("uuid");

const {Room} = require("../models");
const util = require("../util/common");

const router = express.Router();

router.get("/room",async (req,res,next)=>{
    try {
        console.log(req.cookies)
        console.log(req.signedCookies)
        const cookieKey = req.signedCookies['user'];
        const userInfo = req.session[cookieKey];
        if(userInfo){
            const result = await Room.findAll();
            res.json(util.convertToJson(res.statusCode,"ok",result));
        }else{
            res.json(util.convertToJson(400,"please login"))
        }
    }catch (err){
        next(err);
    }
});

router.post("/room",async (req,res,next)=>{
    try{
        const {roomName,roomDescription,maxUser,hashtag,isPublic,UserId} =req.body;
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
