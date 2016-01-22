const fs = require('fs');
const path = require('path');
const express = require('express');

const router = express.Router();

router.get('/', function (req, res) {
  res.send('Add a Project or Owner id to the URL bar!');
});

router.get('/:owner', [
  require('./owner-project-list'),
  require('./redirect-to-project')
]);

router.get([
  '/:owner/:project',
  '/:owner/:project/report',
  '/:owner/:project/presentation'
], [
  require('./cache-project'),
  require('./render-project')
]);

// :type is the /report or /presentation url fragment
// since it's virtual we map the file path by omitting it
router.get('/:owner/:project/:type/:asset', function (req, res, next) {
  const p = req.params;
  res.sendFile(path.join(req.app.locals.cacheDir, p.owner, p.project, p.asset));
});

// reveal.js assets
router.use('/:owner/:project/presentation', express.static('public/reveal'));

module.exports = router;
