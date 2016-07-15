var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var notify = require('gulp-notify');

var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var buffer = require('vinyl-buffer');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback')

gulp.task('styles',function() {

  gulp.src('css/fonts/**.*')
      .pipe(gulp.dest('build/css/fonts'))
  // Compiles CSS
  gulp.src('css/style.styl')
      .pipe(stylus())
      .pipe(autoprefixer())
      .pipe(gulp.dest('./build/css/'))
      .pipe(reload({stream:true}))
});

gulp.task('images',function(){
  gulp.src('css/images/**')
      .pipe(gulp.dest('./build/css/images'))
});

gulp.task('browser-sync', function() {
  browserSync({
    server : {},
    middleware : [ historyApiFallback() ],
    ghostMode: false
  });
});

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end');
}

function buildScript(file, watch) {

  var props = {
    entries: ['./scripts/' + file],
    debug : true,
    transform:  [babelify.configure({stage : 0 })]
  };

  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    var stream = bundler.bundle();
    return stream
        .on('error', handleErrors)
        .pipe(source(file))
        .pipe(gulp.dest('./build/'))
        // .pipe(buffer())
        // .pipe(uglify())
        // .pipe(rename('app.min.js'))
        // .pipe(gulp.dest('./build'))
        .pipe(reload({stream:true}))
  }

  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  return rebundle();
}

gulp.task('scripts', function() {
  return buildScript('main.js', false);
});

gulp.task('default', ['images','styles','scripts','browser-sync'], function() {
  gulp.watch('css/**/*', ['styles']);
  return buildScript('main.js', true);
});
