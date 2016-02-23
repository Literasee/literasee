const fs = require('fs');
const path = require('path');
const express = require('express');

const router = express.Router();

router.use(require('cookie-parser')());

router.get('/', function (req, res) {
  res.send('Add a Project or Owner id to the URL bar!');
});

router.get('/:owner', [
  require('./owner-project-list'),
  require('./redirect-to-project')
]);

router.get('/:owner/:project/presentation.md', function (req, res, next) {
  const p = req.params;
  res.sendFile(path.join(req.app.locals.cacheDir, p.owner, p.project, 'presentation.md'));
});

router.get([
  '/:owner/:project',
  '/:owner/:project/:type'
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


module.exports = router;
