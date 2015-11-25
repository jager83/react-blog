'use strict';
let
  path = require('path'),
  _ = require('lodash')
;

function frontendConfigs(gulp, APP_DIR, ENV) {
  var configs = require(path.join(__dirname, 'frontend.default.js'))(gulp, APP_DIR, ENV);
  var res = {};


  return _.merge({}, configs, res);
}

module.exports = frontendConfigs;
