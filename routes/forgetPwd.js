/**
 * Created by Administrator on 2017/3/15.
 */
var express = require('express');
var request = require('request');
var http=require('http');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var forgetData = {};
    //var resData = null;
    forgetData.title = "忘记密码";
    //sign.clientFn(req,res,resData,function(resData) {
    //    if(resData == null){
    //
    //    }else{
    //
    //        console.log(resData);
    //        console.log(resData.userInfo.mobile);
    //    }
    //    forgetData.UserAccountInfor = resData;
    //    res.render('./account/forgetPwd', forgetData);
    //})
    res.render('./account/forgetPwd', forgetData);
});

module.exports = router;