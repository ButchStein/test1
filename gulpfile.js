'use strict';

var gulp = require('gulp');
var sourcemap = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var cssnano = require('cssnano');
var uglify = require('gulp-uglify');

gulp.task('css', function() {
  return gulp
    .src('source/scss/style.scss')
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      cssnano()
    ]))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('source/css'))
    .pipe(server.stream());
});

gulp.task('js', function() {
  return gulp
  .src('source/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('source/dist'))
  .pipe(server.stream());
});

gulp.task('server', function() {
  server.init({
    server: 'source/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/scss/**/*.scss', gulp.series('css'));
  gulp.watch('source/*.html').on('change', server.reload);
});

gulp.task('start', gulp.series('css', 'js', 'server'));
