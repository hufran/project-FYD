var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var urlHandle=require('./routes/util/urlHandle');
var multipart = require('connect-multiparty');//图片上传格式处理
var multipartMiddleware = multipart();
var config=require('./config');
if(versionControl.version=="dev"){
    urlHandle.setBaseUrl({
        baseUrl:"http://10.4.33.251",
        baseWeixinUrl:"http://10.4.33.251:9000",
        path:path.join(__dirname)
    });
    urlHandle.weixinApi.appId="wx5c33f05b41c97d8f";
    urlHandle.weixinApi.appSecret="c7389c554db7873db845790e7acb539a";
    urlHandle.redisUrl="10.4.33.251";
    urlHandle.version="dev";
}else{
    urlHandle.setBaseUrl({
        baseUrl:"http://10.139.36.223:9090",
        msgUrl:"http://10.139.36.223:9091",
        baseWeixinUrl:"http://10.253.43.226:9000",
        path:path.join(__dirname)
    });
    urlHandle.weixinApi.appId="wxd927d30d1a3bd89e";
    urlHandle.weixinApi.appSecret="c3548b0a310aa6445e899ca010bc4faf";
    urlHandle.apiUrl=urlHandle.apiMasterUrl;
    urlHandle.redisUrl="10.139.50.24";
    urlHandle.version="master";
}

var redis = require('redis');
var client = redis.createClient(urlHandle.redisPort,urlHandle.redisUrl);
urlHandle.client=client;
client.on('connect', function() {
  console.log('成功连接到'+urlHandle.redisUrl+':'+urlHandle.redisPort+'服务器!');
});

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var newApi = require('./routes/newApi');
var register = require('./routes/register');
var forgetPwd = require('./routes/forgetPwd');
var agentAuth = require('./routes/authIndex');
var creditAddress = require('./routes/creditAddress');
var constructionOffice = require('./routes/constructionOffice');//建委
var notarialoffice = require('./routes/notarialoffice');
var proto = require('./routes/protoPage');
var errorPage = require('./routes/errorPage');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(multipartMiddleware);//图片上传处理
app.use(express.static(path.join(__dirname, 'public')));

var inquiry=require("./routes/controller/inquiryCtrl");
var active=require("./routes/controller/activeCtrl");

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","POST,GET,OPTIONS");
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/newApi',newApi);
app.use('/register', register);
app.use('/forgetPwd', forgetPwd);
app.use('/agentAuth', agentAuth);
//app.use('/constructionAddress', constructionOffice);//查建委
//app.use('/creditAddress', creditAddress);
//app.use('/notarialAddress', notarialoffice);//查公证处
app.get('/creditAddress', creditAddress);
app.get('/constructionAddress', constructionOffice);//查建委
app.get('/notarialAddress', notarialoffice);//查公证处
app.get('/protoPage', proto);
app.use('/errorPoint',errorPage);
app.use('/inquiry',inquiry);
app.use('/activity',active);
// catch 404 and forward to error handler
app.all("*",function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('./404');
});

//express不崩
process.on('uncaughtException', function (err) {
  console.log(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
