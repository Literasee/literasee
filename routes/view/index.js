const express = require('express')

const router = express.Router()

router.use(require('cookie-parser')())

router.get('/:owner/:project/:asset?', [
  function(req, res, next) {
    if (req.subdomains.indexOf('edit') > -1) return next('route')
    next()
  },
  // require('../api/get-project-from-db'),
  // require('../api/get-repo-from-github'),
  // require('./verify-or-get-short-url'),
  require('./render-idyll'),
  require('./serve-asset'),
])

module.exports = router
