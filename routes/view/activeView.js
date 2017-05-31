/**
 * Created by Administrator on 2017/3/14.
 */
var Event=require('../util/event.js');
var util=require('../util/util');

function activeView(){
    Event.apply(this,arguments);
    var self=this;
    return {
        introduce:function(req,res,next){
            self.eventEmitter.addListener("introduce",function(data){
                self.eventEmitter.removeAllListeners("introduce");
                try{
                    if(data){
                        res.render("./active/introduct",data);
                        return;
                    }
                    return;
                }catch(error){
                    self.eventEmitter.emit("errorAppend");
                }

            });
        },
        license:function(req,res,next){
            self.eventEmitter.addListener("license",function(data){
                self.eventEmitter.removeAllListeners("license");
                try{
                    if(data){
                        res.render("./active/license",data);
                        return;
                    }
                    return;
                }catch(error){
                    self.eventEmitter.emit("errorAppend");
                }

            });
        },
        bank:function(req,res,next){
            self.eventEmitter.addListener("bank",function(data){
                self.eventEmitter.removeAllListeners("bank");
                try{
                    if(data){
                        res.render("./active/bank",data);
                        return;
                    }
                    return;
                }catch(error){
                    self.eventEmitter.emit("errorAppend");
                }

            });
        }
    }
}
util.inherits(activeView,Event);
var active=new activeView();
module.exports=active;