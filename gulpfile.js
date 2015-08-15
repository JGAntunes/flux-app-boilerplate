var gulp = require('gulp');
var gutil = require('gulp-util');
var size = require('gulp-size');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var del = require('del');
var path = require('path');
var browserify = require('browserify');
var watchify = require('watchify');

var config = require(__dirname + '/config').client;

function getBundler (prod) {
  var bundler = browserify(config.source.path, { debug: true });
  bundler = prod ? bundler : watchify(bundler);
  return bundler;
}

function compile () {
  var prod = (config.env === 'production');
  if (prod) {
    bundleProd();
  } else {
    bundleDev();
  }
}

function watch () {
  return bundleDev();
}

function bundleDev () {
  var bundler = getBundler(false);
  gutil.log('-> Bundling Dev...');

  bundler.bundle()
    .on('error', function (err) { gutil.log(err.message); this.emit('end'); })
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(size())
    .pipe(gulp.dest(config.build.path));

  bundler.on('update', function () {
    bundleDev();
  });
}

function bundleProd (prod) {
  var bundler = getBundler(true);
  gutil.log('-> Bundling Prod...');

  bundler.bundle()
    .on('error', function (err) { gutil.log(err.message); this.emit('end'); })
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(size())
    .pipe(gulp.dest(config.build.path));
}

function clean (cb) {
  del([path.join(config.build.path, '*')], cb);
}

gulp.task('build', compile);
gulp.task('watch', bundleDev);
gulp.task('clean', clean);

gulp.task('dev', ['clean'], watch);
gulp.task('default', ['clean'], compile);
