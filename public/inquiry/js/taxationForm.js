/**
 * Created by Administrator on 2017/3/21.
 */
var app = angular.module('myApp',[]);
app.controller('myCtrl', function($scope, $http){
    $scope.list=new Array();
    $scope.list.push({name:"客户姓名",value:"",unit:false,point:false,pointMsg:"请输入姓名(不得超过10个汉字)！",pattern:/^[\u4e00-\u9fa5]+((·|•|●)[\u4e00-\u9fa5]+)*$/u,patternErrorMsg:"输入字符长度超限或格式不正确！"});
    $scope.list.push({name:"贷款金额",value:"",class:{"taxation_money":true},unit:true,point:false,pointMsg:"贷款金额不能为空",pattern:/^\d{1,9}$/,patternErrorMsg:"金额必须是正整数"});
    $scope.submitClass={"blueBtn":true,"grayBtn":false};
    $scope.$watch("list+data",function(){
        let{loanAmount:loanAmountNum,id:listId,openId:openId}=$scope.data;
        $scope.id=listId;
        $scope.back=function(){
            window.history.back();
        };
        loanAmountNum=Math.floor(loanAmountNum);
        //新业务逻辑的添加开始
        //loanAmountNum=Math.floor(Number.parseFloat(loanAmountNum)*1*100)/100;
       // console.log(loanAmountNum);
        //新业务逻辑的添加结束
        $scope.validate=function(index){
            let length=$scope.list.length;
            if(index<length&&index>=0){
                if($scope.list[index].value==null||$scope.list[index].value.length<1){
                    $scope.list[index].pointMsg=$scope.list[index].pointTempMsg||$scope.list[index].pointMsg;
                    $scope.list[index].point=true;
                    return false;
                }else {
                    if($scope.list[index].pattern){
                        let pattern=$scope.list[index].pattern,value=$scope.list[index].value;
                        let bol=pattern.test(value);
                        if(!bol||$scope.list[index].value.length>10){
                            $scope.list[index].pointTempMsg=$scope.list[index].pointMsg;
                            $scope.list[index].pointMsg=$scope.list[index].patternErrorMsg;
                            $scope.list[index].point=true;
                            return false;
                        }else{
                            $scope.list[index].pointMsg=$scope.list[index].pointTempMsg||$scope.list[index].pointMsg;
                            $scope.list[index].point=false;
                        }
                        if($scope.list[index].unit&&(value<50||value>loanAmountNum)){
                            $scope.list[index].pointTempMsg=$scope.list[index].pointMsg;
                            if(value > loanAmountNum){
                                $scope.list[index].pointMsg="贷款金额不能超过贷款额度最大值！";
                            }else if(value < 50){
                                $scope.list[index].pointMsg="贷款金额不能小于50万！";
                            }
                            $scope.list[index].point=true;
                            return false;
                        }else if($scope.list[index].unit&&value>=50&&value<=loanAmountNum){
                            $scope.list[index].pointMsg=$scope.list[index].pointTempMsg||$scope.list[index].pointMsg;
                            $scope.list[index].point=false;
                        }
                    }else{
                        $scope.list[index].point=false;
                    }
                }
            }
        };
        $scope.submit=function(){
            for(let list of $scope.list){
                if(list.value==null||list.value.length<1){
                    list.pointMsg=list.pointTempMsg||list.pointMsg;
                    list.point=true;
                    return false;
                }else{
                    if(list.pattern){
                        let pattern=list.pattern,value=list.value;
                        let bol=pattern.test(value);
                        if(!bol||list.value.length>10){
                            list.pointTempMsg=list.pointMsg;
                            list.pointMsg=list.patternErrorMsg;
                            list.point=true;
                            return false;
                        }else{
                            list.pointMsg=list.pointTempMsg||list.pointMsg;
                            list.point=false;
                        }
                        if(list.unit&&(value>loanAmountNum||value<50)){
                            list.pointTempMsg=list.pointMsg;
                            if(value>loanAmountNum){
                                list.pointMsg="贷款金额不能超过贷款额度最大值！";
                            }else if(value < 50){
                                list.pointMsg="贷款金额不能小于50万！";
                            }
                            list.point=true;
                            return false;
                        }else if(list.unit&&value>=50&&value<=loanAmountNum){
                            list.pointMsg=list.pointTempMsg||list.pointMsg;
                            list.point=false;
                        }
                    }else{
                        list.point=false;
                    }
                }
            }
            let [{value:nameValue},{value:moneyValue}]=$scope.list;
            $http({
                method: 'GET',
                url: './userCenter/inquiryReport?id='+$scope.id+'&loanAmount='+moneyValue+'&userName='+encodeURIComponent(nameValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function successCallback(response) {
                var data=response.data;
                if(data.status==0){
                    $scope.submitClass={"blueBtn":false,"grayBtn":true};
                    $scope.submit=function(){};
                    $http({
                        method: 'POST',
                        url: './userCenter/noticeManager',
                        data:{content:'有新报单，请关注！',openId:$scope.data.channelOpenId},
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                        transformRequest: function(obj) {
                            var str = [];
                            for (var p in obj) {
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            }
                            return str.join("&");
                        }
                    }).then(function successCallback(response) {
                        let data=response.data;
                        if(data.status==0){
                        }else{
                            alert("通知客户经理失败！");
                        }
                        window.location.href="./declarationSuccess";
                    })
                }else{
                    alert(data.msg);
                }
            });
        };
    });

});