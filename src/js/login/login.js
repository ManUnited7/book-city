define([
    'jquery'
], function($) {

    var Storage = window.localStorage;

    //点击登录判断用户名和密码的值
    var reg = /^1[35789]\d{9}$/;
    var error = '';
    $('.btn').on('click', function() {
        var n = $('#input').val().trim();
        var m = $('#pwd').val().trim();
        if (n === '' || m === "") {
            error = '用户名或密码不能为空';
            $('.main').html(error);
        } else if (!reg.test(n)) {
            error = '用户名格式有误';
            $('.main').html(error);
        } else {
            $('.main').html('');
            if ($(this).html() === '登录') {
                $.ajax({
                    url: "/api/login",
                    type: "post",
                    data: {
                        user: n,
                        pwd: m
                    },
                    dataType: "json",
                    success: function(data) {
                        if (data.res) {
                            history.go(-1);
                            Storage.setItem('log', 1);
                        } else {
                            error = data.mes;
                            $('.main').html(error);
                        }
                    }
                })
            }
        }
    })

    $('.pwd-mi i.icon').on('click', function() {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $('#pwd').attr('type', 'text')
        } else {
            $('#pwd').attr('type', 'password')
        }
    })
});