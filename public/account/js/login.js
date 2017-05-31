/**
 * Created by Administrator on 2017/3/14.
 */
var app = angular.module('myApp',[]);
app.controller('ctrlLogin', function($scope, $http) {
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
    $scope.formData = {};
    $scope.submitLogin = function(){
        $scope.formData.loginName = $scope.loginName;
        $scope.formData.password = $scope.password;
        $scope.formData.source = 'h5';
        if(!(/^1[34578]\d{9}$/.test($scope.loginName))){
            $scope.errorMsg="手机号输入格式不正确";
            return;
        }else{
            $scope.errorMsg="";
        }
        if($scope.password == undefined || $scope.password.length < 6 || $scope.password.length>16){
            $scope.errorMsg="输入长度不正确";
            return;
        }else{
            $scope.errorMsg="";
        }
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
            .success(function(res) {

                if (res.status == 0) {
                    alert("登录成功");
                    cookieFn.setCookie("ccat",res.data.token,24);
                    //绑定微信openId
                    if(openId != "" && openId != "undefined"){
                        $scope.paras= {
                            'userCenterId':res.userInfo.id,
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
                            window.location.href = "../agentAuth/?wechatId=1&openId="+openId;
                        })
                    }else{
                        alert("参数错误！");
                        window.location.href = '../errorPoint/';
                    }
                }else{
                    var reg=/[a-zA-Z0-9\,\.\;\'\"]+/;
                    if(reg.test(res.msg) && res.msg.length > 20){
                        $scope.errorMsg = "数据异常！";
                    }else{
                        $scope.errorMsg = res.msg;
                    }
                }
    });
    }
    //手机号验证
    $scope.blur = function(){
        if(!(/^1[34578]\d{9}$/.test($scope.loginName))){
            //alert('输入的手机号码格式不正确！');
            $scope.errorMsg = "输入的手机号码格式不正确！";
        }else{
            $scope.errorMsg = "";
        }
    }
    //密码验证
    $scope.validatePass=function(){
        if($scope.password == undefined || $scope.password.length < 6 || $scope.password.length>16){
            $scope.errorMsg="输入长度不正确";
        }else{
            $scope.errorMsg="";
        }
    }
})
//获取openId
//function getOpenId(){
//    console.log(22);
//    if(location.href.indexOf("/1/") != -1){
//    var indexQ = location.href.indexOf("/1/")+3;
//    return location.href.substr(indexQ);
//    }else{
//        return "";
//    }
//}

