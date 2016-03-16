const fs = require('fs');
const path = require('path');
const express = require('express');
const request = require('superagent');
const async = require('async');
const cors = require('cors');

const router = express.Router();

const corsOptions = {
  origin: [
    /\.?dev\.com:3000$/,
    /\.?literasee\.(io|org)$/
  ],
  methods: ['POST'],
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
  require('./get-repo-from-github')
]);
router.put('/projects/:owner/:project', require('./save-project-file'));
router.patch('/projects/:owner/:project', require('./update-project-description'));

module.exports = router;
