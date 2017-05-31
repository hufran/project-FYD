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
        global.autoSuccess = mod.exports;
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
            global.autoSuccess = mod.exports;
        }
    })(this, function () {
        'use strict';

        /**
         * Created by chen on 2017/3/15.
         */
        var app = angular.module('myApp', []);
        app.controller('myCtrl', function ($scope, $http) {
            //报单
            $scope.noData = false;
            $scope.$watch("inquiryData", function () {
                if ($scope.inquiryData.housingType == 0) {
                    $scope.minratio = 0.75;
                    $scope.maxratio = 0.8;
                } else {
                    $scope.minratio = 0.5;
                    $scope.maxratio = 0.55;
                }
                if ($scope.inquiryData.totalPrice) {
                    $scope.inquiryData.totalPrice = Number($scope.inquiryData.totalPrice);
                    $scope.inquiryData.morga = Number($scope.inquiryData.morga);
                    $scope.minValue = parseInt($scope.inquiryData.totalPrice * $scope.minratio - $scope.inquiryData.morga);
                    $scope.minValue = $scope.minValue > 0 ? $scope.minValue : "0";
                    $scope.maxValue = parseInt($scope.inquiryData.totalPrice * $scope.maxratio - $scope.inquiryData.morga);
                    $scope.maxValue = $scope.maxValue > 0 ? $scope.maxValue : "0";
                    if (parseFloat($scope.maxValue) == 0) {
                        $scope.noData = true;
                    } else {
                        $scope.noData = false;
                    }
                }
            });
            $scope.goInquiry = function () {
                var openId = $scope.inquiryData.openId;
                var loanAmount = Math.ceil($scope.inquiryData.totalPrice * $scope.maxratio - $scope.inquiryData.morga);
                var id = $scope.inquiryData.id;
                window.location.href = "./declarationForm?loanAmount=" + loanAmount + "&id=" + id + "&openId=" + openId;
            };
        });
    });
});