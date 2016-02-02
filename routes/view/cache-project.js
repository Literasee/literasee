var fs = require('fs');
var path = require('path');
var request = require('superagent');
var async = require('async');
var mongoose = require('mongoose');
var _ = require('lodash');
var tar = require('tar');
var zlib = require('zlib');

var ownerId;
var ownerDir;
var gistId;
var gistDir;
var gistLastModified;
var lastModifiedFilename;

const utf8Encoding = {encoding: 'utf8'};
const base64Encoding = {encoding: 'base64'};
const qs = '?client_id=' + process.env.GH_CLIENT_ID + '&client_secret=' + process.env.GH_CLIENT_SECRET;

module.exports = function (req, res, next) {
  ownerId = req.params.owner;
  gistId = req.params.project;
  lastModifiedFilename = req.app.locals.lastModifiedFilename;

  ownerDir = path.join(req.app.locals.cacheDir, ownerId);
  gistDir = path.join(req.app.locals.cacheDir, ownerId, gistId);
  var gistDetails;
  var isRepo;

  console.log(req.app.locals.cacheDir);

  // see if we have this Gist cached
  // if not we set a last modified time of epoch
  // to ensure we pull from GitHub API
  const checkLastModified = (cb) => {
    fs.readFile(path.join(gistDir, lastModifiedFilename), utf8Encoding, (err, result) => {
      if (err) {
        gistLastModified = new Date(0).toUTCString(); // epoch
      } else {
        gistLastModified = result;
      }
      cb();
    });
  };

  // call the GitHub API to get Gist details
  // we pass the If-Modified-Since header to avoid overhead
  // and counting against the rate limit if the Gist hasn't changed
  // since we last put it in the cache
  const fetchGistDetails = (cb) => {
    request
      .get('https://api.github.com/gists/' + gistId + qs)
      .set('Accept', 'application/vnd.github.VERSION.base64+json')
      .set('If-Modified-Since', gistLastModified)
      .end(function (err, res) {
        if (res.status === 304) {
          console.log('Gist has not changed. Reading from disk.');
          cb(err); // pass error to skip the rest of series
        } else if (res.status === 404) {
          isRepo = true;
          cb();
        } else {
          gistDetails = res.body;
          gistLastModified = res.headers['last-modified'];
          cb();
        }
      });
  };

  const fetchRepoDetails = (cb) => {
    if (!isRepo) return cb();

    request
      .get('https://api.github.com/repos/' + ownerId + '/' + gistId + '/contents' + qs)
      .set('If-Modified-Since', gistLastModified)
      .end(function (err, res) {
        console.log(JSON.stringify(res, null, 2));
        console.log('last modified:', gistLastModified);
        if (res.status === 304) {
          console.log('Repo has not changed. Reading from disk.');
          cb(err); // pass error to skip the rest of series
        } else {
          gistDetails = _.reduce(res.body, function (acc, item) {
            if (item.type === 'file') acc.files[item.name] = item;

            return acc;
          }, {files: {}});
          gistLastModified = res.headers['last-modified'];
          cb();
        }
      });
  };

  const mkdirIfMissing = (dir) => {
    return (cb) => {
      fs.stat(dir, function (err, stat) {
        if (err) {
          fs.mkdir(dir, cb);
        } else {
          cb();
        }
      });
    };
  };

  const fetchRepoArchive = (cb) => {
    if (!isRepo) return cb();

    var tarballPath = path.join(ownerDir, gistId + '.tar.gz');
    var stream = fs.createWriteStream(tarballPath);
    request
      .get('https://api.github.com/repos/' + ownerId + '/' + gistId + '/tarball' + qs)
      .pipe(stream)
      .on('close', () => {
        fs.createReadStream(tarballPath)
          .pipe(zlib.createGunzip())
          .pipe(tar.Extract({path: gistDir, strip: 1}))
          .on('close', () => fs.unlink(tarballPath, cb));
      });
  };

  const writeLastModifiedFile = (cb) => {
    fs.writeFile(path.join(gistDir, lastModifiedFilename), gistLastModified, utf8Encoding, cb);
  };

  const writeGistContentsFile = (cb) => {
    fs.writeFile(path.join(gistDir, req.app.locals.dataFilename), JSON.stringify(gistDetails, null, 2), utf8Encoding, cb);
  };

  const writeGistFiles = (cb) => {
    if (isRepo) return cb();
    async.forEachOf(gistDetails.files, (item, key, callback) => {
      var fullPath = path.join(gistDir, key); // where the file will be stored
      fs.writeFile(fullPath, item.content, base64Encoding, callback);
    }, cb);
  };

  const storeKeywords = (cb) => {
    if (!gistDetails.files['keywords.txt']) return cb();

    fs.readFile(path.join(gistDir, 'keywords.txt'), utf8Encoding, function (err, results) {
      const g = new req.app.locals.models.Gist({
        id: gistDetails.id,
        details: JSON.stringify(gistDetails),
        keywords: _.trim(results).split('\n')
      });
      g.save(cb);
    });
  };

  // step through everything needed to load and cache a Gist
  // if we have the latest version cached
  // we will bail out after fetchGistDetails
  async.series([
    checkLastModified,
    fetchGistDetails,
    fetchRepoDetails,
    mkdirIfMissing(ownerDir),
    mkdirIfMissing(gistDir),
    fetchRepoArchive,
    writeLastModifiedFile,
    writeGistContentsFile,
    writeGistFiles,
    storeKeywords
  ], (err, results) => {
    next();
  });
};
