	//编辑和添加讲师
	define(['jquery','template','form'],function($,template){
		var userInfo=location.search.slice(1).split('&');
		var obj={};
		userInfo.forEach(function(v,i){
			obj[userInfo[i].split('=')[0]]=userInfo[i].split('=')[1];
		});
		$.ajax({
			url:'/api/teacher/view',
			type:'get',
			data:{
				tc_id:obj.tc_id
			},
			success:function(data){
				//编辑
				if(obj.tc_id){
					$('.breadcrumb').children('li.active').html('讲师编辑');
					$("#teacheraddsubmit").html('保 存');
					var html =template('teacheraddinfo',data.result);
					$('.teacher-add>form').html(html);
					$('#teacheraddpassword').hide();

					$('.teacher-add>form').on('click','#teacheraddsubmit',function(){
						$('.teacher-add>form').ajaxSubmit({
							url:'/api/teacher/update',
							type:'post',
							success:function(data){
							}
						})
					})
				}else{
					// 添加
					$('.breadcrumb').children('li.active').html('讲师添加');
					$("#teacheraddsubmit").html('添 加');
					var html =template('teacheraddinfo',{tc_gender:1});
					$('.teacher-add>form').html(html);
					$('#teacheraddpassword').show();
					$('.teacher-add>form').on('click','#teacheraddsubmit',function(){
						$('.teacher-add>form').ajaxSubmit({
							url:'/api/teacher/add',
							type:'post',
							success:function(data){

							}
						})
					})
				}
				
			}
		})
		//添加
	})