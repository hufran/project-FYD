/**
 * Created by Administrator on 2017/3/14.
 */
var express = require('express');
var router = express.Router();
var request = require('request');
var redis = require('redis');
var client = redis.createClient(6379,"10.4.33.251");
var syncRequest = require('sync-request');
var qs=require('querystring');
var fs = require('fs');
//var formidable = require("formidable");//文件上传
var path=require('path');
var crypto = require('crypto');//Md5加密
var sign=require('./tokenFn');
var utilHandle = require('./util/urlHandle');
var util = require('./util/util');


//console.log(baseUrl);
//var baseUrl443 = utilHandle.getBaseUrl().baseUrl443;
//var baseUrlfish = utilHandle.getBaseUrl().baseUrlfish;
//点击登录
router.post('/login',function(req, res){
    try{
        var baseUrl=utilHandle.getBaseUrl().baseUrl;
        sign.postApiFn(req,res,baseUrl,utilHandle.apiUrl.fydLogin);
        //var baseUrl='http://10.4.34.36:9090';
        //sign.postApiFn(req,res,baseUrl,'/api/rest/userLogin/fydLogin');
        ////sign.postApiFn(req,res,baseUrl,'/api/mermaid/users/login');
    }catch(error){
        console.log(error.message);
    }
});
//点击注册
router.post('/register',function(req,res){
    try{
        console.log("公用接口register");
        var baseUrl=utilHandle.getBaseUrl().baseUrl;
        sign.postApiFn(req,res,baseUrl,utilHandle.apiUrl.save4Fyd);
    }catch(error){
        console.log(error.message)
    }
});
//点击认证
router.post('/submitAuth',function(req,res){
    try{
        console.log(111);
        var baseUrl=utilHandle.getBaseUrl().baseUrl;
        sign.postApiFn(req,res,baseUrl,utilHandle.apiUrl.save);
    }catch(error){
        console.log(2222);
        console.log(error.message)
    }
});

//忘记密码
router.post('/forgetPwd',function(req,res){
    try{
        console.log("公用接口register");
        var baseUrl=utilHandle.getBaseUrl().baseUrl;
        sign.postApiFn(req,res,baseUrl,utilHandle.apiUrl.fydResetPwd);
    }catch(error){
        console.log(error.message)
    }
});
//获取验证码
router.get('/getCode',function(req,res){
    try{
        if(utilHandle.getBaseUrl().msgUrl){
            var baseUrl=utilHandle.getBaseUrl().msgUrl;
        }else{
            var baseUrl=utilHandle.getBaseUrl().baseUrl;
        }
        sign.postApiFn(req,res,baseUrl,utilHandle.apiUrl.sendCaptcha+qs.stringify(req.query));
    }catch(error){
        console.log(error.message)
    }
})
//登陆之后绑定openId
router.post('/bindWebChat',function(req,res){
    try{
        var baseUrl=utilHandle.getBaseUrl().baseUrl;
        sign.postApiFn(req,res,baseUrl,utilHandle.apiUrl.bindUserId);
    }catch(error){
        console.log(error.message);
    }
})


module.exports = router;