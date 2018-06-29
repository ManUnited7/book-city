require.config({
    baseUrl: "/js/",
    paths: {
        jquery: 'lib/jquery',
        flexible: 'lib/flexible',
        index: 'index/index',
        swiper: 'lib/swiper-4.1.6.min',
        handle: 'lib/handlebars-v4.0.11',
        temp: 'common/temp',
        text: "lib/require.text",
        template: "../template/",
        search: 'search/search',
        detail: 'detail/detail',
        menu: 'menu/menu',
        text1: 'text/text1',
        base64: 'lib/jquery.base64',
        getUrl: 'common/getUrl',
        login: 'login/login'
    },
    shim: {
        base64: {
            exports: 'base64',
            deps: ['jquery']
        }
    }
})

require(['flexible']);