define(['jquery', 'form'], function ($) {
    $('#course-add').on('submit', function () {
        $(this).ajaxSubmit({
            url: '/api/course/create',
            type: 'post',
            success: function (data) {
                if(data.code==200){
                    location.href="/course/course_add_step1?cs_id="+data.result.cs_id;
                }
            }
        })
        return false;
    })
})