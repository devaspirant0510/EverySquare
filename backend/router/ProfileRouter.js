const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const util = require("../util/common");
const {User} = require("../models");

const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            // null 은 오류처리
            done(null, path.join(__dirname, '..', 'public', 'img', 'profile'));
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            const userInfo = util.getSessionValue(req, "user");


            // null 은 오류처리
            done(null, userInfo.id + "_profile" + ext);
        }
    }),
    limits: {
        fileSize: {fileSize: 5 * 1024 * 1024},
    }
});

// 내프로필 조회
router.get("/profile", async (req, res, next) => {
    try {
        console.log(req.session);
        const userInfo = util.getSessionValue(req, "user");
        console.log("userinfo",userInfo)
        // 로그인 기록이 있을때
        if (userInfo) {
            // 유저 정보 표시
            res.render("profile", {
                userInfo
            });
        } else {
            console.log("redirect")
            res.redirect("/");
        }
    } catch (err) {
        next(err);
    }
});

// 프로필정보 업데이트 (rest api 적용전)
router.post("/profile", upload.single("image"), async (req, res, next) => {
    try {
        console.log(req.body)
        console.log(req.file.filename)
        const userInfo = util.getSessionValue(req, "user");
        const result = await User.update({profileURL: `http://127.0.0.1:8081/user/file/${req.file.filename}`},
            {
                where: {
                    id: userInfo.id
                }
            });
        console.log(`변경된 칼럼수 : ${result[0]}`);
        const changeData = await User.findOne({where:{
            id:userInfo.id
            }
        });
        console.log(changeData.dataValues)
        util.setSessionValue(req,"user",changeData.dataValues)
        res.redirect("/profile")

    } catch (err) {
        next(err);
    }
});

// 프로필 정보 업데이트
/*
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
*/

module.exports = router;
