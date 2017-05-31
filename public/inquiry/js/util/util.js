/**
 * Created by Administrator on 2017/2/21.
 */

     window.utils={
        inherits:function(child,parent){
            child.prototype = new parent();
            child.prototype.constructor = child;
        },
        bind:function(fn, selfObj){
            if (fn.bind) {
                return fn.bind(selfObj);
            } else {
                return function () {
                    fn.apply(selfObj, arguments);
                }
            }
        },
        analyzetpl:function(url,json){
            if(typeof url=="undefined"||typeof json=="undefined"){
                return url;
            }
            return url.replace(/\{(.*?)\}/,function(){
                if(typeof arguments[1]=="undefined"){
                    return ""
                }
                return data[arguments[1]];
            });
        },
        checkDeviceType:function(){
            var useragent=window.navigator.userAgent;
            if(/(\(i[^;]+;( U;)? CPU.+Mac OS X)|ios|iPhone|iPad|mini|iPod/i.test(useragent)){
                return "Ios";
             }else if(/(android|mobile|mobi|Nokia|Symbian|Windows\s+Phone|MQQBrowser|)/i.test(useragent)){
                return "Android";
             }else{
                return "MWeb";
             }
        },
        filterChar:function(str){
            var filterArray=[
                {charName:/\;/g,replaceName:"&#59;"},
                {charName:/,/g,replaceName:"&#44;"},
                {charName:/</g,replaceName:"&#60;"},
                {charName:/>/g,replaceName:"&#62;"},
                {charName:/\./g,replaceName:"&#46;"},
                {charName:/\?/g,replaceName:"&#63;"},
                {charName:/\//g,replaceName:"&#47;"},
                {charName:/\[/g,replaceName:"&#91;"},
                {charName:/\]/g,replaceName:"&#93;"},
                {charName:/\{/g,replaceName:"&#123;"},
                {charName:/\}/g,replaceName:"&#125;"},
                {charName:/\:/g,replaceName:"&#58;"},
                {charName:/\"/g,replaceName:"&#34;"},
                {charName:/\'/g,replaceName:"&#39;"},
                {charName:/\|/g,replaceName:"&#124;"},
                {charName:/\~/g,replaceName:"&#126;"},
                {charName:/\·/g,replaceName:"&#96;"},
                {charName:/\!/g,replaceName:"&#33;"},
                {charName:/\@/g,replaceName:"&#64;"},
                {charName:/\$/g,replaceName:"&#36;"},
                {charName:/\%/g,replaceName:"&#37;"},
                {charName:/\^/g,replaceName:"&#94;"},
                {charName:/\*/g,replaceName:"&#42;"},
                {charName:/\(/g,replaceName:"&#40;"},
                {charName:/\)/g,replaceName:"&#41;"},
                {charName:/\-/g,replaceName:"&#45;"},
                {charName:/\_/g,replaceName:"&#95;"},
                {charName:/\+/g,replaceName:"&#43;"},
                {charName:/\=/g,replaceName:"&#61;"}
            ];
            if(str){
                var length=filterArray.length;
                for (var i=0;i<length;i++){
                    str=str.replace(filterArray[i]["charName"],filterArray[i]["replaceName"]);
                }
                return str;
            }
            return "";
        }
    };
