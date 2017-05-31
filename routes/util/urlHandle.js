/**
 * Created by Administrator on 2017/2/22.
 */
var utils=require('./util.js');
global.urlList={
    baseUrl:{},
    getBaseUrl:function(){
        return this.baseUrl;
    },
    setBaseUrl:function(urllist){
        if(!utils.checkObjectIsEmpty(urllist)){
            var key;
            for(key in urllist){
                if(this.baseUrl.key!=urllist[key]){
                    this.baseUrl[key]=urllist[key];
                }
            }
        }
    },
    apiUrl:{
        inquirySave:"{baseUrl}/api/userCenter/rest/fyd/inquiry/save",//post方式提交数据
        inquirylist:"{baseUrl}/api/userCenter/rest/fyd/inquiry/list/{page}/{count}?userId={userId}",//get 询价列表
        inquiryDetail:"{baseUrl}/api/userCenter/rest/fyd/inquiry/getById/{id}",//询价详情
        inquiryReport:"{baseUrl}/api/userCenter/rest/fyd/inquiry/inquiryReport/{id}",//GET 报单接口
        getId:"{baseUrl}/api/userCenter/rest/wechat/getIdByWeChatIdAndOpenId/{weChatId}/{openId}",//get 获取user_center_id
        getData:"{baseUrl}/api/userCenter/rest/wechat/getFydChannelOpenIdByWeChatIdAndOpenId/{weChatId}/{openId}",//get 根据openId获取userid和channelOpenId
        sms:"{baseUrl}/api/userCenter/rest/fyd/channel/sms/{channelId}",//post 用户中心根据channelId发送短信
        complaint:"{baseUrl}/weixin/message/template",//提交投诉反馈
        getAccessToken:"{baseUrl}/weixin/accessToken/get",//获取accessToken
        findAll:"{baseUrl}/api/userCenter/rest/fyd/channel/findAll",//查询全部渠道信息
        quickLogin:"{baseUrl}/api/userCenter/rest/userLogin/quickLogin4Fyd?openId={openId}",//快速登录接口
        fydLogin:"/api/userCenter/rest/userLogin/fydLogin",//房毅贷登录接口
        save4Fyd:"/api/userCenter/rest/userInfo/save4Fyd",//经纪人注册
        save:"/api/userCenter/rest/fyd/dealerext/save",//经纪人认证
        fydResetPwd:"/api/userCenter/rest/userInfo/fydResetPwd",//用户重置密码
        sendCaptcha:"/nnfeInterface/sms/sendCaptcha?",//发送短信验证码
        bindUserId:"/api/userCenter/rest/wechat/save",//将userId与openId进行绑定
        getResidentialArea:"http://api.baseinfo.yunfangdata.com/{cityName}/{filter}/ResidentialArea?key_id={key_id}&access_signature={access_signature}&time_stamp={time_stamp}",//模糊查询小区信息
        getInquiry:"http://api.xunjia.yunfangdata.com/{cityName}/{houseType}/{area}/{filter}/InquiryResults?key_id={key_id}&access_signature={access_signature}&time_stamp={time_stamp}",//根据条件返回租金，出售单价，出售总价
        fydAutoInquiry:"{baseUrl}/fish/api/v3/fgg/getInquiry?cityName={cityName}&filter={filter}&houseType={houseType}&area={area}&userId={userId}&token={token}",//自动询价
        weixinNotice:"http://www.718bank.com/api/v5/weixin/message/template"
    },
    apiMasterUrl:{
        inquirySave:"{baseUrl}/api/rest/fyd/inquiry/save",//post方式提交数据
        inquirylist:"{baseUrl}/api/rest/fyd/inquiry/list/{page}/{count}?userId={userId}",//get 询价列表
        inquiryDetail:"{baseUrl}/api/rest/fyd/inquiry/getById/{id}",//询价详情
        inquiryReport:"{baseUrl}/api/rest/fyd/inquiry/inquiryReport/{id}",//GET 报单接口
        getId:"{baseUrl}/api/rest/wechat/getIdByWeChatIdAndOpenId/{weChatId}/{openId}",//get 获取user_center_id
        getData:"{baseUrl}/api/rest/wechat/getFydChannelOpenIdByWeChatIdAndOpenId/{weChatId}/{openId}",//get 根据openId获取userid和channelOpenId
        sms:"{baseUrl}/api/rest/fyd/channel/sms/{channelId}",//post 用户中心根据channelId发送短信
        complaint:"{baseUrl}/weixin/message/template",//提交投诉反馈
        getAccessToken:"{baseUrl}/weixin/accessToken/get",//获取accessToken
        findAll:"{baseUrl}/api/rest/fyd/channel/findAll",//查询全部渠道信息
        quickLogin:"{baseUrl}/api/rest/userLogin/quickLogin4Fyd?openId={openId}",//快速登录接口
        fydLogin:"/api/rest/userLogin/fydLogin",//房毅贷登录接口
        save4Fyd:"/api/rest/userInfo/save4Fyd",//经纪人注册
        save:"/api/rest/fyd/dealerext/save",//经纪人认证
        fydResetPwd:"/api/rest/userInfo/fydResetPwd",//用户重置密码
        sendCaptcha:"/sms/sendCaptcha?",//发送短信验证码
        bindUserId:"/api/rest/wechat/save",//将userId与openId进行绑定
        getResidentialArea:"http://api.baseinfo.yunfangdata.com/{cityName}/{filter}/ResidentialArea?key_id={key_id}&access_signature={access_signature}&time_stamp={time_stamp}",//模糊查询小区信息
        getInquiry:"http://api.xunjia.yunfangdata.com/{cityName}/{houseType}/{area}/{filter}/InquiryResults?key_id={key_id}&access_signature={access_signature}&time_stamp={time_stamp}",//根据条件返回租金，出售单价，出售总价
        fydAutoInquiry:"{baseUrl}/fish/api/v3/fgg/getInquiry?cityName={cityName}&filter={filter}&houseType={houseType}&area={area}&userId={userId}&token={token}",//自动询价
        weixinNotice:"http://www.718bank.com/api/v5/weixin/message/template"
    },
    weixinApi:{
        appId:null,
        appSecret:null,
        url:{
            token:"https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={appId}&secret={appSecret}",
            ticket:"https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token={access_token}&type=jsapi",
            downloadImg:"http://file.api.weixin.qq.com/cgi-bin/media/get?access_token={access_token}&media_id={media_id}"
        },
        access_token:null,
        jsapi_ticket:null,
        noncestr:null,
        timestamp:null,
        app_secret:null,
        registerTime:null,//注册时间 单位毫秒
        InvalidTime:null//失效时间 单位毫秒
    },
    fangGuGu:{
        userAccessKey:"bbb42e419584406bb779e5e48fdfbb85",
        userKeyId:"188902d634eb4add9f43bf93a1a46bbe"
    },
    redisUrl:"10.4.33.251",
    redisPort:6379,
    client:null
};
module.exports=urlList;