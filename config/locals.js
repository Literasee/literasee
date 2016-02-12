var path = require('path');
const querystring = require('querystring');

module.exports = function (locals) {
  locals.cacheDir = path.join(__dirname, '..', 'cache');
  locals.viewsDir = path.join(__dirname, '..', 'views');
  locals.dataFilename = '_data_.json';
  locals.lastModifiedFilename = '_etag_.txt';
  locals.validFiles = [
    'report.md',
    'presentation.md'
  ];
  locals.authQueryString = '?' + querystring.stringify({
    client_id: process.env.GH_CLIENT_ID,
    client_secret: process.env.GH_CLIENT_SECRET
  });
  locals.views = {};
  locals.models = {};
  return locals;
};
