const fs = require('fs');
const path = require('path');
const async = require('async');
const express = require('express');
const engines = require('consolidate');

const app = express();

// define app settings
app.locals = require('./config/locals')(app.locals);

// configure views
app.set('views', app.locals.viewsDir);
app.set('view engine', 'hbs');
app.engine('hbs', engines.handlebars);

app.get('*', function (req, res, next) {
  // use redirect to ensure trailing slashes in the address bar
  // without the slash, assets requested by the page do not have
  // enough context to match them to their parent gist
  if (req.url.lastIndexOf('.') < 0 && req.url.slice(-1) !== '/') {
    res.redirect(301, req.url + '/');
  } else {
    next();
  }
});

app.use('/public', express.static('public'));
app.use('/view', require('./routes/view'));

module.exports = function (local, port) {
  port = port || process.env.PORT || 3000;

  async.parallel([
    require('./config/create-dir-if-missing')(app.locals.cacheDir),
    require('./config/read-views')(app.locals.viewsDir, app.locals.views),
    require('./config/set-up-db')(app.locals.models)
  ], function (err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    app.listen(port, function () {
      console.log('Server listening at http://localhost:' + port);
    });
  });
};
