const express = require("express");

const router = express.Router();

router.get("/search",async (req,res,next)=>{
    try{
        res.render("search");

    }catch (err){
        next(err);
    }

});

module.exports = router;