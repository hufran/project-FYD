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
        var agentData = {};
        var resData = null;
        agentData.title = "经纪人认证";
        //获取所有渠道列表
        var syncChannelList = syncRequest('GET', util.analyzetpl(utilHandle.apiUrl.findAll,{baseUrl:baseUrl}));
        var channelList=syncChannelList.getBody().toString();
        agentData.channelList = channelList;
        //获取url中的openId
        var openId = "";
        //var Request = new Object();
        var Request = sign.GetRequest(req);
        if(req.originalUrl.indexOf('openId')>=0){
            openId=Request['openId'];
        }
        //用户信息
        //sign.clientFn(req,res,resData,function(resData) {
        //    if(resData == null){
                //没登陆,根据openId和wechatId查找userId，如果查询到了就是跳到认证页面，如果没有就跳转到登陆页面
                if(openId != ""){
                var syncIsUserId = syncRequest('GET',util.analyzetpl(utilHandle.apiUrl.getData,{baseUrl:baseUrl,weChatId:1,openId:openId}));
                var existUserId=syncIsUserId.getBody().toString();
                var jsonUserId = JSON.parse(existUserId);
                    if(jsonUserId.status == 0){
                       //userId = jsonUserId.data;
                       agentData.userId = jsonUserId.data.userId;
                       agentData.channelOpenId = jsonUserId.data.channelOpenId;
                       //agentData.UserAccountInfor = null;
                       res.render('./agentAuth/authIndex', agentData);
                    }else{
                       res.redirect('../login/?wechatId=1&openId='+openId);
                    }
                }else{
                    console.log("没有openId，参数不正确！");
                    res.render('./errorPoint');
                    //res.redirect('../login/');
                }
            //}else{
            //    //agentData.UserAccountInfor = resData;
            //    agentData.userId = "";
            //    res.render('./agentAuth/authIndex', agentData);
            //}
        //})
    }catch(error){
        console.log('error++++++');
        console.log('Error: %s', error.message);
    }
});

module.exports = router;

