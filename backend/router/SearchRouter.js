const express = require("express");
const util = require("../util/common");

const router = express.Router();

router.get("/search",async (req,res,next)=>{
    try{
        const userInfo = util.getSessionValue(req,"user");
        res.render("search",{
            userInfo
        });
    }catch (err){
        next(err);
    }
});

module.exports = router;