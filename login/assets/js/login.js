$(function(){
    //点击“注册”的链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击“去登录”的链接
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })


    //从layUI中获取form对象
    let form = layui.form
    let layer = layui.layer

    form.verify({

        required: function(value){
            if(value === ""){
                return 'Required item cannot be blank.'
            }
        },

        number: function(value){
            if(!value || isNaN(value)) return 'Numbers only'
        },

        phoneNumber:[/^[1][3,4,5,7,8,9][0-9]{9}$/,'Please enter the correct phone number.'],

        pwd:[/^[\S]{6,12}$/,'The password must be 6 to 12 digits and no spaces are allowed.'],

        repwd: function(value){

            if($("#password").val() !== value){
                return 'The twice importations of passwords are inconsistent！'
            }
        },

        email: [
            /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,'The mailbox format is incorrect'
        ]

    })

    //监听注册表单的提交事件

    $('#form_reg').on('submit', function(e){
        //阻止默认的提交行为
        e.preventDefault();
        
        let data = { phoneNumber: $('#form_reg [name=id]').val(), username:$('#form_reg [name=username]').val(), password:$('#form_reg [name=password]').val()}

        //发起AJAX请求
        $.post('/register', data ,function(result){
            
            //注册失败
            if(result === 'failed'){
                return layer.msg('Registration failed, this ID already exists!')
            }

            //注册成功
            layer.msg('Registration success!')
            
            //模拟点击事件，返回登录
            $('#link_login').click()

        })
    })


    //监听登录表单的提交事件
    $('#form_login').submit(function(e){
        //阻止默认提交行为
        e.preventDefault()
        
        $.ajax({
            url: '/login',
            method: 'POST',

            //快速获取表单数据
            data:$(this).serialize(),

            success: function(result){

                //登录失败
                if(result === 'failed'){
                    return layer.msg('Login failed!')
                }

                //登录成功
                layer.msg('Login Success!')

                //跳转到主页
                //location.href = ''
            }
        })

    })


})



