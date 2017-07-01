define(['jquery','template','bootstrap'],function($,template){
//渲染页面默认的ul内容
	$.ajax({
		url:'/api/teacher',
		type:'get',
		success:function(data){
			if(data.code===200){
				var html = template('teacher-list-tpl',data);
				$('#teacherlist').html(html);
			}
		}
	});

	//模态框内容渲染
	$('#teacherlist').on('click','.teachermodeshow',function(){
		var id=$(this).parent().parent().data('tc_id');
		$.ajax({
			url:'/api/teacher/view?tc_id='+id,
			type:'get',
			success:function(data){
				var html=template('teacher-modal',data.result);
				$('#teacherModal').html(html);
				$('#teacherModal').modal('show');
			}
		})
	});
	//注销和启用功能
	$('#teacherlist').on('click','.teacheronoff',function(){
		var tc_id=$(this).parent().parent().data('tc_id');
		var tc_status=$(this).data('tc_status');
		var $that=$(this);
		$.ajax({
			url:'/api/teacher/handle',
			type:'post',
			data:{
				tc_id:tc_id,
				tc_status:tc_status
			},
			success:function(data){
				if(data.code===200){
					if(data.result.tc_status==0){
						$that.removeClass('btn-success btn-warning').addClass('btn-warning').html('注 销').data('tc_status',data.result.tc_status);
					}else if(data.result.tc_status==1){
						$that.removeClass('btn-success btn-warning').addClass('btn-success').html('启 用').data('tc_status',data.result.tc_status);

					}
				}
			}
		})
	});

	
})