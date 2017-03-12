var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var fs=require('fs');

var $ = require('gulp-load-plugins')();

gulp.task('clean', function(){

    return gulp.src('dist/').pipe($.clean());

});

gulp.task('package', function() {

    gulp.src(['src/ad/res/**.wav', 'src/ad/res/**.mp3', 'src/ad/res/**.m4a'])
    .pipe(gulp.dest('dist/ad/res/'));
    gulp.src(['src/ad/res/**.jpg', 'src/ad/res/**.png', 'src/ad/res/**.gif'])
    .pipe($.imagemin({
        progressive: true,
        interlaced: true
    }))
    .pipe(gulp.dest('dist/ad/res/'));

    gulp.src(['src/*.js', 'src/**/*.js'])
    .pipe($.uglify()).pipe(gulp.dest('dist'));

    gulp.src(['src/*.html', 'src/**/*.html'])
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));

});

gulp.task('default', function() {
  // place code for your default task here
});