define(['jquery',
    'temp',
    'swiper',
    'text!template/index.html',
    'text!template/block-list.html',
    'text!template/recommend-list.html',
    'text!template/gril-love.html',
    'text!template/boy-love.html',
    'text!template/sift-cont.html',
    'text!template/cont-lists.html'
], function($, temp, Swiper, str, block, recommend, dltext, dltext1, sift, cont) {
    $('.h1 span').on('click', function() {
        var ind = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        if (ind == 1) {
            $('.active1').css({
                left: 65 + '%'
            })
            $('.book-self').css({
                left: 0
            })
            $('.book-city-cont').css({
                left: -100 + '%'
            })
        } else if (ind == 0) {
            $('.active1').css({
                left: 15 + 'px'
            })
            $('.book-self').css({
                left: 100 + '%'
            })
            $('.book-city-cont').css({
                left: 0
            })
        }
    });
    //书架内容
    $.ajax({
        url: '/api/bookself',
        dataType: 'json',
        success: function(data) {
            console.log(data)
            temp(cont, data.items, '.book-self-cont>div');
            $('.self p').on('click', function() {
                $(this).toggleClass('active2');
                if ($(this).hasClass('active2')) {
                    temp(block, data.items, '.book-self-cont>div');
                } else {
                    temp(cont, data.items, '.book-self-cont>div');
                }
            })
        }
    });
    $.ajax({
        url: '/api/index',
        dataType: 'json',
        success: function(data) {
            //渲染轮播
            temp(str, data.items[0].data, '.box');
            new Swiper('.swiper-container', {
                    autoplay: true,
                    loop: true,
                })
                //本周最火
            temp(block, data.items[1].data.data, '.week-hot');
            $('.bolck-list').on('click', '.detail', function() {
                window.location.href = 'page/detail.html'
            })

            //重磅推荐
            var index = 0;
            temp(recommend, changedata(index, data.items[2].data.data), '.recommend-cont');
            //女生最爱
            temp(dltext, changedata(index, data.items[3].data.data), '.gril-cont');
            //男生最爱
            temp(dltext1, changedata(index, data.items[4].data.data), '.boy-cont');
            //限时免费
            data.items[5].data.data.map(function(v) {
                v.title = v.data.title;
                v.cover = v.data.cover;
                v.fiction_id = v.data.fiction_id;
            })

            temp(block, data.items[5].data.data, '.time-free');
            //精选专题
            temp(sift, data.items[6], '.sift-cont');
            //换一换
            $('.change-btn').on('click', function() {
                var index = $(this).data('id') * 1;
                var ind = $(this).attr('data');
                var obj = data.items[ind];
                index++;
                index = index % (obj.data.count / 5);
                var str = ind == 2 ? recommend : dltext;
                $(this).data('id', index);
                temp(str, changedata(index, obj.data.data), '.' + $(this).prev().attr('class'));
            });
            //上拉加载
            loadMore('.book-city-cont');
        }
    });

    function changedata(ind, arr) {
        //0-4 5-9
        var limit = 5;
        var startind = ind * limit;
        var endind = ind * limit + limit;
        var newarr = arr.slice(startind, endind);
        newarr.map(function(v, i) {
            v.count = i + 1;
        });
        return newarr;
    }

    var pagenum = 0;

    function loadMore(parent) {
        if (pagenum >= 3) {
            $('.loadding').html('暂无更多数据');
            return false;
        }
        var clientH = $(this).height();
        $(parent).on('scroll', function() {
            var maxH = $(this).children().height() - clientH;
            if ($(this).scrollTop() + 40 >= maxH) {
                $(this).off('scroll');
                pagenum++;
                render(pagenum);
            }
        })
    }

    function render(n) {
        $.ajax({
            url: '/api/loadmore',
            data: {
                pagenum: n,
                limit: 10
            },
            dataType: 'json',
            success: function(data) {
                temp(cont, data.items, '.content-cont', 1);
                loadMore('.book-city-cont')
            }
        })
    }
});