define(['jquery','cookie','form'],function($){
    $(function(){
            $('#userinfo').submit(function(){
                $('#btn').click(function(){
                    $('#userinfo').ajaxSubmit({
                        url:'/api/login',
                        type:'post',
                        success:function(data){
                            console.log(data);
                            if(data.code==200){
                                $.cookie("userinfo",JSON.stringify(data.result),{path:'/'})
                                console.log($.cookie('userinfo'));
                                location.href='/';
                            }

                        },
                        ecrror:function(){
                            console.log(0);
                        }
                    })
                })

                return false;
            })
        })
})

