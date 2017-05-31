/**
 * Created by chen on 2017/3/15.
 */
var app = angular.module('myApp',[]);
app.controller('myCtrl', function($scope, $http){
    $scope.$watch("type",function(){
        if($scope.type==0){
            //提交询价单成功
            $scope.pointMsg="询价成功！\n请您耐心等待，\n我们尽快为您反馈询价结果";
        }else if($scope.type==1){
            //保单成功
            $scope.pointMsg="您的申请已提交成功，请耐心等待，稍后会有客户经理跟您联系!";
        }else if($scope.type==2){
            //投诉请求
            $scope.pointMsg="您的诉求已转发客户经理，请耐心等待，客户经理会第一时间与您联系";
        }
    });
    /*pushHistory();
    window.addEventListener("popstate", function(e) {
        pushHistory();
    }, false);
    function pushHistory() {
        var state = {
            title: "title",
            url: "#"
        };
        window.history.pushState(state, "title", "#");
    }*/
    $http({
        method: 'POST',
        url: './userCenter/wxApi',
        data:{url:window.location.href.split("#")[0]},
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: function (obj) {
            var str = [];
            for (var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        }
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
});