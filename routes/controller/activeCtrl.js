/**
 * Created by chen on 2017/2/22.
 */
var activeModel=require("../model/activeModel");
var activeView=require("../view/activeView");
var error=require("../util/errorEvent");
var util=require('../util/util');
var express = require('express');
var router=express.Router();

/*路由*/
router.get("/introduce",function(req,res,next){
    activeView.introduce(req,res,next);
    activeModel.introduce(req,res,next);
});
router.get("/license",function(req,res,next){
    activeView.license(req,res,next);
    activeModel.license(req,res,next);
});
router.get("/bank",function(req,res,next){
    activeView.bank(req,res,next);
    activeModel.bank(req,res,next);
});

error.eventEmitter.addListener("error",function(res){
    console.log("error:111111111111111111");
    res.render('./errorPoint');
    return;
});
module.exports = router;