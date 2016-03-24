const path = require('path');
const express = require('express');
const subdomain = require('express-subdomain');
const engines = require('consolidate');
const favicon = require('serve-favicon');
const db = require('./persistence/db');

const app = express();

app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
app.use(require('cookie-parser')());

// configure views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', engines.handlebars);

app.set('x-powered-by', false);
app.set('json spaces', 2);

// local dev only
if (!process.env.PORT) {
  var config = require('./webpack.config.dev');
  var compiler = require('webpack')(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use('/public', express.static('public'));

const apiRouter = require('./routes/api');
app.use(subdomain('api', apiRouter));
app.use('/api', apiRouter);

const viewRouter = require('./routes/view');
app.use(subdomain('view', viewRouter));
app.use('/view', viewRouter);
app.use('/', viewRouter);

const editRouter = require('./routes/edit');
app.use(subdomain('edit', editRouter));
app.use('/edit', editRouter);

// the React app is the fallback for all routes
app.use(function (req, res) {
  res.sendFile(path.join(__dirname, 'routes', 'edit', 'index.html'));
});

module.exports = function (local, port) {
  port = port || process.env.PORT || 3000;

  db.open()
    .then(function () {
      app.listen(port, function () {
        console.log('Server listening at http://localhost:' + port);
      });
    });
};
