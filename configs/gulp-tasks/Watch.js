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
      .watch(options.dest + '/bundle/**/*.js' , (event) => {
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

    watch(options.src + '/**/*.js', batch((events, done) => {
      gulp
        .start('javascript', () => {
          gulp
            .start('browserify', () => {
              done();
            })
          ;
        })
      ;
    }));


  };
}

module.exports = watchTask;
