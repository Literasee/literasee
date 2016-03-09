import * as data from '../../persistence';

module.exports = function (req, res) {
  return data.getFeaturedProjects().then(::res.json);
};
