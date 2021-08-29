const express = require("express");
const {v4:uuidV4} = require("uuid");

const {Room} = require("../models");
const util = require("../util/common");

const router = express.Router();

router.get("/room",async (req,res,next)=>{
    try {
        const result = await Room.findAll();
        res.json(util.convertToJson(res.statusCode,result));
    }catch (err){
        next(err);
    }
});

router.post("/room",async (req,res,next)=>{
    try{
        const {roomName,roomDescription,maxUser,hashtag,isPublic} =req.body;
        const roomKey = uuidV4();
        const result = await Room.create({
            roomKey,
            roomName,
            roomDescription,
            maxUser,
            hashtag,
            isPublic
        });
        console.log(result);
        res.json(util.convertToJson(201,"ok",result));
    }catch (err){
        next(err);
    }
});

module.exports = router;
