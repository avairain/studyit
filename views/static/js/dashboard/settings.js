define(['jquery', 'ckeditor', 'region', 'bootstrap-datepicker', 'bootstrap-datepicker.zh'], function ($, ckeditor) {
    $('input[name="tc_birthday"]').datepicker({
        format: "yyyy-mm-dd"
    });
    $('input[name="tc_join_date"]').datepicker({
        format: "yyyy-mm-dd"
    });
    CKEDITOR.replace("text", {
        toolbarGroups: [
            { name: 'clipboard', groups: ['clipboard', 'undo'] },
            { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
            { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'] },
            { name: 'styles' },
            { name: 'colors' },
        ]
    });
    $('#area').region({
        url: '/views/assets/jquery-region/region.json'
    })
})