define([
    'jquery',
    'temp',
    'getUrl'
], function($, temp, getUrl) {
    var $id = getUrl('id');
    $.ajax({
        url: '/api/detail?id=352876',
        dataType: 'json',
        success: function(data) {
            console.log(data.item);
            temp($('#hand').html(), data.item, '.wrap-cont');
            temp($('#handle').html(), data.author_books, '.cont2');
        }
    });


});