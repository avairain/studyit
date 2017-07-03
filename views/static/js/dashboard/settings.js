define(['jquery', 'ckeditor', 'template', 'region', 'form', 'bootstrap-datepicker', 'bootstrap-datepicker.zh', 'uploadify'], function ($, CKEDITOR, template) {

    $.ajax({
        url: '/api/teacher/profile',
        type: 'get',
        success: function (data) {
            if (data.code == 200) {

                console.log(data);
                var html = template('settings-tpl', data.result);
                $('.settings').html(html);




                //生日日期插件
                $('input[name="tc_birthday"]').datepicker({
                    format: "yyyy-mm-dd"
                });
                //入职日期插件
                $('input[name="tc_join_date"]').datepicker({
                    format: "yyyy-mm-dd"
                });
                //副文本编辑器
                CKEDITOR.replace("text", {
                    toolbarGroups: [
                        { name: 'clipboard', groups: ['clipboard', 'undo'] },
                        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
                        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'] },
                        { name: 'styles' },
                        { name: 'colors' },
                    ]
                });

                //地区三级联动
                $('#area').region({
                    url: '/views/assets/jquery-region/region.json'
                })
                //上传图片插件
                $("#upfile").uploadify({
                    swf: '/views/assets/uploadify/uploadify.swf',
                    uploader: '/api/uploader/avatar',
                    width: 120,
                    height: 120,
                    buttonText: '',
                    'fileObjName': 'tc_avatar',
                    onUploadSuccess: function (f, data) {
                        data = JSON.parse(data);
                        console.log(data);
                        if (data.code == 200) {
                            $('.preview>img').attr('src', data.result.path)
                        }
                    }
                });
                $('.settings').on('submit', 'form', function () {
                    $('form').ajaxSubmit({
                        url: '/api/teacher/modify',
                        type:'post',
                        success: function (data) {
                            if(data.code==200){
                                alert('修改成功！')
                            }
                        }
                    })
                    return false;
                })
            }
        }

    })



})