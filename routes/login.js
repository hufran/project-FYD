/**
 * Created by Administrator on 2017/3/14.
 */
var express = require('express');
var request = require('request');
var http=require('http');
var qs=require('querystring');
var sign=require('./tokenFn');
var syncRequest = require('sync-request');
var crypto = require('crypto');//Md5加密
var utilHandle = require('./util/urlHandle');
var util = require('./util/util');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    try{
    var baseUrl=utilHandle.getBaseUrl().baseUrl;
    var loginData = {};
    loginData.title = "房毅贷登录";
    //sign.clientFn(req,res,resData,function(resData) {
    //    if(resData == null){
    //        //没登陆
    //        loginData.UserAccountInfor = null;
    //        res.render('./account/login', loginData);
    //    }else{
    //        //已经登录
    //        res.redirect('../agentAuth/');
    //    }
    //})
    //获取url中的openId
    var openId = "";
    //var Request = new Object();
    var Request = sign.GetRequest(req);
    if(req.originalUrl.indexOf('openId')>=0){
        openId=Request['openId'];
    }
    if(openId!=""){
        var syncIsUserId = syncRequest('GET', util.analyzetpl(utilHandle.apiUrl.getId,{baseUrl:baseUrl,weChatId:1,openId:openId}));
        var existUserId=syncIsUserId.getBody().toString();
        var jsonUserId = JSON.parse(existUserId);
        if(jsonUserId.status == 0){
            res.redirect('../agentAuth/?wechatId=1&openId='+openId);
        }else{
            //res.redirect('../login/?wechatId=1&openId='+openId);
            res.render('./account/login', loginData);
        }
    }else{
        res.render('./account/login', loginData);
    }
    }catch(error){
        console.log('error++++++');
        console.log('Error: %s', error.message);
    }
});

module.exports = router;

