'use strict';

var
  gulp = require('gulp'),
  path = require('path'),
  minimist = require('minimist'),
  _ = require('lodash'),
  Promise = require('bluebird'),

  options = minimist(process.argv.slice(2), {
    "string": "env",
    "default": {
    }
  })
  ;

const ENV = (options.env || 'development').toUpperCase();

let
  configsPath = path.join(__dirname, 'configs'),
  configs = require(path.join(configsPath, 'frontend.js'))(gulp, __dirname, ENV),
  task = (task) => require(path.join.call(path, configsPath, 'gulp-tasks', task))(gulp, configs, __dirname, ENV)
  ;

gulp.task('javascript', task('Transpile.js'));
gulp.task('includes', task('GenerateIncludes.js'));
gulp.task('css', task('CssDevelopment.js'));
gulp.task('watch', task('Watch.js'));

gulp.task('build', [
  'javascript',
  'css'
], function() {
  return gulp
    .start('includes')
    ;
});
