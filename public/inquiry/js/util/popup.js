/**
 * Created by Administrator on 2017/2/28.
 * 弹窗组件
 * 数据传递字段
 * var data = {
    'title':'hello',
    'body':'<div class="title">asjfasjfdlaks</div>',
    'hasOverLay':false,
    'btns':[
        {href:"javascript:void(0)" ,"data-type":"sure",class:[classA,classB],text:"确定"}，
        {href:"javascript:void(0)" ,"data-type":"cancel",class:[classA,classB],text:"取消"}，
    ],
    'closeCallBack':function(){
    }//关闭回调函数
 };
 */
(function(global){
    var tmpl= "<div class='popup_container' ng-style='containerSize'>" +
        "<div class='popup_title'>" +
        "<span class='title_name'>提示</span><a class='close_btn' href='javascript:void(0)'>关闭</a>" +
        "</div>" +
        "<div class='popup_content'></div>" +
        "<div class='popup_btnGroup'>" +
        "</div>" +
        "</div>" +
        "<div class='overlayer'></div>";
    function bind(fn, selfObj){
        if (fn.bind) {
            return fn.bind(selfObj);
        } else {
            return function () {
                fn.apply(selfObj, arguments);
            }
        }
    }
    var popUp=function(){
        this.options = {};//选项集
        this.options.width = 0;//宽度，可选
        this.options.height = 0;//高度,可选
        this.options.hasOverLay = false;//是否有遮罩层,可选
        this.options.title = "";//头部名称可选，可为空
        this.options.hasTitle=true;//是否显示弹窗头部信息 可选
        this.options.hasCloseBtn = true;//是否有关闭按钮 可选
        this.options.body = "";//body部分的结构，可以定制
        this.options.btns = [];//按钮列表
        this.options.closeCallBack = null;//关闭的回调
        this.element=null;
        this.titleEle=null;
        this.containerEle=null;
        this.contentEle=null;
        this.closeBtn=null;
        this.overLayerEle=null;//遮罩层
        this.btnGroupEle=null;//按钮组
        this.sureCallback=null;
        this.cancelCallback=null;
    };

    /*
     * 设置参数
     * */
    popUp.prototype.setConfig=function(param){
        var key;
        for(key in param){
            if(param[key]!==this.options[key]){
                this.options[key]=param[key];
            }
        }
    };
    /*
    *当数据变化时重新渲染页面
    * */
    popUp.prototype.again=function(param){
        this.setConfig(param);
        this.render();
        this.countYPos();
        this.sureCallback=null;
        this.cancelCallback=null;
        return this;
    };
    /*
     *创建元素
     */
    popUp.prototype.create=function(){
        this.render();
        this.countYPos();
        return this;
    };
    /*
     *渲染弹出框
     * */
    popUp.prototype.render=function(){
        this.options.width=this.options.width||10.3125;
        this.options.height=this.options.height||7.546875;
        this.containerEle.style.width=this.options.width+'rem';
        this.containerEle.style.height=this.options.height+'rem';
        if(!this.options.hasOverLay){
            this.overLayerEle.style.display="none";
        }
        if(this.options.hasTitle){
            this.titleEle.innerHTML=this.options.title;
            if(!this.options.hasCloseBtn){
                this.closeBtn.style.display="none";
            }
        }else{
            this.titleEle.style.display="none";
        }

        if(this.options.body!==''){
            this.contentEle.innerHTML=this.options.body;
        }

        if(this.options.btns.length>0){
            var html="",text="";
            for(var i=0;i<this.options.btns.length;i++){
                html+="<a ";
                for(var key in this.options.btns[i]){
                    if(key=="class"){
                        html+="class='";
                        for(var j= 0,length=this.options.btns[i][key].length;j<length;j++){
                            html+=this.options.btns[i][key][j]+" ";
                        }
                        html+="' ";
                    }else if(key=="text"){
                        text=this.options.btns[i][key];
                    }else{
                        html+=key+"= '"+this.options.btns[i][key]+"' ";
                    }
                }
                html+=">"+text+"</a>";
            }

            this.btnGroupEle.innerHTML=html;
        }
        this.btnGroupEle.addEventListener('click',bind(this.btnClickHandle,this));
        this.closeBtn.addEventListener('click',bind(this.hide,this));
    };
    /*
     * 计算y轴的位置，使弹出窗口保持垂直居中
     * */
    popUp.prototype.countYPos=function(){
        if(this.options.height===""){
            var dot=parseFloat(document.documentElement.style.fontSize);
            this.options.height=parseFloat(this.containerEle.clientHeight/dot);
        }
        //px与rem转化
        this.containerEle.style.marginTop='-'+parseInt(this.options.height)/2+'rem';
        this.containerEle.style.marginLeft='-'+parseInt(this.options.width)/2+'rem';
    };
    popUp.prototype.show=function(){
        this.element.style.display="block";
        return this;
    };
    popUp.prototype.hide=function(){
        this.element.style.display="none";
        return this;
    };
    popUp.prototype.sure=function(fn){
        this.sureCallback = fn;
        return this;
    };
    popUp.prototype.cancel=function(fn){
        this.cancelCallback=fn;
        return this;
    };
    popUp.prototype.btnClickHandle=function(event){
        var target=event.target,type=target.getAttribute('data-type');
        switch(type){
            case "sure":
                this.SureHandle();
                break;
            case "cancel":
                this.cancelHandle();
                break;
        }
    };
    popUp.prototype.SureHandle=function(){
        this.hide();
        if(this.sureCallback){
            this.sureCallback();
        }
    };

    popUp.prototype.cancelHandle=function(){
        this.hide();
        if(this.cancelCallback){
            this.cancelCallback();
        }
    };

    popUp.prototype.disposeInternal=function(){
        if(document.querySelector('.popup')==null){
            var ele=document.createElement('div');
            ele.className="popup";
            ele.style.display="none";
            ele.innerHTML=tmpl;
            document.body.appendChild(ele);
        }

        this.element=document.querySelector('.popup');
        this.overLayerEle=this.element.querySelector('.overlayer');
        this.containerEle=this.element.querySelector('.popup_container');
        this.titleEle=this.element.querySelector('.popup_title span');
        this.closeBtn=this.titleEle.nextElementSibling;
        this.contentEle=this.containerEle.querySelector('.popup_content');
        this.btnGroupEle=this.containerEle.querySelector('.popup_btnGroup')
    };

    if(typeof global=="function"){
        define(function(require,exports,module){
            module.exports=new popUp();
        });
    }else{
        global.popUp=new popUp();
    }
})(typeof require!="undefined"?require:window);



