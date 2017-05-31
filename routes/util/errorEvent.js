/**
 * Created by chen on 2017/2/22.
 */
var util=require("./util");
var Event=require("./event");
function errorEvent(){
    Event.apply(this,arguments);
    this.code=null;
}
util.inherits(errorEvent,Event);
var error=new errorEvent();
module.exports=error;