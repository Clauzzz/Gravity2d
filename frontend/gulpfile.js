var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
const terser = require('gulp-terser');

sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./styles/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(csso())
    .pipe(gulp.dest('./dist/styles/'));
});
gulp.task('scripts', function () {
  return gulp.src('./scripts/**/*.js')
  .pipe(gulp.dest('./dist/scripts/'));
});
gulp.task('sass:watch', function () {
  gulp.watch('./styles/sass/*.scss', gulp.series('sass'));
  gulp.watch('./scripts/**/*.js', gulp.series('scripts'));
});