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
            // 로그인 체크
            if(userInfo){
                // 입장할때 최대인원을 넘기지 않았는지 체크
                console.log(isRoom.currentUser)
                console.log(isRoom.maxUser);

                if(isRoom.currentUser < isRoom.maxUser){
                    res.render("roominfo",{
                        userInfo,
                        roomKey:req.params.id,
                        roomInfo:isRoom,
                    });
                }else{
                    res.json(util.convertToJson(400,"fail: the room is full"));
                }
            }else{
                res.redirect("/")
            }
        }
    }catch (err){
        next(err);
    }
});

router.patch("/room/:id",async (req,res,next)=>{
    try{


    }catch (err){
        next(err);

    }

})
module.exports = router;
