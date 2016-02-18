const fs = require('fs');
const path = require('path');
const express = require('express');
const request = require('superagent');

const router = express.Router();

//
// USER LOG OUT
//
router.get('/logout', function (req, res) {
  res.clearCookie('literasee-token');
  res.clearCookie('literasee-username');
  res.redirect('/');
})

//
// IMAGE UPLOAD
//
var cloudinary = require('cloudinary')
var formidable = require('formidable')

router.get('/images/:username', function (req, res) {
  cloudinary
    .api
    .resources_by_tag(req.params.username, function (result) {
      res.send(result)
    }, {max_results: 100});
})

router.post('/add_image', function (req, res, next) {
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    var keys = Object.keys(files);
    var count = 0;
    var urls = [];

    keys.forEach((key) => {
      cloudinary
        .uploader
        .upload(files[key].path, function (upload) {
          count++;
          urls.push(upload.url)
          if (count === keys.length) res.send(JSON.stringify(urls))
        }, {
          tags: [
            fields.username
          ]
        })
    })

  });
});

//
// OAUTH CALLBACK
//
router.use(function (req, res, next) {
  // if a URL param named code was sent
  // we're on the final step of the OAuth process
  // if the param wasn't sent we do nothing
  // and pass to the next handler
  if (!req.query.code) return next();

  // trim subdomain so cookies are shared
  const domain = req.hostname.substr(req.hostname.indexOf('.'));
  // 30 day expiration
  const expires = new Date(Date.now() + (1000 * 60 * 60 * 24 * 30));

  // send both tokens and the code to GitHub
  request
    .post('https://github.com/login/oauth/access_token')
    .send({
      client_id: process.env.GH_CLIENT_ID,
      client_secret: process.env.GH_CLIENT_SECRET,
      code: req.query.code
    })
    .end(function (err, result) {
      // now we have the actual token we'll use to make authenticated requests
      var token = result.body.access_token;
      if (!token) return res.end();
      // we store the token in a cookie for use by the app
      // and set it to expire in a month
      res.cookie('literasee-token', token, {
        domain,
        expires
      });

      // use the token to get info about the current user
      request
        .get('https://api.github.com/user')
        .set('Authorization', 'token ' + token)
        .set('Accept', 'application/vnd.github.v3')
        .end(function (err2, result) {
          // store the user's GitHub id in a cookie too
          res.cookie('literasee-username', result.body.login, {
            domain,
            expires
          });
          // finally, send the user to their own URL
          res.redirect(result.body.login);
        });
    });
});

router.use(function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = router;
