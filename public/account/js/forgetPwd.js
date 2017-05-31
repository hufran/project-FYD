/**
 * Created by Administrator on 2017/3/14.
 */
var app = angular.module('myApp',[]);
console.log('login');
app.controller('ctrlforgetPwd', function($scope, $http) {
    //$scope.$watch("loginName",function(){
    //    console.log("name:",$scope.loginName);
    //});
    //var userAccountInfor = UserAccountInfor;//用户基本信息
    var Request = GetRequest();
    var openId = Request==""?"":Request['openId'];
    var wechatId = Request==""?"":Request['wechatId'];
    if(openId !=""){
        $scope.alink  = "?wechatId="+wechatId+"&openId="+openId;
    }else{
        $scope.alink = "";
    }
    //if(userAccountInfor!=null){
    //    $scope.mobile = userAccountInfor.userInfo.mobile;
    //}else{
    //    $scope.mobile ="";
    //}
$scope.modifyPwd = function() {
    //非空判断
    //验证空元素
    if($scope.mobile == undefined || $scope.mobile == ""){
        $scope.errMsgMobile = "手机号码不能为空！"
        return false;
    }else{
        $scope.errMsgMobile = ""
    }
    if(!(/^1[34578]\d{9}$/.test($scope.mobile))){
        //alert("请输入正确的电话号码！");
        $scope.errMsgMobile = "请输入正确的手机号码！";
        return false;
    }else{
        $scope.errMsgMobile = "";
    }

    if($scope.captcha == undefined || $scope.captcha == ""){
        $scope.errMsgCaptcha = "请输入验证码";
        return false;
    }else if(!(/^\d{6}$/.test($scope.captcha))){
        $scope.errMsgCaptcha = "验证码不正确";
        return false;
    }else{
        $scope.errMsgCaptcha = "";
    }
    if($scope.password == undefined || $scope.password == ""){
        $scope.errMsgPwd = "请输入密码";
        return false;
    }else{
        $scope.errMsgPwd = "";
    }
    if($scope.password != $scope.repPwd){
        //alert("两次输入密码有误");
        $scope.errMsgRePwd = "两次输入密码有误";
        return false;
    }else{
        $scope.errMsgRePwd = "";
    }
    //新增密码长度限制
    if($scope.password.length < 8 || $scope.password.length > 16){
        $scope.errMsgPwd = "请输入8-16位密码！";
        return false;
    }else{
        $scope.errMsgPwd = "";
    }
    if($scope.repPwd.length < 8 || $scope.repPwd.length > 16){
        $scope.errMsgRePwd = "请输入8-16位确认密码！";
        return false;
    }else{
        $scope.errMsgRePwd = "";
    }
    $scope.formData = {
        captcha: $scope.captcha,
        mobile: $scope.mobile,
        password: $scope.password,
        repPwd: $scope.repPwd
    };
    $http({
        method: 'POST',
        url: '../newApi/forgetPwd',
        data: $scope.formData,  // pass in data as strings
        transformRequest: function (obj) {
            var str = [];
            for (var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        },
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
    })
        .success(function (res) {
            if (res.status == 0) {
                cookieFn.cleanCookie("ccat");
                alert("修改成功，请重新登录！");
                window.location.href = "../login/"+$scope.alink
            } else {
                alert(res.msg);
            }
        })
}
    //手机号验证
    $scope.blur = function(){
        if(!(/^1[34578]\d{9}$/.test($scope.mobile))){
            $scope.errMsgMobile = "请输入正确的手机号码！";
        }else{
            $scope.errMsgMobile ="";
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
        }
            $http.get('../newApi/getCode',{params: params})
                .success(function(res){
                    //$scope.addressList1=res;
                    if(res.status == 0) {
                        countDown(curElement);
                        timer1 = window.setInterval(function () {
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

//验证交易密码是否统一
    $scope.comparePwd = function(){
        var curElement = window.event.srcElement || window.event.target;
        var name = curElement.getAttribute("name");
        var $password = $("#password").val();
        var $repeatPwd = $("#repPwd").val();
        ////比较
        if(name=="password"){
            if ($password == undefined || ($password.length < 8 || $password.length > 16)) {
                $scope.errMsgPwd = "输入长度不正确";
                return false;
            }else{
                if ($repeatPwd != "" && $password != $repeatPwd) {
                    $scope.errMsgPwd = "两次输入密码有误";
                    return false;
                }else{
                    $scope.errMsgPwd = "";
                    $scope.errMsgRePwd = "";
                }
            }
        }else{
            if($repeatPwd == undefined || ($repeatPwd.length < 8 || $repeatPwd.length > 16)){
                $scope.errMsgRePwd = "重复密码长度不正确";
                return false;
            }else{
                if ($password != "" && $password != $repeatPwd) {
                    $scope.errMsgRePwd = "两次输入密码有误";
                    return false;
                }else{
                    $scope.errMsgRePwd = "";
                    $scope.errMsgPwd = "";
                }
            }
        }

    }
})

var a = 59,timer1;
function countDown(ele){
    if(a == 0){
        console.log(0)
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
