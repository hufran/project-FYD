var outerBasicUrl = "http://www.718bank.com/h5";
//var outerBasicUrl = "http://61.50.101.198:10038/h5";
var nginxUrl='/xyjrpc';
var base718="http://www.718bank.com";
function strToJson(str){
    return JSON.parse(str);
}
var cookieFn={
	setCookie:function (objName, objValue, objHours){//添加cookie 
        var str = objName + "=" + escape(objValue); 
        if (objHours > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失 
            var date = new Date(); 
            var ms = objHours * 3600 * 1000; 
            date.setTime(date.getTime() + ms); 
            str += "; expires=" + date.toGMTString(); 
        }
        console.log(str+"; path=/"); 
        document.cookie = str+"; path=/";
    },
        
    getCookie:function (objName){//获取指定名称的cookie的值 
        var arrStr = document.cookie.split("; "); 
        for (var i = 0; i < arrStr.length; i++) { 
            var temp = arrStr[i].split("="); 
            if (temp[0] == objName) 
                return unescape(temp[1]); 
        } 
    },   
    cleanCookie:function (name){//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间 
        var date = new Date(); 
        date.setTime(date.getTime() - 10000);
        document.cookie=name+"=; expire="+date.toGMTString()+"; path=/";
    }
}
var downLoadApp={
    isWeiXin:function (){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }else{
            return false;
        }
    },

    goIOSDownload:function (){
        if (downLoadApp.isWeiXin()){
            document.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.creditcloud.xinyi";
        }
        else{
            document.location.href = "https://itunes.apple.com/us/app/718li-cai-kan-bi-yin-xing/id1071995825?l=zh&ls=1&mt=8";
        }
    },

    goAndroidDownload:function (){
        if (downLoadApp.isWeiXin()){
            document.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.creditcloud.xinyi";
        }
        else{
            document.location.href = "http://www.718bank.com/ccc/app/zc.apk";
        }
    }
}
function isEmail(str){ 
var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
return reg.test(str); 
}
//去掉confirm弹出框的网址
window.confirm = function (message) {
    var iframe = document.createElement("IFRAME");
    iframe.style.display = "none";
    //iframe.setAttribute("src", 'data:text/plain,');
    iframe.setAttribute("src", '1111,');
    document.documentElement.appendChild(iframe);
    var alertFrame = window.frames[0];
    var result = alertFrame.window.confirm(message);
    iframe.parentNode.removeChild(iframe);
    return result;
};
//去掉alert弹出框的网址
window.alert = function(name){
    var iframe = document.createElement("IFRAME");
    iframe.style.display="none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
};
//获取url中参数
function GetRequest(){
    var indexq = location.href.indexOf("?");
    if(indexq!=-1){
        var url = location.href.substr(indexq);
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }else{
        //console.log("没有参数");
        return "";
    }
}
//链接h5的页面的地址
var outerLink = 'http://10.4.33.251:4000/';
