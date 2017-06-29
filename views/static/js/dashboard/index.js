define([
    'jquery',
    'template',
    'cookie'
], function ($, template) {
    $(function () {
        var str = JSON.parse($.cookie('userinfo'));
        var html = template('userinfo-tpl', str);
        $('#user').html(html)
    })

});