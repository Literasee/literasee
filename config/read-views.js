const fs = require('fs');
const path = require('path');
const readFiles = require('readdirfiles');

module.exports = function (dir, obj) {
  return function (cb) {
    readFiles(dir, 'utf8', function (err, files) {
      if (err) return cb(err);

      files.forEach(function (file) {
        obj[file.path.split(path.sep).pop()] = file.content;
      });

      cb();
    });
  };
};
