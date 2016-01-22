const fs = require('fs');
const path = require('path');
const express = require('express');
const request = require('superagent');

const router = express.Router();

//
// OAUTH CALLBACK
//
router.use(function (req, res, next) {
  // if a URL param named code was sent
  // we're on the final step of the OAuth process
  // if the param wasn't sent we do nothing
  // and pass to the next handler
  if (!req.query.code) return next();

  console.log(req.query.code);
  console.log(req.query.state);

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
      console.log(result.body);
      var token = result.body.access_token;
      console.log(token);
      if (!token) return res.end();
      // we store the token in a cookie for use by the app
      // and set it to expire in a month
      res.cookie('literasee-token', token, {
        expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 30))
      });

      // use the token to get info about the current user
      request
        .get('https://api.github.com/user')
        .set('Authorization', 'token ' + token)
        .end(function (err2, result) {
          // store the user's GitHub id in a cookie too
          res.cookie('literasee-username', result.body.login, {
            expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 30))
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
