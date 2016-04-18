var gulp = require('gulp'),
    concat = require('gulp-concat'),
    templateCache = require('gulp-angular-templatecache'),
    runSequence = require('run-sequence'),
    series = require('stream-series'),
    merge = require('merge-stream'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    order = require('gulp-order'),
    jsonfile = require('jsonfile');
    notifier = require('node-notifier');



    


var paths = {
  sass: ['./src/scss/**/*.scss'],
  appjs: ['./src/app/**/*.js'],
  templates: ['./src/app/**/*.html'],
  img: ['./src/img/**/*.*'],
  lib: ['./src/lib/**/*.*'],
  index: ['./src/index.html']
};

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.appjs, ['js']);
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.lib, ['move-lib']);
  gulp.watch(paths.img, ['move-img']);
  gulp.watch(paths.index, ['move-index']);
});

gulp.task('sass', function(done) {
  gulp.src(paths.sass)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./dist'))
    .on('end', done);
});



gulp.task('js', function() {
  var project = jsonfile.readFileSync('./package.json');
  gulp.src(paths.appjs)
    .pipe(concat(project.name + '.js'))
    .pipe(gulp.dest('./dist'))
});

gulp.task('templates', function () {
  return gulp.src(paths.templates)
   .pipe(templateCache({module:'app.templates'}))
   .pipe(concat('templates.js'))
   .pipe(gulp.dest('./dist'));
});

// Move Lib
gulp.task('move-lib', function(){
  return gulp.src(paths.lib)
  .pipe(gulp.dest('./dist/lib/'));
});

// Move Img
gulp.task('move-img', function(){
  return gulp.src(paths.img)
  .pipe(gulp.dest('./dist/lib/'));
});

// Move index.html
gulp.task('move-index', function(){
  return gulp.src(paths.index, { base: './src/' })
  .pipe(gulp.dest('.dist/'));
});

gulp.task('default',function(){
  runSequence([ 'sass','js','templates','move-lib','move-img','move-index','serve']);
})

gulp.task('serve', function () {
  var webserver = require('gulp-webserver');
  runSequence(['watch']);
  gulp.src('.')
    .pipe(webserver({
      livereload: {
        enable: true
      },
      directoryListing: false,
      open: true
    }));
});
