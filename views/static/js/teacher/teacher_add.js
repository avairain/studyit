	//编辑和添加讲师
	define(['jquery','template','form',"bootstrap-datepicker","bootstrap-datepicker.zh"],function($,template){
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
				console.log(!obj.tc_id)
				if(obj.tc_id){
					data.result.tc_text='保 存';
					console.log(data);
					var html =template('teacheraddinfo',data.result);
					$('.teacher-add>form').html(html);
					$('#teacheraddpassword').hide();
					$("input[name='tc_join_date']").datepicker({
						format:'yyyy-mm-dd'
					})
					$('.breadcrumb').children('li.active').html('讲师编辑');
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
					var html =template('teacheraddinfo',{tc_gender:1,tc_text:'添 加'});
					$('.teacher-add>form').html(html);
					$('#teacheraddpassword').show();
					$("input[name='tc_join_date']").datepicker({
						format:'yyyy-mm-dd'
					})
					$('.breadcrumb').children('li.active').html('讲师添加');
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