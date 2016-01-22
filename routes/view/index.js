const fs = require('fs');
const path = require('path');
const express = require('express');

const router = express.Router();

router.use(function (req, res, next) {
  // use redirect to ensure trailing slashes in the address bar
  // without the slash, assets requested by the page do not have
  // enough context to match them to their parent gist
  if (req.url.lastIndexOf('.') < 0 && req.url.slice(-1) !== '/') {
    res.redirect(301, req.url + '/');
  } else {
    next();
  }
});

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
