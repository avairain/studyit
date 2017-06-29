define([
    'jquery',
    'template',
    'cookie'
], function ($, template) {
    $(function () {
    	if('/dashboard/login'!=location.pathname){
			var str = JSON.parse($.cookie('userinfo'));
	        var html = template('userinfo-tpl', str);
	        $('#user').html(html);
    	}
        
    })

});