

/******************************************************
# RIIPPUVUUDET
******************************************************/
var gulp = require('gulp'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    path = require('path');

/******************************************************
# SIJAINNIT
******************************************************/
var kohde = {
  less: 'public/less/styles.less',
  css: 'public/css',
  js: 'public/js/**/*.js',
  html: 'views/**/*.html'
};


/******************************************************
# LESS
******************************************************/
gulp.task('less', function() {
  gulp.src(kohde.less)
    .pipe(plumber())
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(autoprefixer(
      'last 2 version',
      '> 1%',
      'ie 8',
      'ie 9',
      'ios 6',
      'android 4'
    ))
    .pipe(minifyCss())
    .pipe(gulp.dest(kohde.css))
    .pipe(livereload());
});

/******************************************************
# HTML
******************************************************/
gulp.task('html', function() {
  gulp.src(kohde.html)
  .pipe(livereload());
});

/******************************************************
# WATCH
******************************************************/
gulp.task('watch', function() {

  var server = livereload();

  gulp.watch(kohde.html, ['html']);
  gulp.watch(kohde.less, ['less']);
});

gulp.task('default', ['less', 'watch']);
