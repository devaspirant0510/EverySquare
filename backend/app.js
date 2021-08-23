const express = require("express");

const path = require("path");
const https = require("https");

const app = express();

app.set("PORT",process.env.PORT||8080);

app.get("/",async (req,res,next)=>{
    try{
        res.end({message:"hello Node"});
    }catch (err){
        next(err)
    }
});

app.use((req,res,next)=>{
    res.json({message:"요청한 페이지를 찾을수 없습니다."});
});

app.use((err,req,res,next)=>{
    console.log(err);
    res.json({message:err.message});
});

const server = app.listen(app.get("PORT"),()=>{
    console.log("server is open",process.env.PORT);

});