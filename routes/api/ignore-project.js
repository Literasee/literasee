const data = require('../../persistence');

module.exports = function (req, res) {
  const username = req.params.owner;
  const projectId = req.body.projectId;
  const ignored = Boolean(req.body.ignored);

  data
    .setProjectIgnoredState(username, projectId, ignored)
    .then((user) => {
      res.json(user);
    });
}
