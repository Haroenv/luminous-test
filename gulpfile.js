'use strict';

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var imageResize = require('gulp-image-resize');

gulp.task('scripts',() => {
  return gulp.src(['src/js/*.js', '!./node_modules/**', '!./dist/**'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish))
    .pipe(browserify({
      insertGlobals : true
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/src/js'));
});

gulp.task('files',() => {
  return gulp.src(['**/*.html','!./bower_components/**/*','**/*.php', '**/*.twig', '!./node_modules/**', '!./dist/**'])
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src(['src/img/**/*', '!./node_modules/**', '!./dist/**'])
    .pipe(imagemin({
      optimizationLevel: 2,
      progressive: true,
      svgoPlugins: [
        {removeViewBox: false},
        {cleanupIDs: false}
      ]}))
    .pipe(gulp.dest('dist/src/img'));
});

gulp.task('thumbs', () => {
  return gulp.src(['src/img/**/*', '!./node_modules/**', '!./dist/**'])
    .pipe(imageResize({
      width : 310,
      height : 305,
      crop : true,
      upscale : false
    }))
    .pipe(gulp.dest('dist/src/img/thumbs'));
});



gulp.task('default', ['scripts','images','thumbs','files']);
