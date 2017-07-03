define(['jquery', 'util', 'template', 'ckeditor', 'form'], function ($, util, template, CKEDITOR) {
    var csid = util.getQuery("cs_id");
    // console.log(CKEDITOR);
    $.ajax({
        url: '/api/course/basic',
        data: { cs_id: csid },
        success: function (data) {
            if (data.code == 200) {
                var html = template('add-step-tpl', data.result);
                $('.steps').html(html);
                CKEDITOR.replace('textarea');
            }
        }
    })

    $('.steps').on('submit', 'form', function () {
        $(this).ajaxSubmit({
            url: '/api/course/update/basic',
            type: 'post',
            success: function (data) {
                if(data.code==200){
                    location.href='/course/course_add_step2?cs_id='+data.result.cs_id
                }
            }

        });
        return false;
    })
})