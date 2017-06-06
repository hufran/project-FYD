//测试用例编写 询价页面测试
var assert=require("assert");
var request=require("supertest");
var app=require('../app');

//自动询价和询价测试
describe("auto inquiry page:",function(){
    this.timeout(6000);
    //验证小区名称
    it("The areaName is required:(should return false)",function(){
        assert.equal(/^.{1,50}$/.test(""),false);
    });
    it("The areaName must be less than 50 Chinese characters:(should return true)",function(){
        assert.equal(/^.{1,50}$/.test("汉字汉字汉字汉字汉字汉字汉字汉字汉字汉字汉字汉字汉字汉字汉字汉字汉字汉字汉字汉字汉字汉字dgdidd"),true);
    });
    //验证小区面积
    it("The floor area must be greater than 0:( '-10>0' should return false)",function(){
        assert.equal(/^((0\.\d{1,2})|([1-9]\d{0,8}(\.\d{1,2})?))$/.test(-10),false);
    });
    it("The floor area must be greater than 0:(value should greater than 0,should return false)",function(){
        assert.equal(/^((0\.\d{1,2})|([1-9]\d{0,8}(\.\d{1,2})?))$/.test(0),false);
    });
    it("The floor area must be greater than 0:('1>0'should return true)",function(){
        assert.equal(/^((0\.\d{1,2})|([1-9]\d{0,8}(\.\d{1,2})?))$/.test(1),true);
    });
    it("The floor area must be greater than 0:('0.3>0'should return true)",function(){
        assert.equal(/^((0\.\d{1,2})|([1-9]\d{0,8}(\.\d{1,2})?))$/.test(0.3),true);
    });
    it("The floor space should be kept at two decimal places:(1.223 should return false)",function(){
        assert.equal(/^((0\.\d{1,2})|([1-9]\d{0,8}(\.\d{1,2})?))$/.test(1.223),false);
    });
    it("The floor space should be kept at two decimal places:(1.22 should return true)",function(){
        assert.equal(/^((0\.\d{1,2})|([1-9]\d{0,8}(\.\d{1,2})?))$/.test(1.22),true);
    });
    it("The floor space should be kept at two decimal places:(188878985.22 should return true)",function(){
        assert.equal(/^((0\.\d{1,2})|([1-9]\d{0,8}(\.\d{1,2})?))$/.test(188878985.22),true);
    });
    //提交询价单
    it("Submit inquiry results:",function(done){
        request(app).post('/inquiry/userCenter/save?openId=sss').send({'roomAddress':"水电费",'areaName':'132','housingArea':'123','housingType':'住宅','housingMortgage':'2','mortgageAmount':'123','userId':'ff8080815b9da909015b9e849fff0021',"userSource":"h5"})
            .set('Content-Type', 'application/x-www-form-urlencoded').end(function(err,res){
                console.log(res.text);
                var data=JSON.parse(res.text);
                console.log("res:",res.text);
                assert.deepEqual(data.msg,"请求成功");
                done();
            });

    });
    //模糊查询小区名称
    it("Fuzzy query cell name",function(done){
        request(app).get('/inquiry/userCenter/strSign?cityName=beijing&filter=s').end(function(err,res){
            var data=JSON.parse(res.text);
            console.log("data:",data);
            assert.deepEqual(data.Success,true);
            done();
        })
    })
});


//登录页面验证
describe("Verify userinfo:",function(){
    this.timeout(6000);
    it("Verify user login interface",function(done){
        request(app).post('/newApi/login').send({"loginName":"15701336587","password":"123456","source":"h5"})
           .set('Content-Type', 'application/x-www-form-urlencoded').end(function(err,res){
            var data=JSON.parse(res.text);
            assert.deepEqual(data.status,0);
            done();
        });
    });
    it("Verify that user name length must not exceed 10 Chinese characters",function(){
        assert.equal(/^[\u4e00-\u9fa5]+((·|•|●)[\u4e00-\u9fa5]+)*$/.test("阿斯蒂芬●是啊•突然·的"),true);
    });
    it("Verify user register interface",function(done){
        request(app).post('/newApi/register').send({name:"阿斯蒂芬●是啊•突然",mobile:"15701336587",password:"123456",captcha:"123456"})
            .set('Content-Type', 'application/x-www-form-urlencoded').end(function(err,res){
                var data=JSON.parse(res.text);
                assert.deepEqual(data.status,1);
                done();
        });
    });
    it("Verify forget password interface",function(done){
        request(app).post("/newApi/forgetPwd").send({"mobile":"15701336587","captcha":"123456","password":"123456","repPwd":"123456"})
        .set('Content-Type','application/x-www-form-urlencoded').end(function(err,res){
            var data=JSON.parse(res.text);
            assert.deepEqual(data.status,0);
            done();
        });
    });
    it("Verify access code interface",function(done){
        request(app).get("/newApi/getCode").send({"mobile":"17100000001"}).set('Content-Type','application/x-www-form-urlencoded')
        .end(function(err,res){
            var data=JSON.parse(res.text);
            assert.deepEqual(data.status,0);
            done();
        });
    });
    it("Verify bind wechat",function(done){
        request(app).post("/newApi/bindWebChat").send({'userCenterId':'ff80808159baf7d9015a45aeee8c0512','weChatId':'1','openId':'ddd'}).set('Content-Type','application/x-www-form-urlencoded')
            .end(function(err,res){
                var data=JSON.parse(res.text);
                console.log("data111:",data);
                assert.deepEqual(data.status,0);
                done();
            });
    })
});

//经纪人认证验证
describe("Broker certification",function(){
    it("");
});