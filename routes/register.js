/**
 * Created by Administrator on 2017/3/14.
 */
var express = require('express');
var request = require('request');
var http=require('http');
var qs=require('querystring');
var sign=require('./tokenFn');
var syncRequest = require('sync-request');
var utilHandle = require('./util/urlHandle');
var util = require('./util/util');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    try{
     var baseUrl=utilHandle.getBaseUrl().baseUrl;
    var registerData = {};
    registerData.title="房毅贷注册";

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
        console.log(jsonUserId);
        if(jsonUserId.status == 0){
            console.log("已经注册的用户！");
            registerData.userId = jsonUserId.data;
            //res.redirect('../agentAuth/?wechatId=1&openId='+openId);
            res.render('./account/register',registerData);
        }else{
            registerData.userId = "";
            res.render('./account/register',registerData);
        }
    }else{
        console.log("没有openId，参数不正确！");
        res.render('./errorPoint');
    }

    }catch(error){
        console.log('Error: %s', error.message);
    }
});

module.exports = router;