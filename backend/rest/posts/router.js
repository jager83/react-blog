"use strict";

let path = require('path');
let filePath = path.join.bind(path, __dirname);

let ReadCtrl = require(filePath('read', 'ReadCtrl.js'));

module.exports = function RestApiPostsInterface(app) {

  app
    .route('/posts/:id?')

    .get(ReadCtrl)
  ;

};
