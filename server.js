const { join } = require('path')
const { existsSync } = require('fs')
const express = require('express')
const engines = require('consolidate')
const favicon = require('serve-favicon')
const db = require('./persistence/db')

const app = express()

app.use(favicon(join(__dirname, 'public/favicon.ico')))
app.use(require('cookie-parser')())

// configure views
app.set('views', join(__dirname, 'views'))
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

// serve assets requested by previews
app.use('/:owner/:name/:asset', (req, res, next) => {
  const { owner, name, asset } = req.params
  const dir = join(__dirname, 'tmp', owner, name)

  if (!existsSync(dir)) {
    return res.status(404).send('Project does not exist.')
  }
  if (!asset.includes('.')) {
    return next()
  }

  res.setHeader('Cache-Control', 'no-cache')
  res.sendFile(join(dir, asset))
})

// the React app is the fallback for all routes
app.use(function(req, res) {
  res.sendFile(join(__dirname, 'routes', 'edit', 'index.html'))
})

module.exports = function(local, port) {
  port = port || process.env.PORT || 3000

  db.open().then(function() {
    app.listen(port, function() {
      console.log('Server listening at http://literasee.local:' + port)
    })
  })
}
