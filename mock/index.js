var homeData = require('./index/home');
var page1 = require('./index/recommend1');
var page2 = require('./index/recommend2');
var page3 = require('./index/recommend3');
var searchKey = require('./search/searchKey');
var searchResult = require('./search/search');
var detail = require('./index/352876');
var menu = require('./render/chapter-list');
var render1 = require('./render/data1');
var render2 = require('./render/data2');
var render3 = require('./render/data3');
var render4 = require('./render/data4');


var data = {
    '/api/index': homeData,
    '/api/loadmore?pagenum=1&limit=10': page1,
    '/api/loadmore?pagenum=2&limit=10': page2,
    '/api/loadmore?pagenum=3&limit=10': page3,
    '/api/bookself': page1,
    '/api/searchKey': searchKey,
    '/api/detail?id=352876': detail,
    '/api/menu?id=352876': menu,
    '/api/render?chapterNum=1': render1,
    '/api/render?chapterNum=2': render2,
    '/api/render?chapterNum=3': render3,
    '/api/render?chapterNum=4': render4

};

module.exports = function(url) {
    if (/\/api\/result/.test(url)) {
        var n = url.split('?')[1];
        var val = decodeURIComponent(n.split('=')[1]);
        var reg = new RegExp(val, 'g');
        var obj = {
            mes: '暂无数据',
            cont: []
        }
        var newarr = searchResult.items.filter(function(v, i) {
            v.role = v.role[0][1]
            return reg.test(v.title) || reg.test(v.intro) || reg.test(v.role);
        });
        if (newarr.length) {
            obj.mes = "success";
            obj.cont = newarr;
        }
        return obj;
    }
    return data[url];
};