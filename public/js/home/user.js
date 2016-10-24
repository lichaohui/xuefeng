$(function(){
    /*----处理用户登录注册的js脚本----*/
    
    /*----点击提交按钮时候通过jquery.form.js插件异步提交表单----*/
    $("#sub").click(function(){
        var name=$('#name').val();
        var password=$('#password').val();
        if(name==''||password==''){
            $("#warning").text('用户名和密码都不能为空').removeClass('hidden');
        }else{
            //如果用户提交的用户名和密码都不为空则通过一个ajax异步提交表单
            //首先将按钮置为不可点击的状态
            $(this).text("请稍后").attr('disabled',true);
            //发送ajax请求异步提交表单数据
            var url=$("#form").attr('action');
            $("#form").ajaxSubmit({
                type:'post',
                url:url,
                success:function(data){
                    if(data.isError){
                        //如果有错误则显示返回的错误信息并将提交按钮重新设置可点击的状态
                        $("#warning").text(data.message).removeClass('hidden');
                        $("#sub").text('register').attr('disabled',false);
                    }else{
                        //如果成功则显示成功信息并进行页面的跳转
                        $("#warning").addClass('hidden');
                        $("#success").text(data.message).removeClass('hidden');
                        setTimeout(function(){window.location.href="/";},2000);
                    }
                },
            });
        }
    });
})