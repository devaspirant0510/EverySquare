const express = require("express");
const {convertToJson,getSessionValue} = require("../util/common");

const router = express.Router();

router.get("/",async (req,res,next)=>{
    try{
        const userInfo = getSessionValue(req,"user");
        console.log(userInfo)
        if (userInfo){
            res.render("index",{userInfo})
        }else{
            res.render("index")

        }
    }catch (err){
        next(err);
    }
})
module.exports = router;