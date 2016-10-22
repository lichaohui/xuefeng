//引入alidayu组件
var Alidayu=require('alidayujs');

exports.send=function(req,res){
    var config = {
        app_key: '23480557',
        secret: '557e270b07fea683368fd69caf5927c9' 
    };
    var alidayu = new Alidayu(config);
    
    /*
     * 想办法获取一个四位的随机数
     * 想通过Math.random()方法获取一个0到1之间的随机数
     * 该随机数是个位数很长的小数,
     * 类似于0.24952081912742163
     * 然后通过toString()方法将该随机数转为string类型的
     */
    var num=Math.random().toString();
    //将随机数转为string类型之后就可以通过字符串截取的方式获取一个随机的四位数了
    var vcode=num.substr(2,4);
    //将获取到的四位的随机数保存到session中
    req.session.vcode=vcode;
    //将用户手机号也存储到session中以便后期调用
    req.session.phone=req.body.phone;
    
    var options = {
        sms_free_sign_name: '学疯测试',
        sms_param: {
            code: vcode,
        },
        rec_num: req.body.phone, 
        sms_template_code: 'SMS_18210077',
    };
    //发送短信
    alidayu.sms(options,function(result){
        if(result.error_response){
            //如果短息发送失败则打印失败信息
            console.log(result);
        }else{
            //如果短信发送成功则返回提示信息
            res.json({'isError':false,'message':'短信发送成功！','type':'phone','val':req.body.phone});
        }
    });
}