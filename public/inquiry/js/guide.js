/**
 * Created by chen on 2017/3/15.
 */
var app = angular.module('myApp',['hmTouchEvents']);
app.controller('myCtrl', function($scope, $http){
    var procedureList=new Array();
    procedureList.push({name:"申请询价",intro:["点击询价，上传房本照片或者填写信息，提交评估申请。"]});
    procedureList.push({name:"极速反馈",intro:["收到询价申请后，新毅金融将免费为您评估房产并及时向您反馈询价结果。"]});
    procedureList.push({name:"业务申请",intro:['借款客户初步资金需要基本满意，由经纪人将业务需求，通过"业务报单"提交申请。请特别注意严格按提示信息准确录入。']});
    procedureList.push({name:"业务办理",intro:['新毅金融专职业务经理对报单进行处理，并直接联系经纪人预约下户等相关事宜。','1.下户家访:到实际借款人房产处进行实地查勘，核实房屋实际情况。并出具审批意见。','2.公证:至我司指定公证处办理相关借款公证。','3.抵押:到建委办理不动产抵押登记。']});
    procedureList.push({name:"完成放款",intro:["完成上述流程后，24小时内完成贷款发放至约定账户。"]});

    var detailList=new Array();
    detailList.push({
        transactor:"产权人夫妻",
        info:{
            necessary:{name:"必带材料",list:["身份证原件","户口本原件","结婚证原件","房产证原件","个人征信报告详版","其它（原始购房合同，包含回迁房、房改房、经济房、成本价房必须提供）抵押物租赁合同（出租必须提供）"],extra:"以上材料为夫妻双方材料。\n如借款人非放权人本人，需携带借款人身份证，户口本原件，征信报告详版。",extraPos:"bottom",extraClass:{pointTop:true}},
            additional:{name:"附加材料",list:["第二套房产证明","银行流水","公司执照","收入证明"],extraPos:"top",extra:"携带可提高放款成功率",extraClass:{pointBottom:true}}
        }
    });
    detailList.push({
        transactor:"本人",
        info:{
            necessary:{name:"必带材料",list:["身份证原件","户口本原件","房产证原件","个人征信报告详版","其它（原始购房合同，包含回迁房、房改房、经济房、成本价房必须提供）抵押物租赁合同（出租必须提供）"],extra:"如借款人非房权人本人，需携带借款人身份证，户口本原件，征信报告详版。",extraPos:"bottom",extraClass:{pointTop:true}},
            additional:{name:"附加材料",list:["第二套房产证明","银行流水","公司执照","收入证明"],extraPos:"top",extra:"携带可提高放款成功率",extraClass:{pointBottom:true}}
        }
    });
    detailList.push({
        transactor:"本人",
        info:{
            necessary:{name:"必带材料",list:["身份证原件","户口本原件","房产证原件","个人征信报告详版","离婚证或法院判决书","离婚协议（若法院判决书中注明财产分割，则无需此协议）","其它（原始购房合同，包含回迁房、房改房、经济房、成本价房必须提供）抵押物租赁合同（出租必须提供）"],extra:"如借款人非房权人本人，需携带借款人身份证，户口本原件，征信报告详版。",extraPos:"bottom",extraClass:{pointTop:true}},
            additional:{name:"附加材料",list:["第二套房产证明","银行流水","公司执照","收入证明"],extraPos:"top",extra:"携带可提高放款成功率",extraClass:{pointBottom:true}}
        }
    });
    detailList.push({
        transactor:"产权人夫妻",
        info:{
            necessary:{name:"必带材料",list:["身份证原件","户口本原件","房产证原件","个人征信报告详版","结婚证原件","离婚证或法院判决书","离婚协议（若法院判决书中注明财产分割，则无需此协议）","其它（原始购房合同，包含回迁房、房改房、经济房、成本价房必须提供）抵押物租赁合同（出租必须提供）"],extra:"以上材料为夫妻双方材料。\n如借款人非放权人本人，需携带借款人身份证,户口本原件，征信报告详版。",extraPos:"bottom",extraClass:{pointTop:true}},
            additional:{name:"附加材料",list:["第二套房产证明","银行流水","公司执照","收入证明"],extraPos:"top",extra:"携带可提高放款成功率",extraClass:{pointBottom:true}}
        }
    });
    detailList.push({
        transactor:"本人",
        info:{
            necessary:{name:"必带材料",list:["身份证原件","户口本原件","房产证原件","个人征信报告详版","房产遗产集成公证","配偶死亡证明","配偶死亡后婚姻状况证明","其它（原始购房合同，包含回迁房、房改房、经济房、成本价房必须提供）抵押物租赁合同（出租必须提供）"],extra:"如借款人非房权人本人，需携带借款人身份证，户口本原件，征信报告详版。",extraPos:"bottom",extraClass:{pointTop:true}},
            additional:{name:"附加材料",list:["第二套房产证明","银行流水","公司执照","收入证明"],extraPos:"top",extra:"携带可提高放款成功率",extraClass:{pointBottom:true}}
        }
    });
    $scope.selectValue={name:"已婚",value:0,optionsClass:{showSelect:false,hideSelect:true},options:[{name:"已婚",index:0,checked:true},{name:"未婚",index:1,checked:false},{name:"离异",index:2,checked:false},{name:"再婚",index:3,checked:false},{name:"丧偶",index:4,checked:false}]}


    $scope.showPage={display:"block"};
    $scope.$watch("type+selectValue",function(){
        if($scope.type==0){
            /*流程指南*/
            $scope.infoList=procedureList;
        }else if($scope.type==1){
            /*资料清单*/
            $scope.infoList=detailList[0];
            let lastTimeStatus="";
            $scope.changeStatus=function(event){
                event.preventDefault();
                event.stopPropagation();
                var target=event.target;
                lastTimeStatus=$scope.selectValue.options.filter((value,index)=>value.checked==true);
                if(lastTimeStatus&&lastTimeStatus[0]){
                    lastTimeStatus=lastTimeStatus[0]["name"]
                }else{
                    lastTimeStatus="";
                }
                if($scope.selectValue.optionsClass.showSelect){
                    $scope.selectValue.optionsClass.showSelect=false;
                    $scope.selectValue.optionsClass.hideSelect=true;
                }else{
                    $scope.selectValue.optionsClass.showSelect=true;
                    $scope.selectValue.optionsClass.hideSelect=false;
                }

            };
            $scope.changeValue=function(event){
                console.log(event);
                event.stopPropagation();
                let target=event.target;
                let attr=target.getAttribute("data-attr");
                switch(attr){
                    case "cancel":
                        if(lastTimeStatus!=""){
                            $scope.selectValue.options.filter((obj)=>{
                                if(obj.name===lastTimeStatus){
                                    obj.checked=true;
                                }else{
                                    obj.checked=false;
                                }
                            })
                        }else{
                            $scope.selectValue.options.filter((obj)=>{obj.checked=false;})
                        }
                        $scope.selectValue.optionsClass.showSelect=false;
                        $scope.selectValue.optionsClass.hideSelect=true;
                        break;
                    case "sure":
                        var valueList=$scope.selectValue.options.filter((data,index)=>data.checked==true);
                        if(valueList.length>0){
                            $scope.selectValue.name=valueList[0].name;
                            $scope.selectValue.value=valueList[0].index;

                            $scope.infoList=detailList[valueList[0].index];
                        }
                        $scope.selectValue.optionsClass.showSelect=false;
                        $scope.selectValue.optionsClass.hideSelect=true;
                        break;
                    default:
                        break;
                }
                lastTimeStatus="";
            }
            $scope.changeOptions=function(index,event){
                event.stopPropagation();
                $scope.selectValue.options.forEach((value)=>value.checked=false);
                $scope.selectValue.options[index].checked=true;
            };
            $scope.moveEvent=function(event){
                event.preventDefault();
            }
            $scope.touch=false;
            var startPos=0;
            $scope.dragStart=function(event){
                $scope.touch=true;
                startPos=event.center.y;
            };

            $scope.dragEnd=function(){
                $scope.touch=false;
                startPos=0;
            };
            $scope.drag=function(event){
                if($scope.touch){
                    var target=event.target;
                    if(target.nodeName.toLowerCase()=="li"){
                        target=target.parentNode;
                    }
                    var targetPos=target.scrollTop;
                    var currenPos=event.center.y;
                    targetPos+=(startPos-currenPos);
                    target.scrollTop=targetPos;
                    startPos=currenPos;
                }
            }
        }else if($scope.type==2){
            $scope.showPoint=false;
            $scope.complainValue={};
            $scope.pointMsg="请输入投诉反馈内容";
            $scope.$watch("showPoint+complainValue+pointMsg+guideData",function(){
                function validateLen(str=""){
                    /*默认一千个字节*/
                    let total=0;
                    if(str.length>0){
                        let arr=Array.from(str);
                        arr.forEach((value,index)=>{
                            let charPattern=/[^\x00-\xff]/u;
                            if(charPattern.test(value)){
                                total+=2
                            }else{
                                total+=1;
                            }
                        });
                        return total;
                    }
                    return total;
                }
                $scope.validate=function(){
                    let length=validateLen($scope.complainValue.value);
                    if(length==0){
                        $scope.pointMsg="请输入投诉反馈内容！";
                        $scope.showPoint=true;
                    }else if(length>1000){
                        $scope.pointMsg="输入文字长度超过500字！";
                        $scope.showPoint=true;
                    }else{
                        $scope.showPoint=false;
                    }
                };
                $scope.submitComplain=function(){
                    console.log($scope.complainValue);
                    var length=validateLen($scope.complainValue.value);
                    console.log("length:",length);
                    if(length==0){
                        $scope.pointMsg="请输入投诉反馈内容！";
                        $scope.showPoint=true;

                    }else if(length!=0&&length<=1000){
                        console.log($scope.complainValue.value);
                        let content=$scope.complainValue.value;
                        $scope.showPoint=false;
                        $http({
                            method: 'POST',
                            url: './userCenter/complaintSave',
                            data:{content:content,channelOpenId:$scope.guideData.managerId},
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                            transformRequest: function(obj) {
                                var str = [];
                                for (var p in obj) {
                                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                }
                                return str.join("&");
                            }
                        }).then(function successCallback(response) {
                            let data=response.data;console.log(data);
                            if(data.status==0){
                            }else{
                                alert("投诉失败！");
                            }
                            window.location.href="./complainSuccess";
                        })
                    }else if(length>1000){
                        $scope.pointMsg="输入文字长度超过500字！";
                        $scope.showPoint=true;
                    }
                };
            });

        }
    })
});