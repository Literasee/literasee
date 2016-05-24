const express = require('express');

const router = express.Router();

router.use(require('cookie-parser')());

router.get('/:owner/:project/:type?/:asset?', [
  function (req, res, next) {
    if (req.subdomains.indexOf('edit') > -1) next('route');
    next();
  },
  require('../api/get-project-from-db'),
  require('../api/get-gist-from-github'),
  require('../api/get-repo-from-github'),
  require('../api/redirect-if-missing-type'),
  require('./verify-or-get-short-url'),
  require('./render-report'),
  require('./render-presentation'),
  require('./serve-asset')
]);

module.exports = router;
