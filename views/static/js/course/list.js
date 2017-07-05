define(['jquery','template'],function($,template){
    $.ajax({
        url:'/api/course',
        success:function(data){
            var html=template('list-tpl',data);
            $('.courses').html(html);
        }
    })
})