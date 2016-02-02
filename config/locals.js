var path = require('path');

module.exports = function (locals) {
  locals.cacheDir = path.join(__dirname, '..', 'cache');
  locals.viewsDir = path.join(__dirname, '..', 'views');
  locals.dataFilename = '_data_.json';
  locals.lastModifiedFilename = '_etag_.txt';
  locals.validFiles = [
    'report.md',
    'presentation.md'
  ];
  locals.views = {};
  locals.models = {};
  return locals;
};
