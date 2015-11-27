"use strict";

let path = require('path');
let fs = require('fs');
let Promise = require('bluebird');

const db = require(path.join(__dirname, '..', 'data', 'db.json'));

function ReadCtrl(req, res) {

  return Promise
    .resolve(db)
    .then((posts) => {

      return posts;
    })
    .then(posts => {

      return res.status(200).json(posts);
    })
  ;
}

module.exports = ReadCtrl;
