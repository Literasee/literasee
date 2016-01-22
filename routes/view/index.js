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

// reveal.js assets
router.use('/:owner/:project/presentation', express.static('public/reveal'));

// pull presentation.md from project dir
router.get('/:owner/:project/presentation/presentation.md', function (req, res) {
  const mdPath = path.join(req.app.locals.cacheDir, req.params.owner, req.params.project, 'presentation.md');
  fs.readFile(mdPath, {encoding: 'utf8'}, (err, data) => {
    if (err) throw err

    res.send(data);
  });
});

module.exports = router;
