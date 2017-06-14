const https = require('https')
const imageSizeStream = require('image-size-stream')

module.exports = function(url, cb) {
  var stream = imageSizeStream()

  stream
    .on('size', dimensions => {
      cb(null, dimensions)
      req.abort()
    })
    .on('error', err => {
      throw err
    })

  const req = https.get(url, function(res) {
    res.pipe(stream)
  })
}
