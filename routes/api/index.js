const express = require('express');
const cors = require('cors');

const router = express.Router();

const corsOptions = {
  origin: [
    /\.?dev\.com:3000$/,
    /\.?literasee\.(io|org)$/
  ],
  methods: ['GET', 'PUT', 'PATCH'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true
};
router.use(cors(corsOptions));
router.options('*', cors(corsOptions));

router.use(require('cookie-parser')());
router.use(require('body-parser').json({limit: '10mb'}));

//
// actual routes
//

router.get('/projects/featured', require('./get-featured-projects'));
router.get('/projects/:owner', require('./get-projects-by-owner'));
router.get('/projects/:owner/:project', [
  require('./get-project-from-db'),
  require('./get-gist-from-github'),
  require('./get-repo-from-github'),
  function (req, res) {
    res.json(res.locals.project);
  }
]);
router.put('/projects/:owner/ignore', require('./ignore-project'));
router.put('/projects/:owner/:project', require('./save-project-file'));
router.patch('/projects/:owner/:project', require('./update-project-description'));

module.exports = router;
