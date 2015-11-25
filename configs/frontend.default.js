function defaultFrontendConfigs(gulp, APP_DIR, ENV) {
  'use strict';

  let path = require('path');
  var res = {};

  res.APP_DIR = APP_DIR;
  res.loadedAt = new Date();

  res.ENV = (ENV || '').toUpperCase();
  res.ENV_PRODUCTION = res.ENV === 'PRODUCTION';
  res.unique = res.loadedAt.getTime();

  res.src = 'frontend';
  res.dest = 'public';
  res.httpPath = '/assets';
  res.componentsHttpPath = res.httpPath + '/components';

  res.components = require(path.join(__dirname, 'gulp-tasks', 'FileSystemLayout.js'))(
    res.src,
    'application'
  );

  return res;
}

module.exports = defaultFrontendConfigs;
