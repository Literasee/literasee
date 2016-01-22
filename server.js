const fs = require('fs');
const path = require('path');
const async = require('async');
const express = require('express');
const subdomain = require('express-subdomain');
const engines = require('consolidate');

const app = express();

// define app settings
app.locals = require('./config/locals')(app.locals);

// configure views
app.set('views', app.locals.viewsDir);
app.set('view engine', 'hbs');
app.engine('hbs', engines.handlebars);

app.use('/public', express.static('public'));

const viewRouter = require('./routes/view');
app.use(subdomain('view', viewRouter));
app.use('/view', viewRouter);

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
