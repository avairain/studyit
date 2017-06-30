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
	})
	//模态框内容渲染
	$('#teacherlist').on('click','.teachermodeshow',function(){
		var id=$(this).parent().parent().data('tc_id');
		console.log(id)
		$.ajax({
			url:'/api/teacher/view?tc_id='+id,
			type:'get',
			success:function(data){
				console.log(data);
				var html=template('teacher-modal',data.result);
				$('#teacherModal').html(html);
			}
		})
	})
	
})