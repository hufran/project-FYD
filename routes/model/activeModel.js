/**
 * Created by chen on 2017/2/22.
 */
var Event=require("../util/event");
var util=require("../util/util");
var urlHandle=require("../util/urlHandle");
var path=require("path");
/*var crypto=require("crypto");*/
var urlList=urlHandle.getBaseUrl();
var baseUrl=urlList.baseUrl;
var api=urlHandle.apiUrl;

function activeModel(){
    Event.call(this,arguments);
    var self=this;
    return {
        introduce:function(req,res,next){
            var data={
                title:"房毅贷产品介绍",
                status:0
            };
            self.eventEmitter.emit("introduce",data);
        },
        license:function(req,res,next){
            var data={
                title:"经营许可证",
                status:0
            };
            self.eventEmitter.emit("license",data);
        },
        bank:function(req,res,next){
            var data={
                title:"银行信息",
                status:0
            };
            self.eventEmitter.emit("bank",data);
        }
    }
}
util.inherits(activeModel,Event);
var active=new activeModel();
module.exports=active;