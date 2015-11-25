function sassTask(gulp, options, basedir, ENV) {
  'use strict';

  let
    path = require('path'),
    sass = require('gulp-sass'),
    merge = require('merge2'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    _ = require('lodash'),
    cache = require("gulp-cached"),

    autoprefixer = require('autoprefixer'),
    postcss = require('gulp-postcss')
    ;

  return function() {

    let
      components = options.components,
      sassOptions = {},
      postcssProcessors = [
        autoprefixer({browsers: ['last 2 version']})
      ]
    ;



    let tasks = components.map((component) => {
        return gulp
        .src(component.css)
        .pipe(cache('.sasscache-' + component.dest, { optimizeMemory: true }))
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(postcss(postcssProcessors))
        .pipe(rename(component.dest + '.css'))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(path.join(options.dest, 'components')))
      });

    return merge(tasks);
  }
}

module.exports = sassTask;
