var assert=require("assert");
var crypto=require("crypto");

function square(a){
  return a*a;
}
assert.equal(square(4),16,"square()方法测试失败！");

function User(fields){
    this.fields=fields;
}

User.prototype.save=function (cb) {
    process.nextTick(cb);
};

User.prototype.signIn=function(password){
    var shasum=crypto.createHash('sha1');
    shasum.update(password);
    return shasum.digest('hex')===this.fields.hashed_password;
};
describe('user model',function(){
   describe('sign in',function(){
       var user=new User({
           email:'alex@example.com',
           hashed_password:'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3'
       });

       before(function(done){
           user.save(done);
       });
       it('should accept the correct password',function(){
           assert(user.signIn('test'));
       });
       it('should not accept the wrong password',function(){
           assert.equal(user.signIn('wrong'),false);
       });
   })
});
