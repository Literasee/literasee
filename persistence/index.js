const _ = require('lodash');
const Project = require('./models').Project;
const User = require('./models').User;

exports.getFeaturedProjects = function () {
  // TODO: limit to featured projects
  return Project.find();
}

exports.getProjectsByOwner = function (username) {
  return User.findOne({username});
}

exports.getProject = function (params) {
  return Project.findOne({owner: params.owner, project: params.project});
}

exports.saveProject = function (project) {
  const conditions = { owner: project.owner, project: project.project };
  return Project.findOneAndUpdate(conditions, project, {
    new: true,
    upsert: true
  });
}

exports.saveUserProjects = function (userData) {
  return User.findOneAndUpdate({username: userData.username}, userData, {
    new: true,
    upsert: true
  });
}

exports.setProjectsIgnoredState = function (username, projectIds, ignored) {
  return User
    .findOne({username})
    .then((user) => {
      if (ignored) {
        user.ignored = _.uniq([].concat(user.ignored, projectIds));
      } else {
        user.ignored = _.filter(user.ignored, (pId) => projectIds.indexOf(pId) < 0);
      }

      return user.save();
    });
}
