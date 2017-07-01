	//编辑和添加讲师
	define(['jquery','template','form'],function($,template){
		var userInfo=location.search.slice(1).split('&');
		var obj={};
		userInfo.forEach(function(v,i){
			obj[userInfo[i].split('=')[0]]=userInfo[i].split('=')[1];
		});
		console.log(obj);
		//编辑
		$.ajax({
			url:'/api/teacher/view',
			type:'get',
			data:{
				tc_id:obj.tc_id
			},
			success:function(data){
				console.log(data);
				var html =template('teacheraddinfo',data.result);
				$('.teacher-add>form').html(html);
				if(obj.tc_id){
					$('.breadcrumb').children('li.active').html('讲师编辑');
					$('#teacheraddpassword').hide();
					$("#teacheraddsubmit").html('保 存');
				}else{
					$('.breadcrumb').children('li.active').html('讲师添加');
					$('#teacheraddpassword').show();
					$("#teacheraddsubmit").html('添 加');
				}
				$('.teacher-add>form').on('click','#teacheraddsubmit',function(){
					$('.teacher-add>form').ajaxSubmit({
						url:'/api/teacher/update',
						success:function(data){
							console.log(data);
						}
					})
				})
			}
		})
		//添加
	})