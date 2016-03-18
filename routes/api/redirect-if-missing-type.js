const path = require('path');

module.exports = function (req, res, next) {
  if (req.params.type) return next();

  const type = res.locals.project.report ? 'report' : 'presentation';
  return res.redirect(path.join(req.originalUrl, type));
};
