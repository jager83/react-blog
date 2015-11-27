"use strict";

let path = require('path');
let fs = require('fs');
let Promise = require('bluebird');
let _ = require('lodash');

const db = require(path.join(__dirname, '..', 'data', 'db.json'));

function ReadCtrl(req, res) {
  var params = req.query;

  var ORDER_DESC = ((params.orderBy || '').toUpperCase() === 'DESC');
  var page = Number(params.page) > 0 ? Number(params.page) : 1;
  var itemsPerPage = Number(params.itemsPerPage) > 0 ? Number(params.itemsPerPage) : 10;

  return Promise
    .resolve(db)
    .then((posts) => {

      let first = (page - 1) * itemsPerPage;
      let last = first + (itemsPerPage);

      return posts.slice(first, last);
    })
    .then(posts => {

      if(ORDER_DESC) {
        return posts.reverse();
      }

      return posts;
    })
    .then(posts => {

      return res.status(200).json(posts);
    })
    ;
}

module.exports = ReadCtrl;
