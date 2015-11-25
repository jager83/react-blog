function watchTask(gulp, options, basedir, ENV) {
  'use strict';

  let
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    batch = require('gulp-batch')
  ;

  const DEBOUNCE_BROWSER_RELOADING_MS = 500;
  return function() {
    livereload.listen();

    let semaphore;
    gulp
      .watch(options.dest + '/components/**/*.*' , (event) => {
        clearTimeout(semaphore);

        semaphore = setTimeout(() => {
          livereload.changed(event.path);
        }, DEBOUNCE_BROWSER_RELOADING_MS);
      })
    ;

    watch(options.src + '/**/*.scss', batch((events, done) => {
      gulp
        .start('css', () => {
          done();
        })
      ;
    }));

    watch(options.src + '/**/*.ts', batch((events, done) => {
      gulp
        .start('javascript', () => {
          done();
        })
      ;
    }));


  };
}

module.exports = watchTask;
