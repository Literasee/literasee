const Project = require('./models').Project;

exports.getFeaturedProjects = function () {
  // TODO: limit to featured projects
  return Project.find();
}

exports.getProjectsByOwner = function (params) {
  return Project.find(params.owner);
}

exports.getProject = function (params) {
  return Project.findOne(params.owner, params.project);
}

exports.saveProject = function (project) {
  const conditions = { owner: project.owner, project: project.project };
  return Project.findOneAndUpdate(conditions, project, {
    new: true,
    upsert: true
  });
}
