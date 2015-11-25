function taskTranspile(gulp, options) {
  'use strict';

  var
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    path = require('path'),
    globby = require('globby'),
    reactify = require('reactify'),
    through = require('through2'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream')
    ;

  return function() {
    let bundledStream = through();

    bundledStream
      .pipe(source('application.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(options.dest + '/bundle'))
    ;

    return globby([options.dest + '/frontend/**/*.js', options.dest + '/frontend/**/*.jsx'])
      .then(entries => {

        browserify({
          entries: entries,
          debug: true,
          transform: [reactify]
        })
          .bundle()
          .pipe(bundledStream)
      })
      ;
  };
}

module.exports = taskTranspile;
