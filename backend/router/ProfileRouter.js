const express = require("express");

const util = require("../util/common");
const {User} = require("../models");

const router = express.Router();

// 내프로필 조회
router.get("/profile",async(req,res,next)=>{
    try{
        console.log(req.session);
        const sessionKey = req.signedCookies.user;
        // 로그인 기록이 있을때
        if(sessionKey){
            // 유저 정보 표시
            res.redirect("/login");
        }else{
            res.json(util.convertToJson(404,"Failed"))
        }
    }catch (err){
        next(err);
    }
});

// 프로필 정보 업데이트
router.patch("/profile",async (req,res,next)=>{
    try{
        const {id,nickName,profileURL} = req.body;
        const result = await User.update({nickName,profileURL},{where: {
            id
            }
        });
        res.json(util.convertToJson(200,"OK",result));
    }catch (err){
        next(err);
    }
});

module.exports = router;
