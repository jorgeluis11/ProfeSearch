var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var minifyHtml = require("gulp-minify-html");
var uglify = require("gulp-uglify");

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

 
// task
gulp.task('minify-html', function () {
    gulp.src('./www/templates/') // path to your files
    .pipe(minifyHtml())
    .pipe(gulp.dest('./tes.html'));
});
gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/*.css'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

// including plugins
 
// task
gulp.task('minify-js', function () {
    gulp.src('./www/js/**/*.js') // path to your files
    .pipe(concat('javascript.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./www/js/min'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('minify-css', function () {
    gulp.src('./www/css/*.css') // path to your file
    .pipe(concat('style.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('./www/css/min'))
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
