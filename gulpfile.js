var gulp = require('gulp');
var server = require('gulp-webserver');
var mincss = require('gulp-clean-css');
var sass = require('gulp-sass');
var url = require('url');
var fs = require('fs');
var path = require('path');
var mock = require('./mock/');
var jsonLogin = require('./mock/index/login.json').userLogin;

gulp.task('mincss', function() {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(mincss())
        .pipe(gulp.dest('./dest/css'))
});
gulp.task('watch', function() {
    gulp.watch('./scss/*.scss', ['mincss'])
})
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8066,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                if (req.url === '/favicon.ico') {
                    return;
                }
                var pathname = url.parse(req.url, true).pathname;
                pathname = pathname === '/' ? '/index.html' : pathname;
                if (/\/api\//.test(pathname)) {
                    if (pathname === '/api/login') {
                        var arr = [];
                        req.on('data', function(chunk) {
                            arr.push(chunk)
                        });
                        req.on('end', function() {
                            var data = Buffer.concat(arr).toString();
                            data = require('querystring').parse(data);
                            var yes = jsonLogin.some(function(v) {
                                return v.user == data.user && v.pwd == data.pwd
                            })
                            if (yes) {
                                res.end('{"res":1,"mes":"success"}')
                            } else {
                                res.end('{"res":0,"mes":"您的用户名或密码不正确"}')
                            }
                        })
                        return;
                    }
                    res.end(JSON.stringify(mock(req.url)));

                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
})
gulp.task('default', ['watch', 'server'])