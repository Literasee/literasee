import https from 'https';
import imageSizeStream from 'image-size-stream';

export default function (url, cb) {
  var stream = imageSizeStream();

  stream
    .on('size', (dimensions) => {
      cb(null, dimensions);
      req.abort();
    })
    .on('error', (err) => {
      throw err;
    });

  const req = https.get(url, function(res) {
    res.pipe(stream);
  });
}
