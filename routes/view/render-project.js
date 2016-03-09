var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var marked = require('marked');
var sizeOf = require('image-size');
var insertProjectInfo = require('./insert-project-info');
var compile = require('handlebars').compile;
var async = require('async');

var ownerId;
var gistId;
const utf8Encoding = {encoding: 'utf8'};

// parse triple dashes as section dividers
function mdToSections (text) {
  var slideRegExp = new RegExp(/\r?\n+---\r?\n+/g);
  var matches;
  var lastIndex = 0;
  var output = '';
  var wrapInSection = function (text) {
    return '<section>' + text + '</section>';
  };

  while ((matches = slideRegExp.exec(text)) !== null) {
    output += wrapInSection(marked(text.substring(lastIndex, matches.index)));
    lastIndex = slideRegExp.lastIndex;
  }

  output += wrapInSection(marked(text.substring(lastIndex)));
  return output;
}

module.exports = function (req, res, next) {
  'use strict';

  ownerId = req.params.owner || 'anon';
  gistId = req.params.project;

  const bodyToken = '{{{body}}}';
  const gistDir = req.app.locals.localDevDir || path.join(req.app.locals.cacheDir, ownerId, gistId);

  let html = req.app.locals.views['gist.html'].split(bodyToken);
  let gist;
  let gistFilenames;
  let parallaxBackground;
  let noIndexFile;
  let scripts = [
    '/public/d3.min.js',
    '/public/d3-maximize.min.js',
    '//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML'
  ];
  let styles = [
    '/public/gist-info.css'
  ];
  let context = { owner: ownerId };
  let isReportUrl = req.params.type === 'report';
  let isPresentationUrl = req.params.type === 'presentation';
  let hasReport = false;
  let hasPresentation = false;

  const getGistFilePath = (filename) => {
    return path.join(gistDir, filename);
  };

  // steps

  const redirectIfNeeded = (cb) => {
    fs.readdir(gistDir, (err, files) => {
      hasPresentation = _.includes(files, 'presentation.md');
      hasReport = _.includes(files, 'report.md');

      if (err) return cb(err);

      if (!hasReport && !hasPresentation) {
        // if no valid files found, bail out and warn
        res.send('No valid files found. Valid files are ' + req.app.locals.validFiles.join(', '));
        return cb(true);
      } else {
        // if requesting a specific project type, ensure a trailing slash
        if ((isReportUrl && hasReport) || (isPresentationUrl && hasPresentation)) {
          if (req.originalUrl.substr(-1) === '/') return cb();

          res.redirect(req.originalUrl + '/');
          return cb(true);
        }

        // default redirect is report, if valid
        if (hasReport) {
          res.redirect(path.join(req.originalUrl, 'report'));
          return cb(true);
        }

        // fallback redirect is presentation
        if (hasPresentation) {
          res.redirect(path.join(req.originalUrl, 'presentation'));
          return cb(true);
        }
      }
    });
  };

  const getGistDetails = (cb) => {
    fs.readFile(getGistFilePath(req.app.locals.dataFilename), utf8Encoding, (err, data) => {
      gist = JSON.parse(data);
      cb(err, data);
    });
  };

  const getGistFiles = (cb) => {
    fs.readdir(gistDir, (err, files) => {
      gistFilenames = files;
      files.sort();

      files.forEach(function (filename) {
        if (filename.substr(-3) === '.js') scripts.push(filename);
        if (filename.substr(-4) === '.css') styles.push(filename);
        if (filename.indexOf('parallax') === 0 && gist.files[filename]) parallaxBackground = filename;
      });
      cb(err, files);
    });
  };

  const populateContext = (cb) => {
    context.title = gist.description ? gist.description.split(' | ')[0] : gist.id;
    context.scripts = scripts;
    context.styles = styles;
    context.gist_url = gist.html_url;
    cb();
  };

  const serveReport = (cb) => {
    if (!isReportUrl) return cb();

    fs.readFile(getGistFilePath('report.md'), utf8Encoding, (err, data) => {
      html = html[0] + '<div class="container">' + bodyToken + '</div>' + html[1];
      context.body = marked(data);
      context.styles.unshift('/public/nciea.css');
      cb(err, data);
    });
  };

  const servePresentation = (cb) => {
    if (!isPresentationUrl) return cb();

    html = req.app.locals.views['presentation.html'];
    if (parallaxBackground) {
      var dim = sizeOf(getGistFilePath(parallaxBackground));
      html = html.split("parallaxBackgroundImage: '").join("parallaxBackgroundImage: '" + parallaxBackground);
      html = html.split("parallaxBackgroundSize: '").join("parallaxBackgroundSize: '" + dim.width + 'px ' + dim.height + 'px');
    }
    cb();
  };

  async.series([
    redirectIfNeeded,
    getGistDetails,
    getGistFiles,
    populateContext,
    serveReport,
    servePresentation
  ], (err, results) => {
    if (typeof err === 'boolean') return; // either redirect or error message
    if (err) {
      console.log(err);
      return res.send('Something went wrong.');
    }

    if (req.cookies.token) {
      let host = req.hostname;
      if (host.indexOf('view') === 0) {
        host = host.replace('view', 'edit');
      } else {
        host = 'edit.' + host;
      }
      context.editUrl = req.protocol + '://' + host + req.originalUrl;
    }

    if (!req.query.embedded) {
      html = insertProjectInfo(html, req.app.locals.views['gist-info.html']);
    }

    res.send(compile(html)(context));
  });
};
