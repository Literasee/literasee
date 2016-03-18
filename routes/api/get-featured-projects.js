const data = require('../../persistence');

module.exports = function (req, res) {
  return data.getFeaturedProjects().then((result) => res.json(result));
};
