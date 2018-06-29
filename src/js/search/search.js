define([
    'jquery',
    'temp'

], function($, temp) {
    $.getJSON('/api/searchKey').done(render);

    function render(data) {
        console.log(data)
        temp($('#handle').html(), data, '.search-cont')
    }
    $('#Tag__1').on('click', function() {
        var val = $(this).prev().val();
        if (val != '') {
            $.getJSON('/api/result', { value: val }, function(data) {
                temp($('#handles').html(), data, '.search-cont')
                console.log(data)
                if (data.cont.length == 0) {
                    temp($('#handless').html(), '没有相应的搜索结果', '.search-cont');
                    return;
                }
            })
        } else {

            temp($('#handless').html(), '没有相应的搜索结果', '.search-cont');
            return;
        }
    })
})