const path = require('path');
const express = require('express');

const router = express.Router();

router.get('/', function (req, res) {
  res.send('Add a Gist or Owner id to the URL bar!');
});

router.get('/:owner', [
  require('./owner-project-list'),
  require('./redirect-to-project')
]);

router.get('/:owner/:project', [
  require('./cache-project'),
  require('./render-project')
]);

module.exports = router;
