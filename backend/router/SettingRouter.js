const express = require("express");
const util = require("../util/common");

const router = express.Router();

router.get("/setting",async (req,res,next)=>{
    try{
        const userInfo = util.getSessionValue(req,"user")
        res.render("setting",{
            userInfo
        });
    }catch (err){
        next(err);
    }
});

module.exports = router;
