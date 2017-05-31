/**
 * Created by Administrator on 2017/3/16.
 */
var app = angular.module('myApp',[]);
var channelList=strToJson(channelList).data;
app.controller('ctrlAgent', function($scope, $http) {
    //$scope.$watch("wechat",function(){
    //    console.log("wechat:",$scope.wechat);
    //});
    //var userAccountInfor = UserAccountInfor;//用户基本信息
    //console.log(userAccountInfor);
    var id = "";
    $scope.channelList = channelList;
    $scope.channelName = "渠道选择";
    if(userId != ""){
        id= userId;
        //根据openId获取是否认证的信息
        $scope.isSuccess = (channelOpenId == "") ? false : true;
        // if(cookieFn.getCookie("channleId") == undefined){
       //     $scope.isSuccess = false;
       // }else{
      //      $scope.isSuccess = true;
       // }
    }else{

        //id = userAccountInfor.userInfo.id;
        //if(userAccountInfor.channel == null && (cookieFn.getCookie("channleId") == undefined)){
        //    //没有认证
        //    $scope.isSuccess = false;
        //}else{
        //    $scope.isSuccess = true;
        //}
        //一般情况不可能为空

    }
    // 点击认证提交按钮
    $scope.authentication = function(){
        //非空验证
        if($scope.wechat == undefined || $scope.wechat == ""){
            //alert("请输入微信号！");
            $scope.errMsgWechat = "请输入微信号！";
            return false;
        }else if($scope.wechat.length > 50){
            $scope.errMsgWechat = "请输入不超过50个字符的微信号！";
            return false;
        }else{
            $scope.errMsgWechat = "";
        }
        if($scope.channelId == undefined || $scope.channelId == ""){
            //alert("请选择渠道！");
            $scope.errMsgChannelName = "请选择渠道！";
            return false;
        }else{
            $scope.errMsgChannelName = "";
        }
        $scope.params = {
            userId:id,
            wechat:$scope.wechat,
            channelId:$scope.channelId
        };
        $http({
            method: 'POST',
            url: '../newApi/submitAuth',
            data: $scope.params,  // pass in data as strings
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
        })
            .success(function (res) {
                console.log(res)
                if (res.status == 0) {
                    //console.log("success");
                    //remember channel info
                    cookieFn.setCookie("channleId",res.data.id,0);
                    $scope.isSuccess = true;
                    $scope.errMsgChannelName = "";
                } else {
                    $scope.errMsgChannelName = res.msg;
                    $scope.isSuccess = true;
                }
            })
    }

    $scope.getClickChannel = function(id){
        console.log(id);
        //$(".container").css("background-color","#")
        $("ul.inquiry_ctrl_content li").removeClass("cur");
        $("#"+id).addClass("cur");
    }
    $scope.changeValue=function(event) {
        event.stopPropagation();
        var target = event.target;
        var attr = target.getAttribute("data-attr");
        var type = target.getAttribute("data-type");
        switch (attr) {
            case "cancel":
                $('#formUsage0').removeClass('db').addClass('dn');
                break;
            case "sure":
                $scope.channelId = $(".inquiry_ctrl_content li.cur").attr("id");
                if($scope.channelId == null){
                    $scope.channelName = "渠道选择";
                }else{
                    $scope.channelName = $(".inquiry_ctrl_content li.cur").attr("data-value");
                }
                $('#formUsage0').removeClass('db').addClass('dn');
                break;
            default:
                break;
        }
    }
    //公用方法
    $scope.selectFn = function(n){
        //$('.mask').removeClass('dn').addClass('db');
        $('#formUsage'+n).removeClass('dn').addClass('db');
        var num=$('#formUsage'+n+' div.active').index();
        if (num>7) {
            $('#formUsage'+n).scrollTop(500);
        };
    }

    $http({
        method: 'POST',
        url: '../inquiry/userCenter/wxApi',
        data:{url:window.location.href.split("#")[0]}
    }).then(function successCallback(response) {
        var data=response.data;
        if(data.status==0){
            console.log(response.data);
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.appId,
                timestamp:data.timestamp,
                nonceStr: data.noncestr,
                signature: data.app_secret,
                jsApiList: ["closeWindow"]
        });
        }
    })
    $scope.closeWindow=function(){
        wx.closeWindow();
    }
})
function strToJson(str) {
    return JSON.parse(str);
}