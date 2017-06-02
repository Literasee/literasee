const async = require('async');
const _ = require('lodash');
const requests = require('./requestFactory');
const data = require('../../persistence');


module.exports = function (req, res, next) {
  requests.createRepoFile(req)
    .end((err, result) => {
      res.json(result);
    });
};
