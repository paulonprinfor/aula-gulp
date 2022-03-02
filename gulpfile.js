const gulp = require('gulp');
const minify = require('gulp-clean-css');
const rename = require('gulp-rename');
const minifyJs = require('gulp-minify');
var browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sass = require('gulp-sass')(require('sass'));
sass.compiler = require('node-sass');


function scssTask() {
  return gulp.src('src/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
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

  gulp.watch('src/*.scss', scssTask).on('change', reload);
  gulp.watch('src/*.js', jsTask).on('change', reload);
  gulp.watch("./*.html").on('change', reload);
}

exports.scssTask = scssTask;
exports.jsTask = jsTask;
exports.watch = watch;