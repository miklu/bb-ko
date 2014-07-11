var gulp = require('gulp'),
		less = require('gulp-less'),
		autoprefixer = require('gulp-autoprefixer'),
		minifycss = require('gulp-minify-css'),
		rename = require('gulp-rename'),
		livereload = require('gulp-livereload'),
		path = require('path');

gulp.task('styles', function() {
	gulp.src('./public/css/*.less')
		.pipe(less({
			paths: [ path.join(__dirname, 'less', 'includes') ]
		}))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('./public/css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function() {
	gulp.watch('./public/css/*.less', ['styles']);
	var server = livereload();
	gulp.watch(['./public/**', './views/*.html']).on('change', function(file) {
		server.changed(file.path);
	});
});

gulp.task('default', ['styles']);