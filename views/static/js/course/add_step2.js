define(['jquery', 'util', "template", 'uploadify', 'jcrop'], function ($, util, template) {
    var csid = util.getQuery('cs_id');
    var x = 0;
    var y = 0;
    var w = 0;
    var h = 0;
    $.ajax({
        url: '/api/course/picture',
        data: {
            cs_id: csid
        },
        success: function (data) {
            if (data.code == 200) {
                var html = template('add-step2-tpl', data.result);
                $(".steps").html(html);
                $('.preview>img').css({ width: 400, height: 'auto' })
                $("#btn-upload-png").uploadify({
                    'swf': '/views/assets/uploadify/uploadify.swf',
                    "buttonClass": 'btn btn-success btn-sm',
                    "buttonText": '选择图片',
                    "width": "70",
                    "height": "30",
                    'uploader': '/api/uploader/cover',
                    "fileObjName": " cs_cover_original",
                    "itemTemplate": "<p></p>",
                    'formData': { cs_id: csid },
                    'onUploadSuccess': function (file, data, response) {
                        data = JSON.parse(data);
                        if (data.code == 200) {
                            $('.preview>img').attr('src', data.result.path);
                            $('#btn-clip-png').prop('disabled', false);
                        }
                    }
                });
                $('#btn-upload-png-button').css('line-height', '1.5');

            }
        }
    })
    $(".steps").on('click', '#btn-clip-png', function () {

        var text = $(this).text();
		if(text == "裁切图片"){
        $(".thumb>img").remove();

        $('.preview>img').Jcrop({
            boxWidth: 400,
            setSelect: [0, 0, 400, 200],
            aspectRatio: 2
        }, function () {
            var jcrop_api = this;
            console.log(this);
            thumbnail = this.initComponent('Thumbnailer', { width: 240, height: 120, thumbnail: ".thumb" });
        });
        $(".preview").on("cropmove", function (a, b, c) {
            x = c.x;
            y = c.y;
            w = c.w;
            h = c.h;
        })
        	$(this).text("保存图片");
		}else{
			// $(this).text("裁切图片");
			$(this).prop("disabled", true);
			$that = $(this);
			//向服务器发送请求保存当前裁切好的区域
			$.ajax({
				url: "/api/course/update/picture",
				type: "post",
				data: {
					cs_id: csid,
					x: x,
					y: y,
					w: w,
					h: h
				},
				success: function(data){
					if(data.code == 200){
						// $that.prop("disabled", false);
						location.href = "/course/course_add_step3?cs_id=" + data.result.cs_id;
					}
				}
			})
		}
		

    })
})