define(['jquery', 'util','template'], function ($, util,template) {
    var csid = util.getQuery('cs_id');
    console.log(csid)
    $.ajax({
        url: '/api/course/lesson',
        data:{cs_id:csid},
        success: function (data) {
            if (data.code == 200) {
                var html = template('add-step3-tpl', data.result)
                $('.steps').html(html);
            }

        }
    })
})