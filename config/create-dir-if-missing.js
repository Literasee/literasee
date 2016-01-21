const fs = require('fs');

module.exports = function (dir) {
  return function (cb) {
    fs.stat(dir, function (err, stat) {
      if (err) return fs.mkdir(dir, cb);

      cb();
    });
  };
};
