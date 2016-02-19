const fs = require('fs');
const path = require('path');
const express = require('express');
const request = require('superagent');
const async = require('async');
const cors = require('cors');

const router = express.Router();

const corsOptions = {
  origin: [
    /\.dev\.com:3000$/,
    /\.literasee\.io$/,
    /\.literasee\.org$/
  ],
  methods: ['POST'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true
};
router.use(cors(corsOptions));
router.options('*', cors(corsOptions));

router.use(require('cookie-parser')());
router.use(require('body-parser').json());

router.get('/projects', function (req, res) {
  const fetchGists = (cb) => {
    request
      .get('https://api.github.com/gists' + req.app.locals.authQueryString)
      .set('Authorization', req.headers.authorization)
      .set('Accept', 'application/vnd.github.v3')
      .end(cb);
  }

  const fetchRepos = (cb) => {
    request
      .get('https://api.github.com/user/repos' + req.app.locals.authQueryString)
      .set('Authorization', req.headers.authorization)
      .set('Accept', 'application/vnd.github.v3')
      .end(cb);
  }

  async.parallel({
    gists: fetchGists,
    repos: fetchRepos
  }, (err, results) => {
    const projects = results.gists.body.concat(results.repos.body);

    res.json(projects.sort(function (a, b) {
      return Date.parse(b.updated_at) - Date.parse(a.updated_at);
    }));

    const Project = req.app.locals.models.Project;
    projects.forEach(project => {
      Project.findOne({id: project.full_name || project.id}, (dbErr, p) => {
        if (!p) p = new Project({id: project.full_name || project.id});
        p.username = req.cookies['literasee-username'];
        p.isRepo = !!project.full_name;
        p.summary_json = JSON.stringify(project);
        p.save();
      })
    })
  })
});

router.get('/project/:owner/:project', [
  require('../view/cache-project'),
  function (req, res) {
    const cacheDir = req.app.locals.cacheDir;
    const dataFilename = req.app.locals.dataFilename;
    const username = req.params.owner;
    const id = req.params.project;
    const dir = path.join(cacheDir, username, id);

    async.parallel({
      data: cb => fs.readFile(path.join(dir, dataFilename), {encoding: 'utf8'}, cb),
      report: cb => fs.readFile(path.join(dir, 'report.md'), {encoding: 'utf8'}, cb),
      presentation: cb => fs.readFile(path.join(dir, 'presentation.md'), {encoding: 'utf8'}, cb),
      keywords: cb => fs.readFile(path.join(dir, 'keywords.txt'), {encoding: 'utf8'}, cb)
    }, (err, results) => {
      results.data = JSON.parse(results.data);
      results.data.isRepo = results.data.issues_url !== undefined;
      results.data.files['report.md'].content = results.report;
      results.data.files['presentation.md'].content = results.presentation;
      results.data.files['keywords.txt'].content = results.keywords;
      res.json(results.data);
    })
  }
]);

router.post('/project/:owner/:project', require('./save-project-file'));

module.exports = router;
