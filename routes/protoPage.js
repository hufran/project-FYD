/**
 * Created by Administrator on 2017/3/24.
 */
//var express = require('express');
//var router = express.Router();
module.exports=function(req, res, next){
//router.get('/', function(req, res, next) {
    var protoPage = {};
    protoPage.title = "房毅贷的用户注册协议";
    res.render('./account/protoPage', protoPage);
}
//);
//module.exports = router;