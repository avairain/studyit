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
					//因为表单校验不为空  而密码栏（有name属性）不显示但是为空所有不能触发表单项都通过后的事件（valid）
					$('#teacheraddpassword').html('').hide();
					//时间插件
					$("input[name='tc_join_date']").datepicker({
						format:'yyyy-mm-dd'
					})
					$('.breadcrumb').children('li.active').html('讲师编辑');
					
				}else{
					// 添加
					var html =template('teacheraddinfo',{tc_gender:1,tc_text:'添 加'});
					$('.teacher-add>form').html(html);
					$('#teacheraddpassword').show();
					//时间插件
					$("input[name='tc_join_date']").datepicker({
						format:'yyyy-mm-dd'
					})
					$('.breadcrumb').children('li.active').html('讲师添加');
					
				}
				//表单检验
				$('.teacher-add>form').validate({
					//表单自动提交
					sendForm:false,
					//表单单项失去焦点提交
					onBlur:true,
					
					description:{
						"password":{
							//空白时提示能容
							required: "不能为空"
						},
						'user':{
							required: "不能为空"
						},
						'join':{
							required: "不能为空"
						}
					},
					//当前表单项校验

					//通过
					eachValidField:function(){
						this.parent().parent().addClass('has-success').removeClass('has-error');
						this.parent().next().css('color','green');
					},
					//不通过
					eachInvalidField:function(){
						this.parent().parent().addClass('has-error').removeClass('has-success');
						this.parent().next().css('color','red');
					},
					//表单项都通过校验触发的事件
					valid:function(){
						var Dtype=$('#teacheraddsubmit').data('type');
						var url=null;
						if(Dtype =='save'){
							url="/api/teacher/update";
						}else{
							url="/api/teacher/add";
						};
						//异步提交
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
	})