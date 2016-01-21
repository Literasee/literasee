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

  const getGistFilePath = (filename) => {
    return path.join(gistDir, filename);
  };

  // steps

  const getGistDetails = (cb) => {
    fs.readFile(getGistFilePath(req.app.locals.dataFilename), utf8Encoding, (err, data) => {
      gist = data;
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

  const servePresentation = (cb) => {
    if (req.url.substr(-14) !== '/presentation/') return cb();

    html = req.app.locals.views['presentation.html'];
    if (parallaxBackground) {
      var dim = sizeOf(getGistFilePath(parallaxBackground));
      html = html.split("parallaxBackgroundImage: '").join("parallaxBackgroundImage: '" + parallaxBackground);
      html = html.split("parallaxBackgroundSize: '").join("parallaxBackgroundSize: '" + dim.width + 'px ' + dim.height + 'px');
    }
    cb();
  };

  const serveTufte = (cb) => {
    if (req.url.substr(-7) !== '/tufte/') return cb();

    fs.readFile(getGistFilePath('tufte.md'), utf8Encoding, (err, data) => {
      html = html[0] + '<article>' + bodyToken + '</article>' + html[1];
      context.body = mdToSections(data);
      context.styles.unshift('/public/tufte.css');
      cb(err, data);
    });
  };

  const serveIndexMarkdown = (cb) => {
    if (req.url.substr(-14) === '/presentation/') return cb();
    if (req.url.substr(-7) === '/tufte/') return cb();
    if (!_.includes(gistFilenames, 'index.md')) {
      noIndexFile = true;
      return cb();
    }

    fs.readFile(getGistFilePath('index.md'), utf8Encoding, (err, data) => {
      html = html[0] + '<div class="container">' + bodyToken + '</div>' + html[1];
      context.body = marked(data);
      context.styles.unshift('/public/nciea.css');
      cb(err, data);
    });
  };

  const checkForPresentationRedirect = (cb) => {
    if (noIndexFile && _.includes(gistFilenames, 'presentation.md')) {
      res.redirect(req.originalUrl + 'presentation/');
      return cb(true);
    }
    cb();
  };

  const checkForTufteRedirect = (cb) => {
    if (noIndexFile && _.includes(gistFilenames, 'tufte.md')) {
      res.redirect(req.originalUrl + 'tufte/');
      return cb(true);
    }
    cb();
  };

  const informNoValidFiles = (cb) => {
    if (noIndexFile) {
      res.send('No valid files found. Valid files are ' + req.app.locals.validFiles.join(', '));
      return cb(true);
    }
    cb();
  };

  async.series([
    getGistDetails,
    getGistFiles,
    populateContext,
    servePresentation,
    serveTufte,
    serveIndexMarkdown,
    checkForPresentationRedirect,
    checkForTufteRedirect,
    informNoValidFiles
  ], (err, results) => {
    if (typeof err === 'boolean') return; // either redirect or error message
    if (err) throw err

    if (gist.public) {
      html = insertProjectInfo(html, req.app.locals.views['gist-info.html']);
    }

    res.send(compile(html)(context));
  });
};
