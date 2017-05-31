/**
 * Created by chen on 2017/2/22.
 */
var inquiryModel=require("../model/inquiryModel");
var inquiryView=require("../view/inquiryView");
var error=require("../util/errorEvent");
var util=require('../util/util');
var urlHandle=require("../util/urlHandle");
var express = require('express');
var router=express.Router();

/*路由器*/
router.get("/",function(req,res,next){
    inquiryView.index(req,res,next);
    inquiryModel.index(req,res,next);
});

router.get("/autoInquiry",function(req,res,next){
    //自动询价
    inquiryView.autoInquiry(req,res,next);
    inquiryModel.autoInquiry(req,res,next);
});
router.get("/autoSuccess",function(req,res,next){
    //询价成功
    inquiryView.autoInquirySuccess(req,res,next);
    inquiryModel.autoInquirySuccess(req,res,next);
});
router.get("/inquirySuccess",function(req,res,next){
    //询价成功
    inquiryView.signSuccess(req,res,next);
    inquiryModel.inquirySuccess(req,res,next);
});
router.get("/declarationSuccess",function(req,res,next){
    //报单成功
    inquiryView.signSuccess(req,res,next);
    inquiryModel.declarationSuccess(req,res,next);
});
router.get("/complainSuccess",function(req,res,next){
    //投诉成功
    inquiryView.signSuccess(req,res,next);
    inquiryModel.complainSuccess(req,res,next);
});
router.get("/inquiryList",function(req,res,next){
    //询价列表
    inquiryView.inquiryPage(req,res,next);
    inquiryModel.inquiryList(req,res,next);
});
router.get("/inquiryDetail",function(req,res,next){
    //询价详情
    inquiryView.inquiryPage(req,res,next);
    inquiryModel.inquiryDetail(req,res,next);
});
router.get("/declarationForm",function(req,res,next){
    //报单
    inquiryView.declarationPage(req,res,next);
    inquiryModel.declarationForm(req,res,next);
});

router.get("/procedure",function(req,res,next){
    //流程指南
    inquiryView.guide(req,res,next);
    inquiryModel.procedure(req,res,next);
});
router.get("/list",function(req,res,next){
    //资料清单
    inquiryView.guide(req,res,next);
    inquiryModel.detailList(req,res,next);
});
router.get("/complaint",function(req,res,next){
    //投诉反馈
    inquiryView.guide(req,res,next);
    inquiryModel.complaint(req,res,next);
});
/*接口*/
router.get("/userCenter/quickLogin",function(req,res,next){
    inquiryModel.quickLogin(req,res,next);
})
router.get("/userCenter/saveFGG",function(req,res,next){
    inquiryModel.saveFGG(req,res,next);
})
router.get("/userCenter/dataList",function(req,res,next){
    inquiryModel.queryList(req,res,next);
});
router.get("/userCenter/inquiryReport",function(req,res,next){
    //报单操作
    inquiryModel.inquiryReport(req,res,next);
});
router.get("/userCenter/saveFang",function(req,res,next){
    //新的自动询价
    inquiryModel.getAutograph(req,res,next);
})
router.get("/userCenter/strSign",function(req,res,next){
    //房咕咕签名计算
    inquiryModel.getAutograph(req,res,next);
});
router.post("/userCenter/wxApi",function(req,res,next){
    inquiryModel.wxApi(req,res,next);
});
router.post("/userCenter/save",function(req,res,next){
    inquiryModel.save(req,res,next);
});
router.post("/userCenter/complaintSave",function(req,res,next){
    inquiryModel.complaintSave(req,res,next);
});
router.post("/userCenter/noticeManager",function(req,res,next){
    inquiryModel.noticeManager(req,res,next);
});
error.eventEmitter.addListener("error",function(res){
    console.log("error:111111111111111111");
    res.render('./errorPoint');
    return;
});
module.exports = router;