function taskTranspile(gulp, options) {
  'use strict';

  var
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    eslint = require('gulp-eslint'),
    path = require('path'),
    colors = require('colors')
    ;

  return function() {

    return gulp
      .src(options.src + '**/*.{js,es6}')

//      .pipe(eslint(path.join(options.root, '.eslintrc')))
//      .pipe(eslint.formatEach('stylish', process.stderr))

      .pipe(sourcemaps.init())
      .pipe(babel({
        presets: ['es2015']
      }).on('error', function(error) {
        console.log('\nGulp.Transpile:' + error.name, '\n', error.loc, '\n', error.fileName, '\n');
      }))
      .pipe(sourcemaps.write('./sourcemaps'))
      .pipe(gulp.dest(options.dest))

  };
}

module.exports = taskTranspile;
