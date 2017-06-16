const _ = require('lodash')
const Project = require('./models').Project
const User = require('./models').User

exports.getFeaturedProjects = function() {
  // TODO: limit to featured projects
  return Project.find()
}

exports.getUser = function(username) {
  return User.findOne({ username })
}

exports.saveUser = function(user) {
  return User.findOneAndUpdate({ username: user.username }, user, {
    new: true,
    upsert: true,
  })
}

exports.getProject = function(params) {
  return Project.findOne({ owner: params.owner, project: params.project })
}

exports.saveProject = function(project) {
  const conditions = { owner: project.owner, project: project.project }
  return Project.findOneAndUpdate(conditions, project, {
    new: true,
    upsert: true,
  })
}
