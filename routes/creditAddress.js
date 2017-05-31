/**
 * Created by Administrator on 2017/3/20.
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
module.exports=function(req, res, next){
//router.get('/', function(req, res, next) {
    try{
        var baseUrl=utilHandle.getBaseUrl().baseUrl;
        var baseUrlfish = utilHandle.getBaseUrl().baseUrlfish;
        var creditData = {};
        var resData = null;
        creditData.title = "查征信网点";
        //获取所有渠道列表
        var syncChannelList = syncRequest('GET', util.analyzetpl(utilHandle.apiUrl.findAll,{baseUrl:baseUrl}));
        var channelList=syncChannelList.getBody().toString();
        creditData.channelList = channelList;
        sign.clientFn(req,res,resData,function(resData) {
            if(resData == null){

            }else{

                console.log(resData);
                //console.log(resData.userInfo.mobile);
                creditData.UserAccountInfor = resData;
            }
            res.render('./search/creditAddress', creditData);
        })
    }catch(error){
        console.log('error++++++');
        console.log('Error: %s', error.message);
    }
}
//);
//
//module.exports = router;

