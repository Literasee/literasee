const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  avatar_url: String,
  owner: String,
  name: String,
  description: String,
  isFeatured: Boolean,
  css: String,
  html: String,
  js: String,
  source: String,
  thumbnail: String,
  etag: String,
  lastCommit: Schema.Types.Mixed,
})

exports.Project = mongoose.model('Project', ProjectSchema)

const UserSchema = new Schema({
  etag: String,
  repos: String,
  username: String,
})

exports.User = mongoose.model('User', UserSchema)
