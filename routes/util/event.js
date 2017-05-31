/**
 * Created by chen on 2017/2/22.
 */
var events=require('events');
var eventEmitter = new events.EventEmitter();
/*事件方法*/
function Event(type){
    this.target = null;//事件目标。
    this.type = type;//事件的类型
    this.data = null;//带出数据
    this.extraData = null;//额外数据，例如keycode等等数据，主要用于普通事件
    this.eventEmitter=eventEmitter;
}
module.exports=Event;