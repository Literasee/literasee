const data = require('../../persistence');

module.exports = function (req, res, next) {

  const resolve = (result) => {
    if (result) {
      res.locals.project = result;
      res.locals.etag = result.etag;
    }

    next();
  }

  const reject = (err) => {
    res.status(500).json(err);
  }

  return data.getProject(req.params)
    .then(resolve, reject);
};
