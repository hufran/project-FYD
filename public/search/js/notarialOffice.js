/**
 * Created by Administrator on 2017/3/16.
 */
var app = angular.module('myApp',['hmTouchEvents']);
//var channelList=strToJson(channelList).data;
app.controller('ctrlCredit', function($scope, $http) {

    $scope.webNet = [
        {"area":"西城区","list":[
            {"name":"北京市方正公证处","address":"北京市西城区西直门外大街1号西环广场塔3办公楼1、2、11、12、16层","mobile":"010-58073588"},
            {"name":"北京市中信公证处","address":"北京市西城区金融街广宁伯路2号铁通大厦5层","mobile":"010-52601155"}
        ]
        }
    ];
    $scope.$watch("webNet+name+Area",function(){
        //console.log("wechat:",$scope.wechat);
        $scope.nameArea = "西城区";
        angular.forEach($scope.webNet, function(data,index,array){
            console.log(index);
            if(data.area == $scope.nameArea){
                $scope.areaList = array[index].list;
            }
        });
        $scope.getList = function(name){
            console.log(111);
            angular.forEach($scope.webNet, function(data,index,array){
                console.log(index);
                if(data.area == name){
                    $scope.areaList = array[index].list;
                }
            });
            $scope.nameArea = name;
            $('.mask').removeClass('db').addClass('dn');
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
                                console.log(index);
                                console.log(array[index].list);
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
            $('.mask').removeClass('dn').addClass('db');
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