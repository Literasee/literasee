var path = require('path');

module.exports = function (locals) {
  locals.cacheDir = path.join(process.cwd(), 'cache');
  locals.viewsDir = path.join(process.cwd(), 'views');
  locals.dataFilename = '_data_.json';
  locals.lastModifiedFilename = '_last-modified_.txt';
  locals.validFiles = [
    'index.html',
    'index.md',
    'presentation.md',
    'tufte.md'
  ];
  locals.views = {};
  locals.models = {};
  return locals;
};
