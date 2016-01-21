var request = require('superagent');

module.exports = function (req, res, next) {
  var owner = req.params.owner

  request
    .get('https://api.github.com/users/' + owner + '/gists')
    .end(function (err, result) {
      if (err) {
        next()
        return
      }

      res.render('owner', {
        owner: owner,
        gists: result.body.filter(function (gist) {
          var isValid = false
          req.app.locals.validFiles.forEach(function (file) {
            if (gist.files[file]) isValid = true
          })
          return isValid
        }).map(function (gist) {
          return {
            label: gist.description || gist.id,
            url: [owner, gist.id].join('/'),
            bgImage: gist.files['thumbnail.png'] ? gist.files['thumbnail.png'].raw_url : null
          }
        })
      })
    })
}
