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
        global.inquiry = mod.exports;
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
            global.inquiry = mod.exports;
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
         * Created by Administrator on 2017/3/14.
         */
        var app = angular.module('myApp', ['hmTouchEvents']);
        app.config(['$compileProvider', function ($compileProvider) {
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|wxlocalresource):/);
        }]);
        app.controller('myCtrl', function ($scope, $http, $location) {

            $scope.roomInfo = [{ name: "无房本", checked: true, index: 0, type: 0 }, { name: "有房本", index: 1, checked: false, type: 0 }]; //房本信息 有误房本数据
            $scope.NoInquiry = []; //无房本数据
            $scope.NoInquiry.push({ name: "房屋地址", value: "", point: false, pointMsg: "请填写房屋所在地！", show: true, options: false });
            $scope.NoInquiry.push({ name: "小区名称", value: "", point: false, pointMsg: "请填写小区名称！", pattern: /^(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){0,50}$/, patternErrorMsg: "小区名称输入文字数超限！", show: true, options: false });
            $scope.NoInquiry.push({ name: "建筑面积", value: "", point: false, pointMsg: "请填写建筑面积！", pattern: /^[1-9](\d{1,8}(\.\d{1,2})?)?$/, patternErrorMsg: "数值需要大于零(保留两位小数)!", show: true, class: { inquiry_build: true }, options: false, unit: true, unitValue: "平米" });
            $scope.NoInquiry.push({ name: "规划用途", value: "", point: false, pointMsg: "请选择规划用途！", show: true, type: 1, optionsClass: { showSelect: false, hideSelect: true }, options: [{ name: "住宅", index: 0, checked: false }, { name: "公寓", index: 1, checked: false }, { name: "别墅", index: 2, checked: false }] });
            $scope.NoInquiry.push({ name: "抵押情况", value: "", point: false, pointMsg: "请选择抵押情况！", show: true, type: 2, optionsClass: { showSelect: false, hideSelect: true }, options: [{ name: "一抵", index: 0, checked: false }, { name: "二抵", index: 1, checked: false }] });
            $scope.NoInquiry.push({ name: "一抵余额", value: "", point: false, pointMsg: "请填写一抵余额！", pattern: /^[1-9](\d{1,8}(\.\d{1,2})?)?$/, patternErrorMsg: "金额必须是有效数字(保留两位小数)!", options: false, class: { inquiry_build: true }, show: false, unit: true, unitValue: "万元" });
            $scope.hasInquiry = []; //有房本数据
            $scope.hasInquiry.push({ name: "小区名称", value: "", point: false, pointMsg: "请填写小区名称！", pattern: /^(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){0,50}$/, patternErrorMsg: "小区名称输入文字数超限！", show: true, options: false });
            $scope.hasInquiry.push({ name: "抵押情况", value: "", point: false, pointMsg: "请选择抵押情况！", show: true, type: 3, optionsClass: { showSelect: false, hideSelect: true }, options: [{ name: "一抵", index: 0, checked: false }, { name: "二抵", index: 1, checked: false }] });
            $scope.hasInquiry.push({ name: "一抵余额", value: "", point: false, pointMsg: "请填写一抵余额！", pattern: /^[1-9](\d{1,8}(\.\d{1,2})?)?$/, patternErrorMsg: "金额必须是有效数字(保留两位小数)!", options: false, class: { inquiry_build: true }, show: false, unit: true, unitValue: "万元" });
            $scope.autoInquiry = []; //自动询价数据
            $scope.autoInquiry.push({ name: "住宅类型", value: "", point: false, pointMsg: "请选择住宅类型！", show: true, type: 1, optionsClass: { showSelect: false, hideSelect: true }, options: [{ name: "住宅", index: 0, checked: false }, { name: "别墅", index: 1, checked: false }] });
            $scope.autoInquiry.push({ name: "小区名称或房屋地址", value: "", point: false, pointMsg: "请填写小区名称！", pattern: /^(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){0,50}$/, patternErrorMsg: "小区名称输入文字数超限！", show: true, options: false });
            $scope.autoInquiry.push({ name: "建筑面积", value: "", point: false, pointMsg: "请填写建筑面积！", pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/, patternErrorMsg: "数值需要大于零(保留两位小数)!", show: true, class: { inquiry_build: true }, options: false, unit: true, unitValue: "平米" });
            $scope.autoInquiry.push({ name: "抵押情况", value: "", point: false, pointMsg: "请选择抵押情况！", show: true, type: 2, optionsClass: { showSelect: false, hideSelect: true }, options: [{ name: "一抵", index: 0, checked: false }, { name: "二抵", index: 1, checked: false }] });
            $scope.autoInquiry.push({ name: "一抵余额", value: "", point: false, pointMsg: "请填写一抵余额！", pattern: /^[1-9](\d{1,8}(\.\d{1,2})?)?$/, patternErrorMsg: "金额必须是有效数字(保留两位小数)!", options: false, class: { inquiry_build: true }, show: false, unit: true, unitValue: "万元" });

            $scope.class = { showSelect: false, hideSelect: true };
            $scope.roomCheckName = $scope.roomInfo[0]['name'];
            $scope.showUpload = false;
            $scope.isUpload = false;
            $scope.imgUrl = "";
            $scope.uploadError = false;
            $scope.showPage = { display: "block" };
            $scope.btnClass = { "blue_btn": true, "gray_btn": false };
            $scope.alertMsg = false;
            if ($location.$$absUrl.indexOf("autoInquiry") != -1) {
                //$scope.dataList = $scope.autoInquiry;
                $scope.autoPage = true;
                $scope.searchPage = false;
                $scope.noData = false;
            } else {
                $scope.autoPage = false;
            }
            var navigator = window.navigator.userAgent;
            function checkWechat() {
                if (/wechart|MicroMessenger/.test(navigator)) {
                    return true;
                }
                return false;
            }
            var fileList;
            var serverId;
            var localId;
            //search pages start
            $scope.areaNameResult = [];
            $scope.searchValue = ''; //input的搜索内容
            $scope.hasAreaResult = 1; //判断有无筛选数据，1代表有数据，0代表没有数据
            $scope.errorMsg = "很遗憾，您的查询无结果，您可以转人工询价！";
            $scope.cacheTime = { oneTime: 0, twoTime: 0, threeTime: 0 };
            $scope.areaAddress = "";
            //$scope.alertMsg=false;
            var startTime = void 0,
                endTime = void 0,
                execTime = 3,
                timeRequest = void 0,
                timeUid = void 0,
                tempValue = void 0,
                count = 0;
            Object.defineProperties($scope.cacheTime, {
                levelOne: {
                    set: function set() {
                        if (this.oneTime > execTime) {
                            this.twoTime = 0;
                            this.threeTime = 0;
                        }
                    },
                    get: function get() {
                        return this.oneTime;
                    }
                },
                levelTwo: {
                    set: function set() {
                        if (this.oneTime > execTime) {
                            this.oneTime = 0;
                            this.threeTime = 0;
                        }
                    },
                    get: function get() {
                        return this.twoTime;
                    }
                },
                levelThree: {
                    set: function set() {
                        if (this.oneTime > execTime) {
                            this.oneTime = 0;
                            this.twoTime = 0;
                        }
                    },
                    get: function get() {
                        return this.threeTime;
                    }
                }
            });
            //search pages end
            $scope.$watch("roomInfo", function () {
                if ($scope.roomInfo[0].checked) {
                    $scope.dataList = $scope.NoInquiry;
                } else {
                    $scope.dataList = $scope.hasInquiry;
                    $scope.showUpload = true;
                }
                //增加自动询价页面的数据读取
                if ($scope.autoPage) {
                    $scope.dataList = $scope.autoInquiry;
                    $scope.inquiryLink = '../inquiry/?wechatId=1&openId=' + $scope.inquiryData.openId;
                }
                /*自动查询修改数据*/
                var lastTimeStatus = "";
                $scope.changeStatus = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    var target = event.target;
                    var index = target.getAttribute("data-index");
                    if (index == 0) {
                        //有房本和没有房本切换效果
                        if ($scope.class.showSelect) {
                            $scope.class = { showSelect: false, hideSelect: true };
                        } else {
                            $scope.class = { showSelect: true, hideSelect: false };
                        }
                    } else {
                        //其他项目的选择
                        lastTimeStatus = $scope.dataList[index - 1].options.filter(function (value, index) {
                            return value.checked == true;
                        });
                        if (lastTimeStatus && lastTimeStatus[0]) {
                            lastTimeStatus = lastTimeStatus[0]["name"];
                        } else {
                            lastTimeStatus = "";
                        }
                        if ($scope.dataList[index - 1].optionsClass.showSelect) {
                            $scope.dataList[index - 1].optionsClass.showSelect = false;
                            $scope.dataList[index - 1].optionsClass.hideSelect = true;
                        } else {
                            $scope.dataList[index - 1].optionsClass.showSelect = true;
                            $scope.dataList[index - 1].optionsClass.hideSelect = false;
                        }
                    }
                };
                $scope.changeValue = function (event) {
                    console.log(event);
                    event.stopPropagation();
                    var target = event.target;
                    var attr = target.getAttribute("data-attr");
                    var type = target.getAttribute("data-type");
                    switch (attr) {
                        case "cancel":
                            if (type) {
                                //表示非房本选择项
                                $scope.dataList.filter(function (value) {
                                    if (value.type == type) {
                                        if (lastTimeStatus != "") {
                                            value.options.filter(function (obj) {
                                                if (obj.name === lastTimeStatus) {
                                                    obj.checked = true;
                                                } else {
                                                    obj.checked = false;
                                                }
                                            });
                                        } else {
                                            value.options.filter(function (obj) {
                                                obj.checked = false;
                                            });
                                        }
                                        value.optionsClass.showSelect = false;
                                        value.optionsClass.hideSelect = true;
                                    }
                                });
                            } else {
                                //表示房本选择项
                                $scope.class = { showSelect: false, hideSelect: true };
                            }
                            break;
                        case "sure":
                            if (type) {
                                //表示非房本选择项
                                $scope.dataList.filter(function (value, index) {
                                    if (value.type == type) {
                                        console.log("value:", value);
                                        var valueList = value.options.filter(function (data, i) {
                                            return data.checked == true;
                                        });
                                        if (valueList.length > 0) {
                                            console.log("valueList:", valueList);
                                            value.name = valueList[0].name;
                                            value.value = valueList[0].index;
                                        }
                                        if (type == 2 || type == 3) {
                                            if (value.value == 1) {
                                                $scope.dataList[$scope.dataList.length - 1].show = true;
                                            } else {
                                                $scope.dataList[$scope.dataList.length - 1].show = false;
                                            }
                                        }

                                        value.optionsClass.showSelect = false;
                                        value.optionsClass.hideSelect = true;
                                    }
                                });
                            } else {
                                //表示房本选择项
                                $scope.class = { showSelect: false, hideSelect: true };
                                $scope.roomInfo.filter(function (value, index) {
                                    if (value.checked && index) {
                                        $scope.roomCheckName = $scope.roomInfo[1]["name"];
                                        $scope.roomInfo[0].checked = false;
                                        $scope.dataList = $scope.hasInquiry;
                                        $scope.showUpload = true;
                                    } else if (value.checked && !index) {
                                        $scope.roomCheckName = $scope.roomInfo[0]["name"];
                                        $scope.roomInfo[1].checked = false;
                                        $scope.dataList = $scope.NoInquiry;
                                        $scope.showUpload = false;
                                    }
                                });
                                $scope.dataList.forEach(function (value) {
                                    return value.value = "";
                                });
                            }
                            break;
                        default:
                            break;
                    }
                    lastTimeStatus = "";
                };
                if ($scope.autoPage) {
                    //自动询价不需要
                } else {
                    if (checkWechat() && false) {
                        $scope.uploadMethod = 0; //代表微信
                        wx.ready(function () {
                            $scope.uploadImg = function (event) {
                                $scope.imgUrl = "../inquiry/images/loading.gif";
                                //document.querySelector("#uploadImg").setAttribute("src","./inquiry/images/loading.gif");
                                $scope.isUpload = true;
                                wx.chooseImage({
                                    count: 1, // 默认9
                                    sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
                                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                                    success: function success(res) {
                                        localId = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                                        if (localId[0]) {
                                            $scope.uploadError = false;
                                            localId[0] = localId[0].replace("wxlocalresource", "wxLocalResource");
                                            $scope.imgUrl = localId[0];
                                            document.querySelector("#uploadImg").setAttribute("src", localId[0]);
                                        } else {
                                            $scope.uploadErrorMsg = "请您重新选择图片！";
                                            $scope.uploadError = true;
                                        }
                                    },
                                    fail: function fail(res) {
                                        console.log(res);
                                        $scope.uploadErrorMsg = "选择图片失败!";
                                        $scope.uploadError = true;
                                    }
                                });
                            };
                        });
                    } else {
                        $scope.uploadMethod = 1; //代表其他方式
                        $scope.uploadImg = function () {};
                        document.getElementById("upload").addEventListener('change', function (event) {
                            $scope.imgUrl = "../inquiry/images/loading.gif";
                            fileList = event.target.files;
                            if (fileList.length > 0 && /^image\/(jpeg||bmp||png||tiff||gif||pcx||tga||exif||fpx||svg||cdr||pcd||eps||WMF)$/ig.test(fileList[0].type) && fileList[0].size < 2 * 1024 * 1024) {
                                if (window.FileReader) {
                                    var reader = new FileReader();
                                    reader.readAsDataURL(fileList[0]);
                                    reader.onload = function (data) {
                                        $scope.imgUrl = data.target.result;
                                        $scope.$apply();
                                    };
                                }
                                $scope.isUpload = true;
                                $scope.uploadError = false;
                            } else {
                                $scope.isUpload = false;
                                $scope.uploadErrorMsg = "图片必须上传，且图片大小不得超过2M！";
                                $scope.uploadError = true;
                            }
                            $scope.$apply();
                            console.log(fileList);
                        });
                    }
                }
            });
            //search pages
            $scope.$watch('searchValue+areaNameResult', function () {
                if ($scope.searchValue.length > 0 && tempValue != $scope.searchValue) {
                    var util = {
                        xmlHttp: typeof XMLHttpRequest == "function" ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"),
                        createServer: function createServer(url, data, success, error, timeout, method) {
                            var isError = false,
                                timeuid = void 0,
                                self = this;
                            timeout = timeout || 1000;
                            method = method || "GET";
                            timeuid = setTimeout(function () {
                                isError = true;
                                self.xmlHttp.abort();
                                error();
                            }, timeout);
                            this.xmlHttp.onreadystatechange = function () {
                                if (this.readyState == 4) {
                                    if (this.status == 200) {
                                        clearTimeout(timeuid);
                                        if (success && !isError) {
                                            data = JSON.parse(this.responseText);
                                            success(data);
                                        }
                                    } else {
                                        isError = true;
                                        clearTimeout(timeuid);
                                        error();
                                    }
                                }
                            };
                            if (method == "GET") {
                                url = this.analyzetpl(url, data);
                                data = null;
                            } else {
                                data = JSON.stringify(data);
                            }
                            this.xmlHttp.withCredentials = false;
                            this.xmlHttp.open(method, url, "true");
                            this.xmlHttp.send(data);
                        },
                        abortRequest: function abortRequest() {
                            this.xmlHttp.abort();
                        },
                        analyzetpl: function analyzetpl(url, json) {
                            if (typeof url == "undefined" || typeof json == "undefined") {
                                return url;
                            }

                            return url.replace(/\{(.*?)\}/ig, function () {
                                if (typeof json[arguments[1]] == "undefined") {
                                    return "";
                                }
                                return json[arguments[1]];
                            });
                        },
                        formatTime: function formatTime(startTime, endTime) {
                            if (startTime && endTime) {
                                return (endTime - startTime) / 1000;
                            }
                        }
                    };
                    var successCallback = function successCallback(data) {
                        console.log(data);
                        $scope.alertMsg = false;
                        $scope.noData = false;
                        var resValue = data.data || data.Data;
                        console.log(resValue);
                        if (resValue && resValue.length > 0) {
                            $scope.hasAreaResult = 1;
                            $scope.areaNameResult = resValue;
                        } else {
                            $scope.errorMsg = "很遗憾，您的查询无结果，您可以转人工询价！";
                            $scope.hasAreaResult = 0;
                        }
                        endTime = new Date().getTime();
                        var timeValue = util.formatTime(startTime, endTime);
                        console.log("timeValue:", timeValue);
                        if (timeValue <= 1) {
                            $scope.cacheTime.levelOne++;
                        } else if (1 < timeValue && timeValue <= 2) {
                            $scope.cacheTime.levelTwo++;
                        } else if (timeValue > 2) {
                            $scope.cacheTime.levelThree++;
                        }
                        console.log("levelOne:", $scope.cacheTime.levelOne, " levelTwo:", $scope.cacheTime.levelTwo, " levelThree:", $scope.cacheTime.levelThree);
                        $scope.$apply();
                    };
                    var errorCallback = function errorCallback() {
                        $scope.alertMsg = false;
                        $scope.errorMsg = "网络异常，请您重新输入小区名称!";
                        $scope.hasAreaResult = 0;
                        $scope.noData = false;
                        $scope.$apply();
                    };
                    startTime = new Date().getTime();
                    if (timeRequest) {
                        util.abortRequest();
                        timeRequest = null;
                    }
                    console.log(util);

                    if ($scope.cacheTime.levelTwo > execTime) {
                        console.log("这里是level2级请求");
                        $scope.alertMsg = true;
                        timeRequest = util.createServer('./userCenter/strSign?cityName={cityName}&filter={filter}', { cityName: "beijing", filter: $scope.searchValue }, successCallback, errorCallback, 2000, "GET");
                        return;
                    }
                    if ($scope.cacheTime.levelThree > execTime) {
                        console.log("这里是level3级请求");
                        $scope.alertMsg = true;
                        if (timeUid) {
                            clearTimeout(timeUid);
                        }
                        timeUid = setTimeout(function () {
                            timeUid = null;
                            timeRequest = util.createServer('./userCenter/strSign?cityName={cityName}&filter={filter}', { cityName: "beijing", filter: $scope.searchValue }, successCallback, errorCallback, 1000, "GET");
                        }, 1000);
                        return;
                    } else {
                        console.log("这里是level1级请求");
                        $scope.alertMsg = true;
                        timeRequest = util.createServer('./userCenter/strSign?cityName={cityName}&filter={filter}', { cityName: "beijing", filter: $scope.searchValue }, successCallback, errorCallback, 1000, "GET");
                        return;
                    }
                    tempValue = $scope.searchValue;
                    console.log($scope.searchValue);
                } else {
                    if ($scope.searchValue == "" || count == 0) {
                        $scope.hasAreaResult = 1;
                        $scope.areaNameResult = [];
                    } else {
                        $scope.hasAreaResult = 0;
                    }
                    return;
                }
                count = 1;
            });
            $scope.popSearch = function (i) {
                if (i == 1) {
                    $scope.searchPage = true;
                    setTimeout('document.querySelector("input[name=\'searchInput\']").focus()', 300);
                } else {
                    $scope.searchPage = false;
                }
            };
            $scope.getFilter = function (name, address) {
                $scope.dataList[1].value = name + '(' + address + '）';
                $scope.areaName = name;
                $scope.areaAddress = address;
                $scope.searchPage = false;
                $scope.validate(1);
            };
            $scope.autoInquiryPage = function () {
                $scope.searchPage = false;
            };
            //search pages end
            angular.element(document).ready(function () {
                /*获取微信签名数据*/
                console.log(window.location.href.split("#")[0]);
                $http({
                    method: 'POST',
                    url: './userCenter/wxApi',
                    data: { url: window.location.href.split("#")[0] }
                }).then(function successCallback(response) {
                    var data = response.data;
                    if (data.status == 0) {
                        console.log(response.data);
                        wx.config({
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: data.appId,
                            timestamp: data.timestamp,
                            nonceStr: data.noncestr,
                            signature: data.app_secret,
                            jsApiList: ["chooseImage", "uploadImage", "downloadImage"]
                        });
                        wx.error(function (res) {
                            console.log("error:", res);
                        });
                    }
                });
            });

            $scope.changeOptions = function (type, index, event) {
                event.stopPropagation();
                if ($scope.autoPage) {
                    $scope.dataList.filter(function (value) {
                        if (value.type == type) {
                            value.options.forEach(function (data) {
                                return data.checked = false;
                            });
                            value.options[index].checked = true;
                        }
                    });
                } else {
                    if (type == 0) {
                        //有无房本操作
                        $scope.roomInfo.forEach(function (value) {
                            return value.checked = false;
                        });
                        console.log("index:", index);
                        $scope.roomInfo[index].checked = true;
                    } else if (type == 1 || type == 2 || type == 3) {
                        //规划用途操作和有无房本状态下抵押情况操作
                        $scope.dataList.filter(function (value) {
                            if (value.type == type) {
                                value.options.forEach(function (data) {
                                    return data.checked = false;
                                });
                                value.options[index].checked = true;
                            }
                        });
                    }
                }
            };
            //失去焦点验证数据
            $scope.validate = function (index) {
                var length = $scope.dataList.length;
                if (index < length && index >= 0) {
                    if ($scope.dataList[index].value == null || $scope.dataList[index].value.length < 1) {
                        $scope.dataList[index].point = true;
                    } else {
                        if ($scope.dataList[index].pattern) {
                            var pattern = $scope.dataList[index].pattern,
                                value = $scope.dataList[index].value;
                            var bol = pattern.test(value);
                            console.log(bol);
                            if (!bol) {
                                $scope.dataList[index].pointTempMsg = $scope.dataList[index].pointMsg;
                                $scope.dataList[index].pointMsg = $scope.dataList[index].patternErrorMsg;
                                $scope.dataList[index].point = true;
                            } else {
                                $scope.dataList[index].pointMsg = $scope.dataList[index].pointTempMsg || $scope.dataList[index].pointMsg;
                                $scope.dataList[index].point = false;
                            }
                        } else {
                            $scope.dataList[index].point = false;
                        }
                    }
                }
            };
            //新增自动询价提交到房估估并保存到理财平台

            $scope.submitFangGuGu = function () {
                var length = $scope.dataList.length;
                //openId = $scope.inquiryData.openId;
                for (var i = 0; i < length; i++) {
                    if (i != length - 1) {
                        if ($scope.dataList[i].value == null || $scope.dataList[i].value.length < 1) {
                            $scope.dataList[i].pointMsg = $scope.dataList[i].pointTempMsg || $scope.dataList[i].pointMsg;
                            $scope.dataList[i].point = true;
                            return false;
                        } else {
                            //已经选择或者填写信息
                            if ($scope.dataList[i].pattern) {
                                var pattern = $scope.dataList[i].pattern,
                                    value = $scope.dataList[i].value;
                                var bol = pattern.test(value);
                                if (!bol) {
                                    $scope.dataList[i].pointTempMsg = $scope.dataList[i].pointMsg;
                                    $scope.dataList[i].pointMsg = $scope.dataList[i].patternErrorMsg;
                                    $scope.dataList[i].point = true;
                                    return false;
                                } else {
                                    $scope.dataList[i].pointMsg = $scope.dataList[i].pointTempMsg || $scope.dataList[i].pointMsg;
                                    $scope.dataList[i].point = false;
                                }
                            } else {
                                $scope.dataList[i].point = false;
                            }
                        }
                    } else {
                        if ($scope.dataList[length - 2].value == 1) {
                            if ($scope.dataList[i].value && $scope.dataList[i].value.length < 1) {
                                $scope.dataList[i].pointMsg = $scope.dataList[i].pointTempMsg || $scope.dataList[i].pointMsg;
                                $scope.dataList[i].point = true;
                                return false;
                            } else {
                                if ($scope.dataList[i].pattern) {
                                    var _pattern = $scope.dataList[i].pattern,
                                        _value = $scope.dataList[i].value;
                                    var _bol = _pattern.test(_value);
                                    if (!_bol) {
                                        $scope.dataList[i].pointTempMsg = $scope.dataList[i].pointMsg;
                                        $scope.dataList[i].pointMsg = $scope.dataList[i].patternErrorMsg;
                                        $scope.dataList[i].point = true;
                                        return false;
                                    } else {
                                        $scope.dataList[i].pointMsg = $scope.dataList[i].pointTempMsg || $scope.dataList[i].pointMsg;
                                        $scope.dataList[i].point = false;
                                    }
                                } else {
                                    $scope.dataList[i].point = false;
                                }
                            }
                        }
                    }
                }

                var paramFgg = {};
                paramFgg.cityName = 'beijing';
                //paramFgg.filter = $scope.dataList[1].value;
                paramFgg.filter = encodeURIComponent($scope.areaName);
                paramFgg.houseType = encodeURIComponent($scope.dataList[0].value == 0 ? "住宅" : "别墅");
                paramFgg.area = encodeURIComponent($scope.dataList[2].value);
                $http({
                    method: 'GET',
                    url: './userCenter/strSign?cityName=' + paramFgg.cityName + '&filter=' + paramFgg.filter + '&houseType=' + paramFgg.houseType + '&area=' + paramFgg.area,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function (response1) {
                    var datas = response1.data;
                    console.log(response1);
                    if (datas.Success) {
                        var loanAmount = datas.Data.totalprice;
                        //询价结果是0的时候
                        console.log("loanAmount", loanAmount);
                        if (loanAmount == 0) {
                            $scope.noData = true;
                            return false;
                        }
                        var loanLast = $scope.dataList[4].value || 0;
                        if ($scope.dataList[0].value == 0) {
                            var minLimit = parseInt(loanAmount * 0.75 - loanLast);
                            var maxLimit = parseInt(loanAmount * 0.8 - loanLast);
                        } else {
                            var minLimit = parseInt(loanAmount * 0.5 - loanLast);
                            var maxLimit = parseInt(loanAmount * 0.55 - loanLast);
                        }
                        //传到房毅贷的数据
                        var param = {}; //需要上传的数据
                        param.areaName = $scope.areaName;
                        param.housingArea = $scope.dataList[2].value;
                        param.housingMortgage = Number.parseInt($scope.dataList[3].value) + 1;
                        param.housingType = $scope.dataList[0].value == 0 ? "住宅" : "别墅";
                        param.userSource = "h5";
                        param.roomAddress = $scope.areaAddress;
                        param.mortgageAmount = loanLast;
                        param.loanLimitMin = Number(minLimit) > 0 ? Number(minLimit) : 0;
                        param.loanLimitMax = Number(maxLimit) > 0 ? Number(maxLimit) : 0;
                        var formData1 = new FormData();
                        for (var keys in param) {
                            formData1.append(keys, param[keys]);
                        }

                        if (param.loanLimitMin < 1) {
                            $scope.noData = true;
                        } else {
                            $scope.noData = false;
                            $.ajax({
                                url: './userCenter/save?openId=' + $scope.inquiryData.openId,
                                type: 'POST',
                                data: formData1,
                                async: true,
                                cache: false,
                                contentType: false,
                                processData: false,
                                success: function success(data) {
                                    try {
                                        var resValue = JSON.parse(data);
                                        if (resValue.data) {
                                            $scope.noData = false;
                                            $.ajax({
                                                method: 'POST',
                                                url: './userCenter/noticeManager',
                                                data: { content: '有新询价，请关注！', openId: $scope.inquiryData.channelOpenId },
                                                success: function success(res) {
                                                    /*res=JSON.parse(res);*/
                                                    if (res.status == 0) {} else {
                                                        alert("通知客户经理失败！");
                                                    }
                                                    window.location.href = "./autoSuccess?totalPrice=" + loanAmount + '&id=' + JSON.parse(data).data + "&morga=" + param.mortgageAmount + "&openId=" + $scope.inquiryData.openId + "&housingType=" + $scope.dataList[0].value;; //跳转到成功页面;
                                                },
                                                error: function error() {
                                                    alert("通知客户经理失败！");
                                                }
                                            });
                                        } else {
                                            $scope.noData = true;
                                        }
                                    } catch (err) {
                                        $scope.noData = true;
                                        console.log("数据错误");
                                    }
                                },
                                error: function error() {
                                    console.log("保存数据失败！");
                                    $scope.noData = true;
                                }
                            });
                        }
                    } else {
                        alert("没查到");
                        $scope.noData = true;
                    }
                });
            };
            /*此处是无房本信息上传接口 post方式上传*/
            $scope.submit = function () {
                var length = $scope.dataList.length;
                for (var i = 0; i < length; i++) {
                    if (i != length - 1) {
                        if ($scope.dataList[i].value == null || $scope.dataList[i].value.length < 1) {
                            $scope.dataList[i].pointMsg = $scope.dataList[i].pointTempMsg || $scope.dataList[i].pointMsg;
                            $scope.dataList[i].point = true;
                            return false;
                        } else {
                            if ($scope.dataList[i].pattern) {
                                var pattern = $scope.dataList[i].pattern,
                                    value = $scope.dataList[i].value;
                                var bol = pattern.test(value);
                                if (!bol) {
                                    $scope.dataList[i].pointTempMsg = $scope.dataList[i].pointMsg;
                                    $scope.dataList[i].pointMsg = $scope.dataList[i].patternErrorMsg;
                                    $scope.dataList[i].point = true;
                                    return false;
                                } else {
                                    $scope.dataList[i].pointMsg = $scope.dataList[i].pointTempMsg || $scope.dataList[i].pointMsg;
                                    $scope.dataList[i].point = false;
                                }
                            } else {
                                $scope.dataList[i].point = false;
                            }
                        }
                    } else {
                        if ($scope.dataList[length - 2].value == 1) {
                            if ($scope.dataList[i].value && $scope.dataList[i].value.length < 1) {
                                $scope.dataList[i].pointMsg = $scope.dataList[i].pointTempMsg || $scope.dataList[i].pointMsg;
                                $scope.dataList[i].point = true;
                                return false;
                            } else {
                                if ($scope.dataList[i].pattern) {
                                    var _pattern2 = $scope.dataList[i].pattern,
                                        _value2 = $scope.dataList[i].value;
                                    var _bol2 = _pattern2.test(_value2);
                                    if (!_bol2) {
                                        $scope.dataList[i].pointTempMsg = $scope.dataList[i].pointMsg;
                                        $scope.dataList[i].pointMsg = $scope.dataList[i].patternErrorMsg;
                                        $scope.dataList[i].point = true;
                                        return false;
                                    } else {
                                        $scope.dataList[i].pointMsg = $scope.dataList[i].pointTempMsg || $scope.dataList[i].pointMsg;
                                        $scope.dataList[i].point = false;
                                    }
                                } else {
                                    $scope.dataList[i].point = false;
                                }
                            }
                        }
                    }
                }

                var _$scope$roomInfo$filt = $scope.roomInfo.filter(function (value) {
                    return value.checked;
                }),
                    _$scope$roomInfo$filt2 = _slicedToArray(_$scope$roomInfo$filt, 1),
                    nameValue = _$scope$roomInfo$filt2[0].name;

                var param = {}; //需要上传的数据
                if (nameValue === "有房本") {
                    $scope.uploadErrorMsg = "图片必须上传，且图片大小不得超过2M！";
                    if (checkWechat() && false) {
                        //微信
                        if (!localId || !localId[0]) {
                            $scope.uploadError = true;
                            return;
                        }
                    } else {
                        //其他
                        if (typeof fileList != "undefined" && $scope.isUpload) {
                            $scope.uploadError = false;
                            param.pic = document.getElementById("upload").files[0];
                        } else {
                            $scope.uploadError = true;
                            return;
                        }
                    }

                    var _$scope$dataList = _slicedToArray($scope.dataList, 3);

                    param.areaName = _$scope$dataList[0].value;
                    param.housingMortgage = _$scope$dataList[1].value;
                    param.mortgageAmount = _$scope$dataList[2].value;
                } else {
                    var _$scope$dataList2 = _slicedToArray($scope.dataList, 6);

                    param.roomAddress = _$scope$dataList2[0].value;
                    param.areaName = _$scope$dataList2[1].value;
                    param.housingArea = _$scope$dataList2[2].value;
                    param.housingType = _$scope$dataList2[3].name;
                    param.housingMortgage = _$scope$dataList2[4].value;
                    param.mortgageAmount = _$scope$dataList2[5].value;
                }
                param.housingMortgage = Number.parseInt(param.housingMortgage) + 1;
                console.log(param);
                var formData = new FormData();
                for (var keys in param) {
                    formData.append(keys, param[keys]);
                }
                var startUpload = function startUpload(formData) {
                    $scope.alertMsg = true;
                    $.ajax({
                        url: './userCenter/save?openId=' + $scope.inquiryData.openId,
                        type: 'POST',
                        data: formData,
                        async: true,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function success(data) {
                            $scope.alertMsg = false;
                            var resValue = JSON.parse(data);
                            if (resValue.status == 0) {
                                $scope.submit = function () {};
                                $scope.btnClass = { "blue_btn": false, "gray_btn": true };
                                console.log("channelOpenId:", $scope.inquiryData.channelOpenId);
                                $.ajax({
                                    method: 'POST',
                                    url: './userCenter/noticeManager',
                                    data: { content: '有新询价，请关注！', openId: $scope.inquiryData.channelOpenId },
                                    success: function success(res) {
                                        /*res=JSON.parse(res);*/
                                        if (res.status == 0) {} else {
                                            alert("通知客户经理失败！");
                                        }
                                        window.location.href = "./inquirySuccess"; //跳转到成功页面;
                                    },
                                    error: function error() {
                                        alert("通知客户经理失败！");
                                    }
                                });
                            } else {
                                alert("报单失败");
                            }
                            $scope.$apply();
                        },
                        error: function error() {
                            $scope.alertMsg = false;
                        }
                    });
                };
                if (localId && localId[0]) {
                    $scope.uploadError = false;
                    document.querySelector("#uploadImg").setAttribute("src", localId[0]);
                    wx.uploadImage({
                        localId: localId[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 0, // 默认为1，显示进度提示
                        success: function success(res) {
                            document.querySelector("#uploadImg").setAttribute("src", localId[0]);
                            serverId = res.serverId; // 返回图片的服务器端ID
                            if (typeof serverId != "undefined") {
                                formData.append("serverId", serverId);

                                startUpload(formData);
                            } else {
                                $scope.uploadErrorMsg = "请选择图片！";
                                $scope.uploadError = true;
                                $scope.$apply();
                                return false;
                            }
                        },
                        fail: function fail(res) {
                            document.querySelector("#uploadImg").setAttribute("src", localId[0]);
                            $scope.uploadErrorMsg = "上传图片超过1M限制！";
                            $scope.uploadError = true;
                            $scope.$apply();
                            return false;
                        }
                    });
                } else {
                    startUpload(formData);
                }
            };
            $scope.moveEvent = function (event) {
                event.preventDefault();
            };
            $scope.touch = false;
            var startPos = 0;
            $scope.dragStart = function (event) {
                $scope.touch = true;
                startPos = event.center.y;
            };

            $scope.dragEnd = function () {
                $scope.touch = false;
                startPos = 0;
            };
            $scope.drag = function (event) {
                if ($scope.touch) {
                    var target = event.target;
                    if (target.nodeName.toLowerCase() == "li") {
                        target = target.parentNode;
                    }
                    var targetPos = target.scrollTop;
                    var currenPos = event.center.y;
                    targetPos += startPos - currenPos;
                    target.scrollTop = targetPos;
                    startPos = currenPos;
                }
            };
        });
    });
});