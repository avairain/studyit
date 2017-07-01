require.config({
	baseUrl:'/views',
	paths:{
		'jquery':'assets/jquery/jquery-3.2.1.min',
		'cookie':'assets/jquery-cookie/jquery.cookie',
		'form':'assets/jquery-form/jquery.form',
		'template':'assets/artTemplate/template',
		'bootstrap':'assets/bootstrap/js/bootstrap.min',
		'nprogress':'assets/nprogress/nprogress'
	},
	shim:{
		"bootstrap":{
			deps: ["jquery"]
		}
	}
})