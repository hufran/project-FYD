(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.inquiryList = mod.exports;
    }
})(this, function (exports) {
    (function (global, factory) {
        if (typeof define === "function" && define.amd) {
            define([], factory);
        } else if (typeof exports !== "undefined") {
            factory();
        } else {
            var mod = {
                exports: {}
            };
            factory();
            global.inquiryList = mod.exports;
        }
    })(this, function () {
        'use strict';

        /**
         * Created by chen on 2017/3/15.
         */
        var app = angular.module('myApp', ['hmTouchEvents']);
        app.controller('myCtrl', ['$scope', '$http', function ($scope, $http) {
            $scope.inquiry = ["无房本", "有房本"];
            $scope.mortgage = ["无抵押", "一抵", "二抵"];
            $scope.showPage = { display: "block" };
            $scope.hasData = true;

            $scope.$watch("listData+dataList", function () {
                if ($scope.dataList) {
                    if ($scope.dataList.type == 0 && typeof $scope.listData == "undefined") {
                        $http({
                            method: 'GET',
                            url: './userCenter/dataList?page=0&count=10&openId=' + $scope.dataList.openId,
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        }).then(function successCallback(response) {
                            $scope.page = 0;
                            $scope.showPoint = false;
                            $scope.showPointMsg = "数据加载中....";
                            $scope.marginTop = { "margin-top": 0 };
                            $scope.listData = response.data.data;
                            $scope.totalPage = $scope.listData.totalPages;

                            $scope.pagePosition = 0;
                            if ($scope.listData.content.length > 0) {
                                $scope.hasData = true;
                            } else {
                                $scope.hasData = false;
                            }
                            //status 0代表未反馈 1代表客户经理已经反馈结果 2代表用户已经报过单
                            $scope.listData.content.forEach(function (value, index) {
                                value.loanLimitMax = Math.floor(value.loanLimitMax);
                                value.loanLimitMin = Math.floor(value.loanLimitMin);
                                if (value.loanLimitMax > 0) {
                                    value.status = 1;
                                    value.limitMax = value.loanLimitMax > 50 ? value.loanLimitMax : 50;
                                } else {
                                    value.status = 0;
                                }
                                if (Number.parseFloat(value.loanAmount) > 0) {
                                    value.status = 2;
                                }
                            });
                            $scope.touch = false;
                            var startPos = 0;
                            var maxMovePos = 0,
                                movePos,
                                isBottom = false;

                            $scope.dragStart = function (event) {
                                $scope.showPoint = false;
                                document.querySelector(".inquiryContent").parentNode.style.minHeight = document.querySelector(".inquiryContent").clientHeight + "px";
                                $scope.touch = true;
                                startPos = event.center.y;
                                maxMovePos = Number(document.body.clientHeight * 0.25); //拖动到最后位置后允许最大的拖动距离
                                movePos = 0;
                                console.log("startPos:", startPos);
                            };
                            $scope.dragEnd = function () {
                                $scope.touch = false;
                                if (isBottom) {
                                    if ($scope.page < $scope.totalPage - 1) {
                                        $scope.page++;
                                        console.log("page:", $scope.page);
                                        $http({
                                            method: 'GET',
                                            url: './userCenter/dataList?page=' + $scope.page + '&count=10&openId=' + $scope.dataList.openId,
                                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                                        }).then(function (res) {
                                            var length = $scope.listData.content.length;
                                            console.log("newData:", $scope.listData.content);
                                            res.data.data.content.forEach(function (value, index) {
                                                $scope.listData.content[length + index] = value;
                                                value.loanLimitMin = Math.floor(value.loanLimitMin);
                                                value.loanLimitMax = Math.floor(value.loanLimitMax);
                                                if (value.loanLimitMax > 0) {
                                                    value.status = 1;
                                                    value.limitMax = value.loanLimitMax > 50 ? value.loanLimitMax : 50;
                                                } else {
                                                    value.status = 0;
                                                }
                                                if (Number.parseInt(value.loanAmount) > 0) {
                                                    value.status = 2;
                                                }
                                            });
                                            //页面标错是因为是重复的数据，所以才报错
                                        });
                                    } else {
                                        $scope.showPoint = true;
                                    }
                                }
                                $scope.marginTop = { "margin-top": 0 };
                                startPos = 0;
                                movePos = 0;
                                maxMovePos = 0;
                                console.log("endPos", startPos);
                                document.querySelector(".inquiryContent").parentNode.style.minHeight = document.querySelector(".inquiryContent").clientHeight + "px";
                            };
                            $scope.drag = function (event) {
                                if ($scope.touch) {
                                    var winHeight = document.body.clientHeight;
                                    var pageHeight = document.body.scrollHeight;
                                    var targetPos = document.body.scrollTop;
                                    var currenPos = event.center.y;
                                    var target = event.target;
                                    console.log("event:", event);
                                    targetPos += startPos - currenPos;
                                    console.log("startPos:" + startPos + ";currenPos=" + currenPos + ";value=" + (startPos - currenPos) + ";currenPos:" + targetPos);

                                    if (winHeight + targetPos >= pageHeight) {
                                        isBottom = true;

                                        if (movePos <= maxMovePos) {
                                            movePos += startPos - currenPos;
                                            $scope.marginTop["margin-top"] = -movePos + "px";
                                        }
                                        $scope.showPointMsg = "没有更多信息了";
                                    } else {
                                        document.body.scrollTop = targetPos;
                                        isBottom = false;
                                    }
                                    console.log(event.center.x);
                                    startPos = currenPos;
                                }
                            };
                            $scope.hrefLink = function (url) {
                                if (url && url.length > 0) {
                                    window.location.href = url;
                                }
                            };
                        });
                        //询价列表页
                    } else if ($scope.dataList.type == 1) {
                        //询价详情页
                        $scope.pagePosition = 1;
                        $scope.listData = $scope.dataList;
                        //status 0代表未反馈 1代表客户经理已经反馈结果 2代表用户已经报过单
                        $scope.listData.loanLimitMin = Math.floor($scope.listData.loanLimitMin);
                        $scope.listData.loanLimitMax = Math.floor($scope.listData.loanLimitMax);
                        if ($scope.listData.loanLimitMax > 0) {
                            $scope.listData.status = 1;
                            $scope.listData.limitMax = $scope.listData.loanLimitMax > 50 ? $scope.listData.loanLimitMax : 50;
                        } else {
                            $scope.listData.status = 0;
                        }
                        if (Number.parseInt($scope.listData.loanAmount) > 0) {
                            $scope.listData.status = 2;
                        }
                    }
                    $scope.goBack = function () {
                        window.history.back();
                    };
                }
            });
        }]);
    });
});