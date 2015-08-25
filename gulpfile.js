var gulp = require('gulp')
var gutil = require('gulp-util')
var size = require('gulp-size')
var uglify = require('gulp-uglify')
var buffer = require('vinyl-buffer')
var source = require('vinyl-source-stream')
var del = require('del')
var path = require('path')
var browserify = require('browserify')
var liveReload = require('livereactload')
var watchify = require('watchify')
var nodemon = require('gulp-nodemon')

var config = require(__dirname + '/config').client
var bundler

function getBundler (prod) {
  bundler = browserify(config.source.path, { debug: true })
  bundler = prod ? bundler : watchify(bundler).transform(liveReload)
  return bundler
}

function compile () {
  var prod = (config.env === 'production')
  if (prod) {
    bundleProd(getBundler(true))
  } else {
    bundleDev(getBundler(false))
  }
}

function clientWatch () {
  gutil.log('-> Watching Client...')

  var bundler = getBundler(false)
  // start listening reload notifications
  liveReload.monitor(path.join(config.build.path, 'bundle.js'), {displayNotification: true})

  bundleDev(bundler)

  bundler.on('update', function () {
    bundleDev(bundler)
  })
}

function serverWatch () {
  gutil.log('-> Watching Server...')

  nodemon({ script: 'index.js', ext: ['js', 'jsx'], ignore: ['gulpfile.js', 'static/bundle.js', 'node_modules/*', 'lib/client/*'], watch: ['lib/server/*', 'lib/app/*'] })
    .on('change', [])
    .on('restart', function () {
      console.log('Server restarted')
    })
}

function bundleDev (bundler) {
  gutil.log('-> Bundling Dev...')

  bundler.bundle()
    .on('error', function (err) {
      gutil.log(err.message)
      this.emit('end')
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(size())
    .pipe(gulp.dest(config.build.path))

}

function bundleProd (bundler) {
  gutil.log('-> Bundling Prod...')

  bundler.bundle()
    .on('error', function (err) {
      gutil.log(err.message)
      this.emit('end')
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(size())
    .pipe(gulp.dest(config.build.path))
}

function clean (cb) {
  del([path.join(config.build.path, '*')], cb)
}

gulp.task('serverwatch', serverWatch)

gulp.task('clientwatch', ['clean'], clientWatch)

gulp.task('build', compile)
gulp.task('clean', clean)

gulp.task('dev', ['clientwatch', 'serverwatch'])
gulp.task('default', ['clean'], compile)
