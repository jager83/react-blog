"use strict";

let path = require('path');
let filePath = path.join.bind(path, __dirname);

module.exports = function RestApiInterface(app) {

  require(filePath('posts', 'router.js'))(app);
  
};
