var express = require('express');
var redis = require('redis');
var urlHandle=require('./util/urlHandle');
var client = urlHandle.client;//链接数据库
var syncRequest = require('sync-request');
var request = require('request');
var qs=require('querystring');
var fs = require('fs');
var app = express();
//取token
exports.token = function(req,res) {
	var ccat='';//初始化
	var resData =null;
	    if (req.headers.cookie) {//判断有没有cookie，如果是第一次登陆没有
		    var ccatArr=req.headers.cookie.split(';');//将cookie根据’；‘分成数组
		    for ( var i = 0; i < ccatArr.length; i++) {//循环cookie的数组
		        if(ccatArr[i].indexOf('ccat')>=0){//如果数组的字符串内有ccat
		          ccat=ccatArr[i].replace('ccat=','').replace(/(^\s*)|(\s*$)/g,'');//去掉ccat=,取出cookie
		        }
		    };	
	    };
	    console.log('token: '+ccat);
		return ccat;
}

//比如要登录才能进去的页面，点击进入/login
exports.redirectLogin=function(req,res,resData,renders){
	baseUrlCss=req.headers.cssBaseurl;
	var openId="";
	var Request = new Object();
	Request = exports.GetRequest(req);
	//从URL中获取openId微信绑定用户
	if(req.originalUrl.indexOf('openId')>=0){
		openId = Request['openId'];
	}
	if (resData==null) {//如果没登录，跳转到登录页
		var url = req.originalUrl;
		var exURl=['/lend/loginA'];//写入的是不需要登录即可进入的页面，否则跳转到指定页
		if (exURl.indexOf(url)==-1) {//判断是否需要跳转，此处跳转到err页面
			if(openId!=""){
				res.redirect(baseUrlCss+'/lend/loginA?openId='+openId);
			}else{
		    	res.redirect(baseUrlCss+'/lend/loginA');
			}
		}
	}else{
	    renders(resData);
	    
	};
}
//登录后载入用户数据
exports.clientFn=function(req,res,resData,goNext){
	console.log('clientFn######');
	var baseUrl=req.headers.baseUrl;
	var baseUrl443=req.headers.baseUrl443;
	var baseUrlfish=req.headers.baseUrlfish;
	console.log('cookie值能取到'+exports.token(req,res));
	//从URL中获取token
	var ccat = "";
	var Request = new Object();
	Request = exports.GetRequest(req);
	if(req.originalUrl.indexOf('token')>=0){
		ccat = Request['token'];
	}else{
		ccat = exports.token(req,res);
	}

	console.log('ccat'+ccat);
	client.get('fyd_token:'+ccat, function(err, reply) {
      	var resValue = JSON.parse(reply);
      	resData = resValue;
      	console.log('resData+++++++++'+resData);
      	goNext(resData);
	      
	});
}

//get接口数据通用方法
exports.getApiFn=function(req,res,baseUrl,api){
	console.log('看看有没有进来getApiFn');
	var headers=req.headers;
	if (req.query) {
		var params = qs.stringify(req.query);
	}else if(req.body){
		var params = qs.stringify(req.body);
	};
	
	var options = {
		url: baseUrl +api+params,
		method: 'GET',
		headers:headers
	};
	console.log(options);
	var get_res=request(options, investCallback);
	function investCallback(error, response, body) {
		if (!error && response.statusCode == 200) {
		var resValue = JSON.parse(body);
		 	res.send(resValue);
		response.on('params', function (chunk) {
		  	console.log('BODY: ' + chunk);
		});

		}
	}
	get_res.write(params);
	get_res.end();
}


exports.postApiFn=function(req,res,baseUrl,api){
	var headers = req.headers;
  	var data = qs.stringify(req.body);
  	//var data = req.body;
  	console.log('postApiFn');
  	//console.log(data);
  	var options = {
	    url: baseUrl +api,
	    method: 'POST',
	    headers:headers
    };
	console.log(options)
    var get_res=request(options, indexCallback);
    function indexCallback(error, response, body) {
      if (!error && response.statusCode == 200) {
       var resValue = JSON.parse(body);
       res.send(resValue);
       response.on('data', function (chunk) {
          console.log('BODY: ' + chunk);
        });
      }
    }
    get_res.write(data);
    get_res.end();
}
exports.GetRequest = function(req){
	var indexq = req.originalUrl.indexOf("?");
	if(indexq!=-1){
		var url = req.originalUrl.substr(indexq);
		var theRequest = new Object();
		if (url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i ++) {
				theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	}else{
		console.log("没有参数");
		return null;
	}
}
exports.postApiPic=function(req,res,baseUrl,api){
	console.log('进入');
	var files = req.files;
	var headers = req.headers;
	var body = req.body;
	var file = files.file;
	var name = body.name;
	var _path = file.path;
	var stream = fs.createReadStream(_path);
	body.file=stream;
	var options = {
	    //url: baseUrl +api,
	    formData: body	    
    };
    request.post(baseUrl +api,options, indexCallback);
   	function indexCallback(err, response, body) {
    	console.log('进入request');
    	if (!err && response.statusCode == 200) {
    		var resValue = JSON.parse(body);
    		console.log(resValue);
    		res.send(resValue);

    	}
    }
}
