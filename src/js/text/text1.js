define([
    'jquery',
    'temp',
    'base64',
    'getUrl'
], function($, temp, base64, getUrl) {
    var storage = window.localStorage;
    var chapterId = getUrl('curchapter') || storage.getItem('chapterId') * 1 || 1;
    var fontSize = storage.getItem('fontSize') || 40;
    var contentBg = storage.getItem('contentBg') || '#fff';
    console.log(contentBg)
    $('.content p').css('font-size', fontSize + 'px');
    $('.content').css('background-color', contentBg)
    getText();
    var chaptersum = getUrl('chaptersum');
    $('.sum').html(chaptersum);

    $('.wrap>.cont>.cont1').on('click', function() {
        $(this).parent().css('display', 'none');
    });
    $('.wrap>.content').on('click', function() {
        $('.wrap>.cont').show();
    })

    $('.typeface').on('click', function() {
        $('.config-box').toggle();
        return false;
    });

    $('.config-box').on('click', 'button', function() {
        fontSize = parseInt($('.content p').css('font-size'));
        if ($(this).html() === '大') {
            $('.content p').css('font-size', ++fontSize);
        } else {
            $('.content p').css('font-size', --fontSize);
        }
        storage.setItem('fontSize', fontSize);
        return false;
    });

    $('.bgcolor-cont').on('click', 'b', function() {
        contentBg = $(this).css('background-color');
        storage.setItem('contentBg', contentBg);
        $('.content').css('background-color', contentBg);
        return false;
    });

    $('.prev-btn').on('click', function() {
        chapterId--;
        chapterId = chapterId <= 1 ? 1 : chapterId;
        getText();
        return false;
    });
    $('.next-btn').on('click', function() {
        chapterId++;
        chapterId = chapterId >= chaptersum ? chaptersum : chapterId;
        getText();
        return false;
    })



    function getText() {
        $('.menu-btn').on('click', function() {
            window.location.href = "menu.html?id=" + getUrl('id') + '&active=' + chapterId;
        })
        storage.setItem('chapterId', chapterId);
        $.ajax({
            url: '/api/render',
            data: {
                chapterNum: chapterId
            },
            dataType: 'json',
            success: function(data) {
                jsonp(data.jsonp, function(data) {
                    var data = JSON.parse($.base64().decode(data));
                    $('.cur').html(chapterId)
                    temp($('#hand').html(), data, '.content');

                })
            }
        });
    }

    function jsonp(url, success) {
        var script = document.createElement('script');
        window['duokan_fiction_chapter'] = function(data) {
            success(data);
            document.head.removeChild(script);
        }
        script.src = url;
        document.head.appendChild(script);
    }
});