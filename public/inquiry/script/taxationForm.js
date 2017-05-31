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
        global.taxationForm = mod.exports;
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
            global.taxationForm = mod.exports;
        }
    })(this, function () {
        'use strict';

        var _slicedToArray = function () {
            function sliceIterator(arr, i) {
                var _arr = [];
                var _n = true;
                var _d = false;
                var _e = undefined;

                try {
                    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                        _arr.push(_s.value);

                        if (i && _arr.length === i) break;
                    }
                } catch (err) {
                    _d = true;
                    _e = err;
                } finally {
                    try {
                        if (!_n && _i["return"]) _i["return"]();
                    } finally {
                        if (_d) throw _e;
                    }
                }

                return _arr;
            }

            return function (arr, i) {
                if (Array.isArray(arr)) {
                    return arr;
                } else if (Symbol.iterator in Object(arr)) {
                    return sliceIterator(arr, i);
                } else {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance");
                }
            };
        }();

        /**
         * Created by Administrator on 2017/3/21.
         */
        var app = angular.module('myApp', []);
        app.controller('myCtrl', function ($scope, $http) {
            $scope.list = new Array();
            $scope.list.push({ name: "客户姓名", value: "", unit: false, point: false, pointMsg: "请输入姓名(不得超过10个汉字)！", pattern: /^[\u4E00-\u9FA5]+((\xB7|\u2022|\u25CF)[\u4E00-\u9FA5]+)*$/, patternErrorMsg: "输入字符长度超限或格式不正确！" });
            $scope.list.push({ name: "贷款金额", value: "", class: { "taxation_money": true }, unit: true, point: false, pointMsg: "贷款金额不能为空", pattern: /^\d{1,9}$/, patternErrorMsg: "金额必须是正整数" });
            $scope.submitClass = { "blueBtn": true, "grayBtn": false };
            $scope.$watch("list+data", function () {
                var _$scope$data = $scope.data,
                    loanAmountNum = _$scope$data.loanAmount,
                    listId = _$scope$data.id,
                    openId = _$scope$data.openId;

                $scope.id = listId;
                $scope.back = function () {
                    window.history.back();
                };
                loanAmountNum = Math.floor(loanAmountNum);
                //新业务逻辑的添加开始
                //loanAmountNum=Math.floor(Number.parseFloat(loanAmountNum)*1*100)/100;
                // console.log(loanAmountNum);
                //新业务逻辑的添加结束
                $scope.validate = function (index) {
                    var length = $scope.list.length;
                    if (index < length && index >= 0) {
                        if ($scope.list[index].value == null || $scope.list[index].value.length < 1) {
                            $scope.list[index].pointMsg = $scope.list[index].pointTempMsg || $scope.list[index].pointMsg;
                            $scope.list[index].point = true;
                            return false;
                        } else {
                            if ($scope.list[index].pattern) {
                                var pattern = $scope.list[index].pattern,
                                    value = $scope.list[index].value;
                                var bol = pattern.test(value);
                                if (!bol || $scope.list[index].value.length > 10) {
                                    $scope.list[index].pointTempMsg = $scope.list[index].pointMsg;
                                    $scope.list[index].pointMsg = $scope.list[index].patternErrorMsg;
                                    $scope.list[index].point = true;
                                    return false;
                                } else {
                                    $scope.list[index].pointMsg = $scope.list[index].pointTempMsg || $scope.list[index].pointMsg;
                                    $scope.list[index].point = false;
                                }
                                if ($scope.list[index].unit && (value < 50 || value > loanAmountNum)) {
                                    $scope.list[index].pointTempMsg = $scope.list[index].pointMsg;
                                    if (value > loanAmountNum) {
                                        $scope.list[index].pointMsg = "贷款金额不能超过贷款额度最大值！";
                                    } else if (value < 50) {
                                        $scope.list[index].pointMsg = "贷款金额不能小于50万！";
                                    }
                                    $scope.list[index].point = true;
                                    return false;
                                } else if ($scope.list[index].unit && value >= 50 && value <= loanAmountNum) {
                                    $scope.list[index].pointMsg = $scope.list[index].pointTempMsg || $scope.list[index].pointMsg;
                                    $scope.list[index].point = false;
                                }
                            } else {
                                $scope.list[index].point = false;
                            }
                        }
                    }
                };
                $scope.submit = function () {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = $scope.list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var list = _step.value;

                            if (list.value == null || list.value.length < 1) {
                                list.pointMsg = list.pointTempMsg || list.pointMsg;
                                list.point = true;
                                return false;
                            } else {
                                if (list.pattern) {
                                    var pattern = list.pattern,
                                        value = list.value;
                                    var bol = pattern.test(value);
                                    if (!bol || list.value.length > 10) {
                                        list.pointTempMsg = list.pointMsg;
                                        list.pointMsg = list.patternErrorMsg;
                                        list.point = true;
                                        return false;
                                    } else {
                                        list.pointMsg = list.pointTempMsg || list.pointMsg;
                                        list.point = false;
                                    }
                                    if (list.unit && (value > loanAmountNum || value < 50)) {
                                        list.pointTempMsg = list.pointMsg;
                                        if (value > loanAmountNum) {
                                            list.pointMsg = "贷款金额不能超过贷款额度最大值！";
                                        } else if (value < 50) {
                                            list.pointMsg = "贷款金额不能小于50万！";
                                        }
                                        list.point = true;
                                        return false;
                                    } else if (list.unit && value >= 50 && value <= loanAmountNum) {
                                        list.pointMsg = list.pointTempMsg || list.pointMsg;
                                        list.point = false;
                                    }
                                } else {
                                    list.point = false;
                                }
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    var _$scope$list = _slicedToArray($scope.list, 2),
                        nameValue = _$scope$list[0].value,
                        moneyValue = _$scope$list[1].value;

                    $http({
                        method: 'GET',
                        url: './userCenter/inquiryReport?id=' + $scope.id + '&loanAmount=' + moneyValue + '&userName=' + encodeURIComponent(nameValue),
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).then(function successCallback(response) {
                        var data = response.data;
                        if (data.status == 0) {
                            $scope.submitClass = { "blueBtn": false, "grayBtn": true };
                            $scope.submit = function () {};
                            $http({
                                method: 'POST',
                                url: './userCenter/noticeManager',
                                data: { content: '有新报单，请关注！', openId: $scope.data.channelOpenId },
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                transformRequest: function transformRequest(obj) {
                                    var str = [];
                                    for (var p in obj) {
                                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                    }
                                    return str.join("&");
                                }
                            }).then(function successCallback(response) {
                                var data = response.data;
                                if (data.status == 0) {} else {
                                    alert("通知客户经理失败！");
                                }
                                window.location.href = "./declarationSuccess";
                            });
                        } else {
                            alert(data.msg);
                        }
                    });
                };
            });
        });
    });
});