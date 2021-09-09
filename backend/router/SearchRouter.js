const express = require("express");
const {Op} = require("sequelize")
const util = require("../util/common");
const {Room} = require("../models");

const router = express.Router();

router.get("/search",async (req,res,next)=>{
    try{
        console.log(req.query.search)
        let roomList;
        // querystring 을 넘겼을때 (검색했을때)
        if(req.query.search){
            roomList = await Room.findAll({
                where:{
                    roomName:{
                        [Op.like]:`%${req.query.search}%`
                    }
                }
            });
        }
        // 전체보여주기 (검색안했을때)
        else{
            roomList = await Room.findAll({where:{
                isPublic:1
                }});

        }
        const userInfo = util.getSessionValue(req,"user");
        if(userInfo){
            res.render("search",{
                userInfo,
                roomList
            });
        }else{
            res.redirect("/");
        }
    }catch (err){
        next(err);
    }
});

module.exports = router;