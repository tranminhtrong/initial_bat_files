var gulp = require('gulp');
var clean = require('gulp-clean');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var tsify = require('tsify');
var gutil = require("gulp-util");
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var paths = {
    pages: ['src/*.html']
};

gulp.task('clean-scripts', function () {
    return gulp.src(['wwwroot/*.js', 'wwwroot/*.html', 'wwwroot/*.map'], {read: false})
      .pipe(clean());
  });

gulp.task('copy-html', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('wwwroot'));
});

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("wwwroot"));
}

gulp.task("default", ['clean-scripts', 'copy-html'], bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);
// gulp.task('default', ['clean-scripts', 'copyHtml'], function () {
//     return browserify({
//         basedir: '.',
//         debug: true,
//         entries: ['src/main.ts'],
//         cache: {},
//         packageCache: {}
//     })
//     .plugin(tsify)
//     .transform('babelify', {
//         presets: ['es2015'],
//         extensions: ['.ts']
//     })
//     .bundle()
//     .pipe(source('bundle.js'))
//     .pipe(buffer())
//     .pipe(sourcemaps.init({loadMaps: true}))
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest('wwwroot'));
// });