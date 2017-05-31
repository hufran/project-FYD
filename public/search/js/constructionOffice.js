/**
 * Created by Administrator on 2017/3/16.
 */
var app = angular.module('myApp',['hmTouchEvents']);
//var channelList=strToJson(channelList).data;
app.controller('ctrlCredit', function($scope, $http) {

    $scope.webNet = [
        {"area":"西城区","list":[
            {"name":"北京市西城区房管局服务大厅 ","address":"北京西城区南菜园街51号","mobile":"010-66126942"}
        ]
        },
        {"area":"东城区","list":[
            {"name":"北京市东城区房屋登记事务中心","address":"北京市东城区地安门东大街88号","mobile":"010-84014947"}
        ]
        },
        {"area":"海淀区","list":[
            {"name":"北京市海淀区房管局登记中心","address":"北京市海淀区东北旺南路27号上地办公中心A座2楼西侧","mobile":"010-82708600"},
            {"name":"北京市房屋权属登记事务中心","address":"北京市海淀区西四环中路16号院3号楼5层","mobile":"010-59958562"}
        ]
        },
        {"area":"朝阳区","list":[
            {"name":"北京市朝阳区房管局房屋登记大厅","address":"北京市朝阳区石佛营东里128号院3号楼","mobile":"010-85839922"}
        ]
        },
        {"area":"石景山区","list":[
            {"name":"北京市石景山区行政服务中心","address":"北京市石景山区八角西街66号方地大厦B座三层","mobile":"010-68838208"}
        ]
        },
        {"area":"丰台区","list":[
            {"name":"北京市丰台区房管局房地产交易权属发证中心","address":"北京市丰台区丰体南路1号院8号楼丰体时代大厦","mobile":"010-63812840"}
        ]
        },
        {"area":"顺义区","list":[
            {"name":"北京市顺义区房地产交易中心","address":"北京市顺义区光明北街西侧7号（西院）府前东街甲25号（东院）","mobile":"010-69425703"}
        ]
        },
        {"area":"怀柔区","list":[
            {"name":"北京市怀柔区建委","address":"北京市青春路48号南2楼","mobile":"010-69644628"}
        ]
        },
        {"area":"密云县","list":[
            {"name":"北京市密云县房产交易中心","address":"北京市密云县水源东路339号","mobile":"010-69043359"}
        ]
        },
        {"area":"延庆县","list":[
            {"name":"北京市延庆县城建综合服务大厅","address":"北京市延庆县东外大街89号","mobile":"010-69148073"}
        ]
        },
        {"area":"昌平区","list":[
            {"name":"北京市昌平区建委服务大厅","address":"北京市昌平区南环东路36号","mobile":"010-80112133"}
        ]
        },
        {"area":"平谷区","list":[
            {"name":"北京市平谷区综合行政服务中心","address":"北京市平谷区林荫北街13号","mobile":"010-89985388"}
        ]
        },
        {"area":"门头沟区","list":[
            {"name":"北京市门头沟住建委权属登记科","address":"北京市门头沟区新桥大街48号","mobile":"010-69861022"}
        ]
        },
        {"area":"房山区","list":[
            {"name":"北京市房山区住建委登记办","address":"北京市房山区良乡政通路7号","mobile":"010-88927310"}
        ]
        },
        {"area":"通州区","list":[
            {"name":"北京市通州区住建委房地产交易中心","address":"北京市通州区新华南路196号（蓝山国际小区西侧）","mobile":"010-52118506"}
        ]
        },
        {"area":"大兴区","list":[
            {"name":"北京市大兴区住建委房屋登记大厅","address":"北京市大兴区兴政街29号建设大厦","mobile":"010-69261324"}
        ]
        },
        {"area":"亦庄开发区","list":[
            {"name":"北京市亦庄开发区房地局服务大厅","address":"北京市亦庄荣华中路10号亦城国际中心裙房2层","mobile":"010-67857576"}
        ]
        }
    ];
    $scope.$watch("name+Area+webNet",function(){
        $scope.nameArea = "西城区";
        angular.forEach($scope.webNet, function(data,index,array){
            if(data.area == $scope.nameArea){
                $scope.areaList = array[index].list;
            }
        });
        $scope.getList = function(name){
            angular.forEach($scope.webNet, function(data,index,array){
                if(data.area == name){
                    $scope.areaList = array[index].list;
                }
            });
            $scope.nameArea = name;
            //$('.mask').removeClass('db').addClass('dn');
            $('#formUsage0').removeClass('db').addClass('dn');
        };
        $scope.getClickChannel = function(event){
            event.stopPropagation();
            var target = event.target;

            //$(".container").css("background-color","#")
            $("ul.inquiry_ctrl_content li").removeClass("cur");
            $(target).addClass("cur")
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
                    var name = $("ul.inquiry_ctrl_content li.cur").attr("data-value");
                    if(name == null){

                    }else{
                        angular.forEach($scope.webNet, function(data,index,array){
                            if(data.area == name){
                                $scope.areaList = array[index].list;
                            }
                        });
                        $scope.nameArea = name;
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

    });
    $scope.moveEvent=function(event){
        console.log(window.event);
        window.event.stopPropagation();
        event.preventDefault();
    };

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
})
function strToJson(str) {
    return JSON.parse(str);
}
//$(function(){
//
//    $scope.getList("西城区");
//
//})