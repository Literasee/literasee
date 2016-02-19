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
      .set('Accept', 'application/vnd.github.v3.base64+json')
      .set('If-None-Match', gistLastModified)
      .end(function (err, res) {
        if (res.status === 304) {
          console.log('Gist has not changed. Reading from disk.');
          cb(err); // pass error to skip the rest of series
        } else if (res.status === 404) {
          isRepo = true;
          cb();
        } else {
          gistDetails = res.body;
          gistLastModified = res.headers['etag'];
          cb();
        }
      });
  };

  const fetchRepoInfo = (cb) => {
    if (!isRepo) return cb();

    request
      .get('https://api.github.com/repos/' + ownerId + '/' + gistId + qs)
      .set('If-None-Match', gistLastModified)
      .set('Accept', 'application/vnd.github.v3')
      .end(function (err, res) {
        if (res.status === 304) {
          console.log('Repo has not changed. Reading from disk.');
          cb(err); // pass error to skip the rest of series
        } else {
          gistDetails = res.body;
          gistDetails.id = gistDetails.name;
          gistLastModified = res.headers['etag'];
          cb();
        }
      });
  };

  const fetchRepoContents = (cb) => {
    if (!isRepo) return cb();

    request
      .get('https://api.github.com/repos/' + ownerId + '/' + gistId + '/contents' + qs)
      .set('Accept', 'application/vnd.github.v3')
      .end(function (err, res) {
        gistDetails.files = _.reduce(res.body, function (acc, item) {
          if (item.type === 'file') {
            item.filename = item.name;
            acc[item.name] = item;
          }

          return acc;
        }, {});
        cb();
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
      .set('Accept', 'application/vnd.github.v3')
      .pipe(stream)
      .on('close', () => {
        fs.createReadStream(tarballPath)
          .pipe(zlib.createGunzip())
          .pipe(tar.Extract({path: gistDir, strip: 1}))
          .on('close', () => {
            fs.stat(tarballPath, (err, stat) => {
              // tarball may have already been deleted
              if (err) return cb();
              fs.unlink(tarballPath, cb);
            })
          });
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

  // step through everything needed to load and cache a Gist
  // if we have the latest version cached
  // we will bail out after fetchGistDetails
  async.series([
    checkLastModified,
    fetchGistDetails,
    fetchRepoInfo,
    fetchRepoContents,
    mkdirIfMissing(ownerDir),
    mkdirIfMissing(gistDir),
    fetchRepoArchive,
    writeLastModifiedFile,
    writeGistContentsFile,
    writeGistFiles
  ], (err, results) => {
    next();
  });
};
