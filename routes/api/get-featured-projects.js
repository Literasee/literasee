module.exports = function (req, res) {
  const Project = req.app.locals.models.Project;

  const conditions = {
    // isFeatured: true
  };

  Project.find(conditions, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.send(result);
  });
};
