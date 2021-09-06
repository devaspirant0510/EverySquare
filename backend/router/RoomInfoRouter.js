const express = require("express");
const router = express.Router();
const util = require("../util/common");

const {Room} = require("../models");


router.get("/room/:id",async (req,res,next)=>{
    try{
        // 요청한 주소가 올바른지 확인
        const isRoom = await Room.findOne({
            where:{
                roomKey:req.params.id
            }
        });
        if(isRoom==null){
            throw new Error("url 이 올바르지 않습니다.");
        }else{
            const userInfo = util.getSessionValue(req,"user");
            if(userInfo){
                res.render("roominfo",{
                    userInfo,
                    roomKey:req.params.id,
                });
            }else{
                res.redirect("/")
            }
        }
    }catch (err){
        next(err);
    }



})
module.exports = router;
