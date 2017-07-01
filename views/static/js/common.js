
define([
    'jquery',
    'template',
    'nprogress',
    'cookie'
], function ($, template,NProgress) {
    //用户没有登录的时候就转跳登录界面
    if(!$.cookie('PHPSESSID')){
        if(location.pathname !='/dashboard/login'){
            location.href='/dashboard/login';
        }
    }
    $( document ).ajaxSend(function(){
        NProgress.start();
    })
    $( document ).ajaxSuccess(function(){
        NProgress.done();
    })
//页面加载侧边栏的用户信息
    $(function () {
    	if('/dashboard/login'!=location.pathname){
			var str = JSON.parse($.cookie('userinfo'));
	        var html = template('userinfo-tpl', str);
	        $('#user').html(html);
    	}
        
    });
        //退出登录功能
     $('#logout').on('click',function(){
        $.ajax({
            url:'/api/logout',
            type:'post',
            success:function(data){
                // console.log(data);
                if(data.code==200){
                    location.href='/dashboard/login'
                }
            }
        })
    })
     //左侧列表点击切换背景色
     var href=location.href;
     var aArr=$('.navs>ul.list-unstyled>li>a');
        aArr.parent().siblings().children('a').removeClass('active');
     for(var i=0;i<aArr.length;i++){
        var target=aArr[i];
        if(href==target.href){
            $(target).addClass('active');
        }
     }
     //定义一个开关
     var flag=true;
     //点击左侧的课程管理显示下拉框
     aArr.parent().children('ul').parent().on('click',function(){
        //开闭原则
        //当动画执行完了才能再次点击
        if(flag){
            flag=false;
            $(this).children('a').addClass('active').next().stop().slideToggle(function(){
                flag=true;
            });

            //BUG连点会两个都显示
            //点击获取当前的高度如果和上一个li差不多，那么下次动画就是
            //显示那么移除当前li的背景色
                        //该li下面的ul显示那么移除原li的背景色
            if($(this).height()<$(this).prev().height()+2){
                $(this).children('a').removeClass('active');
            }
                return;
            }
            //移除所有的背景色剩下当前的
            aArr.parent().siblings().children('a').removeClass('active');
           
     })

     //如果当前页面是课程管理下的添加和列表页面就让当前li下的ul显示
     //如果点击该li下面ul中的li转跳页面将页面ul显示移除原li背景
     //点亮当前页面对应的原li中ul下的li
     if(location.pathname=='/course/course_list'||location.pathname=='/course/course_add'){
        aArr.parent().children('ul').show();
        var kecheng=aArr.parent().children('ul').children('li').children('a');
        //移除
        kecheng.removeClass('active');
        for(var i=0;i<kecheng.length;i++){
            if(location.pathname==kecheng[i].pathname){
                //点亮
                $(kecheng[i]).addClass('active');
            }
        }
     }

     

});


