/**
 * Created by Administrator on 2017/3/14.
 */
var app = angular.module('myApp',[]);
console.log('login');
app.controller('ctrlRegister', function($scope, $http) {
    //$scope.$watch("loginName",function(){
    //    console.log("name:",$scope.loginName);
    //});
    //$scope.mobile = "18611846619";
    var canRegister = true;
    var Request = GetRequest();
    var openId = Request==""?"":Request['openId'];
    var wechatId = Request==""?"":Request['wechatId'];
    if(userId != ""){
        alert("该微信已经绑定718账号，请登录或者找回密码！");
        canRegister = false;
    }
    $scope.formData = {};
    $scope.errorMsg = "";
    $scope.submitRegister = function(){
            //验证空元素
            if($scope.name == undefined || $scope.name == ""){
                $scope.errMsgName = "姓名不能为空！";
                return false;
            }else{
                $scope.errMsgName = ""
            }
            //中文十个字符以内
            if(!(/^[\u4e00-\u9fa5]+((·|•|●)[\u4e00-\u9fa5]+)*$/.test($scope.name)) || $scope.name.length <2 || $scope.name.length>10){
                $scope.errMsgName = "请输入10个以内中文字符！";
                return false;
            }else{
                $scope.errMsgName = ""
            }
            if($scope.mobile == undefined || $scope.mobile == ""){
                $scope.errMsgMobile = "手机号码不能为空！";
                return false;
            }else{
                $scope.errMsgMobile = "";
            }
            if(!(/^1[34578]\d{9}$/.test($scope.mobile))){
                //alert("请输入正确的电话号码！");
                $scope.errMsgMobile = "请输入正确的手机号码！";
                return false;
            }else{
                $scope.errMsgMobile = "";
            }
            if($scope.captcha == undefined|| $scope.captcha == ""){
                $scope.errMsgCaptcha = "请输入验证码";
                return false;
            }else if(!(/^\d{6}$/.test($scope.captcha))){
                $scope.errMsgCaptcha = "验证码不正确";
                return false;
            }else{
                $scope.errMsgCaptcha = "";
            }
            if($scope.password == undefined || $scope.password == ""){
                $scope.errMsgpwd = "请输入密码";
                return false;
            }else{
                $scope.errMsgpwd = "";
            }
            //新增密码长度限制
            if($scope.password.length < 8 || $scope.password.length > 16){
                $scope.errMsgpwd = "请输入8-16位密码！";
                return false;
            }else{
                $scope.errMsgpwd = "";
            }
            if(typeof $scope.repeatPassword=="undefined"||$scope.repeatPassword.length < 8 || $scope.repeatPassword.length > 16){
                $scope.errMsgRepwd = "请输入8-16位确认密码！";
                return false;
            }else{
                $scope.errMsgRepwd = "";
            }
            if($scope.password != $scope.repeatPassword){
                //alert("两次输入密码有误");
                $scope.errMsgRepwd = "两次输入密码有误";
                return false;
            }else{
                $scope.errMsgRepwd = "";
            }
            if(!$("input#proto[type='checkbox']").is(':checked')){
                $scope.errMsgProto = "请勾选协议!";
                return false;
            }else{
                $scope.errMsgProto = "";
            }
            if(!canRegister){
                $scope.errorMsg = "该微信已经绑定718账号，请登录或者找回密码！";
                return false;
            }else{
                $scope.errorMsg ="";
            }
            $scope.formData = {
                name:$scope.name,
                mobile:$scope.mobile,
                password:$scope.password,
                captcha:$scope.captcha
            };
            $http({
                method  : 'POST',
                url     : '../newApi/register',
                data    : $scope.formData,  // pass in data as strings
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
                .success(function(res) {
                    if (res.status == 0) {
                        //alert("注册成功");自动登录以及绑定openId
                        $scope.formData.loginName = $scope.mobile;
                        $scope.formData.password = $scope.password;
                        $scope.formData.source = 'h5';
                        $http({
                            method  : 'POST',
                            url     : '../newApi/login',
                            data    : $scope.formData,  // pass in data as strings
                            transformRequest: function(obj) {
                                var str = [];
                                for(var p in obj)
                                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                return str.join("&");
                            },
                            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                        })
                            .success(function(res1) {
                                //console.log(res.userInfo.id)
                                if (res1.status == 0) {
                                    //alert("登陆成功");
                                    cookieFn.setCookie("ccat",res1.data.token,24);
                                    //绑定微信openId
                                    if(openId != "" && openId != "undefined"){
                                        $scope.paras= {
                                            'userCenterId':res1.userInfo.id,
                                            'weChatId':'1',
                                            'openId':openId
                                        };
                                        $http({
                                            method: 'POST',
                                            url: '../newApi/bindWebChat',
                                            data: $scope.paras,
                                            transformRequest: function (obj) {
                                                var str = [];
                                                for (var p in obj)
                                                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                                return str.join("&");
                                            },
                                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
                                        })
                                            .success(function (res2) {
                                                //绑卡成功跳转";
                                                window.location.href = "../agentAuth/?wechatId=1&openId="+openId;
                                            })
                                    }else{
                                        //window.location.href = "../agentAuth/";
                                        alert("参数错误！");
                                        window.location.href = '../errorPoint/';
                                    }
                                }else{
                                    //自动登录失败
                                    var reg=/[a-zA-Z0-9\,\.\;\'\"]+/;
                                    if(reg.test(res1.msg) && res1.msg.length > 20){
                                        $scope.errorMsg = "数据异常！";
                                    }else{
                                        $scope.errorMsg = res1.msg;
                                    }
                                }
                            });
                    }else{
                        //注册失败
                        var reg=/[a-zA-Z0-9\,\.\;\'\"]+/;
                        if(reg.test(res.msg) && res.msg.length > 20){
                            $scope.errorMsg = "数据异常！";
                        }else{
                            $scope.errorMsg = res.msg;
                        }
                    }
                });
    }
    //姓名验证
    $scope.nameBlur = function(){
        //验证空元素
        if($scope.name == undefined || $scope.name == ""){
            $scope.errMsgName = "姓名不能为空！";
        }else{
            if(!(/^[\u4e00-\u9fa5]+((·|•|●)[\u4e00-\u9fa5]+)*$/.test($scope.name)) || $scope.name.length <2 || $scope.name.length>10){
                $scope.errMsgName = "请输入10个以内中文字符！";
            }else{
                $scope.errMsgName = ""
            }
        }
    }
    //手机号验证
    $scope.blur = function(){
        if($scope.mobile == undefined){
            $scope.errMsgMobile = "请输入手机号码！";
        }else{
            if(!(/^1[34578]\d{9}$/.test($scope.mobile))){
                $scope.errMsgMobile = "请输入正确的手机号码！";
            }else{
                $scope.errMsgMobile ="";
            }
        }
    }
    //获取验证码
    $scope.getCode = function(){
        var curElement = window.event.srcElement || window.event.target;
        if($scope.mobile == undefined || $scope.mobile == ""){
            //alert("请填写手机号码！");
            $scope.errMsgMobile = "请填写手机号码！";
            return false;
        }else{
            $scope.errMsgMobile = "";
        }
        if(!(/^1[34578]\d{9}$/.test($scope.mobile))){
            //alert("请填写格式正确的手机号！");
            $scope.errMsgMobile = "请填写格式正确的手机号！";
            return false;
        }else{
            $scope.errMsgMobile = "";
        }
        var params = {
            mobile:$scope.mobile
        };
        $http.get('../newApi/getCode',{params: params})
            .success(function(res){
                if(res.status == 0){
                    countDown(curElement);
                    timer1 = window.setInterval(function()
                    {
                        countDown(curElement);
                    }, 1000);
                }else{
                    alert(res.msg);
                }
            })
            .error(function(data,status,headers,config){
                alert("error");
            })
    }
    //验证码验证
    $scope.validateCode=function(){
        if($scope.captcha == undefined){
            $scope.errMsgCaptcha = "请输入手机验证码";
        }else if(!(/^\d{6}$/.test($scope.captcha))){
            $scope.errMsgCaptcha = "验证码不正确";
        }else{
            $scope.errMsgCaptcha = "";
        }
    };
$scope.comparePwd = function(){
    var curElement = window.event.srcElement || window.event.target;
    var name = curElement.getAttribute("name");
    var $password = $("#password").val();
    var $repeatPwd = $("#repeatPassword").val();
    ////比较
    if(name=="password"){

        if ($password == undefined || ($password.length < 8 || $password.length > 16)) {
            //alert("输入长度不正确");
            $scope.errMsgpwd = "输入长度不正确";
            return false;
        }else{
            if ($repeatPwd != "" && $password != $repeatPwd) {
                //alert("两次输入密码有误");
                $scope.errMsgpwd = "两次输入密码有误";
                return false;
            }else{
                $scope.errMsgpwd = "";
            }
        }
    }else{
        if($repeatPwd == undefined || ($repeatPwd.length < 8 || $repeatPwd.length > 16)){
            //alert("重复密码长度不正确");
            $scope.errMsgRepwd = "重复密码长度不正确";
            return false;
        }else{
            if ($password != "" && $password != $repeatPwd) {
                //alert("两次输入密码有误");
                $scope.errMsgRepwd = "两次输入密码有误";
                return false;
            }else{
                $scope.errMsgRepwd = "";
            }
        }
    }
}
})
//验证交易密码是否统一
function comparePwd() {


}
var a = 59,timer1;
function countDown(ele){
    if(a == 0){
        ele.value = "获取手机验证码";
        clearInterval(timer1);
        ele.removeAttribute("disabled");
        a = 59;
    }else{
        ele.setAttribute("disabled","disabled");
        ele.value = a +"秒后重新发送";
        a--;
    }
}

//获取openId
function getOpenId(){
    console.log(22);
    if(location.href.indexOf("/1/") != -1){
        var indexQ = location.href.indexOf("/1/")+3;
        return location.href.substr(indexQ);
    }else{
        return "";
    }
}
//获取url中参数
//function GetRequest(){
//    var indexq = location.href.indexOf("?");
//    if(indexq!=-1){
//        var url = location.href.substr(indexq);
//        var theRequest = new Object();
//        if (url.indexOf("?") != -1) {
//            var str = url.substr(1);
//            strs = str.split("&");
//            for(var i = 0; i < strs.length; i ++) {
//                theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
//            }
//        }
//        return theRequest;
//    }else{
//        //console.log("没有参数");
//        return "";
//    }
//}