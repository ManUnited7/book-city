define([
    'jquery',
    'temp',
    'getUrl'
], function($, temp, getUrl) {
    var bookid = 352876;
    var activeid = getUrl('active');
    var Storage = window.localStorage;

    $.ajax({
        url: '/api/menu',
        data: {
            id: bookid
        },
        dataType: 'json',
        success: function(data) {
            console.log(data.item.toc)
            data.item.toc.map(function(v) {
                v.chapter_id == activeid ? v.active = true : v.active = false;
            });
            temp($('#hand').html(), data.item.toc, '.list');
            scroll(data.item.toc.length);
        }
    });

    function scroll(n) {
        $('.list li').on('click', function() {
            if (Storage.getItem('log')) {
                window.location.href = 'text.html?id=' + bookid + '&chaptersum=' + n + '&curchapter=' + $(this).index();
            } else {
                alert('请先登录！')
                window.location.href = 'login.html'
            }
        });
    }

});