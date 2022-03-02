const gulp = require('gulp');
const minify = require('gulp-clean-css');
const rename = require('gulp-rename');
const minifyJs = require('gulp-minify');
var browserSync = require('browser-sync').create();
const reload = browserSync.reload;


function cssTask() {
  return gulp.src('src/*.css')
    .pipe(minify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));
}

function jsTask() {
  return gulp.src('src/*.js')
    .pipe(minifyJs())
    .pipe(gulp.dest('dist'));
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch('src/*.css', cssTask).on('change', reload);
  gulp.watch('src/*.js', jsTask).on('change', reload);
  gulp.watch("./*.html").on('change', reload);
}

exports.cssTask = cssTask;
exports.jsTask = jsTask;
exports.watch = watch;