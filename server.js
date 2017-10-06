const path = require('path')
const express = require('express')
const engines = require('consolidate')
const favicon = require('serve-favicon')
const db = require('./persistence/db')

const app = express()

app.use(favicon(path.join(__dirname, 'public/favicon.ico')))
app.use(require('cookie-parser')())

// configure views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.engine('hbs', engines.handlebars)

app.set('x-powered-by', false)
app.set('json spaces', 2)

// local dev only
if (!process.env.PORT) {
  var config = require('./webpack.dev')
  var compiler = require('webpack')(config)

  app.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath,
    }),
  )
}

app.use('/public', express.static('public'))

app.use('/preview', require('./routes/preview'))
app.use('/api', require('./routes/api'))
app.use('/', require('./routes/edit'))

// the React app is the fallback for all routes
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'routes', 'edit', 'index.html'))
})

module.exports = function(local, port) {
  port = port || process.env.PORT || 3000

  db.open().then(function() {
    app.listen(port, function() {
      console.log('Server listening at http://literasee.local:' + port)
    })
  })
}
