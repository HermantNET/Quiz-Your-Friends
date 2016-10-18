var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat-css');
var path = require('path');

gulp.task('default', function () {
    return gulp.src('React/**/*.scss')
    .pipe(sass())
    .pipe(concat('site.css'))
    .pipe(gulp.dest('wwwroot/'))
});