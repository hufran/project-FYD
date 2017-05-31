/**
 * Created by chen on 2017/2/22.
 */
var Event=require("../util/event");
var util=require("../util/util");
var urlHandle=require("../util/urlHandle");
var path=require("path");
var fs=require("fs");
var jsSHA = require('jssha');
var crypto=require("crypto");
var urlList=urlHandle.getBaseUrl();
var baseUrl=urlList.baseUrl;
var weixinUrl=urlList.baseWeixinUrl;
var api=urlHandle.apiUrl;

function inquiryModel(){
    Event.call(this,arguments);
    var self=this;
    return {
        index:function(req,res,next){
            var userSource=util.checkDeviceType(req);
            self.eventEmitter.addListener("userData",function(resValue){
                if(resValue&&resValue.data){
                    var userId=resValue.data.userId;
                    var data={
                        title:"房产询价",
                        status:0,
                        data:{
                            openId:resValue.openId,
                            userId:userId,
                            channelOpenId:resValue.data.channel.channel.openId,
                            userSource:userSource
                        }
                    };
                    self.eventEmitter.emit("inquiry",data);

                }else{
                    self.eventEmitter.emit("error",res);
                }
            });
            this.getUserData(req,res,next);

        },
        autoInquiry:function(req,res,next){
            var userSource=util.checkDeviceType(req);
            self.eventEmitter.addListener("userData",function(resValue){
                if(resValue&&resValue.data){
                    var userId=resValue.data.userId;
                    var data={
                        title:"自动询价",
                        status:0,
                        data:{
                            openId:resValue.openId,
                            userId:userId,
                            channelOpenId:resValue.data.channel.channel.openId,
                            userSource:userSource
                        }
                    };
                    self.eventEmitter.emit("inquiryAuto",data);

                }else{
                    self.eventEmitter.emit("error",res);
                }
            });
            this.getUserData(req,res,next);
        },
        autoInquirySuccess:function(req,res,next){
            //询价成功
            var resValue = req.query;
            self.eventEmitter.addListener("userData",function(datas){
                resValue.totalPrice=resValue.totalPrice||0;
                resValue.morga=resValue.morga||0;
                var data={
                    title:"询价结果",
                    status:0,
                    type:0,
                    data:{
                        openId:resValue.openId,
                        totalPrice:resValue.totalPrice,
                        id:resValue.id,//询价Id
                        morga:resValue.morga,//一抵余额
                        housingType:resValue.housingType
                    }
                };
                self.eventEmitter.emit("autoSuccess",data);
            });

            this.getUserData(req,res,next);
        },
        inquirySuccess:function(req,res,next){
            //询价成功
            var data={
                title:"询价成功",
                status:0,
                type:0
            };
            self.eventEmitter.emit("success",data);
        },
        declarationSuccess:function(req,res,next){
            //报单成功
            var data={
                title:"报单成功",
                status:0,
                type:1
            };
            self.eventEmitter.emit("success",data);
        },
        complainSuccess:function(req,res,next){
            //投诉提交成功
            var data={
                title:"投诉提交成功",
                status:0,
                type:2
            };
            self.eventEmitter.emit("success",data);
        },
        procedure:function(req,res,next){
            //流程指南
            var data={
                title:"流程指南",
                status:0,
                type:0,
                data:{}
            };
            self.eventEmitter.emit("guide",data);
        },
        detailList:function(){
            //资料清单
            var data={
                title:"资料清单",
                status:0,
                type:1,
                data:{}
            };
            self.eventEmitter.emit("guide",data);
        },
        complaint:function(req,res,next){
            self.eventEmitter.addListener("userData",function(resValue){
                if(resValue&&resValue.data){
                    var userId=resValue.data;console.log("userId:",userId);
                    var data={
                        title:"投诉反馈",
                        data:{
                            openId:resValue.openId,
                            managerId:resValue.data.managerId,
                            channelOpenId:resValue.data.channel.channel.openId
                        },
                        status:0,
                        type:2
                    };
                    self.eventEmitter.emit("guide",data);

                }else{
                    self.eventEmitter.emit("error",res);
                }
            });
            this.getUserData(req,res,next);

        },
        inquiryList:function(req,res,next){
            /*询价列表*/
            /*var cookies=util.cookieParse(req,res);*/
            self.eventEmitter.addListener("userData",function(resValue){
                if(resValue&&resValue.data){
                    var userId=resValue.data;
                    var data={
                        status:0,
                        title:"我的询价",
                        data:{
                            openId:resValue.openId,
                            channelOpenId:resValue.data.channel.channel.openId,
                            type:0//0代表是询价列表页
                        }
                    };
                    self.eventEmitter.emit("inquiryData",data);

                }else{
                    self.eventEmitter.emit("error",res);
                }
            });
            this.getUserData(req,res,next);
        },
        inquiryDetail:function(req,res,next){
            /*询价详情*/
            var id=req.query.id;
            if(typeof id!="undefined"&&id.length>0){
                self.eventEmitter.addListener("userData",function(resValue){
                    if(resValue&&resValue.data){
                        var userId=resValue.data.userId;
                        var param={
                            url:api.inquiryDetail,
                            urlParam:{baseUrl:baseUrl,id:id},
                            method:"GET"
                        };console.log("userId:"+userId);
                        util.createRequest(param,function(error, response, data){
                            var resData=JSON.parse(data);console.log("successData:",resData);
                            if(!error&&resData.status==0){
                                var data={
                                    title:"询价详情",
                                    data:{}
                                };
                                if(resData.data&&typeof resData.data.id!="undefined"&&resData.data.id>0){
                                    delete resData.data.userInfo;
                                    delete resData.data.fydChannel;
                                    data.data=resData.data;
                                    data.data.type=1;//表示询价详情页面
                                    data.data.version=urlHandle.version;
                                    data.data.openId=resValue.openId;//传递回openId
                                    data.data.channelOpenId=resValue.data.channel.channel.openId;//传递回客户经理的openId
                                }

                                self.eventEmitter.emit("inquiryData",data);
                            }
                        })

                    }
                });
                this.getUserData(req,res,next);

            }else{
                self.eventEmitter.emit("error",res);
            }


        },
        declarationForm:function(req,res,next){
            var loanAmount=parseFloat(req.query.loanAmount);
            var id=req.query.id;
            if(typeof loanAmount!="undefined"&&loanAmount>0&&typeof id!="undefined"&&id.length>0){
                self.eventEmitter.addListener("userData",function(resValue){
                    if(resValue&&resValue.data){
                        var userId=resValue.data.userId;
                        var data={
                            title:"报单",
                            status:0,
                            data:{
                                openId:resValue.openId,
                                channelOpenId:resValue.data.channel.channel.openId,
                                loanAmount:loanAmount,
                                id:id
                            }
                        };
                        self.eventEmitter.emit("taxationData",data);

                    }
                });
                this.getUserData(req,res,next);
            }else{
                self.eventEmitter.emit("error",res);
            }

        },
        queryList:function(req,res,next){
            var page=req.query.page||0;
            var count=req.query.count||10;
            self.eventEmitter.addListener("userData",function(datas){
                if(datas&&datas.data){
                    var userId=datas.data.userId;
                    var param={
                        url:api.inquirylist,
                        urlParam:{baseUrl:baseUrl,page:page,count:count,userId:userId},
                        method:"GET"
                    };
                    util.createRequest(param,function(error, response, data){
                        var resValue=JSON.parse(data);
                        if(!error&&resValue.status==0){
                            var dataList={
                                title:"我的询价",
                                data:{
                                    openId:datas.openId,
                                    channelOpenId:datas.data.channel.channel.openId,
                                    totalPages:resValue.data.totalPages
                                }
                            };
                            var contentList=resValue.data.content;
                            dataList.data.content=[];
                            if(contentList.length>0){
                                var length=contentList.length;
                                for(var i=0;i<length;i++){
                                    dataList.data.content[i]=contentList[i];
                                    delete dataList.data.content[i]["userInfo"];
                                    delete dataList.data.content[i]["fydChannel"];
                                }
                            }

                            res.send(dataList);

                        }else{
                            self.eventEmitter.emit("error",res);
                        }
                    });

                }else{
                    self.eventEmitter.emit("error",res);
                }
            });
            this.getUserData(req,res,next);
        },
        save:function(req,res,next){
            /*房本状态请求接口*/
            var userSource=util.checkDeviceType(req);
            self.eventEmitter.addListener("userData",function(resValue){
                if(resValue&&resValue.data){
                    var userId=resValue.data.userId;
                    var channelOpenId=resValue.data.channel.channel.openId;
                    var headers=req.headers;

                    console.log("headers:",headers);
                    console.log("req.body:",req.body);
                    console.log("pic:",req.files);

                    var form={
                        userId:userId,
                        userSource:userSource,
                        roomAddress:req.body.roomAddress,
                        areaName:req.body.areaName,
                        housingArea:req.body.housingArea,
                        housingType:req.body.housingType,
                        housingMortgage:req.body.housingMortgage,
                        loanLimitMin:Number(req.body.loanLimitMin),//增加最小贷款
                        loanLimitMax:Number(req.body.loanLimitMax),//贷款额度最大值
                        mortgageAmount:req.body.mortgageAmount
                    };
                    console.log("提交的最小值和最大值…………………………………………");
                    console.log(form)
                    for(var key in form){
                        if(!form[key]){
                            delete form[key];
                        }
                    }
                    var filePath;
                    if(req.files.pic){
                        //表单方式上传的文件
                        console.log("表单方式上穿");
                        form.pic=fs.createReadStream(req.files.pic.path);
                    }else if(req.body.serverId){
                        //微信上传的文件
                        console.log("微信上传文件");
                        var options={
                            url:urlHandle.weixinApi.url.downloadImg,
                            urlParam:{access_token:urlHandle.weixinApi.access_token,media_id:req.body.serverId},
                            method:"GET"
                        };

                        util.createSyncRequest(options,function(data){
                            var status=data.getBody().toString();
                            if(status.errcode==40001||status.errcode==40002){
                                var optionsList={
                                    url:api.getAccessToken,
                                    urlParam:{baseUrl:weixinUrl},
                                    method:"GET"
                                };
                                util.createRequest(optionsList,function(error, response, data){
                                    var resValue=JSON.parse(data);console.log("resValue:",resValue);
                                    if(!error&&resValue.data.token){
                                        urlHandle.weixinApi.access_token=resValue.data.token;
                                    }
                                });
                            }else{
                                var headers=data.headers;console.log("datas:",headers);
                                if(headers&&headers["content-disposition"]){
                                    var fileName=(new Date().getTime().toString())+eval(headers["content-disposition"].split("filename=")[1]);console.log("fileName:",fileName);
                                    var pathUrl=path.join(urlHandle.getBaseUrl().path,'/public/temp/');
                                    console.log("pathUrl:",pathUrl);
                                    if(!fs.existsSync(pathUrl)){
                                        fs.mkdirSync(pathUrl);
                                    }
                                    var imgData=new Buffer(data.getBody(),'binary');
                                    filePath=path.join(pathUrl,fileName);
                                    fs.writeFileSync(filePath,imgData);
                                    console.log("The file was saved!");
                                    form.pic=fs.createReadStream(filePath);
                                }
                            }
                        });
                    }
                    console.log("serverId:",req.body.serverId);
                    var param={
                        url:api.inquirySave,
                        urlParam:{baseUrl:baseUrl},
                        method:"POST",
                        headers:{
                            'User-Agent': 'request'
                        },
                        formData:form
                    };
                    console.log("param:",param);
                    util.createRequest(param,function(error, response, data){
                        console.log("resValue:",data);
                        if(typeof filePath!="undefined"&&req.body.serverId){
                            fs.unlinkSync(filePath,function(error){
                                if(error){
                                    console.log(error);
                                }
                                console.log("删除成功！");
                            });
                        }
                        var resValue=JSON.parse(data);
                        if(!error&&resValue.status==0){
                            if(resValue.data==null){
                                resValue.data={};
                            }
                            resValue.data.openId=resValue.openId;
                        }
                        res.send(JSON.stringify(resValue));

                    });

                }else{
                    res.send({status:1});//参数错误
                }
            });
            this.getUserData(req,res,next);
        },
        wxApi:function(req,res,next){
            /*微信api调用生成参数的接口*/
            var url=req.body.url;
            var time=new Date().getTime();
            url=url.split('#')[0];

            if(urlHandle.weixinApi.access_token==null||urlHandle.weixinApi.InvalidTime==null||urlHandle.weixinApi.jsapi_ticket==null||urlHandle.weixinApi.app_secret==null||time>urlHandle.weixinApi.InvalidTime){

                var options={
                    url:api.getAccessToken,
                    urlParam:{baseUrl:weixinUrl},
                    method:"GET"
                };
                var data={};
                util.createRequest(options,function(error, response, data){
                    var resValue=JSON.parse(data);console.log("resValue:",resValue);
                    if(!error&&resValue.data.token){
                        urlHandle.weixinApi.access_token=resValue.data.token;
                        urlHandle.weixinApi.registerTime=new Date().getTime();
                        urlHandle.weixinApi.InvalidTime=urlHandle.weixinApi.registerTime+(7200*1000);
                        var param={
                            url:urlHandle.weixinApi.url.ticket,
                            urlParam:{access_token:resValue.data.token},
                            method:"GET"
                        };
                        util.createRequest(param,function(err, resp, datas){
                            datas=JSON.parse(datas);console.log("ticket:",datas.ticket);
                            if(!error&&datas.ticket){
                                urlHandle.weixinApi.jsapi_ticket=datas.ticket;
                                urlHandle.weixinApi.noncestr=Math.random().toString(36).substr(2, 15);
                                urlHandle.weixinApi.timestamp=parseInt(new Date().getTime() / 1000) + '';
                                var app_secret="jsapi_ticket="+urlHandle.weixinApi.jsapi_ticket+"&noncestr="+urlHandle.weixinApi.noncestr+"&timestamp="+urlHandle.weixinApi.timestamp+"&url="+url;
                                console.log("app_secret:",app_secret);
                                urlHandle.weixinApi.app_secret=new jsSHA(app_secret, 'TEXT').getHash('SHA-1', 'HEX');//crypto.createHash('sha1').update(app_secret).digest('hex');
                                console.log("name:",urlHandle.weixinApi.app_secret);
                                data={
                                    status:0,
                                    appId:urlHandle.weixinApi.appId,
                                    jsapi_ticket:urlHandle.weixinApi.jsapi_ticket,
                                    noncestr:urlHandle.weixinApi.noncestr,
                                    timestamp:urlHandle.weixinApi.timestamp,
                                    app_secret:urlHandle.weixinApi.app_secret
                                };

                                res.send(data);

                            }else{
                                data.status=1;
                                res.send(data);
                            }

                        });
                    }else{
                        data.status=1;
                        res.send(data);

                    }
                });
            }else{

                urlHandle.weixinApi.noncestr=Math.random().toString(36).substr(2, 15);
                urlHandle.weixinApi.timestamp=parseInt(new Date().getTime() / 1000) + '';
                var app_secret="jsapi_ticket="+urlHandle.weixinApi.jsapi_ticket+"&noncestr="+urlHandle.weixinApi.noncestr+"&timestamp="+urlHandle.weixinApi.timestamp+"&url="+url;
                console.log("app_secret:",app_secret);
                urlHandle.weixinApi.app_secret=new jsSHA(app_secret, 'TEXT').getHash('SHA-1', 'HEX');
                console.log("name:",urlHandle.weixinApi.app_secret);
                var data={
                    status:0,
                    appId:urlHandle.weixinApi.appId,
                    jsapi_ticket:urlHandle.weixinApi.jsapi_ticket,
                    noncestr:urlHandle.weixinApi.noncestr,
                    timestamp:urlHandle.weixinApi.timestamp,
                    app_secret:urlHandle.weixinApi.app_secret
                };

                res.send(data);

            }
        },
        inquiryReport:function(req,res,next){
            //报单操作
            var userName=decodeURIComponent(req.query.userName);
            var loanAmount=req.query.loanAmount;
            var id=req.query.id;
            if(typeof userName !="undefined"&&userName.length>0&&typeof loanAmount !="undefined"&&loanAmount.length>0){
                var options={
                    url:api.inquiryReport,
                    urlParam:{baseUrl:baseUrl,id:id},
                    method:"POST",
                    form:{
                        loanAmount:loanAmount,
                        customerName:userName
                    }
                };
                util.createRequest(options,function(err, resp, datas){
                    var resValue=JSON.parse(datas);
                    res.send(resValue);
                });
            }else{
                res.send({status:1});//参数错误
            }
        },
        complaintSave:function(req,res,next){
            //投诉反馈保存
            var openId=req.body.channelOpenId,content=req.body.content;
            if(openId&&content){
                var options={
                    url:api.sms,
                    urlParam:{baseUrl:baseUrl,channelId:openId},
                    method:"POST",
                    form:{
                        content:content
                    }
                };
                util.createRequest(options,function(err,resp, datas){
                    var resValue=JSON.parse(datas);
                    res.send(resValue);
                });
            }

        },
        noticeManager:function(req,res,next){
            var openId=req.body.openId,content=req.body.content;
            console.log("openId:",openId,"content:",content);
            if(openId&&content){
                var options={
                    url:api.weixinNotice,
                    method:"POST",
                    form:{
                        openId:openId,
                        content:content
                    }
                };
                util.createRequest(options,function(err,resp, datas){
                    var resValue=JSON.parse(datas);
                    res.send(resValue);
                });
            }else{
                res.send({status:1,message:"参数错误"});
            }
        },
        getUserData:function(req,res,next){
            var openId=req.query.openId;
            console.log("openId:",openId);
            var weChatId=1;//1代表房毅贷
            if(typeof openId!="undefined"&&openId.length>0){
                var options={
                    url:api.quickLogin,
                    urlParam:{baseUrl:baseUrl,weChatId:weChatId,openId:openId},
                    method:"GET"
                };
                util.createRequest(options,function(err, resp, datas){
                    datas=JSON.parse(datas);console.log("userId:",datas);
                    if(!err&&datas.status==0&&datas.data&&datas.data.userId&&datas.data.channel&&datas.data.channel.channel&&datas.data.channel.channel.openId){
                        datas.openId=openId;//把openID传递到下一个页面
                        self.eventEmitter.emit("userData",datas);
                    }else{
                        res.redirect("./../login/?openId="+openId+"&wechatId=1");
                    }
                    self.eventEmitter.removeAllListeners("userData");
                });
            }else{
                console.log("openId不存在！!!!!!!!!!!");
                self.eventEmitter.emit("error",res);
            }

        },
        getAutograph:function(req,res,next){
            //房咕咕签名计算规则
            console.log(req.query);
            var cityName=req.query.cityName,filter=req.query.filter,houseType=req.query.houseType,area=req.query.area,requestApi;
            console.log("cityName:",cityName," filter:",filter," houseType:",houseType," area:",area);
            if((cityName&&filter)||(cityName&&filter&&houseType&&area)){
                cityName=encodeURIComponent(cityName);
                filter=encodeURIComponent(filter);
                houseType=encodeURIComponent(houseType);
                area=encodeURIComponent(area);
                console.log("进入");
                //房咕咕接口请求所必需的的参数
                var KEY_ID=urlHandle.fangGuGu.userKeyId,AKEY=urlHandle.fangGuGu.userAccessKey;
                var arrSig=[],timeStamp=new Date().getTime();
                console.log(timeStamp);
                //组装参数
                /*arrSig.push({"area":area});
                arrSig.push({"city_name":cityName});
                arrSig.push({"filter":filter});*/
                arrSig.push({"time":timeStamp});
                /*arrSig.push({"house_type":houseType});*/
                arrSig.push({"userKeyId":KEY_ID});

                //key字典排序
                arrSig.sort(function(key,key1){
                    var a,b;
                    for(var item in key){
                        a=item;
                    }
                    for(var item1 in key1){
                        b=item1;
                    }
                    if(a>b){
                        return 1;
                    }else if(a==b){
                        return 0;
                    }else if(a<b){
                        return -1;
                    }
                });

                var strSig="";
                for(var i= 0,len=arrSig.length;i<len;i++){
                    for(var key in arrSig[i]){
                        if((key==="area")&&(key==="house_type")&&arrSig[i][key]){
                            requestApi=1;//根据条件返回租金，出售单价，出售总价
                        }else{
                            requestApi=0;//根据小区名称模糊查询小区信息，返回相应小区名称和地址
                        }
                        if((key==="area"&&!arrSig[i][key])||(key==="house_type"&&!arrSig[i][key])){
                        }else{
                            strSig+=util.percentEncode(key)+"="+util.percentEncode(arrSig[i][key]);
                            if(i!=(len-1)){
                                strSig+="&";
                            }
                        }
                    }
                }
                console.log("houseType");
                console.log(houseType == 'undefined');
                if(houseType!='undefined'&& area != 'undefined'){
                    requestApi = 1;
                }
                console.log(requestApi)
                var stringSig="Post"+"&"+util.percentEncode("/")+"&"+util.percentEncode(strSig);
                //生成签名
                var strKeySecret=AKEY+"&";
                var strSign=crypto.createHmac('SHA1',strKeySecret).update(stringSig,'utf8').digest('base64');
                console.log("转义前 strSign:",strSign);
                strSign=encodeURIComponent(strSign);

                if(requestApi){
                    //根据条件返回租金，出售单价，出售总价
                    console.log("条件返回租金");
                    var options={
                        url:api.getInquiry,
                        urlParam:{
                            cityName:cityName,
                            houseType:houseType,
                            area:area,
                            filter:filter,
                            key_id:KEY_ID,
                            access_signature:strSign,
                            time_stamp:timeStamp
                        },
                        method:"GET"
                    };
                }else{
                    //根据小区名称模糊查询小区信息，返回相应小区名称和地址
                    console.log("根据小区名称模糊查询小区信息");
                    var options={
                        url:api.getResidentialArea,
                        urlParam:{
                            cityName:cityName,
                            filter:filter,
                            key_id:KEY_ID,
                            access_signature:strSign,
                            time_stamp:timeStamp
                        },
                        method:"GET"
                    };
                }
                util.createRequest(options,function(err, resp, datas){
                    try{
                        var resValue=JSON.parse(datas);
                    }catch(error){
                        var resValue=datas;
                    }
                    console.log("resValue:",resValue);
                    res.send(resValue);
                });
            }else{
                res.send({status:1,msg:"参数错误"});
            }
        }
    }
}
util.inherits(inquiryModel,Event);
var inquiry=new inquiryModel();
module.exports=inquiry;