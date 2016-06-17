const data = require('../../persistence');

module.exports = function (req, res) {
  const username = req.params.owner;
  const projectIds = req.body.projectIds;
  const ignored = Boolean(req.body.ignored);

  data
    .setProjectsIgnoredState(username, projectIds, ignored)
    .then((user) => {
      res.json(user);
    });
}
