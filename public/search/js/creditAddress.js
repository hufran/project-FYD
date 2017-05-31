/**
 * Created by Administrator on 2017/3/16.
 */
var app = angular.module('myApp',['hmTouchEvents']);
//var channelList=strToJson(channelList).data;
app.controller('ctrlCredit', function($scope, $http) {

    $scope.webNet = [
        {"area":"西城区","list":[
            {"name":"中国人民银行征信中心北京分中心 ","address":"北京市西城区月坛北街26号恒华国际商务中心A座907","mobile":"010-68559206"},
            {"name":"招商银行个贷复兴门分中心 ","address":"北京市西城区闹市口大街1号院4号楼10E","mobile":"95555"},
            {"name":"北京农商银行西城支行营业部 ","address":"西城区复兴门外大街4号","mobile":"96198"}
        ]
        },
        {"area":"东城区","list":[
            {"name":"浦发银行雅宝路支行","address":"北京市东城建国门北大街8号华润大厦一层","mobile":"010-85192337"},
            {"name":"北京农商银行东城支行营业部","address":"北京市东城区北三环东路37号A座（华世隆国际公寓）一层","mobile":"96198"},
            {"name":"招商银行长安街支行","address":"北京市东城区建国门内大街11-1号","mobile":"95555"}
        ]
        },
        {"area":"海淀区","list":[
            {"name":"北银消费金融公司","address":"北京市海淀区中关村大街22号中科大厦B座一层","mobile":"010-62521036"},
            {"name":"北京农商银行海淀支行营业部","address":"北京市海淀区苏州街77号","mobile":"96198"},
            {"name":"招商银行个贷中关村分中心","address":"北京市海淀区北二街6号中国普天大厦一层","mobile":"95555"}
        ]
        },
        {"area":"朝阳区","list":[
            {"name":"北京农商银行京粮支行","address":"北京市朝阳区东三环中路16号京粮大厦一层","mobile":"96198"},
            {"name":"北京农商银行大望路支行","address":"北京市朝阳区西大望路15号院3号楼一层","mobile":"96198"},
            {"name":"北京农商银行朝阳支行望京分理处","address":"北京市朝阳区南湖中园130号","mobile":"96198"},
            {"name":"浦发银行慧忠支行","address":"北京市朝阳慧忠北里214号奥华美达酒店一层","mobile":"010-64877966"},
            {"name":"招商银行个贷朝外大街分中心","address":"北京市朝阳区朝外大街26号朝外门写字中心C座1层","mobile":"95555"}
        ]
        },
        {"area":"石景山区","list":[
            {"name":"北京农商银行石景山支行营业部","address":"北京市石景山区杨庄东路78号","mobile":"96198"}
        ]
        },
        {"area":"丰台区","list":[
            {"name":"北京农商银行丰台支行营业部","address":"北京市丰台西局南街101号","mobile":"96198"}
        ]
        },
        {"area":"顺义区","list":[
            {"name":"北京农商银行顺义支行营业部","address":"北京市顺义区新顺南大街15号","mobile":"96198"}
        ]
        },
        {"area":"怀柔区","list":[
            {"name":"北京农商银行怀柔支行营业部","address":"北京市怀柔区迎宾北路18号支行营业部","mobile":"96198"}
        ]
        },
        {"area":"密云县","list":[
            {"name":"北京农商银行密云支行营业部","address":"密云县鼓楼南大街25号","mobile":"96198"}
        ]
        },
        {"area":"延庆县","list":[
            {"name":"北京农商银行延庆支行营业部","address":"北京市延庆县东外大街109号","mobile":"96198"}
        ]
        },
        {"area":"昌平区","list":[
            {"name":"北京农商银行昌平支行营业部","address":"昌平区东环路142号","mobile":"96198"}
        ]
        },
        {"area":"平谷区","list":[
            {"name":"北京农商银行平谷支行营业部","address":"平谷区新平北路平乐街8号","mobile":"96198"}
        ]
        },
        {"area":"门头沟区","list":[
            {"name":"北京农商银行门头沟支行营业部","address":"门头沟区滨河路115号滨河大厦1层","mobile":"96198"}
        ]
        },
        {"area":"房山区","list":[
            {"name":"北京农商银行房山支行营业部","address":"房山区良乡长虹东路1号","mobile":"96198"}
        ]
        },
        {"area":"通州区","list":[
            {"name":"北京农商银行通州支行","address":"北京市通州梨园北街63、65号","mobile":"96198"}
        ]
        },
        {"area":"大兴区","list":[
            {"name":"北京农商银行黄村支行","address":"北京市大兴黄村兴华路216号","mobile":"96198"}
        ]
        },
        {"area":"亦庄开发区","list":[
            {"name":"浦发银行经济技术开发区支行","address":"北京市大兴亦庄天华园二里二区19号楼（大雄商业中心）一层","mobile":"010-67890778"}
        ]
        }
    ];
    $scope.$watch("webNet+name+Area",function(){

        $scope.nameArea = "西城区";
        angular.forEach($scope.webNet, function(data,index,array){
            //console.log(index);
            if(data.area == $scope.nameArea){
                $scope.areaList = array[index].list;
            }
        });
        $scope.getList = function(name){
            //console.log(name);
            angular.forEach($scope.webNet, function(data,index,array){
                //console.log(index);
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