const express = require('express');

const router = express.Router();

router.use(require('cookie-parser')());

router.get('/:owner', require('./owner-project-list'));

router.get('/:owner/:project/:type?/:asset?', [
  require('../api/get-project-from-db'),
  require('../api/get-gist-from-github'),
  require('../api/get-repo-from-github'),
  require('../api/redirect-if-missing-type'),
  require('./render-report'),
  require('./render-presentation'),
  require('./serve-asset')
]);

module.exports = router;
