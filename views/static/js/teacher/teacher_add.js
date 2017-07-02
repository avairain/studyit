	//编辑和添加讲师
	define(['jquery','template','form',"bootstrap-datepicker","bootstrap-datepicker.zh",'validate'],function($,template){
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
					data.result.tc_text='保 存';
					data.result.tc_type='save';
					var html =template('teacheraddinfo',data.result);
					$('.teacher-add>form').html(html);
					$('#teacheraddpassword').html('').hide();

					$("input[name='tc_join_date']").datepicker({
						format:'yyyy-mm-dd'
					})
					$('.breadcrumb').children('li.active').html('讲师编辑');
					
				}else{
					// 添加
					var html =template('teacheraddinfo',{tc_gender:1,tc_text:'添 加'});
					$('.teacher-add>form').html(html);
					$('#teacheraddpassword').show();
					$("input[name='tc_join_date']").datepicker({
						format:'yyyy-mm-dd'
					})
					$('.breadcrumb').children('li.active').html('讲师添加');
					
				}
				$('.teacher-add>form').validate({
					sendForm:false,
					onBlur:true,
					description:{
						"password":{
							required: "不能为空"
						},
						'user':{
							required: "不能为空"
						},
						'join':{
							required: "不能为空"
						}
					},
					eachValidField:function(){
						this.parent().parent().addClass('has-success').removeClass('has-error');
						this.parent().next().css('color','green');
					},
					eachInvalidField:function(){
						this.parent().parent().addClass('has-error').removeClass('has-success');
						this.parent().next().css('color','red');
					},
					valid:function(){
						var Dtype=$('#teacheraddsubmit').data('type');
						var url=null;
						if(Dtype =='save'){
							url="/api/teacher/update";
						}else{
							url="/api/teacher/add";
						}
						$('.teacher-add>form').ajaxSubmit({
							url:url,
							type:'post',
							data:{
								tc_id:obj.tc_id
							},
							success:function(data){
								if(data.code===200){
									location.href="/teacher/teacher_list";
								}
							}
						})
					}
					
				})
			}
		})
		//添加
	})